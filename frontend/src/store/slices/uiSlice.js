import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  // Modal states
  showLoginModal: false,
  showRegisterModal: false,
  showCartModal: false,
  showSearchModal: false,
  
  // Loading states
  pageLoading: false,
  
  // UI preferences
  theme: 'light',
  language: 'en',
  
  // Mobile menu
  showMobileMenu: false,
  
  // Filters
  showFilters: false,
  
  // Notifications
  notifications: [],
};

// UI slice
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Modal actions
    showLoginModal: (state) => {
      state.showLoginModal = true;
      state.showRegisterModal = false;
    },
    
    hideLoginModal: (state) => {
      state.showLoginModal = false;
    },
    
    showRegisterModal: (state) => {
      state.showRegisterModal = true;
      state.showLoginModal = false;
    },
    
    hideRegisterModal: (state) => {
      state.showRegisterModal = false;
    },
    
    toggleCartModal: (state) => {
      state.showCartModal = !state.showCartModal;
    },
    
    hideCartModal: (state) => {
      state.showCartModal = false;
    },
    
    toggleSearchModal: (state) => {
      state.showSearchModal = !state.showSearchModal;
    },
    
    hideSearchModal: (state) => {
      state.showSearchModal = false;
    },
    
    // Loading actions
    setPageLoading: (state, action) => {
      state.pageLoading = action.payload;
    },
    
    // Theme actions
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    
    // Language actions
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    
    // Mobile menu actions
    toggleMobileMenu: (state) => {
      state.showMobileMenu = !state.showMobileMenu;
    },
    
    hideMobileMenu: (state) => {
      state.showMobileMenu = false;
    },
    
    // Filter actions
    toggleFilters: (state) => {
      state.showFilters = !state.showFilters;
    },
    
    hideFilters: (state) => {
      state.showFilters = false;
    },
    
    // Notification actions
    addNotification: (state, action) => {
      const notification = {
        id: Date.now() + Math.random(),
        timestamp: Date.now(),
        ...action.payload,
      };
      state.notifications.unshift(notification);
      
      // Keep only last 10 notifications
      if (state.notifications.length > 10) {
        state.notifications = state.notifications.slice(0, 10);
      }
    },
    
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
    
    clearNotifications: (state) => {
      state.notifications = [];
    },
    
    // Mark notification as read
    markNotificationAsRead: (state, action) => {
      const notification = state.notifications.find(
        (n) => n.id === action.payload
      );
      if (notification) {
        notification.read = true;
      }
    },
    
    // Mark all notifications as read
    markAllNotificationsAsRead: (state) => {
      state.notifications.forEach((notification) => {
        notification.read = true;
      });
    },
  },
});

export const {
  // Modal actions
  showLoginModal,
  hideLoginModal,
  showRegisterModal,
  hideRegisterModal,
  toggleCartModal,
  hideCartModal,
  toggleSearchModal,
  hideSearchModal,
  
  // Loading actions
  setPageLoading,
  
  // Theme actions
  toggleTheme,
  setTheme,
  
  // Language actions
  setLanguage,
  
  // Mobile menu actions
  toggleMobileMenu,
  hideMobileMenu,
  
  // Filter actions
  toggleFilters,
  hideFilters,
  
  // Notification actions
  addNotification,
  removeNotification,
  clearNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} = uiSlice.actions;

export default uiSlice.reducer;