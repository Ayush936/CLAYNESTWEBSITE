import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>ClayNest</h3>
          <p>Your premier destination for authentic handcrafted clay products</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/products">Products</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/faq">FAQ</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Customer Service</h4>
          <ul>
            <li><a href="/shipping">Shipping Info</a></li>
            <li><a href="/returns">Returns & Exchanges</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms & Conditions</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: <a href="mailto:ayushsinghrajput643@gmail.com">ayushsinghrajput643@gmail.com</a></p>
          <p>WhatsApp: <a href="https://wa.me/919369635323?text=Hi%20ClayNest" target="_blank" rel="noopener noreferrer">+91 93696 35323</a></p>
          <p>Phone: <a href="tel:+919369635323"><strong>+91 93696 35323</strong></a></p>
          <p>Hours: Mon-Fri 9AM-6PM IST</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 ClayNest. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
