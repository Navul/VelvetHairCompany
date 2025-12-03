/**
 * Sample Product Data - Velvet Hair Wigs
 * Realistic wig product catalog for development and testing
 */

export const sampleProducts = [
  {
    _id: 'prod_001',
    name: 'Silky Straight 13x4 Lace Front Wig',
    slug: 'silky-straight-lace-front',
    description: 'Premium quality Brazilian virgin hair wig with natural hairline. 13x4 lace frontal for versatile styling. Pre-plucked with baby hairs for a realistic look.',
    longDescription: 'Experience luxury with our Silky Straight 13x4 Lace Front Wig. Made from 100% virgin Brazilian human hair, this wig offers the perfect blend of elegance and versatility. The 13x4 transparent lace frontal creates an undetectable hairline, while the silky straight texture provides a sleek, sophisticated look. Pre-plucked hairline with baby hairs ensures the most natural appearance. Can be styled, dyed, and heat-treated just like your own hair.',
    category: 'Lace Front Wigs',
    price: 189.99,
    originalPrice: 249.99,
    images: [
      '/images/products/silky-straight-front.jpg',
      '/images/products/silky-straight-side.jpg',
      '/images/products/silky-straight-back.jpg',
      '/images/products/silky-straight-styled.jpg'
    ],
    inStock: true,
    stockQuantity: 15,
    rating: 4.8,
    reviewCount: 127,
    badge: 'Bestseller',
    specifications: {
      hairType: '100% Virgin Brazilian Human Hair',
      texture: 'Silky Straight',
      laceType: '13x4 Transparent HD Lace',
      density: '150%',
      length: '16-24 inches',
      capSize: 'Medium (adjustable)',
      color: 'Natural Black (1B)',
      canBeColored: true,
      canBePermed: true
    },
    features: [
      'Pre-plucked natural hairline',
      'Baby hairs included',
      'Bleached knots',
      'Adjustable straps',
      'Can be heat styled up to 180°C',
      'Minimal shedding'
    ],
    colors: [
      { name: 'Natural Black', code: '#1A1A1A', isAvailable: true },
      { name: 'Dark Brown', code: '#3D2817', isAvailable: true },
      { name: 'Medium Brown', code: '#5C4033', isAvailable: true },
      { name: 'Honey Blonde', code: '#D8A641', isAvailable: true },
      { name: 'Ash Blonde', code: '#B8A68C', isAvailable: false }
    ]
  },
  {
    _id: 'prod_002',
    name: 'Body Wave 360 Lace Frontal Wig',
    slug: 'body-wave-360-lace',
    description: 'Stunning body wave texture with 360 lace frontal for all-around styling freedom. Perfect for high ponytails and updos.',
    longDescription: 'Make a statement with our luxurious Body Wave 360 Lace Frontal Wig. The 360-degree lace allows for versatile styling including high ponytails, buns, and half-up styles. Soft body wave pattern adds natural movement and volume. Premium quality human hair that looks and feels completely natural.',
    category: 'Lace Front Wigs',
    price: 249.99,
    originalPrice: 329.99,
    images: [
      '/images/products/body-wave-360-front.jpg',
      '/images/products/body-wave-360-side.jpg'
    ],
    inStock: true,
    stockQuantity: 8,
    rating: 4.9,
    reviewCount: 94,
    badge: 'New',
    specifications: {
      hairType: '100% Virgin Peruvian Human Hair',
      texture: 'Body Wave',
      laceType: '360 Transparent Lace',
      density: '180%',
      length: '18-26 inches',
      capSize: 'Medium (adjustable)',
      color: 'Natural Black (1B)',
      canBeColored: true,
      canBePermed: true
    },
    features: [
      '360 degree lace coverage',
      'Perfect for high styles',
      'Natural bouncy waves',
      'Minimal tangling',
      'Long-lasting curl pattern'
    ],
    colors: [
      { name: 'Natural Black', code: '#1A1A1A', isAvailable: true },
      { name: 'Dark Brown', code: '#3D2817', isAvailable: true },
      { name: 'Chestnut Brown', code: '#8B5A2B', isAvailable: true },
      { name: 'Auburn', code: '#A0522D', isAvailable: false }
    ]
  },
  {
    _id: 'prod_003',
    name: 'Deep Wave Full Lace Wig',
    slug: 'deep-wave-full-lace',
    description: 'Glamorous deep wave pattern with full lace construction. Ultimate versatility and natural appearance.',
    longDescription: 'Indulge in pure luxury with our Deep Wave Full Lace Wig. Featuring a complete lace cap construction, this wig offers unmatched styling versatility and the most natural look possible. The gorgeous deep wave texture provides stunning volume and definition. Perfect for those who want the freedom to part anywhere and style in any direction.',
    category: 'Full Lace Wigs',
    price: 299.99,
    originalPrice: 399.99,
    images: [
      '/images/products/deep-wave-full-front.jpg',
      '/images/products/deep-wave-full-side.jpg'
    ],
    inStock: true,
    stockQuantity: 6,
    rating: 5.0,
    reviewCount: 156,
    badge: 'Featured',
    specifications: {
      hairType: '100% Virgin Indian Human Hair',
      texture: 'Deep Wave',
      laceType: 'Full Swiss Lace',
      density: '150%',
      length: '20-28 inches',
      capSize: 'Medium (adjustable)',
      color: 'Natural Black (1B)',
      canBeColored: true,
      canBePermed: true
    },
    features: [
      'Full lace cap - part anywhere',
      'Bleached knots throughout',
      'Luxurious deep wave pattern',
      'Breathable Swiss lace',
      'Professional salon quality'
    ],
    colors: [
      { name: 'Natural Black', code: '#1A1A1A', isAvailable: true },
      { name: 'Dark Brown', code: '#3D2817', isAvailable: true },
      { name: 'Medium Brown', code: '#5C4033', isAvailable: true }
    ]
  },
  {
    _id: 'prod_004',
    name: 'Loose Wave HD Lace Front Wig',
    slug: 'loose-wave-hd-lace',
    description: 'Soft loose waves with ultra-thin HD lace for an invisible hairline. Elegant and effortless style.',
    longDescription: 'Experience the next generation of lace technology with our Loose Wave HD Lace Front Wig. The revolutionary HD lace is virtually undetectable on all skin tones, melting seamlessly into your scalp. Soft, romantic loose waves provide an effortlessly chic look that\'s perfect for any occasion.',
    category: 'Lace Front Wigs',
    price: 219.99,
    originalPrice: null,
    images: [
      '/images/products/loose-wave-hd-front.jpg',
      '/images/products/loose-wave-hd-side.jpg'
    ],
    inStock: true,
    stockQuantity: 12,
    rating: 4.7,
    reviewCount: 83,
    badge: null,
    specifications: {
      hairType: '100% Virgin Malaysian Human Hair',
      texture: 'Loose Wave',
      laceType: '13x6 HD Transparent Lace',
      density: '150%',
      length: '16-24 inches',
      capSize: 'Medium (adjustable)',
      color: 'Natural Black (1B)',
      canBeColored: true,
      canBePermed: true
    },
    features: [
      'Ultra-thin HD lace',
      'Invisible hairline',
      'Natural loose wave pattern',
      'Pre-plucked and bleached',
      'Soft and manageable'
    ],
    colors: [
      { name: 'Natural Black', code: '#1A1A1A', isAvailable: true },
      { name: 'Dark Brown', code: '#3D2817', isAvailable: true },
      { name: 'Medium Brown', code: '#5C4033', isAvailable: true },
      { name: 'Light Brown', code: '#8B7355', isAvailable: true },
      { name: 'Honey Blonde', code: '#D8A641', isAvailable: true }
    ]
  },
  {
    _id: 'prod_005',
    name: 'Kinky Straight U-Part Wig',
    slug: 'kinky-straight-u-part',
    description: 'Natural kinky straight texture with U-part design for seamless blending with your own hair.',
    longDescription: 'Achieve a flawless protective style with our Kinky Straight U-Part Wig. The U-part design allows you to leave out a small section of your natural hair for perfect blending. This kinky straight texture mimics naturally relaxed or blow-dried African American hair for the most authentic look.',
    category: 'U-Part Wigs',
    price: 169.99,
    originalPrice: 209.99,
    images: [
      '/images/products/kinky-straight-u-front.jpg',
      '/images/products/kinky-straight-u-side.jpg'
    ],
    inStock: true,
    stockQuantity: 10,
    rating: 4.6,
    reviewCount: 71,
    badge: null,
    specifications: {
      hairType: '100% Virgin Brazilian Human Hair',
      texture: 'Kinky Straight',
      laceType: 'U-Part Opening (2x4 inches)',
      density: '150%',
      length: '14-22 inches',
      capSize: 'Medium (adjustable)',
      color: 'Natural Black (1B)',
      canBeColored: true,
      canBePermed: true
    },
    features: [
      'U-part design for natural blending',
      'Perfect for protective styling',
      'Natural kinky straight texture',
      'Easy to install',
      'Minimal leave out needed'
    ],
    colors: [
      { name: 'Natural Black', code: '#1A1A1A', isAvailable: true },
      { name: 'Dark Brown', code: '#3D2817', isAvailable: true },
      { name: 'Medium Brown', code: '#5C4033', isAvailable: false }
    ]
  },
  {
    _id: 'prod_006',
    name: 'Water Wave 4x4 Closure Wig',
    slug: 'water-wave-closure',
    description: 'Gorgeous water wave pattern with 4x4 closure. Bouncy, defined waves that last.',
    longDescription: 'Dive into elegance with our Water Wave 4x4 Closure Wig. This stunning wig features beautiful water wave texture that provides incredible bounce and definition. The 4x4 lace closure offers a natural scalp appearance with versatile parting options. Perfect for a beachy, carefree look.',
    category: 'Closure Wigs',
    price: 159.99,
    originalPrice: 199.99,
    images: [
      '/images/products/water-wave-closure-front.jpg',
      '/images/products/water-wave-closure-side.jpg'
    ],
    inStock: true,
    stockQuantity: 14,
    rating: 4.8,
    reviewCount: 102,
    badge: 'Bestseller',
    specifications: {
      hairType: '100% Virgin Cambodian Human Hair',
      texture: 'Water Wave',
      laceType: '4x4 Swiss Lace Closure',
      density: '150%',
      length: '16-24 inches',
      capSize: 'Medium (adjustable)',
      color: 'Natural Black (1B)',
      canBeColored: true,
      canBePermed: true
    },
    features: [
      'Beautiful water wave pattern',
      'Long-lasting curl definition',
      'Natural bounce and movement',
      '4x4 lace closure',
      'Free part, middle part, or side part'
    ],
    colors: [
      { name: 'Natural Black', code: '#1A1A1A', isAvailable: true },
      { name: 'Dark Brown', code: '#3D2817', isAvailable: true },
      { name: 'Chestnut Brown', code: '#8B5A2B', isAvailable: true },
      { name: 'Honey Blonde', code: '#D8A641', isAvailable: true }
    ]
  },
  {
    _id: 'prod_007',
    name: 'Ombre Blonde Body Wave Lace Front',
    slug: 'ombre-blonde-body-wave',
    description: 'Stunning ombre transition from dark roots to golden blonde. Body wave texture for added glamour.',
    longDescription: 'Turn heads with our show-stopping Ombre Blonde Body Wave Lace Front Wig. Features a beautiful gradient from natural dark roots to gorgeous golden blonde ends. The body wave texture adds incredible movement and dimension to the color. Pre-colored by professionals for even, vibrant results.',
    category: 'Lace Front Wigs',
    price: 279.99,
    originalPrice: 349.99,
    images: [
      '/images/products/ombre-blonde-front.jpg',
      '/images/products/ombre-blonde-side.jpg'
    ],
    inStock: true,
    stockQuantity: 5,
    rating: 4.9,
    reviewCount: 89,
    badge: 'Featured',
    specifications: {
      hairType: '100% Virgin Brazilian Human Hair',
      texture: 'Body Wave',
      laceType: '13x4 Transparent Lace',
      density: '180%',
      length: '18-26 inches',
      capSize: 'Medium (adjustable)',
      color: 'Ombre 1B/27 (Black to Honey Blonde)',
      canBeColored: true,
      canBePermed: true
    },
    features: [
      'Professional ombre coloring',
      'Dark root for natural look',
      'Honey blonde ends',
      'Body wave texture',
      'High density for full volume'
    ],
    colors: [
      { name: 'Ombre Honey Blonde', code: '#D8A641', isAvailable: true }
    ]
  },
  {
    _id: 'prod_008',
    name: 'Curly Pixie Cut Wig - Short Style',
    slug: 'curly-pixie-short',
    description: 'Sassy short pixie cut with natural curls. Low maintenance and full of personality.',
    longDescription: 'Embrace bold style with our Curly Pixie Cut Wig. This chic short wig features natural curly texture that\'s easy to maintain and perfect for active lifestyles. The tapered cut is flattering on all face shapes and provides that effortlessly cool vibe.',
    category: 'Short Wigs',
    price: 89.99,
    originalPrice: 119.99,
    images: [
      '/images/products/curly-pixie-front.jpg',
      '/images/products/curly-pixie-side.jpg'
    ],
    inStock: true,
    stockQuantity: 20,
    rating: 4.5,
    reviewCount: 64,
    badge: 'New',
    specifications: {
      hairType: '100% Human Hair',
      texture: 'Tight Curly',
      laceType: 'Lace Front',
      density: '130%',
      length: '6-8 inches',
      capSize: 'Small/Medium (adjustable)',
      color: 'Natural Black (1B)',
      canBeColored: true,
      canBePermed: false
    },
    features: [
      'Short and sassy style',
      'Low maintenance',
      'Natural curl pattern',
      'Lightweight and breathable',
      'Perfect for summer'
    ],
    colors: [
      { name: 'Natural Black', code: '#1A1A1A', isAvailable: true },
      { name: 'Dark Brown', code: '#3D2817', isAvailable: true },
      { name: 'Auburn', code: '#A0522D', isAvailable: true },
      { name: 'Burgundy', code: '#7C2529', isAvailable: false }
    ]
  },
  {
    _id: 'prod_009',
    name: 'Burgundy Straight Lace Front - Bold Color',
    slug: 'burgundy-straight-lace',
    description: 'Rich burgundy color with silky straight texture. Make a statement with this vibrant hue.',
    longDescription: 'Stand out from the crowd with our Burgundy Straight Lace Front Wig. This gorgeous wig features a rich, wine-inspired burgundy color professionally applied for even, fade-resistant results. The silky straight texture showcases the color beautifully and provides a sleek, polished look.',
    category: 'Lace Front Wigs',
    price: 239.99,
    originalPrice: 299.99,
    images: [
      '/images/products/burgundy-straight-front.jpg',
      '/images/products/burgundy-straight-side.jpg'
    ],
    inStock: true,
    stockQuantity: 7,
    rating: 4.7,
    reviewCount: 56,
    badge: null,
    specifications: {
      hairType: '100% Virgin Human Hair',
      texture: 'Silky Straight',
      laceType: '13x4 HD Lace',
      density: '150%',
      length: '16-24 inches',
      capSize: 'Medium (adjustable)',
      color: '99J Burgundy Wine',
      canBeColored: false,
      canBePermed: true
    },
    features: [
      'Rich burgundy color',
      'Professional color application',
      'Fade-resistant dye',
      'Silky smooth texture',
      'Pre-plucked hairline'
    ],
    colors: [
      { name: 'Burgundy Wine', code: '#7C2529', isAvailable: true }
    ]
  },
  {
    _id: 'prod_010',
    name: 'Natural Afro Kinky Curly Full Lace',
    slug: 'afro-kinky-curly-full',
    description: 'Authentic African texture with tight kinky curls. Full lace for maximum versatility.',
    longDescription: 'Celebrate your natural beauty with our Natural Afro Kinky Curly Full Lace Wig. This wig features authentic 4C texture that perfectly mimics naturally curly African hair. Full lace construction allows for creative styling including high puffs, braids, and twist-outs.',
    category: 'Full Lace Wigs',
    price: 329.99,
    originalPrice: null,
    images: [
      '/images/products/afro-kinky-full-front.jpg',
      '/images/products/afro-kinky-full-side.jpg'
    ],
    inStock: true,
    stockQuantity: 4,
    rating: 5.0,
    reviewCount: 78,
    badge: 'Bestseller',
    specifications: {
      hairType: '100% Virgin Mongolian Human Hair',
      texture: 'Afro Kinky Curly (4C)',
      laceType: 'Full Swiss Lace',
      density: '180%',
      length: '14-20 inches',
      capSize: 'Medium (adjustable)',
      color: 'Natural Black (1B)',
      canBeColored: true,
      canBePermed: false
    },
    features: [
      'Authentic 4C texture',
      'Full lace - part anywhere',
      'High density for fullness',
      'Perfect shrinkage ratio',
      'Can be styled naturally'
    ],
    colors: [
      { name: 'Natural Black', code: '#1A1A1A', isAvailable: true },
      { name: 'Dark Brown', code: '#3D2817', isAvailable: true }
    ]
  },
  {
    _id: 'prod_011',
    name: 'Bob Cut Straight Lace Front - Classic Style',
    slug: 'bob-straight-lace-front',
    description: 'Timeless bob cut with silky straight hair. Professional and sophisticated.',
    longDescription: 'Classic elegance meets modern sophistication in our Bob Cut Straight Lace Front Wig. The precision-cut bob hits just at the shoulders for a flattering, professional look. Silky straight texture is easy to maintain and style. Perfect for the modern woman who wants effortless elegance.',
    category: 'Bob Wigs',
    price: 149.99,
    originalPrice: 189.99,
    images: [
      '/images/products/bob-straight-front.jpg',
      '/images/products/bob-straight-side.jpg'
    ],
    inStock: true,
    stockQuantity: 18,
    rating: 4.6,
    reviewCount: 112,
    badge: null,
    specifications: {
      hairType: '100% Virgin Brazilian Human Hair',
      texture: 'Silky Straight',
      laceType: '13x4 Lace Frontal',
      density: '130%',
      length: '10-14 inches (Bob Length)',
      capSize: 'Medium (adjustable)',
      color: 'Natural Black (1B)',
      canBeColored: true,
      canBePermed: true
    },
    features: [
      'Classic bob cut',
      'Shoulder-length',
      'Sleek and professional',
      'Easy to maintain',
      'Versatile styling options'
    ],
    colors: [
      { name: 'Natural Black', code: '#1A1A1A', isAvailable: true },
      { name: 'Dark Brown', code: '#3D2817', isAvailable: true },
      { name: 'Medium Brown', code: '#5C4033', isAvailable: true },
      { name: 'Chestnut Brown', code: '#8B5A2B', isAvailable: true },
      { name: 'Honey Blonde', code: '#D8A641', isAvailable: true },
      { name: 'Platinum Blonde', code: '#E8E4D0', isAvailable: false }
    ]
  },
  {
    _id: 'prod_012',
    name: 'Honey Blonde Highlight Body Wave',
    slug: 'honey-blonde-highlight-body',
    description: 'Gorgeous honey blonde highlights on dark base. Dimensional color with body wave texture.',
    longDescription: 'Add dimension and warmth to your look with our Honey Blonde Highlight Body Wave Wig. Features beautiful honey blonde highlights expertly placed throughout a natural black base. The body wave texture creates stunning movement that shows off the multidimensional color.',
    category: 'Lace Front Wigs',
    price: 269.99,
    originalPrice: 339.99,
    images: [
      '/images/products/honey-highlight-front.jpg',
      '/images/products/honey-highlight-side.jpg'
    ],
    inStock: true,
    stockQuantity: 9,
    rating: 4.8,
    reviewCount: 95,
    badge: 'Featured',
    specifications: {
      hairType: '100% Virgin Peruvian Human Hair',
      texture: 'Body Wave',
      laceType: '13x6 HD Lace',
      density: '180%',
      length: '18-26 inches',
      capSize: 'Medium (adjustable)',
      color: '1B/27 Highlighted',
      canBeColored: true,
      canBePermed: true
    },
    features: [
      'Professional highlights',
      'Honey blonde accents',
      'Dimensional color',
      'Body wave texture',
      'Sun-kissed look'
    ],
    colors: [
      { name: 'Honey Blonde Highlight', code: '#D8A641', isAvailable: true },
      { name: 'Caramel Highlight', code: '#C68E59', isAvailable: true }
    ]
  },
  {
    _id: 'prod_013',
    name: 'Loose Deep Wave 5x5 Closure Wig',
    slug: 'loose-deep-wave-closure',
    description: 'Romantic loose deep waves with 5x5 closure for wider parting space.',
    longDescription: 'Romance meets luxury in our Loose Deep Wave 5x5 Closure Wig. The larger 5x5 closure provides more parting versatility than standard closures. Beautiful loose deep wave pattern offers the perfect balance between body wave and deep wave textures.',
    category: 'Closure Wigs',
    price: 199.99,
    originalPrice: 249.99,
    images: [
      '/images/products/loose-deep-closure-front.jpg',
      '/images/products/loose-deep-closure-side.jpg'
    ],
    inStock: true,
    stockQuantity: 11,
    rating: 4.7,
    reviewCount: 87,
    badge: null,
    specifications: {
      hairType: '100% Virgin Indian Human Hair',
      texture: 'Loose Deep Wave',
      laceType: '5x5 HD Lace Closure',
      density: '150%',
      length: '16-24 inches',
      capSize: 'Medium (adjustable)',
      color: 'Natural Black (1B)',
      canBeColored: true,
      canBePermed: true
    },
    features: [
      'Larger 5x5 closure',
      'More parting space',
      'Romantic wave pattern',
      'Natural bounce',
      'Versatile styling'
    ],
    colors: [
      { name: 'Natural Black', code: '#1A1A1A', isAvailable: true },
      { name: 'Dark Brown', code: '#3D2817', isAvailable: true },
      { name: 'Medium Brown', code: '#5C4033', isAvailable: true },
      { name: 'Light Brown', code: '#8B7355', isAvailable: false }
    ]
  },
  {
    _id: 'prod_014',
    name: 'Copper Red Loose Wave Lace Front',
    slug: 'copper-red-loose-wave',
    description: 'Vibrant copper red color with loose waves. Fiery and fashionable.',
    longDescription: 'Ignite your style with our Copper Red Loose Wave Lace Front Wig. This stunning wig features a rich copper red color that catches the light beautifully. Loose wave texture adds movement and dimension to the vibrant color. Professional color application ensures even, long-lasting results.',
    category: 'Lace Front Wigs',
    price: 259.99,
    originalPrice: 319.99,
    images: [
      '/images/products/copper-red-front.jpg',
      '/images/products/copper-red-side.jpg'
    ],
    inStock: true,
    stockQuantity: 6,
    rating: 4.9,
    reviewCount: 73,
    badge: 'New',
    specifications: {
      hairType: '100% Virgin Brazilian Human Hair',
      texture: 'Loose Wave',
      laceType: '13x4 Transparent Lace',
      density: '180%',
      length: '18-24 inches',
      capSize: 'Medium (adjustable)',
      color: '350 Copper Red',
      canBeColored: false,
      canBePermed: true
    },
    features: [
      'Vibrant copper red',
      'Professional coloring',
      'Loose wave texture',
      'High density',
      'Color-safe products recommended'
    ],
    colors: [
      { name: 'Copper Red', code: '#CD5B45', isAvailable: true },
      { name: 'Auburn Red', code: '#A0522D', isAvailable: true }
    ]
  },
  {
    _id: 'prod_015',
    name: 'Platinum Blonde Straight Lace Front',
    slug: 'platinum-blonde-straight',
    description: 'Icy platinum blonde with silky straight texture. High fashion and edgy.',
    longDescription: 'Make a bold fashion statement with our Platinum Blonde Straight Lace Front Wig. This striking wig features an icy platinum blonde color that is perfect for those who love to stand out. The silky straight texture provides a sleek, modern look. Pre-lightened and toned for the perfect cool-toned blonde.',
    category: 'Lace Front Wigs',
    price: 349.99,
    originalPrice: 449.99,
    images: [
      '/images/products/platinum-blonde-front.jpg',
      '/images/products/platinum-blonde-side.jpg'
    ],
    inStock: true,
    stockQuantity: 3,
    rating: 4.6,
    reviewCount: 42,
    badge: null,
    specifications: {
      hairType: '100% Virgin Brazilian Human Hair',
      texture: 'Silky Straight',
      laceType: '13x6 HD Lace',
      density: '150%',
      length: '16-26 inches',
      capSize: 'Medium (adjustable)',
      color: '613 Platinum Blonde',
      canBeColored: true,
      canBePermed: true
    },
    features: [
      'Icy platinum blonde',
      'Pre-lightened hair',
      'Cool-toned finish',
      'Silky smooth',
      'Fashion-forward color'
    ],
    colors: [
      { name: 'Platinum Blonde', code: '#E8E4D0', isAvailable: true },
      { name: 'Silver Blonde', code: '#C0C0C0', isAvailable: false }
    ]
  },
  {
    _id: 'prod_016',
    name: 'Yaki Straight U-Part Wig - Natural Texture',
    slug: 'yaki-straight-u-part',
    description: 'Natural yaki straight texture mimics relaxed hair. U-part design for seamless blending.',
    longDescription: 'Achieve a perfectly natural look with our Yaki Straight U-Part Wig. The yaki texture is specifically designed to mimic the texture of African American hair that has been relaxed or blow-dried. U-part design allows for easy blending with your natural hair for an undetectable finish.',
    category: 'U-Part Wigs',
    price: 179.99,
    originalPrice: 229.99,
    images: [
      '/images/products/yaki-u-part-front.jpg',
      '/images/products/yaki-u-part-side.jpg'
    ],
    inStock: true,
    stockQuantity: 13,
    rating: 4.8,
    reviewCount: 98,
    badge: 'Bestseller',
    specifications: {
      hairType: '100% Virgin Brazilian Human Hair',
      texture: 'Yaki Straight',
      laceType: 'U-Part Opening (2x4 inches)',
      density: '150%',
      length: '14-22 inches',
      capSize: 'Medium (adjustable)',
      color: 'Natural Black (1B)',
      canBeColored: true,
      canBePermed: true
    },
    features: [
      'Natural yaki texture',
      'Mimics relaxed hair',
      'U-part for blending',
      'Easy installation',
      'Protective styling'
    ],
    colors: [
      { name: 'Natural Black', code: '#1A1A1A', isAvailable: true },
      { name: 'Dark Brown', code: '#3D2817', isAvailable: true },
      { name: 'Medium Brown', code: '#5C4033', isAvailable: true }
    ]
  },
  {
    _id: 'prod_017',
    name: 'Curly Bob Lace Front - Sassy Short',
    slug: 'curly-bob-lace-front',
    description: 'Fun and flirty curly bob. Short, bouncy, and full of volume.',
    longDescription: 'Add some sass to your style with our Curly Bob Lace Front Wig. This playful wig features gorgeous bouncy curls in a flattering bob length. Perfect for those who want a fun, youthful look without the commitment. The curls maintain their shape beautifully and require minimal styling.',
    category: 'Bob Wigs',
    price: 139.99,
    originalPrice: 179.99,
    images: [
      '/images/products/curly-bob-front.jpg',
      '/images/products/curly-bob-side.jpg'
    ],
    inStock: true,
    stockQuantity: 16,
    rating: 4.7,
    reviewCount: 86,
    badge: null,
    specifications: {
      hairType: '100% Virgin Malaysian Human Hair',
      texture: 'Curly',
      laceType: '13x4 Lace Frontal',
      density: '150%',
      length: '10-14 inches (Bob Length)',
      capSize: 'Medium (adjustable)',
      color: 'Natural Black (1B)',
      canBeColored: true,
      canBePermed: false
    },
    features: [
      'Bouncy curls',
      'Bob length',
      'Fun and flirty',
      'Low maintenance curls',
      'Great volume'
    ],
    colors: [
      { name: 'Natural Black', code: '#1A1A1A', isAvailable: true },
      { name: 'Dark Brown', code: '#3D2817', isAvailable: true },
      { name: 'Chestnut Brown', code: '#8B5A2B', isAvailable: true },
      { name: 'Auburn', code: '#A0522D', isAvailable: true }
    ]
  },
  {
    _id: 'prod_018',
    name: 'Ash Blonde Balayage Body Wave',
    slug: 'ash-blonde-balayage-body',
    description: 'Trendy ash blonde balayage with body wave. Cool-toned and sophisticated.',
    longDescription: 'Stay on-trend with our Ash Blonde Balayage Body Wave Wig. Features a gorgeous ash blonde balayage expertly hand-painted from dark roots to cool-toned blonde ends. The body wave texture adds beautiful movement that showcases the dimensional color. Perfect for a modern, sophisticated look.',
    category: 'Lace Front Wigs',
    price: 289.99,
    originalPrice: 359.99,
    images: [
      '/images/products/ash-balayage-front.jpg',
      '/images/products/ash-balayage-side.jpg'
    ],
    inStock: true,
    stockQuantity: 5,
    rating: 5.0,
    reviewCount: 67,
    badge: 'Featured',
    specifications: {
      hairType: '100% Virgin Peruvian Human Hair',
      texture: 'Body Wave',
      laceType: '13x6 HD Lace',
      density: '180%',
      length: '18-26 inches',
      capSize: 'Medium (adjustable)',
      color: 'Ash Blonde Balayage (Root to Tip)',
      canBeColored: true,
      canBePermed: true
    },
    features: [
      'Hand-painted balayage',
      'Cool ash tones',
      'Dark root for natural look',
      'Dimensional color',
      'Body wave texture'
    ],
    colors: [
      { name: 'Ash Blonde Balayage', code: '#B8A68C', isAvailable: true },
      { name: 'Beige Blonde Balayage', code: '#D4C9B0', isAvailable: true }
    ]
  },
  {
    _id: 'prod_019',
    name: 'Jerry Curly 360 Lace Frontal Wig',
    slug: 'jerry-curly-360-lace',
    description: 'Tight, defined jerry curls with 360 lace. Big volume and personality.',
    longDescription: 'Bring back the glamour of the 80s with a modern twist in our Jerry Curly 360 Lace Frontal Wig. Features tight, springy jerry curls that provide incredible volume and definition. 360 lace allows for versatile styling including high ponytails. Perfect for those who love big, bold hair.',
    category: 'Lace Front Wigs',
    price: 229.99,
    originalPrice: 289.99,
    images: [
      '/images/products/jerry-curly-360-front.jpg',
      '/images/products/jerry-curly-360-side.jpg'
    ],
    inStock: true,
    stockQuantity: 8,
    rating: 4.8,
    reviewCount: 91,
    badge: null,
    specifications: {
      hairType: '100% Virgin Cambodian Human Hair',
      texture: 'Jerry Curly',
      laceType: '360 Transparent Lace',
      density: '200%',
      length: '16-24 inches',
      capSize: 'Medium (adjustable)',
      color: 'Natural Black (1B)',
      canBeColored: true,
      canBePermed: false
    },
    features: [
      'Tight jerry curls',
      '360 lace coverage',
      'Maximum volume',
      'Defined curl pattern',
      'Long-lasting curls'
    ],
    colors: [
      { name: 'Natural Black', code: '#1A1A1A', isAvailable: true },
      { name: 'Dark Brown', code: '#3D2817', isAvailable: true },
      { name: 'Medium Brown', code: '#5C4033', isAvailable: false }
    ]
  },
  {
    _id: 'prod_020',
    name: 'Rose Gold Pink Straight Lace Front',
    slug: 'rose-gold-pink-straight',
    description: 'Soft rose gold pink color with silky straight hair. Feminine and trendy.',
    longDescription: 'Embrace your feminine side with our Rose Gold Pink Straight Lace Front Wig. This beautiful wig features a soft, romantic rose gold pink color that\'s perfect for the fashion-forward individual. The silky straight texture provides a sleek canvas for the lovely color. Professional color application ensures even, fade-resistant results.',
    category: 'Lace Front Wigs',
    price: 269.99,
    originalPrice: 329.99,
    images: [
      '/images/products/rose-gold-pink-front.jpg',
      '/images/products/rose-gold-pink-side.jpg'
    ],
    inStock: true,
    stockQuantity: 4,
    rating: 4.9,
    reviewCount: 58,
    badge: 'New',
    specifications: {
      hairType: '100% Virgin Brazilian Human Hair',
      texture: 'Silky Straight',
      laceType: '13x4 HD Lace',
      density: '150%',
      length: '16-24 inches',
      capSize: 'Medium (adjustable)',
      color: 'Rose Gold Pink',
      canBeColored: false,
      canBePermed: true
    },
    features: [
      'Soft rose gold pink',
      'Fashion color',
      'Silky smooth',
      'Pre-colored professionally',
      'Fade-resistant dye'
    ],
    colors: [
      { name: 'Rose Gold Pink', code: '#E0B0B0', isAvailable: true },
      { name: 'Pastel Pink', code: '#F4C2C2', isAvailable: false }
    ]
  }
];

// Export by category for easy filtering
export const productsByCategory = {
  'Lace Front Wigs': sampleProducts.filter(p => p.category === 'Lace Front Wigs'),
  'Full Lace Wigs': sampleProducts.filter(p => p.category === 'Full Lace Wigs'),
  'U-Part Wigs': sampleProducts.filter(p => p.category === 'U-Part Wigs'),
  'Closure Wigs': sampleProducts.filter(p => p.category === 'Closure Wigs'),
  'Bob Wigs': sampleProducts.filter(p => p.category === 'Bob Wigs'),
  'Short Wigs': sampleProducts.filter(p => p.category === 'Short Wigs')
};

// Featured products for home page
export const featuredProducts = sampleProducts.filter(p => 
  p.badge === 'Featured' || p.badge === 'Bestseller'
).slice(0, 8);

// New arrivals for home page
export const newArrivals = sampleProducts.filter(p => 
  p.badge === 'New'
).slice(0, 6);

export default sampleProducts;
