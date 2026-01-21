import React, { useState, useEffect, useContext, useCallback } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('inquiries');
  const [inquiries, setInquiries] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      if (activeTab === 'inquiries') {
        const response = await fetch('http://localhost:5000/api/contact/inquiries', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        if (data.success) {
          setInquiries(data.inquiries);
        }
      } else if (activeTab === 'orders') {
        const response = await fetch('http://localhost:5000/api/orders', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        if (data.success) {
          setOrders(data.orders);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }
    fetchData();
  }, [user, navigate, activeTab, fetchData]);

  const handleInquiryStatusUpdate = async (inquiryId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/contact/inquiries/${inquiryId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await response.json();
      if (data.success) {
        setInquiries(inquiries.map(inq => 
          inq.id === inquiryId ? { ...inq, status: newStatus } : inq
        ));
        alert('Status updated successfully');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  const handleDeleteInquiry = async (inquiryId) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;
    
    try {
      const response = await fetch(`http://localhost:5000/api/contact/inquiries/${inquiryId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setInquiries(inquiries.filter(inq => inq.id !== inquiryId));
        alert('Inquiry deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting inquiry:', error);
      alert('Failed to delete inquiry');
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <div className="admin-header-actions">
          <span>Welcome, {user?.name}</span>
          <button className="btn btn-secondary" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      <div className="admin-container">
        <aside className="admin-sidebar">
          <nav className="admin-nav">
            <button
              className={`nav-item ${activeTab === 'inquiries' ? 'active' : ''}`}
              onClick={() => setActiveTab('inquiries')}
            >
              📧 Contact Inquiries
            </button>
            <button
              className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              📦 Orders
            </button>
            <button
              className={`nav-item ${activeTab === 'products' ? 'active' : ''}`}
              onClick={() => setActiveTab('products')}
            >
              🏺 Products
            </button>
            <button
              className={`nav-item ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => setActiveTab('users')}
            >
              👥 Users
            </button>
            <button
              className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              ⚙️ Settings
            </button>
          </nav>
        </aside>

        <main className="admin-content">
          {activeTab === 'inquiries' && (
            <div className="admin-section">
              <div className="section-header">
                <h2>Contact Inquiries</h2>
                <span className="count-badge">{inquiries.length}</span>
              </div>

              {loading ? (
                <div className="loading">Loading inquiries...</div>
              ) : inquiries.length === 0 ? (
                <div className="empty-state">
                  <p>No inquiries yet</p>
                </div>
              ) : (
                <div className="inquiries-table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Subject</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inquiries.map(inquiry => (
                        <tr key={inquiry.id}>
                          <td>{inquiry.name}</td>
                          <td><a href={`mailto:${inquiry.email}`}>{inquiry.email}</a></td>
                          <td>{inquiry.phone || 'N/A'}</td>
                          <td>{inquiry.subject}</td>
                          <td><span className="badge">{inquiry.inquiryType || 'General'}</span></td>
                          <td>
                            <select
                              className="status-select"
                              value={inquiry.status}
                              onChange={(e) => handleInquiryStatusUpdate(inquiry.id, e.target.value)}
                            >
                              <option value="new">New</option>
                              <option value="in-progress">In Progress</option>
                              <option value="resolved">Resolved</option>
                              <option value="closed">Closed</option>
                            </select>
                          </td>
                          <td>{new Date(inquiry.createdAt).toLocaleDateString()}</td>
                          <td>
                            <button
                              className="btn-icon view-btn"
                              title="View details"
                              onClick={() => alert(`Message: ${inquiry.message}`)}
                            >
                              👁️
                            </button>
                            <button
                              className="btn-icon delete-btn"
                              title="Delete"
                              onClick={() => handleDeleteInquiry(inquiry.id)}
                            >
                              🗑️
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="admin-section">
              <div className="section-header">
                <h2>Orders</h2>
                <span className="count-badge">{orders.length}</span>
              </div>

              {loading ? (
                <div className="loading">Loading orders...</div>
              ) : orders.length === 0 ? (
                <div className="empty-state">
                  <p>No orders yet</p>
                </div>
              ) : (
                <div className="orders-table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Items</th>
                        <th>Total</th>
                        <th>Payment</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(order => (
                        <tr key={order.id}>
                          <td>#{order.id}</td>
                          <td>{order.fullName}</td>
                          <td>{order.items?.length || 0}</td>
                          <td>₹{order.total?.toFixed(2) || '0.00'}</td>
                          <td><span className="badge">{order.paymentMethod || 'N/A'}</span></td>
                          <td><span className="status-badge">{order.status || 'pending'}</span></td>
                          <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                          <td>
                            <button
                              className="btn-icon view-btn"
                              title="View details"
                              onClick={() => alert(`Order details for #${order.id}`)}
                            >
                              👁️
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'products' && (
            <div className="admin-section">
              <div className="section-header">
                <h2>Products Management</h2>
                <button className="btn btn-primary">+ Add Product</button>
              </div>
              <div className="coming-soon">
                <p>Products management coming soon...</p>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="admin-section">
              <div className="section-header">
                <h2>Users Management</h2>
              </div>
              <div className="coming-soon">
                <p>Users management coming soon...</p>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="admin-section">
              <div className="section-header">
                <h2>Settings</h2>
              </div>
              <div className="settings-form">
                <h3>Business Information</h3>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" value="ayushsinghrajput643@gmail.com" readOnly />
                </div>
                <div className="form-group">
                  <label>WhatsApp Number</label>
                  <input type="tel" value="+91 9369 635 323" readOnly />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input type="tel" value="+91 9369 635 323" readOnly />
                </div>
                <button className="btn btn-primary">Update Settings</button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
