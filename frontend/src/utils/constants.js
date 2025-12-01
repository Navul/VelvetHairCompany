// Business Constants
export const BUSINESS_INFO = {
  name: 'Velvet Hair Wigs',
  description: 'Premium quality wigs and hair extensions for men and women',
  tagline: 'Transform your look with our luxurious collection of natural and synthetic hair products',
  email: 'info@velvethair.com',
  phone: '+1 (555) 123-4567',
  address: '123 Hair Street, Beauty City, BC 12345',
  copyright: '© 2025 Velvet Hair Wigs. All rights reserved.'
};

// Pricing Constants
export const PRICING = {
  freeShippingThreshold: 100,
  standardShipping: 10,
  taxRate: 0.08
};

// Product Categories
export const CATEGORIES = {
  MALE_WIGS: 'male-wigs',
  FEMALE_WIGS: 'female-wigs',
  ACCESSORIES: 'accessories',
  CARE_PRODUCTS: 'care-products'
};

// UI Constants
export const UI_CONSTANTS = {
  maxCartItems: 99,
  reviewsPerProduct: 5,
  featuredProductsCount: 4,
  testimonialsCount: 3
};

// API Routes
export const API_ROUTES = {
  users: '/api/users',
  products: '/api/products',
  orders: '/api/orders',
  auth: '/api/auth'
};

// Social Media Links
export const SOCIAL_LINKS = {
  facebook: '#',
  instagram: '#',
  twitter: '#',
  youtube: '#'
};

// Navigation Links
export const NAV_LINKS = {
  home: '/',
  products: '/products',
  maleWigs: `/products?category=${CATEGORIES.MALE_WIGS}`,
  femaleWigs: `/products?category=${CATEGORIES.FEMALE_WIGS}`,
  accessories: `/products?category=${CATEGORIES.ACCESSORIES}`,
  careProducts: `/products?category=${CATEGORIES.CARE_PRODUCTS}`,
  about: '/about',
  contact: '/contact',
  login: '/login',
  register: '/register',
  cart: '/cart',
  profile: '/profile',
  wishlist: '/wishlist'
};

// Feature Icons and Content
export const FEATURES = [
  {
    title: 'Free Shipping',
    description: `Free shipping on all orders over $${PRICING.freeShippingThreshold} worldwide`,
    icon: 'FiTruck'
  },
  {
    title: 'Quality Guarantee',
    description: '100% premium quality guaranteed or your money back',
    icon: 'FiShield'
  },
  {
    title: '24/7 Support',
    description: 'Dedicated customer support available around the clock',
    icon: 'FiHeart'
  }
];

// Categories Data
export const CATEGORY_DATA = [
  {
    title: "Women's Wigs",
    description: "Elegant and versatile wigs for every style",
    link: NAV_LINKS.femaleWigs,
    image: "/images/womens-wigs.jpg"
  },
  {
    title: "Men's Wigs",
    description: "Natural-looking wigs for modern men",
    link: NAV_LINKS.maleWigs,
    image: "/images/mens-wigs.jpg"
  },
  {
    title: "Accessories",
    description: "Essential tools and accessories",
    link: NAV_LINKS.accessories,
    image: "/images/accessories.jpg"
  },
  {
    title: "Care Products",
    description: "Premium hair care and maintenance",
    link: NAV_LINKS.careProducts,
    image: "/images/care-products.jpg"
  }
];

// Sample Testimonials
export const TESTIMONIALS = [
  {
    name: "Sarah Johnson",
    rating: 5,
    comment: "Absolutely love my new wig! The quality is amazing and it looks so natural. Will definitely be ordering more!",
    location: "New York, NY"
  },
  {
    name: "Michael Chen",
    rating: 5,
    comment: "Great selection and fast shipping. The customer service team was very helpful in choosing the right product.",
    location: "Los Angeles, CA"
  },
  {
    name: "Emma Davis",
    rating: 4,
    comment: "Beautiful wigs and excellent quality. The styling options are endless. Highly recommend Velvet Hair!",
    location: "Chicago, IL"
  }
];