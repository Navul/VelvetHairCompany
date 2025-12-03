import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiX, FiShoppingCart } from 'react-icons/fi';
import { hideLoginModal } from '../../store/slices/cartSlice';

const LoginModal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showLoginModal: isOpen } = useSelector((state) => state.cart);

  const handleClose = () => {
    dispatch(hideLoginModal());
  };

  const handleLogin = () => {
    dispatch(hideLoginModal());
    navigate('/login');
  };

  const handleRegister = () => {
    dispatch(hideLoginModal());
    navigate('/register');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 animate-fadeIn"
        onClick={handleClose}
      ></div>

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div 
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 pointer-events-auto animate-scaleIn relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FiX size={24} />
          </button>

          {/* Icon */}
          <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
            <FiShoppingCart className="text-purple-600" size={32} />
          </div>

          {/* Content */}
          <h2 className="font-display text-2xl font-bold text-gray-900 text-center mb-4">
            Login Required
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Please login to add items to your cart and enjoy a personalized shopping experience.
          </p>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleLogin}
              className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Login to Continue
            </button>
            <button
              onClick={handleRegister}
              className="w-full py-3 px-6 border-2 border-purple-600 text-purple-600 font-semibold rounded-xl hover:bg-purple-50 transition-all duration-200"
            >
              Create New Account
            </button>
            <button
              onClick={handleClose}
              className="w-full py-3 px-6 text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Continue Browsing
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
