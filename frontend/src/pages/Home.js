import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiStar, FiTruck, FiShield, FiHeart, FiAward } from 'react-icons/fi';
import { BUSINESS_INFO, FEATURES, CATEGORY_DATA, TESTIMONIALS, NAV_LINKS } from '../utils/constants';
import Button from '../components/common/Button';
import ProductCard from '../components/common/ProductCard';
import { featuredProducts, newArrivals } from '../data/sampleProducts';
import './Home.css';

const Home = () => {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);

  useEffect(() => {
    // Animate elements on scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-up');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.scroll-animate').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Helmet>
        <title>{BUSINESS_INFO.name} - Premium Wigs & Hair Extensions</title>
        <meta 
          name="description" 
          content={`Discover ${BUSINESS_INFO.description.toLowerCase()} at ${BUSINESS_INFO.name}. ${BUSINESS_INFO.tagline}`} 
        />
      </Helmet>

      {/* Hero Section - Velvet Luxury */}
      <section className="hero-section" ref={heroRef}>
        <div className="hero-background">
          <div className="hero-gradient"></div>
        </div>
        
        <div className="container hero-content">
          <div className="hero-text animate-fade-in">
            <span className="hero-badge">Premium Quality</span>
            <h1 className="hero-title">
              Embrace Luxury with
              <span className="hero-title-accent">Velvet Hair Wigs</span>
            </h1>
            <p className="hero-subtitle">
              {BUSINESS_INFO.tagline}
            </p>
            <div className="hero-cta-group">
              <Button
                variant="primary"
                size="xl"
                onClick={() => window.location.href = NAV_LINKS.products}
                rightIcon={<FiArrowRight />}
              >
                Discover Collection
              </Button>
              <Button
                variant="outline"
                size="xl"
                onClick={() => window.location.href = NAV_LINKS.about}
              >
                Our Story
              </Button>
            </div>
          </div>

          <div className="hero-stats animate-slide-up">
            <div className="hero-stat">
              <div className="hero-stat-value">10,000+</div>
              <div className="hero-stat-label">Happy Customers</div>
            </div>
            <div className="hero-stat-divider"></div>
            <div className="hero-stat">
              <div className="hero-stat-value">5 Stars</div>
              <div className="hero-stat-label">Average Rating</div>
            </div>
            <div className="hero-stat-divider"></div>
            <div className="hero-stat">
              <div className="hero-stat-value">100%</div>
              <div className="hero-stat-label">Premium Quality</div>
            </div>
          </div>
        </div>

        <div className="hero-wave"></div>
      </section>

      {/* Features Section - Premium Experience */}
      <section className="features-section scroll-animate">
        <div className="container">
          <div className="features-grid">
            {FEATURES.map((feature, index) => {
              const IconComponent = feature.icon === 'FiTruck' ? FiTruck : 
                                   feature.icon === 'FiShield' ? FiShield : FiHeart;
              return (
                <div key={index} className="feature-card">
                  <div className="feature-icon">
                    <IconComponent />
                  </div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="products-section scroll-animate">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Bestsellers</span>
            <h2 className="section-title">Featured Collection</h2>
            <p className="section-subtitle">
              Discover our most loved and highly-rated premium wigs
            </p>
          </div>

          <div className="products-grid">
            {featuredProducts.slice(0, 8).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          <div className="section-cta">
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.location.href = NAV_LINKS.products}
              rightIcon={<FiArrowRight />}
            >
              View All Products
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section scroll-animate">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Collections</span>
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-subtitle">
              Find your perfect style from our curated collections
            </p>
          </div>

          <div className="categories-grid">
            {CATEGORY_DATA.map((category, index) => (
              <Link
                key={index}
                to={category.link}
                className="category-card"
              >
                <div className="category-overlay"></div>
                <div className="category-content">
                  <h3 className="category-title">{category.title}</h3>
                  <p className="category-description">{category.description}</p>
                  <span className="category-arrow">
                    <FiArrowRight />
                  </span>
                </div>
                <div className="category-background">
                  <span className="category-icon">{category.title.charAt(0)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="new-arrivals-section scroll-animate">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Just In</span>
            <h2 className="section-title">New Arrivals</h2>
            <p className="section-subtitle">
              Be the first to discover our latest premium wigs
            </p>
          </div>

          <div className="products-grid products-grid--3col">
            {newArrivals.slice(0, 6).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section scroll-animate">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Reviews</span>
            <h2 className="section-title">What Our Customers Say</h2>
            <p className="section-subtitle">
              Join thousands of satisfied customers who love their new look
            </p>
          </div>

          <div className="testimonials-grid">
            {TESTIMONIALS.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-stars">
                  {Array.from({ length: 5 }, (_, i) => (
                    <FiStar 
                      key={i} 
                      className={i < testimonial.rating ? 'star-filled' : ''} 
                    />
                  ))}
                </div>
                <p className="testimonial-text">"{testimonial.comment}"</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="testimonial-name">{testimonial.name}</div>
                    <div className="testimonial-location">{testimonial.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="trust-section scroll-animate">
        <div className="container">
          <div className="trust-grid">
            <div className="trust-badge">
              <FiAward className="trust-icon" />
              <div>
                <div className="trust-value">Premium Quality</div>
                <div className="trust-label">100% Virgin Hair</div>
              </div>
            </div>
            <div className="trust-badge">
              <FiShield className="trust-icon" />
              <div>
                <div className="trust-value">30-Day Returns</div>
                <div className="trust-label">Money-Back Guarantee</div>
              </div>
            </div>
            <div className="trust-badge">
              <FiTruck className="trust-icon" />
              <div>
                <div className="trust-value">Free Shipping</div>
                <div className="trust-label">Orders Over $100</div>
              </div>
            </div>
            <div className="trust-badge">
              <FiHeart className="trust-icon" />
              <div>
                <div className="trust-value">10,000+</div>
                <div className="trust-label">Happy Customers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section scroll-animate">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">
              Ready to Transform Your Look?
            </h2>
            <p className="cta-subtitle">
              Join thousands of satisfied customers who have found their perfect wig at {BUSINESS_INFO.name}
            </p>
            <div className="cta-buttons">
              <Button
                variant="gold"
                size="xl"
                onClick={() => window.location.href = NAV_LINKS.products}
                rightIcon={<FiArrowRight />}
              >
                Start Shopping
              </Button>
              <Button
                variant="ghost"
                size="xl"
                onClick={() => window.location.href = NAV_LINKS.contact}
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;