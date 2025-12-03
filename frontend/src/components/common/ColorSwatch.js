import React, { useState } from 'react';

/**
 * ColorSwatch Component
 * Displays a circular color swatch with hover effects and tooltip
 * Used for hair color selection on product cards
 */
const ColorSwatch = ({ 
  color, 
  isSelected, 
  onClick, 
  size = 18 
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = () => {
    if (color.isAvailable && onClick) {
      onClick(color);
    }
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Color Circle */}
      <button
        type="button"
        onClick={handleClick}
        disabled={!color.isAvailable}
        className={`
          relative rounded-full transition-all duration-200 ease-in-out
          ${color.isAvailable ? 'cursor-pointer hover:scale-110' : 'cursor-not-allowed opacity-50'}
          ${isSelected ? 'ring-2 ring-[#4B2142] ring-offset-2 scale-110' : ''}
        `}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: color.code,
          border: '1px solid #ccc'
        }}
        aria-label={`Select ${color.name} color`}
      >
        {/* Diagonal slash for unavailable colors */}
        {!color.isAvailable && (
          <div 
            className="absolute inset-0 flex items-center justify-center"
            style={{
              borderRadius: '50%',
              overflow: 'hidden'
            }}
          >
            <div 
              className="absolute bg-gray-400"
              style={{
                width: '1px',
                height: '140%',
                transform: 'rotate(45deg)',
                transformOrigin: 'center'
              }}
            />
          </div>
        )}

        {/* Checkmark for selected color */}
        {isSelected && color.isAvailable && (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg 
              className="w-3 h-3 text-white drop-shadow-md" 
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="3" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        )}
      </button>

      {/* Tooltip */}
      {showTooltip && (
        <div 
          className="absolute z-10 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-md shadow-lg pointer-events-none whitespace-nowrap animate-fadeIn"
          style={{
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginBottom: '6px'
          }}
        >
          {color.name}
          {!color.isAvailable && (
            <span className="ml-1 text-gray-400">(Out of Stock)</span>
          )}
          {/* Tooltip arrow */}
          <div 
            className="absolute bg-gray-900"
            style={{
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '0',
              height: '0',
              borderLeft: '4px solid transparent',
              borderRight: '4px solid transparent',
              borderTop: '4px solid #111827'
            }}
          />
        </div>
      )}
    </div>
  );
};

/**
 * ColorSwatchGroup Component
 * Displays a group of color swatches with label
 */
export const ColorSwatchGroup = ({ 
  colors, 
  selectedColor, 
  onColorSelect, 
  label = 'Select Color',
  size = 18,
  showLabel = true 
}) => {
  return (
    <div className="color-swatch-group">
      {showLabel && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {selectedColor && (
            <span className="ml-2 text-[#4B2142] font-semibold">
              {selectedColor.name}
            </span>
          )}
        </label>
      )}
      
      <div className="flex items-center gap-2 flex-wrap">
        {colors.map((color, index) => (
          <ColorSwatch
            key={index}
            color={color}
            isSelected={selectedColor?.name === color.name}
            onClick={onColorSelect}
            size={size}
          />
        ))}
      </div>

      {!selectedColor && colors.length > 1 && (
        <p className="text-xs text-gray-500 mt-1">
          Please select a color
        </p>
      )}
    </div>
  );
};

export default ColorSwatch;
