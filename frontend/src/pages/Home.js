import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "Handcrafted Luxury Ceramics",
      subtitle: "Premium artisanal craftsmanship for modern spaces",
      color: "linear-gradient(135deg, #1a365d 0%, #2d5a8c 50%, #1e40af 100%)"
    },
    {
      title: "Authentic B2B Partner",
      subtitle: "Trusted exporter of finest handcrafted ceramic products",
      color: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #3b82f6 100%)"
    },
    {
      title: "Timeless Artistry",
      subtitle: "Every piece tells a story of traditional craftsmanship",
      color: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #60a5fa 100%)"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        if (data.success) {
          setProducts(data.products.slice(0, 6));
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    
    fetchFeaturedProducts();
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="home">
      {/* Premium Hero Carousel */}
      <header className="hero-carousel">
        <div className="carousel-container">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ background: slide.image }}
            >
              <div className="carousel-content">
                <h1>{slide.title}</h1>
                <p>{slide.subtitle}</p>
                <Link to="/products" className="btn-hero-primary">
                  SHOP COLLECTION
                </Link>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-nav prev" onClick={prevSlide}>❮</button>
        <button className="carousel-nav next" onClick={nextSlide}>❯</button>
      </header>



      {/* Key Benefits Section */}
      <section className="wholesale-benefits">
        <h2>Why Partner with ClayNest?</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">📦</div>
            <h3>Bulk Orders</h3>
            <p>Special pricing for wholesale and bulk purchases</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">💰</div>
            <h3>Competitive Pricing</h3>
            <p>Direct pricing with volume discounts available</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🎨</div>
            <h3>Authentic Craftsmanship</h3>
            <p>Hand-made by skilled artisans with premium quality</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">⚡</div>
            <h3>Fast Processing</h3>
            <p>Quick order fulfillment and delivery</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🔒</div>
            <h3>Secure Payment</h3>
            <p>Multiple payment options - UPI, Credit Card, Online Banking</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">📊</div>
            <h3>Export Catalogs</h3>
            <p>Download product listings and specifications in bulk</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products-b2b">
        <h2>Featured Wholesale Collections</h2>
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card-b2b">
              <img src={product.image || 'https://via.placeholder.com/300x300?text=No+Image'} alt={product.name} />
              <h3>{product.name}</h3>
              <p className="price">₹{product.price?.toLocaleString()} per unit</p>
              <p className="bulk-note">Bulk discounts available</p>
              <Link to="/products" className="btn-secondary-b2b">View Details</Link>
            </div>
          ))}
        </div>
      </section>

      {/* Export & Download Section */}
      <section className="export-section">
        <h2>Export Product Catalog</h2>
        <p>Download our complete catalog with specifications and pricing</p>
        <div className="export-buttons">
          <button className="btn-export" onClick={() => window.location.href = 'http://localhost:5000/api/products/export/csv'}>
            📄 Download as CSV
          </button>
          <button className="btn-export" onClick={() => window.location.href = 'http://localhost:5000/api/products/export/json'}>
            📋 Download as JSON
          </button>
        </div>
      </section>

      {/* Contact & Sales Section */}
      <section className="contact-sales-section">
        <h2>Get in Touch</h2>
        <p className="section-subtitle">Connect with our sales team for wholesale inquiries and partnerships</p>
        
        <div className="contact-methods">
          <div className="contact-method">
            <div className="contact-icon">📧</div>
            <h3>Email</h3>
            <p>ayushsinghrajput643@gmail.com</p>
            <a href="mailto:ayushsinghrajput643@gmail.com" className="btn-contact-method">
              Send Email
            </a>
          </div>

          <div className="contact-method">
            <div className="contact-icon">💬</div>
            <h3>WhatsApp</h3>
            <p>+91 93696 35323</p>
            <a href="https://wa.me/919369635323?text=Hi%20ClayNest,%20I%20am%20interested%20in%20wholesale%20orders" 
               target="_blank" 
               rel="noopener noreferrer" 
               className="btn-contact-method">
              Message on WhatsApp
            </a>
          </div>

          <div className="contact-method">
            <div className="contact-icon">☎️</div>
            <h3>Phone</h3>
            <p>+91 93696 35323</p>
            <a href="tel:+919369635323" className="btn-contact-method">
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* Payment Options */}
      <section className="payment-options-section">
        <h2>Multiple Payment Options</h2>
        <p>We accept all major online payment methods</p>
        <div className="payment-methods-display">
          <div className="payment-method">
            <span className="payment-icon">📱</span>
            <p>UPI</p>
          </div>
          <div className="payment-method">
            <span className="payment-icon">💳</span>
            <p>Credit Card</p>
          </div>
          <div className="payment-method">
            <span className="payment-icon">🏦</span>
            <p>Debit Card</p>
          </div>
          <div className="payment-method">
            <span className="payment-icon">🔐</span>
            <p>Net Banking</p>
          </div>
          <div className="payment-method">
            <span className="payment-icon">💰</span>
            <p>Digital Wallets</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-final">
        <h2>Ready to Place Your Order?</h2>
        <p>Browse our complete catalog and get wholesale pricing</p>
        <Link to="/products" className="btn-primary-large cta-button">
          Explore Products
        </Link>
      </section>
    </div>
  );
};

export default Home;
