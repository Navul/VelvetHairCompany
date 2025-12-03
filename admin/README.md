# Velvet Hair Company - Admin Dashboard

Complete administrative interface for managing products, orders, and users for the Velvet Hair Wigs e-commerce platform.

## Features

### 📊 Dashboard Home
- Real-time statistics (total products, orders, revenue, users)
- Recent orders overview
- Low stock alerts
- Sales analytics (chart placeholder)

### 🛍️ Product Management
- View all products in a searchable, filterable table
- Add new products with details:
  - Name, description, price, category
  - Stock quantity
  - Multiple hair colors (name, HEX code, availability)
  - Product images
- Edit existing products
- Delete products with confirmation
- Color swatch preview in product listings
- Search by product name or description
- Filter by category

### 📦 Order Management
- View all orders with customer information
- Update order status inline:
  - Pending → Processing → Shipped → Delivered
  - Cancel orders when needed
- View order details (items, quantities, colors)
- Search by order ID or customer email
- Filter by order status
- Display order totals and dates

### 👥 User Management
- View all registered users
- User information display:
  - Name and email
  - Registration date
  - Order count
  - Role (Admin/Customer)
- View detailed user profiles
- See user order history
- Calculate total spent per user
- Search by name or email

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend API**: Express.js + MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Icons**: Font Awesome 6.4.0
- **Storage**: localStorage for auth tokens

## Project Structure

```
admin/
├── index.html              # Dashboard home
├── products.html           # Product management
├── orders.html             # Order management
├── users.html              # User management
├── admin.css               # Shared styles
├── admin.js                # Core utilities & dashboard logic
├── products.js             # Product CRUD operations
├── orders.js               # Order management logic
├── users.js                # User management logic
├── API_REQUIREMENTS.md     # Backend API documentation
└── README.md               # This file
```

## Installation & Setup

### 1. Prerequisites
- MongoDB running locally or cloud cluster
- Node.js backend server running on `http://localhost:5000`
- Admin user created in database with `role: 'admin'`

### 2. Backend Setup
Ensure your Express.js backend has the required API routes. See `API_REQUIREMENTS.md` for complete documentation.

Required routes:
```
GET    /api/products
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id

GET    /api/orders
PUT    /api/orders/:id

GET    /api/users
GET    /api/users/:id

GET    /api/admin/stats
GET    /api/admin/recent-orders
GET    /api/admin/low-stock
```

### 3. Admin User Creation
Run this script in MongoDB or add via your backend:

```javascript
// Create an admin user
db.users.insertOne({
    firstName: "Admin",
    lastName: "User",
    email: "admin@velvethair.com",
    password: "$2b$10$hashedPasswordHere", // Use bcrypt to hash
    role: "admin",
    isEmailVerified: true,
    createdAt: new Date()
});
```

### 4. Configuration
Update API base URL if needed in `admin.js`:
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

### 5. Access Dashboard
1. Login with admin credentials at `/frontend/src/pages/auth/Login.html`
2. Navigate to `/admin/index.html`
3. Dashboard will verify admin role and load statistics

## Usage Guide

### Logging In
1. Use admin email and password on the login page
2. System stores JWT token and user data in localStorage
3. Dashboard verifies `role: 'admin'` flag
4. Non-admin users are redirected to login

### Managing Products
1. Navigate to "Products" in sidebar
2. Click "Add Product" button
3. Fill in product details
4. Add colors using "Add Color" button:
   - Enter color name (e.g., "Natural Black")
   - Pick HEX code using color picker
   - Toggle availability checkbox
5. Click "Save Product"
6. Edit: Click pencil icon on any product
7. Delete: Click trash icon (requires confirmation)

### Managing Orders
1. Navigate to "Orders" in sidebar
2. View all orders with customer details
3. Update status using dropdown in each row
4. Status options:
   - Pending: New order received
   - Processing: Order being prepared
   - Shipped: Order sent to customer
   - Delivered: Order received by customer
   - Cancelled: Order cancelled
5. Click eye icon to view order items
6. Use search to find specific orders
7. Filter by status to see orders in specific stage

### Managing Users
1. Navigate to "Users" in sidebar
2. View all registered users
3. Click eye icon to view user details:
   - Personal information
   - Registration date
   - Total orders and amount spent
   - Recent order history (last 5)
4. Search users by name or email

### Dashboard Statistics
- **Total Products**: Count of all products in catalog
- **Total Orders**: All orders regardless of status
- **Total Revenue**: Sum of completed orders (processing, shipped, delivered)
- **Total Users**: All registered user accounts

## Design & Styling

### Color Scheme
- **Primary Purple**: `#4B2142` (velvet purple)
- **Light Purple**: `#9D4C7C`
- **Secondary Pink**: `#F2D7E8`
- **Success Green**: `#28a745`
- **Danger Red**: `#dc3545`
- **Warning Orange**: `#ffc107`

### Responsive Design
- **Desktop**: Full sidebar (260px) + content area
- **Tablet**: Collapsible sidebar
- **Mobile** (< 768px): Hamburger menu with overlay sidebar

### Status Badge Colors
- Pending: Orange
- Processing: Blue
- Shipped: Purple
- Delivered: Green
- Cancelled: Red
- Low Stock: Warning (orange/yellow)
- High Stock: Success (green)

## Security Features

### Authentication
- JWT token validation on every page load
- Admin role verification before access
- Auto-redirect to login if unauthorized
- Secure token storage in localStorage

### Authorization
- All admin routes require `role: 'admin'` flag
- Backend middleware validates admin status
- Frontend double-checks user role
- Non-admin users cannot access admin panel

### Best Practices
- Passwords hashed with bcrypt (backend)
- Tokens expire after set time (configure on backend)
- HTTPS recommended for production
- Environment variables for secrets

## API Integration

All admin pages use the `apiRequest()` utility function:

```javascript
const response = await apiRequest('/products');
// Automatically includes:
// - Authorization header with JWT token
// - Content-Type: application/json
// - Error handling
// - Token refresh (if implemented)
```

### Error Handling
- Network errors: Display user-friendly message
- 401 Unauthorized: Redirect to login
- 403 Forbidden: Show "Access denied" message
- 500 Server Error: Show error details
- Validation errors: Show field-specific messages

## Mobile Responsiveness

### Tablet (768px - 1024px)
- Sidebar remains visible
- Reduced padding in content area
- Smaller font sizes for tables

### Mobile (< 768px)
- Hamburger menu button appears
- Sidebar hidden by default
- Sidebar slides in as overlay
- Tables scroll horizontally
- Stacked form inputs
- Touch-friendly button sizes

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Development

### Adding New Features
1. Add HTML in appropriate page file
2. Implement logic in corresponding JS file
3. Update `admin.css` if new styles needed
4. Test on desktop, tablet, and mobile
5. Update API_REQUIREMENTS.md if new routes needed

### Code Style
- Use ES6+ JavaScript features
- Async/await for API calls
- Template literals for HTML generation
- Consistent 4-space indentation
- Comments for complex logic

### Testing Checklist
- [ ] Login redirects properly
- [ ] Dashboard stats load correctly
- [ ] Product CRUD operations work
- [ ] Color picker saves HEX values
- [ ] Order status updates persist
- [ ] User details modal shows data
- [ ] Search and filter work
- [ ] Mobile menu toggles
- [ ] Logout clears storage
- [ ] Non-admin users can't access

## Troubleshooting

### "Unauthorized" Error
- Check if JWT token is in localStorage
- Verify token hasn't expired
- Ensure backend authentication middleware is working
- Try logging in again

### "Admin Access Required"
- Verify user has `isAdmin: true` in database
- Check if backend validates admin role
- Ensure admin middleware is applied to routes

### Products Not Loading
- Verify backend server is running on port 5000
- Check MongoDB connection
- Inspect browser console for errors
- Test API endpoint with Postman

### Images Not Displaying
- Check image URL format
- Verify CORS settings on backend
- Ensure images are served from `/uploads` or CDN
- Use placeholder images for testing

### Mobile Menu Not Working
- Check JavaScript console for errors
- Verify `admin.js` is loaded
- Test sidebar toggle event listeners
- Clear browser cache

## Future Enhancements

### Planned Features
- [ ] Image upload with drag-and-drop
- [ ] Bulk product import (CSV/Excel)
- [ ] Order invoice generation (PDF)
- [ ] Email notifications for status changes
- [ ] Advanced analytics dashboard
- [ ] Product inventory tracking
- [ ] Customer reviews moderation
- [ ] Discount code management
- [ ] Sales reports and exports
- [ ] Role-based permissions (super admin, staff, etc.)

### Performance Optimizations
- [ ] Pagination for large datasets
- [ ] Lazy loading for images
- [ ] Caching for frequently accessed data
- [ ] WebSocket for real-time updates
- [ ] Debounced search inputs

## Support

For issues or questions:
1. Check `API_REQUIREMENTS.md` for backend setup
2. Review browser console for JavaScript errors
3. Verify MongoDB connection and data
4. Test API endpoints independently
5. Check CORS configuration

## License

Proprietary - Velvet Hair Company

## Credits

- **Design**: Custom purple velvet theme
- **Icons**: Font Awesome
- **Backend**: Express.js + MongoDB
- **Authentication**: JWT

---

**Version**: 1.0.0  
**Last Updated**: 2024  
**Maintainer**: Velvet Hair Company Development Team
