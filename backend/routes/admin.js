const express = require('express');
const router = express.Router();
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User');

// @desc    Get dashboard statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
  try {
    // Fetch all statistics in parallel
    const [
      totalProducts,
      totalOrders,
      totalUsers,
      revenueData
    ] = await Promise.all([
      Product.countDocuments(),
      Order.countDocuments(),
      User.countDocuments(),
      Order.aggregate([
        {
          $match: {
            status: { $in: ['processing', 'shipped', 'delivered'] }
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: '$totalAmount' }
          }
        }
      ])
    ]);

    const totalRevenue = revenueData[0]?.total || 0;

    res.json({
      totalProducts,
      totalOrders,
      totalRevenue,
      totalUsers
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ message: 'Error fetching dashboard statistics' });
  }
};

// @desc    Get recent orders
// @route   GET /api/admin/recent-orders
// @access  Private/Admin
const getRecentOrders = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    
    const orders = await Order.find()
      .populate('user', 'firstName lastName email')
      .sort({ createdAt: -1 })
      .limit(limit);

    res.json({ orders });
  } catch (error) {
    console.error('Error fetching recent orders:', error);
    res.status(500).json({ message: 'Error fetching recent orders' });
  }
};

// @desc    Get low stock products
// @route   GET /api/admin/low-stock
// @access  Private/Admin
const getLowStockProducts = async (req, res) => {
  try {
    const threshold = parseInt(req.query.threshold) || 10;
    
    const products = await Product.find({
      stock: { $lt: threshold }
    }).sort({ stock: 1 });

    res.json({ products });
  } catch (error) {
    console.error('Error fetching low stock products:', error);
    res.status(500).json({ message: 'Error fetching low stock products' });
  }
};

// Routes
router.get('/stats', authMiddleware, adminMiddleware, getDashboardStats);
router.get('/recent-orders', authMiddleware, adminMiddleware, getRecentOrders);
router.get('/low-stock', authMiddleware, adminMiddleware, getLowStockProducts);

module.exports = router;
