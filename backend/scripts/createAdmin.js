/**
 * Script to create an admin user in the database
 * Run this script with: node backend/scripts/createAdmin.js
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env') });

// Import User model
const User = require('../models/User');

// Admin user data
const adminData = {
  firstName: 'Admin',
  lastName: 'Velvet Hair',
  email: process.env.DEFAULT_ADMIN_EMAIL || 'admin@velvethair.com',
  password: process.env.DEFAULT_ADMIN_PASSWORD || 'VelvetHairAdmin2025!',
  role: 'admin',
  isEmailVerified: true,
  isActive: true
};

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminData.email });
    
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists with email:', adminData.email);
      console.log('📧 Email:', existingAdmin.email);
      console.log('👤 Name:', existingAdmin.firstName, existingAdmin.lastName);
      console.log('🔐 Role:', existingAdmin.role);
      
      const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
      });
      
      readline.question('Do you want to update this user to admin? (yes/no): ', async (answer) => {
        if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
          existingAdmin.role = 'admin';
          existingAdmin.isEmailVerified = true;
          existingAdmin.isActive = true;
          await existingAdmin.save();
          console.log('✅ User updated to admin successfully!');
        } else {
          console.log('❌ Operation cancelled');
        }
        readline.close();
        await mongoose.disconnect();
        process.exit(0);
      });
      
      return;
    }

    // Create new admin user
    console.log('🔄 Creating admin user...');
    const admin = await User.create(adminData);
    
    console.log('\n✅ Admin user created successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📧 Email:', admin.email);
    console.log('🔐 Password:', adminData.password);
    console.log('👤 Name:', admin.firstName, admin.lastName);
    console.log('🎭 Role:', admin.role);
    console.log('🆔 User ID:', admin._id);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n⚠️  IMPORTANT: Save these credentials securely!');
    console.log('📝 You can now login to the admin dashboard at: http://localhost:3000/admin');
    
    // Disconnect from database
    await mongoose.disconnect();
    console.log('\n✅ Disconnected from MongoDB');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
};

// Run the script
createAdmin();
