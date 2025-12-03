// Products Management JavaScript
const { checkAdminAuth, apiRequest, API_BASE_URL } = window.adminUtils;

let products = [];
let editingProductId = null;

// Initialize Products Page
async function initProductsPage() {
    if (!checkAdminAuth()) return;
    
    // Initialize logout
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
    
    // Load products
    await loadProducts();
    
    // Initialize event listeners
    initEventListeners();
}

// Load Products
async function loadProducts() {
    try {
        const response = await apiRequest('/products');
        products = response.products || response || [];
        renderProductsTable(products);
    } catch (error) {
        console.error('Error loading products:', error);
        document.getElementById('productsTableBody').innerHTML = 
            '<tr><td colspan="8" class="text-center">Error loading products</td></tr>';
    }
}

// Render Products Table
function renderProductsTable(productsToRender) {
    const tbody = document.getElementById('productsTableBody');
    
    if (!productsToRender || productsToRender.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" class="text-center">No products found</td></tr>';
        return;
    }
    
    tbody.innerHTML = productsToRender.map(product => {
        const stock = product.stockQuantity || product.stock || 0;
        const statusClass = stock > 10 ? 'status-high' : stock > 0 ? 'status-medium' : 'status-low';
        const statusText = stock > 10 ? 'In Stock' : stock > 0 ? 'Low Stock' : 'Out of Stock';
        
        const colors = product.colors || [];
        const colorsHtml = colors.length > 0 
            ? `<div class="color-swatch-preview">
                ${colors.slice(0, 3).map(c => `<div class="color-dot" style="background-color: ${c.code}" title="${c.name}"></div>`).join('')}
                ${colors.length > 3 ? `<span>+${colors.length - 3}</span>` : ''}
               </div>`
            : 'N/A';
        
        const imageUrl = product.images && product.images[0] ? product.images[0] : '/placeholder-wig.jpg';
        
        return `
            <tr>
                <td><img src="${imageUrl}" alt="${product.name}" class="product-image" onerror="this.src='/placeholder-wig.jpg'"></td>
                <td>${product.name}</td>
                <td>${product.category || 'N/A'}</td>
                <td>$${(product.price || 0).toFixed(2)}</td>
                <td>${stock}</td>
                <td>${colorsHtml}</td>
                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                <td class="actions-cell">
                    <button class="btn btn-sm btn-primary" onclick="editProduct('${product._id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteProduct('${product._id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

// Initialize Event Listeners
function initEventListeners() {
    // Add Product Button
    document.getElementById('addProductBtn').addEventListener('click', openAddProductModal);
    
    // Modal Close
    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('cancelBtn').addEventListener('click', closeModal);
    
    // Product Form Submit
    document.getElementById('productForm').addEventListener('submit', handleProductSubmit);
    
    // Add Color Button
    document.getElementById('addColorBtn').addEventListener('click', addColorInput);
    
    // Search Input
    document.getElementById('searchInput').addEventListener('input', handleSearch);
    
    // Category Filter
    document.getElementById('categoryFilter').addEventListener('change', handleSearch);
    
    // Mobile menu
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

// Open Add Product Modal
function openAddProductModal() {
    editingProductId = null;
    document.getElementById('modalTitle').textContent = 'Add New Product';
    document.getElementById('productForm').reset();
    document.getElementById('productId').value = '';
    document.getElementById('colorsContainer').innerHTML = '';
    addColorInput(); // Add one default color input
    document.getElementById('productModal').classList.add('active');
}

// Edit Product
window.editProduct = async function(productId) {
    const product = products.find(p => p._id === productId);
    if (!product) return;
    
    editingProductId = productId;
    document.getElementById('modalTitle').textContent = 'Edit Product';
    document.getElementById('productId').value = productId;
    document.getElementById('productName').value = product.name || '';
    document.getElementById('productCategory').value = product.category || '';
    document.getElementById('productDescription').value = product.description || '';
    document.getElementById('productPrice').value = product.price || '';
    document.getElementById('productOriginalPrice').value = product.originalPrice || '';
    document.getElementById('productStock').value = product.stockQuantity || product.stock || '';
    
    // Load colors
    document.getElementById('colorsContainer').innerHTML = '';
    if (product.colors && product.colors.length > 0) {
        product.colors.forEach(color => {
            addColorInput(color);
        });
    } else {
        addColorInput();
    }
    
    document.getElementById('productModal').classList.add('active');
};

// Delete Product
window.deleteProduct = async function(productId) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
        await apiRequest(`/products/${productId}`, { method: 'DELETE' });
        alert('Product deleted successfully');
        await loadProducts();
    } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product: ' + error.message);
    }
};

// Add Color Input
function addColorInput(colorData = null) {
    const container = document.getElementById('colorsContainer');
    const colorIndex = container.children.length;
    
    const colorRow = document.createElement('div');
    colorRow.className = 'color-input-row';
    colorRow.innerHTML = `
        <input type="text" class="form-input" placeholder="Color Name (e.g., Natural Black)" 
               value="${colorData?.name || ''}" data-field="name">
        <input type="color" class="form-input color-preview" 
               value="${colorData?.code || '#000000'}" data-field="code">
        <label style="display: flex; align-items: center; gap: 8px;">
            <input type="checkbox" ${colorData?.isAvailable !== false ? 'checked' : ''} data-field="available">
            Available
        </label>
        <button type="button" class="btn btn-sm btn-danger btn-icon" onclick="this.parentElement.remove()">
            <i class="fas fa-trash"></i>
        </button>
    `;
    
    container.appendChild(colorRow);
}

// Get Colors from Form
function getColorsFromForm() {
    const colorRows = document.querySelectorAll('#colorsContainer .color-input-row');
    const colors = [];
    
    colorRows.forEach(row => {
        const name = row.querySelector('[data-field="name"]').value.trim();
        const code = row.querySelector('[data-field="code"]').value;
        const isAvailable = row.querySelector('[data-field="available"]').checked;
        
        if (name) {
            colors.push({
                name,
                code,
                isAvailable
            });
        }
    });
    
    return colors;
}

// Handle Product Submit
async function handleProductSubmit(e) {
    e.preventDefault();
    
    const productData = {
        name: document.getElementById('productName').value,
        category: document.getElementById('productCategory').value,
        description: document.getElementById('productDescription').value,
        price: parseFloat(document.getElementById('productPrice').value),
        originalPrice: parseFloat(document.getElementById('productOriginalPrice').value) || null,
        stockQuantity: parseInt(document.getElementById('productStock').value),
        stock: parseInt(document.getElementById('productStock').value),
        colors: getColorsFromForm(),
        inStock: parseInt(document.getElementById('productStock').value) > 0
    };
    
    try {
        if (editingProductId) {
            // Update existing product
            await apiRequest(`/products/${editingProductId}`, {
                method: 'PUT',
                body: JSON.stringify(productData)
            });
            alert('Product updated successfully');
        } else {
            // Create new product
            await apiRequest('/products', {
                method: 'POST',
                body: JSON.stringify(productData)
            });
            alert('Product created successfully');
        }
        
        closeModal();
        await loadProducts();
    } catch (error) {
        console.error('Error saving product:', error);
        alert('Error saving product: ' + error.message);
    }
}

// Close Modal
function closeModal() {
    document.getElementById('productModal').classList.remove('active');
    editingProductId = null;
}

// Handle Search
function handleSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;
    
    let filtered = products;
    
    // Filter by search term
    if (searchTerm) {
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(searchTerm) ||
            (p.description && p.description.toLowerCase().includes(searchTerm))
        );
    }
    
    // Filter by category
    if (category) {
        filtered = filtered.filter(p => p.category === category);
    }
    
    renderProductsTable(filtered);
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProductsPage);
} else {
    initProductsPage();
}
