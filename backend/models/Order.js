const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1']
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'Price cannot be negative']
    },
    total: {
      type: Number,
      required: true
    }
  }],
  shippingAddress: {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    zipCode: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    phone: String
  },
  billingAddress: {
    firstName: String,
    lastName: String,
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
    phone: String
  },
  paymentInfo: {
    method: {
      type: String,
      required: true,
      enum: ['credit_card', 'debit_card', 'paypal', 'stripe', 'cash_on_delivery']
    },
    transactionId: String,
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed', 'refunded'],
      default: 'pending'
    },
    paidAt: Date,
    amount: {
      type: Number,
      required: true
    }
  },
  pricing: {
    itemsPrice: {
      type: Number,
      required: true,
      min: [0, 'Items price cannot be negative']
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0,
      min: [0, 'Tax price cannot be negative']
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0,
      min: [0, 'Shipping price cannot be negative']
    },
    discountPrice: {
      type: Number,
      default: 0,
      min: [0, 'Discount price cannot be negative']
    },
    totalPrice: {
      type: Number,
      required: true,
      min: [0, 'Total price cannot be negative']
    }
  },
  coupon: {
    code: String,
    discount: Number,
    type: {
      type: String,
      enum: ['percentage', 'fixed']
    }
  },
  orderStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'],
    default: 'pending'
  },
  shippingInfo: {
    carrier: String,
    trackingNumber: String,
    shippedAt: Date,
    estimatedDelivery: Date,
    actualDelivery: Date
  },
  notes: {
    customer: String,
    admin: String
  },
  orderHistory: [{
    status: String,
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    note: String
  }],
  refund: {
    requested: {
      type: Boolean,
      default: false
    },
    reason: String,
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'processed']
    },
    amount: Number,
    processedAt: Date
  }
}, {
  timestamps: true
});

// Indexes for better query performance
orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ orderNumber: 1 });
orderSchema.index({ orderStatus: 1 });
orderSchema.index({ 'paymentInfo.status': 1 });
orderSchema.index({ createdAt: -1 });

// Pre-save middleware to generate order number
orderSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    this.orderNumber = `VH-${timestamp}-${random}`;
  }
  next();
});

// Method to add status to order history
orderSchema.methods.addStatusHistory = function(status, updatedBy, note = '') {
  this.orderHistory.push({
    status,
    updatedBy,
    note,
    timestamp: new Date()
  });
  this.orderStatus = status;
};

// Virtual for order total items count
orderSchema.virtual('totalItems').get(function() {
  return this.items.reduce((total, item) => total + item.quantity, 0);
});

// Method to calculate order totals
orderSchema.methods.calculateTotals = function() {
  this.pricing.itemsPrice = this.items.reduce((total, item) => {
    item.total = item.price * item.quantity;
    return total + item.total;
  }, 0);

  // Calculate tax (assuming 8% tax rate)
  this.pricing.taxPrice = Math.round(this.pricing.itemsPrice * 0.08 * 100) / 100;

  // Calculate total
  this.pricing.totalPrice = 
    this.pricing.itemsPrice + 
    this.pricing.taxPrice + 
    this.pricing.shippingPrice - 
    this.pricing.discountPrice;
};

module.exports = mongoose.model('Order', orderSchema);