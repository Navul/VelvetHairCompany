# Velvet Hair Company

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) e-commerce platform for selling premium wigs and hair extensions for both men and women. The application follows the MVC (Model-View-Controller) architecture to maintain clean and scalable code.

## 🌟 Features

### Frontend Features
- **Modern React UI** with responsive design
- **Redux Toolkit** for state management
- **React Router** for navigation
- **Tailwind CSS** for styling
- **React Query** for API state management
- **Real-time notifications** with React Hot Toast
- **Product filtering and search**
- **Shopping cart functionality**
- **User authentication and profiles**
- **Order tracking and history**
- **Wishlist functionality**
- **Admin dashboard** for management

### Backend Features
- **RESTful API** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT Authentication** with role-based access
- **Image upload** with Cloudinary integration
- **Payment processing** with Stripe
- **Email notifications**
- **Advanced filtering and pagination**
- **Order management system**
- **User role management**
- **Product review system**
- **Inventory management**

## 🏗️ Project Structure

```
velvet-hair-company/
│
├── backend/                 # Express.js backend
│   ├── config/             # Database & environment configuration
│   ├── controllers/        # Route controllers (business logic)
│   ├── models/            # Mongoose models (User, Product, Order)
│   ├── routes/            # Express routes (auth, products, orders)
│   ├── middleware/        # Authentication & error handling
│   ├── utils/             # Helper functions
│   ├── package.json       # Backend dependencies
│   └── server.js          # Entry point
│
├── frontend/               # React.js frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page components (Home, Products, Cart)
│   │   ├── store/         # Redux store and slices
│   │   ├── services/      # API service functions
│   │   ├── utils/         # Utility functions
│   │   ├── context/       # React Context providers
│   │   └── App.js         # Main App component
│   └── package.json       # Frontend dependencies
│
├── .env.example           # Environment variables template
├── package.json           # Root package.json for scripts
├── README.md              # Project documentation
└── LICENSE                # MIT License
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/velvet-hair-company.git
   cd velvet-hair-company
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   Fill in your environment variables in the `.env` file.

4. **Start MongoDB**
   Make sure MongoDB is running on your system.

5. **Run the application**
   ```bash
   # Development mode (runs both frontend and backend)
   npm run dev
   
   # Or run separately
   npm run server  # Backend only
   npm run client  # Frontend only
   ```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/velvet-hair-company
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=30d
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
```

## 📱 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/password` - Change password

### Products
- `GET /api/products` - Get all products (with filtering)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)
- `POST /api/products/:id/reviews` - Add product review

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id/cancel` - Cancel order
- `GET /api/orders/admin/all` - Get all orders (Admin only)
- `PUT /api/orders/:id/status` - Update order status (Admin only)

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get single user (Admin only)
- `PUT /api/users/:id` - Update user (Admin only)
- `DELETE /api/users/:id` - Delete user (Admin only)
- `POST /api/users/wishlist/:productId` - Add to wishlist
- `DELETE /api/users/wishlist/:productId` - Remove from wishlist

## 🎨 Frontend Features

### Pages
- **Home** - Landing page with featured products
- **Products** - Product catalog with filtering
- **Product Detail** - Individual product view
- **Cart** - Shopping cart management
- **Checkout** - Order placement
- **Profile** - User account management
- **Orders** - Order history and tracking
- **Wishlist** - Saved products
- **Admin Dashboard** - Admin panel

### Components
- **Header** - Navigation and user menu
- **Footer** - Site information and links
- **Product Card** - Product display component
- **Cart Item** - Shopping cart item
- **Loading Spinner** - Loading states
- **Protected Routes** - Authentication guards

## 🔧 Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File upload handling
- **Cloudinary** - Image storage
- **Stripe** - Payment processing
- **Nodemailer** - Email service

### Frontend
- **React** - UI library
- **Redux Toolkit** - State management
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **React Query** - Server state management
- **Axios** - HTTP client
- **React Hook Form** - Form handling
- **React Hot Toast** - Notifications
- **Framer Motion** - Animations

## 🚀 Deployment

### Heroku Deployment

1. **Prepare for deployment**
   ```bash
   npm run build
   ```

2. **Deploy to Heroku**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

### Environment Variables for Production
Set the following environment variables in your production environment:
- `NODE_ENV=production`
- `MONGODB_URI` (MongoDB Atlas connection string)
- `JWT_SECRET`
- `CLOUDINARY_*` variables
- `STRIPE_*` variables
- `EMAIL_*` variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Thanks to the MERN stack community
- Inspiration from modern e-commerce platforms
- UI design inspired by contemporary web design trends

## 📞 Support

For support, email info@velvethair.com or create an issue on GitHub.

---

**Made with ❤️ by Velvet Hair Company Team**
Velvet Hair is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) e-commerce platform for selling both male and female wigs. It follows the MVC (Model–View–Controller) architecture to maintain clean and scalable code.
