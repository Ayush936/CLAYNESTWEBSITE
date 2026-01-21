import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import '../styles/Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleCheckout = () => {
    if (!user) {
      alert('Please login to proceed with checkout');
      navigate('/login');
      return;
    }

    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/checkout');
    }, 500);
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  const handleQuantityChange = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, quantity);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="empty-cart-container">
          <h2>Your Cart is Empty</h2>
          <p>Add some ceramic products to get started</p>
          <button className="btn btn-primary" onClick={() => navigate('/products')}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const cartTotal = getCartTotal();

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>
      
      <div className="cart-container">
        <div className="cart-items-section">
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="item-image" />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="item-description">{item.description?.substring(0, 80)}...</p>
                  <p className="item-price">₹{item.price.toFixed(2)}</p>
                </div>
                <div className="item-quantity">
                  <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                  <input 
                    type="number" 
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                    min="1"
                  />
                  <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                </div>
                <div className="item-total">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </div>
                <button 
                  className="btn-remove"
                  onClick={() => handleRemoveItem(item.id)}
                  title="Remove from cart"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="cart-summary-section">
          <div className="cart-summary">
            <h3>Order Summary</h3>
            
            <div className="summary-item">
              <span>Subtotal ({cartItems.length} items):</span>
              <span>₹{cartTotal.toFixed(2)}</span>
            </div>

            <div className="summary-item">
              <span>Shipping:</span>
              <span className="free">Free</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-total">
              <span>Total:</span>
              <span>₹{cartTotal.toFixed(2)}</span>
            </div>

            <button 
              className="btn btn-primary btn-checkout"
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Proceed to Checkout'}
            </button>

            <button 
              className="btn btn-secondary btn-continue"
              onClick={() => navigate('/products')}
            >
              Continue Shopping
            </button>
          </div>

          <div className="cart-info">
            <h4>Benefits</h4>
            <ul>
              <li>✓ Free shipping on all orders</li>
              <li>✓ Secure checkout</li>
              <li>✓ Easy returns</li>
              <li>✓ 100% authentic products</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
