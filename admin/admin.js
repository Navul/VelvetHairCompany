// Admin Dashboard JavaScript - Velvet Hair Wigs
// API Base URL - Update this to match your backend
const API_BASE_URL = 'http://localhost:5000/api';

// Check admin authentication
function checkAdminAuth() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    
    if (!token || user.role !== 'admin') {
        alert('Access denied. Admin privileges required.');
        window.location.href = '../frontend/src/pages/auth/Login.html';
        return false;
    }
    
    // Display admin name
    const adminNameEl = document.getElementById('adminName');
    if (adminNameEl && user.firstName) {
        adminNameEl.textContent = `${user.firstName} ${user.lastName || ''}`;
    }
    
    return true;
}

// API Request Helper
async function apiRequest(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };
    
    const config = {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...options.headers
        }
    };
    
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Request failed');
        }
        
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Load Dashboard Stats
async function loadDashboardStats() {
    try {
        // Load products count
        const productsRes = await apiRequest('/products');
        const totalProducts = productsRes.products?.length || 0;
        document.getElementById('totalProducts').textContent = totalProducts;
        
        // Load orders count and revenue
        const ordersRes = await apiRequest('/orders');
        const orders = ordersRes.orders || [];
        document.getElementById('totalOrders').textContent = orders.length;
        
        const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
        document.getElementById('totalRevenue').textContent = `$${totalRevenue.toFixed(2)}`;
        
        // Load users count
        const usersRes = await apiRequest('/users');
        const totalUsers = usersRes.users?.length || 0;
        document.getElementById('totalUsers').textContent = totalUsers;
        
    } catch (error) {
        console.error('Error loading dashboard stats:', error);
    }
}

// Load Recent Orders
async function loadRecentOrders() {
    try {
        const response = await apiRequest('/orders?limit=5&sort=-createdAt');
        const orders = response.orders || [];
        
        const tableBody = document.getElementById('recentOrdersTable');
        
        if (orders.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="5" class="text-center">No orders found</td></tr>';
            return;
        }
        
        tableBody.innerHTML = orders.map(order => `
            <tr>
                <td>#${order._id.substring(0, 8)}</td>
                <td>${order.user?.email || 'N/A'}</td>
                <td>$${order.totalAmount?.toFixed(2) || '0.00'}</td>
                <td><span class="status-badge status-${order.status?.toLowerCase() || 'pending'}">${order.status || 'Pending'}</span></td>
                <td>${new Date(order.createdAt).toLocaleDateString()}</td>
            </tr>
        `).join('');
        
    } catch (error) {
        console.error('Error loading recent orders:', error);
        document.getElementById('recentOrdersTable').innerHTML = 
            '<tr><td colspan="5" class="text-center">Error loading orders</td></tr>';
    }
}

// Load Low Stock Products
async function loadLowStockProducts() {
    try {
        const response = await apiRequest('/products');
        const products = response.products || [];
        
        // Filter products with stock < 10
        const lowStockProducts = products.filter(p => (p.stockQuantity || 0) < 10);
        
        const tableBody = document.getElementById('lowStockTable');
        
        if (lowStockProducts.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="3" class="text-center">No low stock items</td></tr>';
            return;
        }
        
        tableBody.innerHTML = lowStockProducts.map(product => {
            const stock = product.stockQuantity || 0;
            let statusClass = 'status-high';
            let statusText = 'In Stock';
            
            if (stock === 0) {
                statusClass = 'status-low';
                statusText = 'Out of Stock';
            } else if (stock < 5) {
                statusClass = 'status-low';
                statusText = 'Critical';
            } else if (stock < 10) {
                statusClass = 'status-medium';
                statusText = 'Low Stock';
            }
            
            return `
                <tr>
                    <td>${product.name}</td>
                    <td><strong>${stock}</strong> units</td>
                    <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                </tr>
            `;
        }).join('');
        
    } catch (error) {
        console.error('Error loading low stock products:', error);
        document.getElementById('lowStockTable').innerHTML = 
            '<tr><td colspan="3" class="text-center">Error loading products</td></tr>';
    }
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.remove('active');
        });
    }
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        }
    });
}

// Logout Function
function initLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('Are you sure you want to logout?')) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '../frontend/src/pages/auth/Login.html';
            }
        });
    }
}

// Initialize Dashboard
async function initDashboard() {
    // Check auth first
    if (!checkAdminAuth()) {
        return;
    }
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize logout
    initLogout();
    
    // Load dashboard data
    await loadDashboardStats();
    await loadRecentOrders();
    await loadLowStockProducts();
}

// Run on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDashboard);
} else {
    initDashboard();
}

// Export functions for use in other pages
window.adminUtils = {
    checkAdminAuth,
    apiRequest,
    API_BASE_URL
};
