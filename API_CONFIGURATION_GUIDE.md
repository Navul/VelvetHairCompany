# API Configuration Guide

## Overview

The Velvet Hair Company application uses a centralized API configuration system that automatically handles different environments (localhost development and production deployment).

## 📁 File Structure

```
frontend/
├── src/
│   ├── config/
│   │   ├── api.config.js      # API endpoints and configuration
│   │   └── apiClient.js       # Axios instance with interceptors
│   ├── services/
│   │   ├── auth.service.js    # Authentication API calls
│   │   ├── product.service.js # Product API calls
│   │   └── order.service.js   # Order API calls
│   └── ...
├── .env                        # Environment variables (not in git)
└── .env.example                # Environment variables template

backend/
├── server.js                   # Express server with CORS config
├── .env                        # Backend environment variables (not in git)
└── .env.example                # Backend environment template
```

## 🔧 Setup Instructions

### 1. Frontend Setup

**Step 1: Copy environment file**
```bash
cd frontend
cp .env.example .env
```

**Step 2: Update `.env` file**
```env
# For Development (localhost)
NODE_ENV=development
REACT_APP_API_URL=http://localhost:5000

# For Production (replace with your actual domain)
# NODE_ENV=production
# REACT_APP_API_URL=https://api.velvethair.com
```

**Step 3: Install dependencies**
```bash
npm install
```

### 2. Backend Setup

**Step 1: Copy environment file**
```bash
cd backend
# Or from root directory
cp .env.example .env
```

**Step 2: Update `.env` file**
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:3000

# For production
# FRONTEND_URL=https://www.velvethair.com
```

**Step 3: Install dependencies**
```bash
npm install
```

## 🚀 How It Works

### API Base URL Configuration

The system automatically switches between development and production URLs:

```javascript
// Development (localhost)
http://localhost:5000/api/products

// Production (after deployment)
https://api.velvethair.com/api/products
```

### Using API Services

Instead of hardcoding URLs, use the service classes:

```javascript
// ❌ OLD WAY - Hardcoded URL
fetch('http://localhost:5000/api/products')

// ✅ NEW WAY - Using service
import ProductService from './services/product.service';

const products = await ProductService.getAllProducts();
```

## 📖 API Service Usage Examples

### Authentication

```javascript
import AuthService from './services/auth.service';

// Login
const loginData = {
  email: 'user@example.com',
  password: 'password123'
};
const response = await AuthService.login(loginData);

// Register
const userData = {
  name: 'John Doe',
  email: 'john@example.com',
  password: 'securePassword123'
};
const newUser = await AuthService.register(userData);

// Logout
await AuthService.logout();

// Get current user
const currentUser = await AuthService.getCurrentUser();
```

### Products

```javascript
import ProductService from './services/product.service';

// Get all products
const products = await ProductService.getAllProducts();

// Get products with filters
const filteredProducts = await ProductService.getAllProducts({
  category: 'female-wigs',
  page: 1,
  limit: 12
});

// Get single product
const product = await ProductService.getProductById('product-id');

// Search products
const searchResults = await ProductService.searchProducts('natural hair');

// Get featured products
const featured = await ProductService.getFeaturedProducts();
```

### Orders

```javascript
import OrderService from './services/order.service';

// Create order
const orderData = {
  items: [
    { product: 'product-id', quantity: 2, price: 199.99 }
  ],
  shippingAddress: { /*...*/ },
  paymentMethod: 'card'
};
const newOrder = await OrderService.createOrder(orderData);

// Get user's orders
const myOrders = await OrderService.getMyOrders();

// Get single order
const order = await OrderService.getOrderById('order-id');

// Cancel order
await OrderService.cancelOrder('order-id');
```

## 🔒 Authentication

The axios client automatically handles authentication tokens:

```javascript
// Token is automatically added to requests
// Authorization: Bearer <token>

// Automatic token refresh on 401 errors
// Automatic redirect to login if unauthorized
```

## 🌍 CORS Configuration

The backend CORS is configured to accept requests from:

- ✅ `http://localhost:3000` (React dev server)
- ✅ `http://localhost:3001` (Alternative port)
- ✅ Production domain (from `FRONTEND_URL` env variable)
- ✅ All origins in development mode

### Backend CORS Setup

```javascript
// server.js
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      process.env.FRONTEND_URL
    ].filter(Boolean);

    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else if (process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};
```

## 📝 Environment Variables Reference

### Frontend Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Application environment | `development` or `production` |
| `REACT_APP_API_URL` | Backend API URL | `http://localhost:5000` |
| `REACT_APP_NAME` | Application name | `Velvet Hair Company` |

### Backend Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Server environment | `development` or `production` |
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | JWT secret key | `your-secret-key` |
| `FRONTEND_URL` | Frontend URL (for CORS) | `http://localhost:3000` |

## 🚦 Testing

### Test Development Mode
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start

# Should work on http://localhost:3000
```

### Test Production Mode
```bash
# Build frontend
cd frontend
npm run build

# Set production environment
# Update .env files with production URLs
# Deploy to hosting service
```

## 🐛 Troubleshooting

### CORS Errors
```
Access to fetch at 'http://localhost:5000/api/products' from origin 'http://localhost:3000' 
has been blocked by CORS policy
```

**Solution:**
1. Check backend `.env` has correct `FRONTEND_URL`
2. Restart backend server after env changes
3. Clear browser cache

### API Not Found (404)
```
GET http://localhost:5000/api/products 404 (Not Found)
```

**Solution:**
1. Verify backend server is running
2. Check `REACT_APP_API_URL` in frontend `.env`
3. Verify API endpoint exists in backend routes

### Unauthorized (401)
```
GET http://localhost:5000/api/orders 401 (Unauthorized)
```

**Solution:**
1. Check if user is logged in
2. Verify token is stored in localStorage
3. Check token hasn't expired

## 🎯 Best Practices

1. **Never commit `.env` files** - They contain sensitive information
2. **Always use `.env.example`** - Template for other developers
3. **Use service classes** - Don't make direct API calls
4. **Handle errors properly** - Use try-catch blocks
5. **Log in development** - Use console.log for debugging
6. **Secure in production** - Remove debug logs, use HTTPS

## 📚 Additional Resources

- [Axios Documentation](https://axios-http.com/)
- [Create React App - Environment Variables](https://create-react-app.dev/docs/adding-custom-environment-variables/)
- [Express CORS](https://expressjs.com/en/resources/middleware/cors.html)

---

**Need Help?** Check the troubleshooting section or open an issue in the repository.