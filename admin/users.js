// Users Management JavaScript
const { checkAdminAuth, apiRequest } = window.adminUtils;

let users = [];

async function initUsersPage() {
    if (!checkAdminAuth()) return;
    
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
    
    await loadUsers();
    initEventListeners();
}

async function loadUsers() {
    try {
        const response = await apiRequest('/users');
        users = response.users || response || [];
        renderUsersTable(users);
    } catch (error) {
        console.error('Error loading users:', error);
        document.getElementById('usersTableBody').innerHTML = 
            '<tr><td colspan="7" class="text-center">Error loading users</td></tr>';
    }
}

function renderUsersTable(usersToRender) {
    const tbody = document.getElementById('usersTableBody');
    
    if (!usersToRender || usersToRender.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center">No users found</td></tr>';
        return;
    }
    
    tbody.innerHTML = usersToRender.map(user => {
        const initials = (user.firstName?.[0] || '') + (user.lastName?.[0] || user.email?.[0] || 'U');
        const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'N/A';
        const role = user.role === 'admin' ? 'Admin' : 'Customer';
        const roleClass = user.role === 'admin' ? 'status-low' : 'status-high';
        
        return `
            <tr>
                <td>
                    <div class="user-avatar">${initials.toUpperCase()}</div>
                </td>
                <td>${fullName}</td>
                <td>${user.email || 'N/A'}</td>
                <td>${user.orderCount || 0}</td>
                <td>${new Date(user.createdAt || Date.now()).toLocaleDateString()}</td>
                <td><span class="status-badge ${roleClass}">${role}</span></td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="viewUserDetails('${user._id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

window.viewUserDetails = async function(userId) {
    const user = users.find(u => u._id === userId);
    if (!user) return;
    
    try {
        // Load user's orders
        const ordersRes = await apiRequest(`/orders?userId=${userId}`);
        const userOrders = ordersRes.orders || [];
        
        const detailsHtml = `
            <div>
                <div class="user-info-row">
                    <strong>Name:</strong>
                    <span>${user.firstName || ''} ${user.lastName || ''}</span>
                </div>
                <div class="user-info-row">
                    <strong>Email:</strong>
                    <span>${user.email}</span>
                </div>
                <div class="user-info-row">
                    <strong>Role:</strong>
                    <span>${user.role === 'admin' ? 'Administrator' : 'Customer'}</span>
                </div>
                <div class="user-info-row">
                    <strong>Registered:</strong>
                    <span>${new Date(user.createdAt).toLocaleString()}</span>
                </div>
                <div class="user-info-row">
                    <strong>Total Orders:</strong>
                    <span>${userOrders.length}</span>
                </div>
                <div class="user-info-row">
                    <strong>Total Spent:</strong>
                    <span>$${userOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0).toFixed(2)}</span>
                </div>
                ${userOrders.length > 0 ? `
                    <h3 style="margin-top: 20px; margin-bottom: 12px;">Recent Orders</h3>
                    ${userOrders.slice(0, 5).map(order => `
                        <div class="order-item">
                            <span>#${order._id.substring(0, 8)} - ${order.status}</span>
                            <span>$${(order.totalAmount || 0).toFixed(2)}</span>
                        </div>
                    `).join('')}
                ` : ''}
            </div>
        `;
        
        document.getElementById('userDetailsContent').innerHTML = detailsHtml;
        document.getElementById('userModal').classList.add('active');
    } catch (error) {
        console.error('Error loading user details:', error);
        alert('Error loading user details');
    }
};

function initEventListeners() {
    document.getElementById('searchInput').addEventListener('input', handleSearch);
    document.getElementById('modalClose').addEventListener('click', () => {
        document.getElementById('userModal').classList.remove('active');
    });
    
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => sidebar.classList.toggle('active'));
    }
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => sidebar.classList.remove('active'));
    }
}

function handleSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    let filtered = users;
    
    if (searchTerm) {
        filtered = filtered.filter(u => 
            (u.firstName || '').toLowerCase().includes(searchTerm) ||
            (u.lastName || '').toLowerCase().includes(searchTerm) ||
            (u.email || '').toLowerCase().includes(searchTerm)
        );
    }
    
    renderUsersTable(filtered);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUsersPage);
} else {
    initUsersPage();
}
