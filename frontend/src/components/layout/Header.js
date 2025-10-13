import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX, FiHeart } from 'react-icons/fi';
import { logout } from '../../store/slices/authSlice';
import { toggleMobileMenu, hideMobileMenu } from '../../store/slices/uiSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const { showMobileMenu } = useSelector((state) => state.ui);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setShowUserMenu(false);
    dispatch(hideMobileMenu());
  };

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="hidden md:flex justify-between items-center py-2 text-sm border-b border-gray-200">
          <div className="text-gray-600">
            Free shipping on orders over $100
          </div>
          <div className="flex space-x-4">
            <Link to="/about" className="text-gray-600 hover:text-purple-600 transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-purple-600 transition-colors">
              Contact
            </Link>
          </div>
        </div>

        {/* Main Header */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            <span className="font-display text-2xl font-bold text-gray-900">
              Velvet Hair
            </span>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
            >
              Home
            </Link>
            <div className="relative group">
              <Link
                to="/products"
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
              >
                Products
              </Link>
              {/* Dropdown menu would go here */}
            </div>
            <Link
              to="/products?category=male-wigs"
              className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
            >
              Men's Wigs
            </Link>
            <Link
              to="/products?category=female-wigs"
              className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
            >
              Women's Wigs
            </Link>
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button className="p-2 text-gray-600 hover:text-purple-600 transition-colors">
              <FiSearch size={20} />
            </button>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-2 text-gray-600 hover:text-purple-600 transition-colors"
                >
                  <FiUser size={20} />
                  <span className="hidden md:block text-sm">
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
              <div className="hidden md:flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  Login
                </Link>
                <span className="text-gray-400">/</span>
                <Link
                  to="/register"
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Wishlist */}
            {isAuthenticated && (
              <Link
                to="/wishlist"
                className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
              >
                <FiHeart size={20} />
              </Link>
            )}

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-600 hover:text-purple-600 transition-colors"
            >
              <FiShoppingCart size={20} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => dispatch(toggleMobileMenu())}
              className="lg:hidden p-2 text-gray-600 hover:text-purple-600 transition-colors"
            >
              {showMobileMenu ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
                onClick={() => dispatch(hideMobileMenu())}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
                onClick={() => dispatch(hideMobileMenu())}
              >
                All Products
              </Link>
              <Link
                to="/products?category=male-wigs"
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
                onClick={() => dispatch(hideMobileMenu())}
              >
                Men's Wigs
              </Link>
              <Link
                to="/products?category=female-wigs"
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
                onClick={() => dispatch(hideMobileMenu())}
              >
                Women's Wigs
              </Link>
              
              {!isAuthenticated && (
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
                    onClick={() => dispatch(hideMobileMenu())}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
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