# Admin Dashboard API Requirements

This document outlines the backend API routes required for the Admin Dashboard to function properly.

## Base URL
```
http://localhost:5000/api
```

## Authentication
All admin routes require JWT authentication and admin role verification.

### Middleware
```javascript
// Required middleware for admin routes
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
};

const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access required' });
    }
    next();
};
```

## Products API

### GET /api/products
Get all products with optional filtering.
```javascript
// Query parameters: category (optional)
// Returns: { products: [...] }
```

### POST /api/products
Create a new product (Admin only).
```javascript
// Body: {
//   name: String (required),
//   description: String (required),
//   price: Number (required),
//   category: String (required),
//   stock: Number (required),
//   image: String (required),
//   colors: [{
//     name: String,
//     hexCode: String,
//     available: Boolean
//   }]
// }
// Returns: { product: {...}, message: 'Product created' }
```

### PUT /api/products/:id
Update an existing product (Admin only).
```javascript
// Body: Same as POST (all fields optional)
// Returns: { product: {...}, message: 'Product updated' }
```

### DELETE /api/products/:id
Delete a product (Admin only).
```javascript
// Returns: { message: 'Product deleted' }
```

## Orders API

### GET /api/orders
Get all orders with optional filtering.
```javascript
// Query parameters: 
//   - userId (optional): filter by user
//   - status (optional): filter by status
// Returns: { orders: [...] }
```

### GET /api/orders/:id
Get a specific order by ID.
```javascript
// Returns: { order: {...} }
```

### PUT /api/orders/:id
Update order status (Admin only).
```javascript
// Body: { status: String }
// Valid statuses: 'pending', 'processing', 'shipped', 'delivered', 'cancelled'
// Returns: { order: {...}, message: 'Order updated' }
```

## Users API

### GET /api/users
Get all users (Admin only).
```javascript
// Returns: { users: [{
//   _id: String,
//   firstName: String,
//   lastName: String,
//   email: String,
//   isAdmin: Boolean,
//   createdAt: Date,
//   orderCount: Number (calculated field)
// }] }
```

### GET /api/users/:id
Get a specific user by ID (Admin only).
```javascript
// Returns: { user: {...} }
```

## Dashboard Stats API

### GET /api/admin/stats
Get dashboard statistics (Admin only).
```javascript
// Returns: {
//   totalProducts: Number,
//   totalOrders: Number,
//   totalRevenue: Number,
//   totalUsers: Number
// }
```

### GET /api/admin/recent-orders
Get recent orders for dashboard (Admin only).
```javascript
// Query parameters: limit (default: 5)
// Returns: { orders: [...] }
```

### GET /api/admin/low-stock
Get products with low stock (Admin only).
```javascript
// Query parameters: threshold (default: 10)
// Returns: { products: [...] }
```

## Example Route Implementation

```javascript
const express = require('express');
const router = express.Router();

// Products Routes
router.get('/products', async (req, res) => {
    try {
        const { category } = req.query;
        const filter = category ? { category } : {};
        const products = await Product.find(filter);
        res.json({ products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/products', authenticateToken, isAdmin, async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json({ product, message: 'Product created' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/products/:id', authenticateToken, isAdmin, async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json({ product, message: 'Product updated' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/products/:id', authenticateToken, isAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Orders Routes
router.get('/orders', authenticateToken, async (req, res) => {
    try {
        const { userId, status } = req.query;
        const filter = {};
        if (userId) filter.userId = userId;
        if (status) filter.status = status;
        
        const orders = await Order.find(filter)
            .populate('userId', 'firstName lastName email')
            .sort({ createdAt: -1 });
        res.json({ orders });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/orders/:id', authenticateToken, isAdmin, async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        res.json({ order, message: 'Order updated' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Users Routes
router.get('/users', authenticateToken, isAdmin, async (req, res) => {
    try {
        const users = await User.find().select('-password');
        
        // Add order count for each user
        const usersWithOrderCount = await Promise.all(
            users.map(async (user) => {
                const orderCount = await Order.countDocuments({ userId: user._id });
                return {
                    ...user.toObject(),
                    orderCount
                };
            })
        );
        
        res.json({ users: usersWithOrderCount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Dashboard Stats Routes
router.get('/admin/stats', authenticateToken, isAdmin, async (req, res) => {
    try {
        const [totalProducts, totalOrders, totalUsers] = await Promise.all([
            Product.countDocuments(),
            Order.countDocuments(),
            User.countDocuments()
        ]);
        
        const revenueData = await Order.aggregate([
            { $match: { status: { $in: ['processing', 'shipped', 'delivered'] } } },
            { $group: { _id: null, total: { $sum: '$totalAmount' } } }
        ]);
        
        const totalRevenue = revenueData[0]?.total || 0;
        
        res.json({
            totalProducts,
            totalOrders,
            totalRevenue,
            totalUsers
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/admin/recent-orders', authenticateToken, isAdmin, async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 5;
        const orders = await Order.find()
            .populate('userId', 'firstName lastName email')
            .sort({ createdAt: -1 })
            .limit(limit);
        res.json({ orders });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/admin/low-stock', authenticateToken, isAdmin, async (req, res) => {
    try {
        const threshold = parseInt(req.query.threshold) || 10;
        const products = await Product.find({ stock: { $lt: threshold } });
        res.json({ products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
```

## MongoDB Schema Requirements

### Product Schema
```javascript
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true, default: 0 },
    image: { type: String, required: true },
    colors: [{
        name: String,
        hexCode: String,
        available: { type: Boolean, default: true }
    }],
    createdAt: { type: Date, default: Date.now }
});
```

### Order Schema
```javascript
const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        name: String,
        price: Number,
        quantity: Number,
        color: {
            name: String,
            hexCode: String
        }
    }],
    totalAmount: { type: Number, required: true },
    status: { 
        type: String, 
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    shippingAddress: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String
    },
    createdAt: { type: Date, default: Date.now }
});
```

### User Schema
```javascript
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});
```

## CORS Configuration
```javascript
const cors = require('cors');
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5000'],
    credentials: true
}));
```

## Error Handling
All routes should include proper error handling and return appropriate HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Testing Endpoints
Use the following test user credentials:
```javascript
// Admin user for testing
{
    email: "admin@velvethair.com",
    password: "VelvetHairAdmin2025!",
    role: "admin"
}
```

## Next Steps
1. Implement these routes in your Express.js backend
2. Add authentication middleware to all admin routes
3. Test each endpoint using Postman or similar tool
4. Update frontend API URLs if backend is deployed to a different server
5. Add image upload functionality for product images (optional)
