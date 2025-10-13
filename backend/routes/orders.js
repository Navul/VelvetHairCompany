const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
  try {
    const {
      items,
      shippingAddress,
      billingAddress,
      paymentInfo,
      coupon
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No order items provided'
      });
    }

    // Validate and populate order items
    const orderItems = [];
    let itemsPrice = 0;

    for (let item of items) {
      const product = await Product.findById(item.product);
      
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found: ${item.product}`
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name}. Available: ${product.stock}`
        });
      }

      const orderItem = {
        product: product._id,
        quantity: item.quantity,
        price: product.finalPrice,
        total: product.finalPrice * item.quantity
      };

      orderItems.push(orderItem);
      itemsPrice += orderItem.total;

      // Update product stock
      product.stock -= item.quantity;
      await product.save();
    }

    // Calculate pricing
    const taxPrice = Math.round(itemsPrice * 0.08 * 100) / 100; // 8% tax
    const shippingPrice = itemsPrice > 100 ? 0 : 10; // Free shipping over $100
    let discountPrice = 0;

    // Apply coupon if provided
    if (coupon && coupon.code) {
      // Here you would validate the coupon code
      // For now, we'll apply a simple discount
      if (coupon.type === 'percentage') {
        discountPrice = Math.round(itemsPrice * (coupon.discount / 100) * 100) / 100;
      } else if (coupon.type === 'fixed') {
        discountPrice = coupon.discount;
      }
    }

    const totalPrice = itemsPrice + taxPrice + shippingPrice - discountPrice;

    const order = await Order.create({
      user: req.user.id,
      items: orderItems,
      shippingAddress,
      billingAddress: billingAddress || shippingAddress,
      paymentInfo: {
        ...paymentInfo,
        amount: totalPrice
      },
      pricing: {
        itemsPrice,
        taxPrice,
        shippingPrice,
        discountPrice,
        totalPrice
      },
      coupon
    });

    // Add initial status to history
    order.addStatusHistory('pending', req.user.id, 'Order created');
    await order.save();

    const populatedOrder = await Order.findById(order._id)
      .populate('items.product', 'name images price')
      .populate('user', 'firstName lastName email');

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order: populatedOrder
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get user orders
// @route   GET /api/orders
// @access  Private
const getMyOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const orders = await Order.find({ user: req.user.id })
      .populate('items.product', 'name images price')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Order.countDocuments({ user: req.user.id });
    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      count: orders.length,
      total,
      totalPages,
      currentPage: page,
      orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product', 'name images price sku')
      .populate('user', 'firstName lastName email phone')
      .populate('orderHistory.updatedBy', 'firstName lastName');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if user owns the order or is admin
    if (order.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.json({
      success: true,
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res) => {
  try {
    const { status, note } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    order.addStatusHistory(status, req.user.id, note);

    // Update shipping info if status is shipped
    if (status === 'shipped' && req.body.shippingInfo) {
      order.shippingInfo = {
        ...order.shippingInfo,
        ...req.body.shippingInfo,
        shippedAt: new Date()
      };
    }

    // Update delivery date if status is delivered
    if (status === 'delivered') {
      order.shippingInfo.actualDelivery = new Date();
    }

    await order.save();

    res.json({
      success: true,
      message: 'Order status updated successfully',
      order
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all orders (Admin)
// @route   GET /api/orders/admin/all
// @access  Private/Admin
const getAllOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    let filter = {};

    // Status filter
    if (req.query.status) {
      filter.orderStatus = req.query.status;
    }

    // Date range filter
    if (req.query.startDate || req.query.endDate) {
      filter.createdAt = {};
      if (req.query.startDate) {
        filter.createdAt.$gte = new Date(req.query.startDate);
      }
      if (req.query.endDate) {
        filter.createdAt.$lte = new Date(req.query.endDate);
      }
    }

    const orders = await Order.find(filter)
      .populate('user', 'firstName lastName email')
      .populate('items.product', 'name price')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Order.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    // Calculate stats
    const stats = await Order.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$pricing.totalPrice' },
          avgOrderValue: { $avg: '$pricing.totalPrice' },
          totalOrders: { $sum: 1 }
        }
      }
    ]);

    res.json({
      success: true,
      count: orders.length,
      total,
      totalPages,
      currentPage: page,
      stats: stats[0] || { totalRevenue: 0, avgOrderValue: 0, totalOrders: 0 },
      orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Cancel order
// @route   PUT /api/orders/:id/cancel
// @access  Private
const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if user owns the order
    if (order.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Check if order can be cancelled
    if (['shipped', 'delivered', 'cancelled'].includes(order.orderStatus)) {
      return res.status(400).json({
        success: false,
        message: 'Order cannot be cancelled at this stage'
      });
    }

    // Restore product stock
    for (let item of order.items) {
      const product = await Product.findById(item.product);
      if (product) {
        product.stock += item.quantity;
        await product.save();
      }
    }

    order.addStatusHistory('cancelled', req.user.id, req.body.reason || 'Cancelled by customer');
    await order.save();

    res.json({
      success: true,
      message: 'Order cancelled successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Routes
router.route('/')
  .post(authMiddleware, createOrder)
  .get(authMiddleware, getMyOrders);

router.get('/admin/all', authMiddleware, adminMiddleware, getAllOrders);

router.route('/:id')
  .get(authMiddleware, getOrder);

router.put('/:id/status', authMiddleware, adminMiddleware, updateOrderStatus);
router.put('/:id/cancel', authMiddleware, cancelOrder);

module.exports = router;