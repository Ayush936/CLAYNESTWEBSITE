import React, { useContext, useEffect, useState, useCallback } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Orders.css';

const UserOrders = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/api/orders/user', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setOrders(data.orders || []);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchOrders();
  }, [user, navigate, fetchOrders]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
      case 'delivered':
        return 'status-success';
      case 'pending':
      case 'processing':
        return 'status-pending';
      case 'cancelled':
        return 'status-danger';
      default:
        return 'status-info';
    }
  };

  if (!user) {
    return (
      <div className="orders-page">
        <div className="empty-state">
          <h2>Please login to view orders</h2>
          <button className="btn btn-primary" onClick={() => navigate('/login')}>
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-header">
        <h1>My Orders</h1>
        <p>Manage and track your orders</p>
      </div>

      {loading ? (
        <div className="loading">Loading your orders...</div>
      ) : orders.length === 0 ? (
        <div className="empty-orders">
          <div className="empty-icon">📦</div>
          <h2>No Orders Yet</h2>
          <p>Start shopping to place your first order</p>
          <button className="btn btn-primary" onClick={() => navigate('/products')}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <h3>Order #{order.id}</h3>
                  <p className="order-date">{new Date(order.createdAt).toLocaleDateString('en-IN')}</p>
                </div>
                <div className={`order-status ${getStatusColor(order.status)}`}>
                  {order.status?.toUpperCase() || 'PENDING'}
                </div>
              </div>

              <div className="order-items">
                <h4>Items ({order.items?.length || 0})</h4>
                {order.items?.map((item, idx) => (
                  <div key={idx} className="order-item">
                    <div className="item-details">
                      <p className="item-name">{item.name}</p>
                      <p className="item-qty">Qty: {item.quantity}</p>
                    </div>
                    <p className="item-price">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="order-summary">
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>₹{order.total?.toFixed(2) || '0.00'}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping:</span>
                  <span className="free">FREE</span>
                </div>
                <div className="summary-divider"></div>
                <div className="summary-total">
                  <span>Total Amount:</span>
                  <span>₹{order.total?.toFixed(2) || '0.00'}</span>
                </div>
              </div>

              <div className="order-details">
                <div className="detail-group">
                  <h5>Delivery Address</h5>
                  <p>{order.address}</p>
                  <p>{order.city}, {order.zipCode}</p>
                  <p>📞 {order.phone}</p>
                </div>
                <div className="detail-group">
                  <h5>Payment Method</h5>
                  <p>{order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Card/Online Payment'}</p>
                </div>
              </div>

              <div className="order-actions">
                <button className="btn btn-secondary">
                  Track Order
                </button>
                <button className="btn btn-secondary">
                  Download Invoice
                </button>
                <button className="btn btn-secondary">
                  Return Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrders;
