import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiArrowRight, FiTag } from 'react-icons/fi';
import { removeFromCart, updateCartItemQuantity, clearCart } from '../store/slices/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, itemsPrice, taxPrice, shippingPrice, totalPrice } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);
  
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity >= 1) {
      dispatch(updateCartItemQuantity({ productId, quantity: newQuantity }));
    }
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch(clearCart());
    }
  };

  const handleApplyCoupon = () => {
    // Mock coupon validation
    if (couponCode.toUpperCase() === 'VELVET10') {
      setAppliedCoupon({ code: 'VELVET10', discount: 10 });
    } else if (couponCode.toUpperCase() === 'FIRST20') {
      setAppliedCoupon({ code: 'FIRST20', discount: 20 });
    } else {
      alert('Invalid coupon code');
    }
  };

  const handleCheckout = () => {
    if (isAuthenticated) {
      navigate('/checkout');
    } else {
      navigate('/login', { state: { from: '/checkout' } });
    }
  };

  const finalTotal = appliedCoupon 
    ? totalPrice - (totalPrice * appliedCoupon.discount / 100)
    : totalPrice;

  // Empty cart state
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-lg p-12">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                <FiShoppingBag className="text-purple-600" size={48} />
              </div>
              <h1 className="font-display text-3xl font-bold text-gray-900 mb-4">
                Your Cart is Empty
              </h1>
              <p className="text-gray-600 mb-8">
                Looks like you haven't added any items to your cart yet. Start shopping to find your perfect wig!
              </p>
              <Link
                to="/products"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              >
                <FiShoppingBag size={20} />
                <span>Start Shopping</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Shopping Cart
          </h1>
          <p className="text-gray-600">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Clear Cart Button */}
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="font-semibold text-gray-900">Cart Items</h2>
                <button
                  onClick={handleClearCart}
                  className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
                >
                  Clear Cart
                </button>
              </div>

              {/* Cart Items List */}
              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div key={item.product} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full sm:w-32 h-32 object-cover rounded-lg"
                          onError={(e) => {
                            e.target.src = '/placeholder-wig.jpg';
                          }}
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-grow">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">
                              {item.name}
                            </h3>
                            
                            {/* Display Color if available */}
                            {item.color && (
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-sm text-gray-600">Color:</span>
                                <div className="flex items-center gap-1.5">
                                  <div 
                                    className="w-5 h-5 rounded-full border border-gray-300"
                                    style={{ backgroundColor: item.color.code }}
                                    title={item.color.name}
                                  />
                                  <span className="text-sm font-medium text-gray-800">
                                    {item.color.name}
                                  </span>
                                </div>
                              </div>
                            )}
                            
                            <p className="text-sm text-gray-600">
                              In Stock: {item.stock}
                            </p>
                          </div>
                          <button
                            onClick={() => handleRemoveItem(item.product)}
                            className="text-red-500 hover:text-red-700 transition-colors p-2"
                            aria-label="Remove item"
                          >
                            <FiTrash2 size={20} />
                          </button>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-3">
                            <span className="text-sm text-gray-600">Quantity:</span>
                            <div className="flex items-center border border-gray-300 rounded-lg">
                              <button
                                onClick={() => handleUpdateQuantity(item.product, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                              >
                                <FiMinus size={16} />
                              </button>
                              <span className="px-4 py-2 font-semibold min-w-[3rem] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleUpdateQuantity(item.product, item.quantity + 1)}
                                disabled={item.quantity >= item.stock}
                                className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                              >
                                <FiPlus size={16} />
                              </button>
                            </div>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <p className="text-lg font-bold text-purple-600">
                              ${(item.finalPrice * item.quantity).toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-500">
                              ${item.finalPrice.toFixed(2)} each
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Continue Shopping */}
            <div className="mt-6">
              <Link
                to="/products"
                className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium transition-colors"
              >
                <span>← Continue Shopping</span>
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 className="font-display text-xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              {/* Coupon Code */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Coupon Code
                </label>
                <div className="flex space-x-2">
                  <div className="relative flex-grow">
                    <FiTag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter code"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <button
                    onClick={handleApplyCoupon}
                    className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                  >
                    Apply
                  </button>
                </div>
                {appliedCoupon && (
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-green-600 font-medium">
                      {appliedCoupon.code} applied ({appliedCoupon.discount}% off)
                    </span>
                    <button
                      onClick={() => setAppliedCoupon(null)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">${itemsPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-medium">
                    {shippingPrice === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `$${shippingPrice.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (8%)</span>
                  <span className="font-medium">${taxPrice.toFixed(2)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({appliedCoupon.discount}%)</span>
                    <span className="font-medium">
                      -${((totalPrice * appliedCoupon.discount) / 100).toFixed(2)}
                    </span>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="flex justify-between items-center py-6 border-b border-gray-200">
                <span className="text-lg font-semibold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-purple-600">
                  ${finalTotal.toFixed(2)}
                </span>
              </div>

              {/* Free Shipping Progress */}
              {shippingPrice > 0 && (
                <div className="mt-6 mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Add ${(100 - itemsPrice).toFixed(2)} more for FREE shipping</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((itemsPrice / 100) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <span>Proceed to Checkout</span>
                <FiArrowRight size={20} />
              </button>

              {/* Security Badges */}
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500 mb-2">Secure Checkout</p>
                <div className="flex justify-center space-x-4 text-gray-400">
                  <span className="text-xs">🔒 SSL Encrypted</span>
                  <span className="text-xs">✓ Safe Payment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;