import { createSlice } from '@reduxjs/toolkit';

// Get cart from localStorage
const getCartFromStorage = () => {
  try {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error('Error parsing cart from localStorage:', error);
    return [];
  }
};

// Save cart to localStorage
const saveCartToStorage = (cartItems) => {
  try {
    localStorage.setItem('cart', JSON.stringify(cartItems));
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
};

// Cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.product === product._id
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
        };
        state.cartItems.push(cartItem);
      }

      // Recalculate totals
      const totals = calculateCartTotals(state.cartItems);
      Object.assign(state, totals);

      // Save to localStorage
      saveCartToStorage(state.cartItems);
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
      saveCartToStorage(state.cartItems);
    },

    updateCartItemQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.cartItems.find((item) => item.product === productId);

      if (item) {
        item.quantity = Math.min(Math.max(quantity, 1), item.stock);

        // Recalculate totals
        const totals = calculateCartTotals(state.cartItems);
        Object.assign(state, totals);

        // Save to localStorage
        saveCartToStorage(state.cartItems);
      }
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.itemsPrice = 0;
      state.taxPrice = 0;
      state.shippingPrice = 0;
      state.totalPrice = 0;

      // Clear localStorage
      localStorage.removeItem('cart');
    },

    getCartItems: (state) => {
      // This action is used to trigger recalculation when app loads
      const totals = calculateCartTotals(state.cartItems);
      Object.assign(state, totals);
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
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
  getCartItems,
  setLoading,
  setError,
  clearError,
} = cartSlice.actions;

export default cartSlice.reducer;