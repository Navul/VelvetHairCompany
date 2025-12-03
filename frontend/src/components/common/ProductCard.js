import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, showLoginModal } from '../../store/slices/cartSlice';
import Button from './Button';
import { ColorSwatchGroup } from './ColorSwatch';
import './ProductCard.css';

/**
 * Premium Product Card - Velvet Hair Wigs
 * Features: Image hover effects, quick view, add to cart, wishlist
 */
const ProductCard = ({
  product,
  featured = false,
  className = ''
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [showColorError, setShowColorError] = useState(false);

  const {
    _id,
    name,
    price,
    originalPrice,
    images = [],
    category,
    rating = 0,
    reviewCount = 0,
    inStock = true,
    badge = null,
    stock = 100, // Default stock if not provided
    colors = [] // Hair color options
  } = product;

  // Auto-select color if only one is available
  React.useEffect(() => {
    if (colors.length === 1 && colors[0].isAvailable) {
      setSelectedColor(colors[0]);
    }
  }, [colors]);

  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    
    // Check if user is logged in
    if (!isAuthenticated) {
      dispatch(showLoginModal());
      return;
    }

    // Check if color is selected (if product has multiple colors)
    if (colors.length > 1 && !selectedColor) {
      setShowColorError(true);
      setTimeout(() => setShowColorError(false), 3000);
      return;
    }
    
    // Create a properly structured product object for the cart
    const productForCart = {
      _id,
      name,
      price,
      finalPrice: price, // Use current price as final price
      images: images.map(img => ({ url: img })), // Convert string URLs to objects if needed
      stock: stock,
      inStock
    };
    
    dispatch(addToCart({ 
      product: productForCart, 
      quantity: 1,
      userId: user?._id,
      selectedColor: selectedColor // Include selected color
    }));

    // Reset color error if shown
    setShowColorError(false);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setShowColorError(false);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    // TODO: Implement wishlist API
  };

  const handleViewProduct = () => {
    navigate(`/products/${_id}`);
  };

  const cardClasses = [
    'product-card',
    featured && 'product-card--featured',
    !inStock && 'product-card--out-of-stock',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} onClick={handleViewProduct}>
      {/* Image Container */}
      <div className="product-card__image-wrapper">
        {/* Badges */}
        {badge && (
          <span className={`product-card__badge product-card__badge--${badge.toLowerCase()}`}>
            {badge}
          </span>
        )}
        
        {discount > 0 && (
          <span className="product-card__badge product-card__badge--discount">
            -{discount}%
          </span>
        )}

        {/* Main Image */}
        <div className="product-card__image-container">
          <img
            src={images[0] || '/placeholder-wig.jpg'}
            alt={name}
            className={`product-card__image ${imageLoaded ? 'product-card__image--loaded' : ''}`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          
          {/* Hover Image */}
          {images[1] && (
            <img
              src={images[1]}
              alt={`${name} alternate view`}
              className="product-card__image product-card__image--hover"
              loading="lazy"
            />
          )}

          {/* Out of Stock Overlay */}
          {!inStock && (
            <div className="product-card__overlay">
              <span className="product-card__out-of-stock-text">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="product-card__actions">
          <button
            className={`product-card__action-btn ${isWishlisted ? 'product-card__action-btn--active' : ''}`}
            onClick={handleWishlist}
            aria-label="Add to wishlist"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill={isWishlisted ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>

          <button
            className="product-card__action-btn"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/products/${_id}`);
            }}
            aria-label="Quick view"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>
        </div>

        {/* Add to Cart Button */}
        {inStock && (
          <div className="product-card__cart-action">
            <Button
              variant="primary"
              size="sm"
              fullWidth
              onClick={handleAddToCart}
              leftIcon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
              }
            >
              Add to Cart
            </Button>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="product-card__content">
        {/* Category */}
        <span className="product-card__category">{category}</span>

        {/* Product Name */}
        <h3 className="product-card__title">{name}</h3>

        {/* Rating */}
        {rating > 0 && (
          <div className="product-card__rating">
            <div className="product-card__stars">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className={`product-card__star ${index < Math.floor(rating) ? 'product-card__star--filled' : ''}`}
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill={index < Math.floor(rating) ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
            <span className="product-card__review-count">({reviewCount})</span>
          </div>
        )}

        {/* Color Selection */}
        {colors.length > 0 && (
          <div className="product-card__colors" onClick={(e) => e.stopPropagation()}>
            <ColorSwatchGroup
              colors={colors}
              selectedColor={selectedColor}
              onColorSelect={handleColorSelect}
              showLabel={false}
              size={18}
            />
            {showColorError && (
              <p className="text-xs text-red-600 mt-1 animate-fadeIn">
                Please select a color
              </p>
            )}
          </div>
        )}

        {/* Price */}
        <div className="product-card__price-wrapper">
          <span className="product-card__price">${price.toFixed(2)}</span>
          {originalPrice && (
            <span className="product-card__original-price">${originalPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
