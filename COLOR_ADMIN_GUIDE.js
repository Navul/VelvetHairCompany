/**
 * ADMIN GUIDE: Adding Hair Colors to Products
 * 
 * This file shows examples of how to add color options to wig products.
 * Copy the colors array pattern and customize for your products.
 */

// ============================================
// EXAMPLE 1: Natural Hair Colors (Most Common)
// ============================================
const exampleNaturalWig = {
  _id: 'prod_example_001',
  name: 'Example Natural Wig',
  // ... other product fields ...
  colors: [
    { name: 'Natural Black', code: '#1A1A1A', isAvailable: true },
    { name: 'Dark Brown', code: '#3D2817', isAvailable: true },
    { name: 'Medium Brown', code: '#5C4033', isAvailable: true },
    { name: 'Light Brown', code: '#8B7355', isAvailable: true },
    { name: 'Honey Blonde', code: '#D8A641', isAvailable: false } // Out of stock
  ]
};

// ============================================
// EXAMPLE 2: Fashion Colors (Bold & Trendy)
// ============================================
const exampleFashionWig = {
  _id: 'prod_example_002',
  name: 'Example Fashion Wig',
  // ... other product fields ...
  colors: [
    { name: 'Burgundy Wine', code: '#7C2529', isAvailable: true },
    { name: 'Copper Red', code: '#CD5B45', isAvailable: true },
    { name: 'Auburn', code: '#A0522D', isAvailable: true },
    { name: 'Rose Gold Pink', code: '#E0B0B0', isAvailable: true }
  ]
};

// ============================================
// EXAMPLE 3: Blonde Varieties
// ============================================
const exampleBlondeWig = {
  _id: 'prod_example_003',
  name: 'Example Blonde Wig',
  // ... other product fields ...
  colors: [
    { name: 'Honey Blonde', code: '#D8A641', isAvailable: true },
    { name: 'Ash Blonde', code: '#B8A68C', isAvailable: true },
    { name: 'Platinum Blonde', code: '#E8E4D0', isAvailable: true },
    { name: 'Silver Blonde', code: '#C0C0C0', isAvailable: true },
    { name: 'Beige Blonde', code: '#D4C9B0', isAvailable: false }
  ]
};

// ============================================
// EXAMPLE 4: Single Color Product (Pre-colored)
// ============================================
const examplePrecoloredWig = {
  _id: 'prod_example_004',
  name: 'Example Pre-colored Wig',
  // ... other product fields ...
  colors: [
    { name: 'Ombre Honey Blonde', code: '#D8A641', isAvailable: true }
  ]
  // Note: Single color will be auto-selected for customers
};

// ============================================
// EXAMPLE 5: Limited Edition Colors
// ============================================
const exampleLimitedEditionWig = {
  _id: 'prod_example_005',
  name: 'Example Limited Edition Wig',
  // ... other product fields ...
  colors: [
    { name: 'Metallic Silver', code: '#C0C0C0', isAvailable: true },
    { name: 'Lavender Dream', code: '#E6E6FA', isAvailable: true },
    { name: 'Mint Green', code: '#98D8C8', isAvailable: false },
    { name: 'Pastel Blue', code: '#AEC6CF', isAvailable: false }
  ]
};

// ============================================
// COLOR PALETTE REFERENCE
// ============================================

/**
 * NATURAL BLACK SHADES
 */
const naturalBlackShades = {
  'Jet Black': '#000000',
  'Natural Black': '#1A1A1A',
  'Soft Black': '#2B2B2B'
};

/**
 * BROWN SHADES
 */
const brownShades = {
  'Darkest Brown': '#2C1810',
  'Dark Brown': '#3D2817',
  'Espresso Brown': '#3E2723',
  'Medium Brown': '#5C4033',
  'Chestnut Brown': '#8B5A2B',
  'Light Brown': '#8B7355',
  'Caramel Brown': '#C68E59',
  'Mocha': '#6F4E37'
};

/**
 * BLONDE SHADES
 */
const blondeShades = {
  'Golden Blonde': '#F4C542',
  'Honey Blonde': '#D8A641',
  'Sandy Blonde': '#E8D7B7',
  'Ash Blonde': '#B8A68C',
  'Platinum Blonde': '#E8E4D0',
  'Silver Blonde': '#C0C0C0',
  'Beige Blonde': '#D4C9B0',
  'Champagne Blonde': '#F7E7CE',
  'Butter Blonde': '#FAE5A2'
};

/**
 * RED SHADES
 */
const redShades = {
  'Burgundy Wine': '#7C2529',
  'Cherry Red': '#DE3163',
  'Copper Red': '#CD5B45',
  'Auburn': '#A0522D',
  'Mahogany': '#C04000',
  'Fire Red': '#CE2029'
};

/**
 * FASHION/PASTEL COLORS
 */
const fashionColors = {
  'Rose Gold Pink': '#E0B0B0',
  'Pastel Pink': '#F4C2C2',
  'Lavender': '#E6E6FA',
  'Mint Green': '#98D8C8',
  'Pastel Blue': '#AEC6CF',
  'Peach': '#FFE5B4',
  'Lilac': '#C8A2C8',
  'Coral': '#FF7F50'
};

/**
 * HIGHLIGHT/OMBRE COMBINATIONS
 */
const specialEffects = {
  'Ombre Honey Blonde': '#D8A641',      // Represents the end color
  'Balayage Ash Blonde': '#B8A68C',     // Represents the highlight color
  'Highlighted Caramel': '#C68E59',     // Represents the highlight shade
  'Two-tone Burgundy': '#7C2529'        // Represents the vibrant color
};

// ============================================
// STEP-BY-STEP: ADDING COLORS TO YOUR PRODUCT
// ============================================

/**
 * STEP 1: Open the product data file
 * Location: frontend/src/data/sampleProducts.js
 */

/**
 * STEP 2: Find your product in the array
 * Search for the product by _id or name
 */

/**
 * STEP 3: Add the colors array after the features array
 * Format:
 */
const productWithColors = {
  // ... existing product fields ...
  features: [
    'Feature 1',
    'Feature 2',
    'Feature 3'
  ],
  colors: [  // <-- ADD THIS
    { name: 'Color Name', code: '#HEXCODE', isAvailable: true },
    { name: 'Color Name', code: '#HEXCODE', isAvailable: true }
  ]
};

/**
 * STEP 4: Choose appropriate colors
 * - Natural wigs: blacks, browns, blondes
 * - Fashion wigs: reds, pinks, unusual colors
 * - Pre-colored wigs: single color entry
 * - Versatile wigs: 4-6 color options
 */

/**
 * STEP 5: Set availability
 * - isAvailable: true → Color is in stock
 * - isAvailable: false → Color shows as unavailable (with slash)
 */

/**
 * STEP 6: Save and test
 * - Restart the development server
 * - Navigate to the product
 * - Verify colors display correctly
 * - Test add-to-cart functionality
 */

// ============================================
// COMMON MISTAKES TO AVOID
// ============================================

/**
 * ❌ WRONG: Missing comma after colors array
 */
const wrongExample1 = {
  colors: [
    { name: 'Natural Black', code: '#1A1A1A', isAvailable: true }
  ] // <-- Missing comma here!
  // features: [ // This will cause an error
  //   'Feature 1'
  // ]
};

/**
 * ✅ CORRECT: Comma after colors array
 */
const correctExample1 = {
  features: [
    'Feature 1'
  ],
  colors: [
    { name: 'Natural Black', code: '#1A1A1A', isAvailable: true }
  ] // Comma added!
};

/**
 * ❌ WRONG: Invalid HEX code
 */
const wrongExample2 = {
  colors: [
    { name: 'Natural Black', code: 'black', isAvailable: true } // Not a HEX code
  ]
};

/**
 * ✅ CORRECT: Valid HEX code
 */
const correctExample2 = {
  colors: [
    { name: 'Natural Black', code: '#1A1A1A', isAvailable: true } // Valid HEX
  ]
};

/**
 * ❌ WRONG: Missing isAvailable property
 */
const wrongExample3 = {
  colors: [
    { name: 'Natural Black', code: '#1A1A1A' } // Missing isAvailable
  ]
};

/**
 * ✅ CORRECT: All required properties
 */
const correctExample3 = {
  colors: [
    { name: 'Natural Black', code: '#1A1A1A', isAvailable: true } // Complete
  ]
};

// ============================================
// TIPS FOR CHOOSING COLORS
// ============================================

/**
 * 1. REALISTIC COLORS
 * - Use actual hair color HEX codes
 * - Reference real product photos
 * - Test on different backgrounds
 */

/**
 * 2. APPROPRIATE QUANTITY
 * - Basic wigs: 2-3 colors
 * - Popular wigs: 4-5 colors
 * - Premium wigs: 6+ colors
 * - Pre-colored: 1 color
 */

/**
 * 3. COLOR VARIETY
 * - Include range: dark → medium → light
 * - Natural wigs: blacks, browns, blondes
 * - Fashion wigs: vibrant, bold colors
 */

/**
 * 4. STOCK MANAGEMENT
 * - Set isAvailable: false for out-of-stock colors
 * - Customers see "Out of Stock" in tooltip
 * - Color appears grayed with diagonal slash
 */

/**
 * 5. COLOR NAMING
 * - Be descriptive: "Honey Blonde" not just "Blonde"
 * - Keep names short: 2-3 words maximum
 * - Use consistent naming across products
 */

// ============================================
// SEASONAL COLOR UPDATES
// ============================================

/**
 * SPRING/SUMMER TRENDS
 */
const springSummerColors = [
  { name: 'Honey Blonde', code: '#D8A641', isAvailable: true },
  { name: 'Rose Gold Pink', code: '#E0B0B0', isAvailable: true },
  { name: 'Pastel Lavender', code: '#E6E6FA', isAvailable: true },
  { name: 'Peachy Blonde', code: '#FFE5B4', isAvailable: true }
];

/**
 * FALL/WINTER TRENDS
 */
const fallWinterColors = [
  { name: 'Burgundy Wine', code: '#7C2529', isAvailable: true },
  { name: 'Espresso Brown', code: '#3E2723', isAvailable: true },
  { name: 'Auburn', code: '#A0522D', isAvailable: true },
  { name: 'Dark Chocolate', code: '#3D2817', isAvailable: true }
];

// ============================================
// MAINTENANCE CHECKLIST
// ============================================

/**
 * WEEKLY TASKS:
 * - Update isAvailable based on inventory
 * - Check for low-stock colors
 * - Review customer color requests
 */

/**
 * MONTHLY TASKS:
 * - Add new trending colors
 * - Retire unpopular colors
 * - Update color HEX codes if needed
 */

/**
 * QUARTERLY TASKS:
 * - Review all product color offerings
 * - Plan seasonal color launches
 * - Analyze color popularity data
 */

// ============================================
// SUPPORT CONTACT
// ============================================

/**
 * For questions about adding colors:
 * - Review HAIR_COLOR_SYSTEM.md documentation
 * - Check examples in this file
 * - Test changes in development environment first
 * - Contact development team for bulk updates
 */

export default {
  naturalBlackShades,
  brownShades,
  blondeShades,
  redShades,
  fashionColors,
  specialEffects
};
