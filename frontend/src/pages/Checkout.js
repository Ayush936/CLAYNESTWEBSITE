import React, { useState, useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import '../styles/Checkout.css';

const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const { user, token } = useContext(AuthContext);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    paymentMethod: 'cod'
  });

  const [couponCode, setCouponCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      }));
    }
  }, [user]);

  const calculateTotal = () => {
    return (
      cartItems.reduce((total, item) => total + item.price * item.quantity, 0) - discountAmount
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const applyCoupon = async () => {
    try {
      const response = await axios.get(`/api/products/coupon/${couponCode}`);
      if (response.data.success) {
        const coupon = response.data.coupon;
        const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
        const discount = (subtotal * coupon.discount_percent) / 100;
        setDiscountAmount(discount);
        setDiscountApplied(true);
        alert(`Coupon applied! Discount: ₹${discount.toFixed(2)}`);
      }
    } catch (error) {
      alert('Invalid coupon code');
    }
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address || !formData.city) {
      alert('Please fill all required fields');
      return;
    }
    setStep(2);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create order
      const orderResponse = await axios.post('/api/orders/create', {
        userId: user?.id,
        items: cartItems,
        shippingAddress: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        phone: formData.phone,
        couponCode: couponCode,
        paymentMethod: formData.paymentMethod,
        totalAmount: calculateTotal()
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (orderResponse.data.success) {
        setOrderId(orderResponse.data.orderId);

        if (formData.paymentMethod === 'razorpay') {
          initializeRazorpay(orderResponse.data);
        } else {
          setStep(3);
        }
      }
    } catch (error) {
      alert('Failed to create order: ' + error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const initializeRazorpay = async (orderData) => {
    try {
      setPaymentProcessing(true);
      
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => {
        const options = {
          key: orderData.razorpayKeyId || 'rzp_test_1IfKJSy3wIqA4s',
          amount: Math.round(calculateTotal() * 100),
          currency: 'INR',
          name: 'ClayNest Ceramics',
          description: 'Ceramic Products Order',
          order_id: orderData.paymentOrder.id,
          handler: async (response) => {
            try {
              const verifyResponse = await axios.post('/api/orders/verify-payment', {
                orderId: orderId,
                paymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature
              }, {
                headers: { Authorization: `Bearer ${token}` }
              });

              if (verifyResponse.data.success) {
                clearCart();
                alert('Payment successful! Order confirmed.');
                setStep(3);
              }
            } catch (error) {
              alert('Payment verification failed');
            }
          },
          prefill: {
            name: formData.fullName,
            email: formData.email,
            contact: formData.phone
          },
          theme: {
            color: '#8b7355'
          }
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      };
      document.body.appendChild(script);
    } catch (error) {
      alert('Failed to initialize payment');
    } finally {
      setPaymentProcessing(false);
    }
  };

  if (cartItems.length === 0 && step === 1) {
    return (
      <div className="checkout-container">
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Add some ceramic products to proceed</p>
          <a href="/products" className="btn btn-primary">Continue Shopping</a>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h1>Checkout</h1>
        <div className="steps">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>
            <span>1</span>
            <p>Shipping</p>
          </div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>
            <span>2</span>
            <p>Payment</p>
          </div>
          <div className={`step ${step >= 3 ? 'active' : ''}`}>
            <span>3</span>
            <p>Confirmation</p>
          </div>
        </div>
      </div>

      <div className="checkout-content">
        <div className="checkout-main">
          {step === 1 && (
            <form onSubmit={handleShippingSubmit} className="checkout-form">
              <h2>Shipping Information</h2>
              
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  placeholder="John Doe"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="your@email.com"
                  />
                </div>
                <div className="form-group">
                  <label>Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="9876543210"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Address *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  placeholder="Street address"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    placeholder="City"
                  />
                </div>
                <div className="form-group">
                  <label>State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="State"
                  />
                </div>
                <div className="form-group">
                  <label>Zip Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="201301"
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-lg">
                Continue to Payment
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handlePaymentSubmit} className="checkout-form">
              <h2>Payment Method</h2>
              
              <div className="payment-options">
                <div className="payment-option">
                  <input
                    type="radio"
                    id="cod"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="cod">
                    <span className="radio-label">Cash on Delivery</span>
                    <span className="radio-desc">Pay when you receive your order</span>
                  </label>
                </div>

                <div className="payment-option">
                  <input
                    type="radio"
                    id="razorpay"
                    name="paymentMethod"
                    value="razorpay"
                    checked={formData.paymentMethod === 'razorpay'}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="razorpay">
                    <span className="radio-label">Razorpay (Credit/Debit Card, UPI, Wallet)</span>
                    <span className="radio-desc">Secure online payment</span>
                  </label>
                </div>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary btn-lg"
                disabled={loading || paymentProcessing}
              >
                {loading ? 'Processing...' : 'Place Order'}
              </button>
            </form>
          )}

          {step === 3 && (
            <div className="order-confirmation">
              <div className="confirmation-success">
                <svg className="checkmark" viewBox="0 0 52 52">
                  <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
                  <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.6" />
                </svg>
                <h2>Order Confirmed!</h2>
                <p>Your order has been placed successfully</p>
                <p className="order-id">Order ID: <strong>#{orderId}</strong></p>
              </div>

              <div className="confirmation-details">
                <h3>What's Next?</h3>
                <ul>
                  <li>✓ Order confirmation email has been sent</li>
                  <li>✓ We'll prepare your order for shipment</li>
                  <li>✓ You'll receive tracking information via email</li>
                  <li>✓ Expected delivery in 5-7 business days</li>
                </ul>
              </div>

              <div className="confirmation-actions">
                <a href="/products" className="btn btn-primary">Continue Shopping</a>
                <a href={`/orders/${orderId}`} className="btn btn-secondary">View Order</a>
              </div>
            </div>
          )}
        </div>

        <div className="checkout-summary">
          <h3>Order Summary</h3>
          <div className="summary-items">
            {cartItems.map(item => (
              <div key={item.id} className="summary-item">
                <div className="item-info">
                  <p className="item-name">{item.name}</p>
                  <p className="item-qty">Qty: {item.quantity}</p>
                </div>
                <p className="item-price">₹{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          {step <= 2 && (
            <div className="coupon-section">
              <input
                type="text"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <button type="button" onClick={applyCoupon} className="btn btn-sm">
                Apply
              </button>
              {discountApplied && (
                <div className="discount-applied">
                  Discount Applied: ₹{discountAmount.toFixed(2)}
                </div>
              )}
            </div>
          )}

          <div className="summary-totals">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>₹{cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</span>
            </div>
            {discountApplied && (
              <div className="summary-row discount">
                <span>Discount:</span>
                <span>-₹{discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="summary-row">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>₹{calculateTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
