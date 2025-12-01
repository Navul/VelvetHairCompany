import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX, FiHeart } from 'react-icons/fi';
import { logout } from '../../store/slices/authSlice';
import { showMobileMenu, hideMobileMenu, toggleMobileMenu } from '../../store/slices/uiSlice';
import { BUSINESS_INFO, NAV_LINKS, PRICING } from '../../utils/constants';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { cartItems = [] } = useSelector((state) => state.cart);
  const { showMobileMenu } = useSelector((state) => state.ui);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setShowUserMenu(false);
    dispatch(hideMobileMenu());
  };

  const cartItemsCount = cartItems.reduce((total, item) => total + (item.quantity || 0), 0);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar */}
        <div className="hidden lg:flex justify-between items-center py-2 text-sm border-b border-gray-200">
          <div className="text-gray-600">
            Free shipping on orders over ${PRICING.freeShippingThreshold}
          </div>
          <div className="flex space-x-4">
            <Link to={NAV_LINKS.about} className="text-gray-600 hover:text-purple-600 transition-colors">
              About
            </Link>
            <Link to={NAV_LINKS.contact} className="text-gray-600 hover:text-purple-600 transition-colors">
              Contact
            </Link>
          </div>
        </div>

        {/* Main Header */}
        <div className="flex items-center justify-between py-3 sm:py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <img 
              src="/images/velvet-logo.png" 
              alt="Velvet Hair Wigs" 
              className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 object-contain"
            />
            <span className="font-display text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 hidden sm:block">
              Velvet Hair Wigs
            </span>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden xl:flex items-center space-x-6 lg:space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-purple-600 transition-colors font-medium text-sm lg:text-base"
            >
              Home
            </Link>
            <div className="relative group">
              <Link
                to="/products"
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium text-sm lg:text-base"
              >
                Products
              </Link>
              {/* Dropdown menu would go here */}
            </div>
            <Link
              to="/products?category=male-wigs"
              className="text-gray-700 hover:text-purple-600 transition-colors font-medium text-sm lg:text-base"
            >
              Men's Wigs
            </Link>
            <Link
              to="/products?category=female-wigs"
              className="text-gray-700 hover:text-purple-600 transition-colors font-medium text-sm lg:text-base"
            >
              Women's Wigs
            </Link>
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
            {/* Search - Hidden on very small screens */}
            <button className="hidden sm:block p-2 text-gray-600 hover:text-purple-600 transition-colors">
              <FiSearch size={20} />
            </button>

            {/* User Menu / Auth Buttons */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-1 sm:space-x-2 p-1 sm:p-2 text-gray-600 hover:text-purple-600 transition-colors"
                >
                  <FiUser size={20} />
                  <span className="hidden lg:block text-sm">
                    {user?.firstName}
                  </span>
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Orders
                    </Link>
                    <Link
                      to="/wishlist"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Wishlist
                    </Link>
                    {user?.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Wishlist - Hidden on small screens */}
            {isAuthenticated && (
              <Link
                to="/wishlist"
                className="hidden sm:block p-2 text-gray-600 hover:text-purple-600 transition-colors"
              >
                <FiHeart size={20} />
              </Link>
            )}

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-1 sm:p-2 text-gray-600 hover:text-purple-600 transition-colors"
            >
              <FiShoppingCart size={20} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center min-w-[16px] sm:min-w-[20px]">
                  {cartItemsCount > 99 ? '99+' : cartItemsCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => dispatch(toggleMobileMenu())}
              className="xl:hidden p-1 sm:p-2 text-gray-600 hover:text-purple-600 transition-colors ml-2"
            >
              {showMobileMenu ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="xl:hidden border-t border-gray-200 py-4 bg-white">
            <nav className="flex flex-col space-y-3">
              {/* Search for mobile */}
              <div className="sm:hidden px-2 pb-3 border-b border-gray-100">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <Link
                to="/"
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium px-2 py-1"
                onClick={() => dispatch(hideMobileMenu())}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium px-2 py-1"
                onClick={() => dispatch(hideMobileMenu())}
              >
                All Products
              </Link>
              <Link
                to="/products?category=male-wigs"
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium px-2 py-1"
                onClick={() => dispatch(hideMobileMenu())}
              >
                Men's Wigs
              </Link>
              <Link
                to="/products?category=female-wigs"
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium px-2 py-1"
                onClick={() => dispatch(hideMobileMenu())}
              >
                Women's Wigs
              </Link>

              {/* Wishlist for mobile when authenticated */}
              {isAuthenticated && (
                <Link
                  to="/wishlist"
                  className="sm:hidden text-gray-700 hover:text-purple-600 transition-colors font-medium px-2 py-1 flex items-center space-x-2"
                  onClick={() => dispatch(hideMobileMenu())}
                >
                  <FiHeart size={18} />
                  <span>Wishlist</span>
                </Link>
              )}
              
              {!isAuthenticated && (
                <div className="flex flex-col space-y-3 pt-3 border-t border-gray-200">
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-purple-600 transition-colors font-medium px-2 py-2 text-center border border-gray-300 rounded-lg"
                    onClick={() => dispatch(hideMobileMenu())}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg transition-all font-medium px-2 py-2 text-center rounded-lg"
                    onClick={() => dispatch(hideMobileMenu())}
                  >
                    Register
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;