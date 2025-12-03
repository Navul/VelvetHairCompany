# Quick Start Guide - Admin Dashboard Setup

This guide will help you start the backend server and create an admin user to access the admin dashboard.

## Step 1: Install Backend Dependencies

Open a terminal in the project root and run:

```bash
cd backend
npm install
```

## Step 2: Verify Environment Variables

The `.env` file already exists with the correct configuration:
- ✅ MongoDB URI configured
- ✅ JWT Secret set
- ✅ Admin credentials defined

**Default Admin Credentials:**
- Email: `admin@velvethair.com`
- Password: `VelvetHairAdmin2025!`

## Step 3: Start the Backend Server

### Option A: Development Mode (with auto-reload)
```bash
cd backend
npm run dev
```

### Option B: Production Mode
```bash
cd backend
npm start
```

You should see:
```
🔧 Environment check:
NODE_ENV: development
MONGODB_URI: ✅ Loaded
JWT_SECRET: ✅ Loaded
✅ Database connected successfully!
🚀 Velvet Hair Wigs server running on port 5000
```

## Step 4: Create Admin User

Open a **new terminal** (keep the server running) and run:

```bash
node backend/scripts/createAdmin.js
```

**Expected Output:**
```
🔄 Connecting to MongoDB...
✅ Connected to MongoDB
🔄 Creating admin user...

✅ Admin user created successfully!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📧 Email: admin@velvethair.com
🔐 Password: VelvetHairAdmin2025!
👤 Name: Admin Velvet Hair
🎭 Role: admin
🆔 User ID: 674f2a1b8c9d0e1f2a3b4c5d
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️  IMPORTANT: Save these credentials securely!
📝 You can now login to the admin dashboard at: http://localhost:3000/admin

✅ Disconnected from MongoDB
```

**If admin already exists:**
The script will detect it and ask if you want to update the user to admin role.

## Step 5: Start the Frontend

Open a **third terminal** and run:

```bash
cd frontend
npm start
```

The React app will start at `http://localhost:3000`

## Step 6: Login to Admin Dashboard

1. **Login Page**: Navigate to `http://localhost:3000` or open `/frontend/src/pages/auth/Login.html`
2. **Enter Credentials**:
   - Email: `admin@velvethair.com`
   - Password: `VelvetHairAdmin2025!`
3. **Click Login**
4. **Access Dashboard**: After successful login, navigate to `/admin/index.html` or `http://localhost:3000/admin`

## Step 7: Verify Admin Access

The dashboard should load with:
- ✅ Statistics cards showing products, orders, revenue, users
- ✅ Recent orders table
- ✅ Low stock alerts
- ✅ Sidebar navigation (Dashboard, Products, Orders, Users)

## Troubleshooting

### Error: "Cannot connect to MongoDB"
**Solution:**
1. Check your internet connection (using MongoDB Atlas cloud)
2. Verify MongoDB URI in `.env` file
3. Ensure your IP address is whitelisted in MongoDB Atlas

### Error: "Access denied. Admin privileges required"
**Solution:**
1. Verify you logged in with the admin email
2. Check that the user has `role: 'admin'` in the database
3. Clear localStorage and login again:
   ```javascript
   // Open browser console (F12)
   localStorage.clear();
   ```

### Error: "Port 5000 already in use"
**Solution:**
1. Kill the process using port 5000:
   ```bash
   # Windows PowerShell
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F
   ```
2. Or change the PORT in `.env` file

### Frontend not connecting to backend
**Solution:**
1. Verify backend is running at `http://localhost:5000`
2. Check the API base URL in `admin/admin.js` (line 3)
3. Ensure CORS is configured correctly in `backend/server.js`

## Testing the Setup

### Test Backend Health
```bash
curl http://localhost:5000/api/health
```

**Expected Response:**
```json
{
  "message": "Velvet Hair Wigs API is running!",
  "timestamp": "2025-12-03T..."
}
```

### Test Admin Authentication
1. Open browser DevTools (F12) → Console
2. Check localStorage:
   ```javascript
   console.log('Token:', localStorage.getItem('token'));
   console.log('User:', localStorage.getItem('user'));
   ```

### Test Admin Functions
1. **Products**: Add a new product with colors
2. **Orders**: View orders and update status
3. **Users**: View user list and details

## Next Steps

1. **Add Products**: Navigate to Products page and add your wig products
2. **Sample Data**: Create test products with various categories
3. **Test Orders**: Create test orders to verify order management
4. **Customize**: Update colors, branding in `admin/admin.css`

## Command Summary

```bash
# Terminal 1 - Backend Server
cd backend
npm install
npm run dev

# Terminal 2 - Create Admin User (one-time)
node backend/scripts/createAdmin.js

# Terminal 3 - Frontend Server
cd frontend
npm install
npm start
```

## Admin Dashboard URLs

- **Login**: `http://localhost:3000` or `/frontend/src/pages/auth/Login.html`
- **Dashboard**: `/admin/index.html`
- **Products**: `/admin/products.html`
- **Orders**: `/admin/orders.html`
- **Users**: `/admin/users.html`

## Security Notes

⚠️ **Important:**
- Change the default admin password after first login
- Store credentials securely (don't commit to git)
- Use strong passwords in production
- Enable HTTPS in production
- Implement password reset functionality
- Set up email verification

## Support

If you encounter any issues:
1. Check the console logs (browser and terminal)
2. Verify all dependencies are installed
3. Ensure MongoDB connection is working
4. Review the API_REQUIREMENTS.md file
5. Check that all environment variables are set

---

**Last Updated**: December 3, 2025  
**Version**: 1.0.0
