import { createSlice } from '@reduxjs/toolkit';

// Get cart key based on user ID
const getCartKey = (userId) => {
  return userId ? `cart_${userId}` : 'cart_guest';
};

// Get cart from localStorage
const getCartFromStorage = (userId = null) => {
  try {
    const cartKey = getCartKey(userId);
    const cart = localStorage.getItem(cartKey);
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error('Error parsing cart from localStorage:', error);
    return [];
  }
};

// Save cart to localStorage
const saveCartToStorage = (cartItems, userId = null) => {
  try {
    const cartKey = getCartKey(userId);
    localStorage.setItem(cartKey, JSON.stringify(cartItems));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

// Calculate cart totals
const calculateCartTotals = (cartItems) => {
  const itemsPrice = cartItems.reduce(
    (total, item) => total + (item.finalPrice || item.price) * item.quantity,
    0
  );
  
  const taxPrice = Math.round(itemsPrice * 0.08 * 100) / 100; // 8% tax
  const shippingPrice = itemsPrice > 100 ? 0 : 10; // Free shipping over $100
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  return {
    itemsPrice: Math.round(itemsPrice * 100) / 100,
    taxPrice,
    shippingPrice,
    totalPrice: Math.round(totalPrice * 100) / 100,
  };
};

// Initial state
const initialState = {
  cartItems: getCartFromStorage(),
  ...calculateCartTotals(getCartFromStorage()),
  loading: false,
  error: null,
  userId: null,
  showLoginModal: false,
  toastMessage: '',
  showToast: false,
};

// Cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
      // Load cart for this user
      if (action.payload) {
        state.cartItems = getCartFromStorage(action.payload);
        const totals = calculateCartTotals(state.cartItems);
        Object.assign(state, totals);
      }
    },

    addToCart: (state, action) => {
      const { product, quantity = 1, userId, selectedColor } = action.payload;
      
      // Check if item with same product AND color already exists
      const existingItem = state.cartItems.find(
        (item) => item.product === product._id && 
                  item.color?.name === selectedColor?.name
      );

      if (existingItem) {
        existingItem.quantity += quantity;
        if (existingItem.quantity > product.stock) {
          existingItem.quantity = product.stock;
        }
      } else {
        const cartItem = {
          product: product._id,
          name: product.name,
          price: product.price,
          finalPrice: product.finalPrice || product.price,
          image: product.images[0]?.url || '/placeholder-image.jpg',
          stock: product.stock,
          quantity: Math.min(quantity, product.stock),
          color: selectedColor ? { 
            name: selectedColor.name, 
            code: selectedColor.code 
          } : null
        };
        state.cartItems.push(cartItem);
      }

      // Recalculate totals
      const totals = calculateCartTotals(state.cartItems);
      Object.assign(state, totals);

      // Save to localStorage with user ID
      saveCartToStorage(state.cartItems, userId || state.userId);

      // Show toast notification
      state.showToast = true;
      const colorText = selectedColor ? ` (${selectedColor.name})` : '';
      state.toastMessage = `${product.name}${colorText} added to cart!`;
    },

    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item.product !== productId
      );

      // Recalculate totals
      const totals = calculateCartTotals(state.cartItems);
      Object.assign(state, totals);

      // Save to localStorage
      saveCartToStorage(state.cartItems, state.userId);
    },

    updateCartItemQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.cartItems.find((item) => item.product === productId);
      
      if (item) {
        item.quantity = Math.min(Math.max(1, quantity), item.stock);
        
        // Recalculate totals
        const totals = calculateCartTotals(state.cartItems);
        Object.assign(state, totals);

        // Save to localStorage
        saveCartToStorage(state.cartItems, state.userId);
      }
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.itemsPrice = 0;
      state.taxPrice = 0;
      state.shippingPrice = 0;
      state.totalPrice = 0;

      // Clear localStorage
      const cartKey = getCartKey(state.userId);
      localStorage.removeItem(cartKey);
    },

    getCartItems: (state) => {
      // This action is used to trigger recalculation when app loads
      const totals = calculateCartTotals(state.cartItems);
      Object.assign(state, totals);
    },

    showLoginModal: (state) => {
      state.showLoginModal = true;
    },

    hideLoginModal: (state) => {
      state.showLoginModal = false;
    },

    hideToast: (state) => {
      state.showToast = false;
      state.toastMessage = '';
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setUserId,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
  getCartItems,
  showLoginModal,
  hideLoginModal,
  hideToast,
  setLoading,
  setError,
  clearError,
} = cartSlice.actions;

export default cartSlice.reducer;