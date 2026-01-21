import React, { useEffect, useState } from 'react';
import { getOrders, trackShipment } from '../api/api';
import '../styles/Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await getOrders();
      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTrackOrder = async (orderId) => {
    try {
      const response = await trackShipment(orderId);
      if (response.data.success) {
        alert(JSON.stringify(response.data.tracking, null, 2));
      }
    } catch (error) {
      alert('Tracking information not available yet');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="orders-page">
      <h1>My Orders</h1>
      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <span>Order #{order.id}</span>
                <span className={`status ${order.status}`}>{order.status}</span>
              </div>
              <div className="order-details">
                <p>Date: {new Date(order.created_at).toLocaleDateString()}</p>
                <p>Total: ₹{order.total}</p>
                <p>Items: {order.items_count}</p>
              </div>
              <div className="order-actions">
                <button onClick={() => handleTrackOrder(order.id)} className="btn-secondary">
                  Track Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
