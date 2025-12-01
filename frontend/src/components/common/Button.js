import React from 'react';
import './Button.css';

/**
 * Premium Button Component - Velvet Hair Wigs
 * Supports multiple variants, sizes, and states with smooth animations
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  leftIcon = null,
  rightIcon = null,
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  const buttonClasses = [
    'velvet-btn',
    `velvet-btn--${variant}`,
    `velvet-btn--${size}`,
    fullWidth && 'velvet-btn--full',
    disabled && 'velvet-btn--disabled',
    loading && 'velvet-btn--loading',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="velvet-btn__spinner">
          <svg className="velvet-btn__spinner-icon" viewBox="0 0 24 24">
            <circle
              className="velvet-btn__spinner-circle"
              cx="12"
              cy="12"
              r="10"
              fill="none"
              strokeWidth="3"
            />
          </svg>
        </span>
      )}
      
      {!loading && leftIcon && (
        <span className="velvet-btn__icon velvet-btn__icon--left">
          {leftIcon}
        </span>
      )}
      
      <span className="velvet-btn__text">{children}</span>
      
      {!loading && rightIcon && (
        <span className="velvet-btn__icon velvet-btn__icon--right">
          {rightIcon}
        </span>
      )}
    </button>
  );
};

export default Button;
