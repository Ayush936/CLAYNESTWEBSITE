import React, { useState } from 'react';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    inquiryType: 'wholesale',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (data.success) {
        setMessage('Thank you! Your inquiry has been submitted. We will contact you soon.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          inquiryType: 'wholesale',
          message: ''
        });
      } else {
        setMessage('Error: ' + (data.message || 'Failed to submit form'));
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setMessage('Error submitting form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <h1>Contact ClayNest</h1>
        <p className="contact-intro">Get in touch with our wholesale team for bulk orders and partnerships</p>

        <div className="contact-content">
          {/* Contact Information */}
          <div className="contact-info">
            <h2>Get in Touch</h2>
            
            <div className="info-item">
              <h3>📧 Email</h3>
              <p>
                <a href="mailto:ayushsinghrajput643@gmail.com">
                  ayushsinghrajput643@gmail.com
                </a>
              </p>
              <small>Response within 24 hours</small>
            </div>

            <div className="info-item">
              <h3>💬 WhatsApp</h3>
              <p>
                <a href="https://wa.me/919369635323?text=Hi%20ClayNest,%20I%20am%20interested%20in%20your%20products" 
                   target="_blank" 
                   rel="noopener noreferrer">
                  +91 93696 35323
                </a>
              </p>
              <small>Quick response for urgent inquiries</small>
            </div>

            <div className="info-item">
              <h3>☎️ Phone</h3>
              <p>
                <a href="tel:+919369635323">
                  +91 93696 35323
                </a>
              </p>
              <small>Monday-Friday: 9:00 AM - 6:00 PM IST</small>
            </div>

            <div className="info-item">
              <h3>📍 Business Hours</h3>
              <ul className="hours-list">
                <li>Monday - Friday: 9:00 AM - 6:00 PM IST</li>
                <li>Saturday: 10:00 AM - 4:00 PM IST</li>
                <li>Sunday: Closed</li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-container">
            <h2>Send us a Message</h2>
            
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your Name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              <div className="form-group">
                <label htmlFor="inquiryType">Inquiry Type *</label>
                <select
                  id="inquiryType"
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleChange}
                  required
                >
                  <option value="wholesale">Wholesale Inquiry</option>
                  <option value="bulk_order">Bulk Order</option>
                  <option value="partnership">Partnership</option>
                  <option value="custom_design">Custom Design</option>
                  <option value="support">Support</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="What is this about?"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell us more about your inquiry..."
                  rows="6"
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="btn-submit"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>

              {message && (
                <div className={`form-message ${message.includes('Thank you') ? 'success' : 'error'}`}>
                  {message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
