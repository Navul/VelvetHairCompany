import React from 'react';

// Responsive Container Component
export const ResponsiveContainer = ({ 
  children, 
  className = '', 
  maxWidth = '7xl',
  padding = 'default' 
}) => {
  const paddingClasses = {
    none: '',
    sm: 'px-4 xs:px-6',
    default: 'px-4 xs:px-6 sm:px-8',
    lg: 'px-4 xs:px-6 sm:px-8 lg:px-12'
  };

  return (
    <div className={`max-w-${maxWidth} mx-auto ${paddingClasses[padding]} ${className}`}>
      {children}
    </div>
  );
};

// Responsive Section Component
export const ResponsiveSection = ({ 
  children, 
  className = '', 
  padding = 'default',
  background = 'transparent'
}) => {
  const paddingClasses = {
    sm: 'py-8 sm:py-12',
    default: 'py-12 sm:py-16 lg:py-20',
    lg: 'py-16 sm:py-20 lg:py-24'
  };

  const backgroundClasses = {
    transparent: '',
    gray: 'bg-gray-50',
    white: 'bg-white',
    gradient: 'bg-gradient-to-r from-purple-600 to-pink-600'
  };

  return (
    <section className={`${paddingClasses[padding]} ${backgroundClasses[background]} ${className}`}>
      {children}
    </section>
  );
};

// Responsive Grid Component
export const ResponsiveGrid = ({ 
  children, 
  className = '', 
  cols = '1 xs:2 lg:4',
  gap = 'default' 
}) => {
  const gapClasses = {
    sm: 'gap-3 sm:gap-4',
    default: 'gap-4 sm:gap-6',
    lg: 'gap-6 sm:gap-8'
  };

  return (
    <div className={`grid grid-cols-${cols} ${gapClasses[gap]} ${className}`}>
      {children}
    </div>
  );
};

// Responsive Text Component
export const ResponsiveText = ({ 
  children, 
  as: Component = 'p',
  variant = 'body',
  className = '' 
}) => {
  const variants = {
    h1: 'text-2xl xs:text-3xl sm:text-4xl lg:text-6xl font-display font-bold leading-tight',
    h2: 'text-2xl sm:text-3xl lg:text-4xl font-display font-bold',
    h3: 'text-lg sm:text-xl font-semibold',
    h4: 'text-base sm:text-lg font-semibold',
    body: 'text-sm sm:text-base leading-relaxed',
    bodyLg: 'text-base sm:text-lg lg:text-xl leading-relaxed',
    caption: 'text-xs sm:text-sm',
    small: 'text-xs sm:text-sm text-gray-500',
    link: 'text-xs sm:text-sm hover:text-purple-600 transition-colors duration-200'
  };

  return (
    <Component className={`${variants[variant]} ${className}`}>
      {children}
    </Component>
  );
};

// Responsive Button Component
export const ResponsiveButton = ({ 
  children, 
  variant = 'primary',
  size = 'default',
  className = '',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold transition-colors duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800',
    secondary: 'bg-white text-purple-600 border border-purple-600 hover:bg-purple-50',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
    ghost: 'text-purple-600 hover:bg-purple-50'
  };

  const sizes = {
    sm: 'px-3 sm:px-4 py-2 text-xs sm:text-sm',
    default: 'px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base',
    lg: 'px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base'
  };

  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Responsive Card Component
export const ResponsiveCard = ({ 
  children, 
  className = '',
  padding = 'default',
  hover = false 
}) => {
  const paddingClasses = {
    sm: 'p-3 sm:p-4',
    default: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8'
  };

  const hoverClasses = hover ? 'hover:shadow-lg hover:-translate-y-1 transition-all duration-200' : '';

  return (
    <div className={`bg-white rounded-lg shadow-sm ${paddingClasses[padding]} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
};

// Responsive Icon Component
export const ResponsiveIcon = ({ 
  icon: IconComponent, 
  size = 'default',
  className = '' 
}) => {
  const sizes = {
    sm: 'w-4 h-4 sm:w-5 sm:h-5',
    default: 'w-5 h-5 sm:w-6 sm:h-6',
    lg: 'w-6 h-6 sm:w-8 sm:h-8',
    xl: 'w-7 h-7 sm:w-8 sm:h-8'
  };

  return (
    <div className={`${sizes[size]} flex items-center justify-center`}>
      <IconComponent className={`w-full h-full ${className}`} />
    </div>
  );
};

// Responsive Flex Component
export const ResponsiveFlex = ({ 
  children, 
  direction = 'col xs:row',
  align = 'center',
  justify = 'center',
  gap = 'default',
  className = '' 
}) => {
  const gapClasses = {
    sm: 'gap-2 xs:gap-3',
    default: 'gap-3 xs:gap-4',
    lg: 'gap-4 xs:gap-6'
  };

  return (
    <div className={`flex flex-${direction} items-${align} justify-${justify} ${gapClasses[gap]} ${className}`}>
      {children}
    </div>
  );
};