import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiStar, FiTruck, FiShield, FiHeart } from 'react-icons/fi';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Velvet Hair Company - Premium Wigs & Hair Extensions</title>
        <meta 
          name="description" 
          content="Discover premium quality wigs and hair extensions for men and women at Velvet Hair Company. Shop our luxurious collection of natural and synthetic hair products." 
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-display font-bold mb-6">
              Transform Your Look with
              <span className="block text-yellow-300">Premium Wigs</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-purple-100">
              Discover our luxurious collection of high-quality wigs and hair extensions 
              designed to make you look and feel your absolute best.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="btn-primary bg-white text-purple-600 hover:bg-gray-100 inline-flex items-center justify-center space-x-2"
              >
                <span>Shop Now</span>
                <FiArrowRight />
              </Link>
              <Link
                to="/about"
                className="btn-outline border-white text-white hover:bg-white hover:text-purple-600 inline-flex items-center justify-center"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FiTruck className="text-purple-600" size={40} />,
                title: 'Free Shipping',
                description: 'Free shipping on all orders over $100 worldwide'
              },
              {
                icon: <FiShield className="text-purple-600" size={40} />,
                title: 'Quality Guarantee',
                description: '100% premium quality guaranteed or your money back'
              },
              {
                icon: <FiHeart className="text-purple-600" size={40} />,
                title: '24/7 Support',
                description: 'Dedicated customer support available around the clock'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-sm card-hover">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find the perfect wig for your style and occasion from our carefully curated collections
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Women's Wigs",
                image: "/images/womens-wigs.jpg",
                link: "/products?category=female-wigs",
                description: "Elegant and versatile wigs for every style"
              },
              {
                title: "Men's Wigs",
                image: "/images/mens-wigs.jpg",
                link: "/products?category=male-wigs",
                description: "Natural-looking wigs for modern men"
              },
              {
                title: "Accessories",
                image: "/images/accessories.jpg",
                link: "/products?category=accessories",
                description: "Essential tools and accessories"
              },
              {
                title: "Care Products",
                image: "/images/care-products.jpg",
                link: "/products?category=care-products",
                description: "Premium hair care and maintenance"
              }
            ].map((category, index) => (
              <Link
                key={index}
                to={category.link}
                className="group relative overflow-hidden rounded-lg bg-gray-200 aspect-square card-hover"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <div className="absolute bottom-4 left-4 right-4 z-20 text-white">
                  <h3 className="text-xl font-semibold mb-1">{category.title}</h3>
                  <p className="text-sm text-gray-200">{category.description}</p>
                </div>
                {/* Placeholder for image */}
                <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                  <span className="text-white text-4xl font-bold opacity-20">
                    {category.title.charAt(0)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600">
              Discover our most popular and highly-rated products
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }, (_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden card-hover">
                {/* Placeholder Product Image */}
                <div className="aspect-square bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center">
                  <span className="text-purple-600 text-2xl font-bold opacity-30">
                    Product {index + 1}
                  </span>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Premium Wig {index + 1}</h3>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <FiStar 
                          key={i} 
                          size={14} 
                          className={i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">(24 reviews)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-semibold text-purple-600">
                      ${(199 + index * 50).toFixed(2)}
                    </div>
                    <button className="btn-primary text-sm px-4 py-2">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="btn-outline inline-flex items-center space-x-2"
            >
              <span>View All Products</span>
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Read reviews from our satisfied customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
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
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  {Array.from({ length: 5 }, (_, i) => (
                    <FiStar 
                      key={i} 
                      size={16} 
                      className={i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'} 
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.comment}"</p>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
            Ready to Transform Your Look?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have found their perfect wig at Velvet Hair Company
          </p>
          <Link
            to="/products"
            className="btn-primary bg-white text-purple-600 hover:bg-gray-100 inline-flex items-center space-x-2"
          >
            <span>Start Shopping</span>
            <FiArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;