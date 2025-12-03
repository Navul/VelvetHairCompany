import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiCheckCircle, FiX } from 'react-icons/fi';
import { hideToast } from '../../store/slices/cartSlice';

const CartToast = () => {
  const dispatch = useDispatch();
  const { showToast, toastMessage } = useSelector((state) => state.cart);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        dispatch(hideToast());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showToast, dispatch]);

  if (!showToast) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50 animate-slideInRight">
      <div className="bg-green-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center space-x-3 min-w-[300px]">
        <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
          <FiCheckCircle size={20} />
        </div>
        <p className="font-medium flex-1">{toastMessage}</p>
        <button
          onClick={() => dispatch(hideToast())}
          className="flex-shrink-0 hover:bg-white/20 p-1 rounded transition-colors"
        >
          <FiX size={18} />
        </button>
      </div>
    </div>
  );
};

export default CartToast;
