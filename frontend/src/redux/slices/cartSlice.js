import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  isCartOpen: false
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item._id === newItem._id);

      if (existingItem) {
        existingItem.quantity += newItem.quantity || 1;
      } else {
        state.items.push({
          ...newItem,
          quantity: newItem.quantity || 1
        });
      }

      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalAmount = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);

      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state.items));
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(item => item._id !== id);

      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalAmount = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);

      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state.items));
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find(item => item._id === id);

      if (existingItem) {
        existingItem.quantity = quantity;

        if (existingItem.quantity <= 0) {
          state.items = state.items.filter(item => item._id !== id);
        }
      }

      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalAmount = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);

      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state.items));
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;

      // Clear localStorage
      localStorage.removeItem('cart');
    },

    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },

    setCartOpen: (state, action) => {
      state.isCartOpen = action.payload;
    },

    loadCartFromStorage: (state) => {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          state.items = JSON.parse(savedCart);
          state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
          state.totalAmount = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        } catch (error) {
          console.error('Error loading cart from localStorage:', error);
        }
      }
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
  setCartOpen,
  loadCartFromStorage
} = cartSlice.actions;

export default cartSlice.reducer;
