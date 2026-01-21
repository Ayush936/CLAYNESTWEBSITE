import React from 'react';
import '../styles/About.css';

export default function About() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>About ClayNest</h1>
          <p>Crafting Excellence, One Piece at a Time</p>
        </div>
      </section>

      {/* Company Story */}
      <section className="company-story">
        <div className="story-container">
          <div className="story-text">
            <h2>Our Story</h2>
            <p>
              ClayNest was founded with a vision to bring authentic handcrafted clay products to art lovers and home décor enthusiasts worldwide. What started as a small artisan workshop has grown into a thriving community of talented craftspeople dedicated to preserving traditional pottery techniques.
            </p>
            <p>
              Each piece in our collection is carefully handcrafted by skilled artisans who pour their passion and expertise into creating unique, high-quality clay products. From decorative ceramics to functional pottery, every item tells a story of craftsmanship and dedication.
            </p>
          </div>
          <div className="story-stats">
            <div className="stat-item">
              <h3>10K+</h3>
              <p>Happy Customers</p>
            </div>
            <div className="stat-item">
              <h3>500+</h3>
              <p>Unique Products</p>
            </div>
            <div className="stat-item">
              <h3>50+</h3>
              <p>Master Artisans</p>
            </div>
            <div className="stat-item">
              <h3>100%</h3>
              <p>Handcrafted</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="mission-values">
        <div className="mission-content">
          <div className="mission-card">
            <div className="icon">🎯</div>
            <h3>Our Mission</h3>
            <p>
              To celebrate and promote traditional pottery art while creating sustainable, high-quality products that bring beauty and meaning to every home.
            </p>
          </div>
          <div className="mission-card">
            <div className="icon">💚</div>
            <h3>Our Values</h3>
            <ul className="values-list">
              <li>✓ Authenticity - 100% handcrafted by artisans</li>
              <li>✓ Sustainability - Eco-friendly materials</li>
              <li>✓ Quality - Premium finish on every piece</li>
              <li>✓ Community - Supporting local artisans</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose">
        <h2>Why Choose ClayNest?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h4>Artisan Made</h4>
            <p>Each product is handcrafted by skilled artisans with years of experience in traditional pottery.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌍</div>
            <h4>Eco-Friendly</h4>
            <p>We use sustainable materials and eco-conscious production methods to protect our environment.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h4>Fast Shipping</h4>
            <p>Quick and secure delivery to your doorstep with real-time tracking.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h4>Secure Payments</h4>
            <p>Multiple payment options with industry-leading security and buyer protection.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💯</div>
            <h4>Quality Assured</h4>
            <p>Rigorous quality checks ensure every piece meets our high standards.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🤝</div>
            <h4>Customer Support</h4>
            <p>Dedicated support team ready to help with any questions or concerns.</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <h2>Our Artisan Community</h2>
        <p className="team-intro">We work with talented craftspeople from across the region who are passionate about their craft.</p>
        <div className="team-info">
          <p>
            Our network of master potters and clay artists brings decades of combined experience to every product. 
            From traditional wheel-thrown pottery to contemporary sculptural pieces, our artisans create work that 
            celebrates the beauty and versatility of clay.
          </p>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="commitment">
        <h2>Our Commitment</h2>
        <div className="commitment-content">
          <div className="commitment-item">
            <h4>Fair Trade Practices</h4>
            <p>We ensure artisans receive fair compensation for their exceptional work and creativity.</p>
          </div>
          <div className="commitment-item">
            <h4>Sustainability</h4>
            <p>Using locally-sourced clay and eco-friendly packaging to minimize environmental impact.</p>
          </div>
          <div className="commitment-item">
            <h4>Innovation</h4>
            <p>Blending traditional techniques with contemporary designs to create unique, timeless pieces.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <h2>Ready to Discover Your Next Favorite Piece?</h2>
        <p>Explore our collection of handcrafted clay products and bring artisan beauty into your home.</p>
        <a href="/products" className="cta-button">Shop Now</a>
      </section>
    </div>
  );
}
