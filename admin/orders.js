// Orders Management JavaScript
const { checkAdminAuth, apiRequest } = window.adminUtils;

let orders = [];

async function initOrdersPage() {
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
    
    await loadOrders();
    initEventListeners();
}

async function loadOrders() {
    try {
        const response = await apiRequest('/orders');
        orders = response.orders || response || [];
        renderOrdersTable(orders);
    } catch (error) {
        console.error('Error loading orders:', error);
        document.getElementById('ordersTableBody').innerHTML = 
            '<tr><td colspan="7" class="text-center">Error loading orders</td></tr>';
    }
}

function renderOrdersTable(ordersToRender) {
    const tbody = document.getElementById('ordersTableBody');
    
    if (!ordersToRender || ordersToRender.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center">No orders found</td></tr>';
        return;
    }
    
    tbody.innerHTML = ordersToRender.map(order => `
        <tr>
            <td>#${order._id.substring(0, 8)}</td>
            <td>${order.user?.email || order.userEmail || 'N/A'}</td>
            <td>${order.items?.length || order.orderItems?.length || 0} items</td>
            <td>$${(order.totalAmount || order.totalPrice || 0).toFixed(2)}</td>
            <td>
                <select class="status-select" onchange="updateOrderStatus('${order._id}', this.value)">
                    <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
                    <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>Processing</option>
                    <option value="shipped" ${order.status === 'shipped' ? 'selected' : ''}>Shipped</option>
                    <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Delivered</option>
                    <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                </select>
            </td>
            <td>${new Date(order.createdAt).toLocaleDateString()}</td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="viewOrderDetails('${order._id}')">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

window.updateOrderStatus = async function(orderId, newStatus) {
    try {
        await apiRequest(`/orders/${orderId}`, {
            method: 'PUT',
            body: JSON.stringify({ status: newStatus })
        });
        alert('Order status updated successfully');
        await loadOrders();
    } catch (error) {
        console.error('Error updating order status:', error);
        alert('Error updating order status');
    }
};

window.viewOrderDetails = function(orderId) {
    const order = orders.find(o => o._id === orderId);
    if (!order) return;
    
    const items = order.items || order.orderItems || [];
    const itemsHtml = items.map(item => `
        <div class="order-item">
            <span>${item.name || item.product?.name || 'Product'} ${item.color ? `(${item.color.name})` : ''}</span>
            <span>Qty: ${item.quantity} × $${(item.price || 0).toFixed(2)}</span>
        </div>
    `).join('');
    
    alert(`Order #${order._id}\n\nCustomer: ${order.user?.email || 'N/A'}\nStatus: ${order.status}\nTotal: $${(order.totalAmount || 0).toFixed(2)}\n\nItems:\n${items.map(i => `${i.name} - $${i.price}`).join('\n')}`);
};

function initEventListeners() {
    document.getElementById('searchInput').addEventListener('input', handleSearch);
    document.getElementById('statusFilter').addEventListener('change', handleSearch);
    
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
    const status = document.getElementById('statusFilter').value;
    
    let filtered = orders;
    
    if (searchTerm) {
        filtered = filtered.filter(o => 
            o._id.toLowerCase().includes(searchTerm) ||
            (o.user?.email || '').toLowerCase().includes(searchTerm)
        );
    }
    
    if (status) {
        filtered = filtered.filter(o => o.status === status);
    }
    
    renderOrdersTable(filtered);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initOrdersPage);
} else {
    initOrdersPage();
}
