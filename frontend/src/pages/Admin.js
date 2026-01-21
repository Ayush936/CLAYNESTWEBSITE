import React, { useState, useEffect, useContext } from 'react';
import {
  getAdminStats,
  getAllOrders,
  updateOrderStatus,
  addProduct,
  updateProduct,
  deleteProduct,
  getCoupons,
  createCoupon,
  getAllProducts
} from '../api/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Admin.css';

const Admin = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);

  // Product form state
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Ceramic',
    sku: '',
    stock: '',
    weight: '',
    image: null
  });
  const [editingProductId, setEditingProductId] = useState(null);

  // Coupon form state
  const [couponForm, setCouponForm] = useState({
    code: '',
    discountPercent: '',
    expiresAt: ''
  });

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/');
      return;
    }
    loadDashboard();
  }, [user, navigate]);

  const loadDashboard = async () => {
    setLoading(true);
    try {
      const statsResponse = await getAdminStats();
      if (statsResponse.data.success) {
        setStats(statsResponse.data.stats);
      }

      const ordersResponse = await getAllOrders();
      if (ordersResponse.data.success) {
        setOrders(ordersResponse.data.orders);
      }

      const productsResponse = await getAllProducts();
      if (productsResponse.data.success) {
        setProducts(productsResponse.data.products);
      }

      const couponsResponse = await getCoupons();
      if (couponsResponse.data.success) {
        setCoupons(couponsResponse.data.coupons);
      }
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, { status: newStatus });
      loadDashboard();
      alert('✓ Order status updated');
    } catch (error) {
      alert('✗ Failed to update order status');
    }
  };

  const handleProductFormChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setProductForm({
        ...productForm,
        [name]: files[0]
      });
    } else {
      setProductForm({
        ...productForm,
        [name]: value
      });
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!productForm.name || !productForm.price || !productForm.category) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', productForm.name);
      formData.append('description', productForm.description);
      formData.append('price', productForm.price);
      formData.append('category', productForm.category);
      formData.append('sku', productForm.sku);
      formData.append('stock', productForm.stock || 0);
      formData.append('weight', productForm.weight || 0);
      if (productForm.image) {
        formData.append('image', productForm.image);
      }

      if (editingProductId) {
        await updateProduct(editingProductId, formData);
        alert('✓ Product updated successfully');
        setEditingProductId(null);
      } else {
        await addProduct(formData);
        alert('✓ Product added successfully');
      }

      setProductForm({
        name: '',
        description: '',
        price: '',
        category: 'Ceramic',
        sku: '',
        stock: '',
        weight: '',
        image: null
      });

      loadDashboard();
    } catch (error) {
      alert('✗ Failed to save product: ' + error.message);
    }
  };

  const handleEditProduct = (product) => {
    setProductForm({
      name: product.name,
      description: product.description || '',
      price: product.price,
      category: product.category,
      sku: product.sku || '',
      stock: product.stock,
      weight: product.weight || '',
      image: null
    });
    setEditingProductId(product.id);
    setActiveTab('products');
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(productId);
        alert('✓ Product deleted successfully');
        loadDashboard();
      } catch (error) {
        alert('✗ Failed to delete product');
      }
    }
  };

  const handleCreateCoupon = async (e) => {
    e.preventDefault();
    if (!couponForm.code || !couponForm.discountPercent) {
      alert('Please fill in all fields');
      return;
    }

    try {
      await createCoupon({
        code: couponForm.code,
        discountPercent: parseInt(couponForm.discountPercent),
        expiresAt: couponForm.expiresAt || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      });
      alert('✓ Coupon created successfully');
      setCouponForm({ code: '', discountPercent: '', expiresAt: '' });
      loadDashboard();
    } catch (error) {
      alert('✗ Failed to create coupon');
    }
  };

  if (loading) return <div className="admin-loading">Loading Admin Panel...</div>;

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>🏛️ Admin Control Panel</h1>
        <p>ClayNest Management System | Phone: +91 9369635323</p>
      </div>

      <div className="tabs">
        <button
          className={activeTab === 'dashboard' ? 'tab-active' : 'tab-btn'}
          onClick={() => setActiveTab('dashboard')}
        >
          📊 Dashboard
        </button>
        <button
          className={activeTab === 'products' ? 'tab-active' : 'tab-btn'}
          onClick={() => setActiveTab('products')}
        >
          🏺 Products
        </button>
        <button
          className={activeTab === 'orders' ? 'tab-active' : 'tab-btn'}
          onClick={() => setActiveTab('orders')}
        >
          📦 Orders
        </button>
        <button
          className={activeTab === 'coupons' ? 'tab-active' : 'tab-btn'}
          onClick={() => setActiveTab('coupons')}
        >
          🎟️ Coupons
        </button>
      </div>

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && stats && (
        <div className="dashboard-tab">
          <h2>Dashboard Overview</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Total Orders</h3>
              <p className="stat-number">{stats.totalOrders}</p>
            </div>
            <div className="stat-card">
              <h3>Total Revenue</h3>
              <p className="stat-number">₹{stats.totalRevenue?.toLocaleString()}</p>
            </div>
            <div className="stat-card">
              <h3>Total Customers</h3>
              <p className="stat-number">{stats.totalCustomers}</p>
            </div>
            <div className="stat-card">
              <h3>Total Products</h3>
              <p className="stat-number">{stats.totalProducts}</p>
            </div>
          </div>
        </div>
      )}

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div className="products-tab">
          <h2>{editingProductId ? 'Edit Product' : 'Add New Ceramic Product'}</h2>

          <form className="product-form" onSubmit={handleAddProduct}>
            <div className="form-group">
              <label>Product Name *</label>
              <input
                type="text"
                name="name"
                value={productForm.name}
                onChange={handleProductFormChange}
                placeholder="e.g., Large Ceramic Pot"
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={productForm.description}
                onChange={handleProductFormChange}
                placeholder="Product description..."
                rows="4"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Price (₹) *</label>
                <input
                  type="number"
                  name="price"
                  value={productForm.price}
                  onChange={handleProductFormChange}
                  placeholder="0"
                  required
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select name="category" value={productForm.category} onChange={handleProductFormChange}>
                  <option value="Ceramic">Ceramic</option>
                  <option value="Pottery">Pottery</option>
                  <option value="Terracotta">Terracotta</option>
                  <option value="Sculpture">Sculpture</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>SKU</label>
                <input
                  type="text"
                  name="sku"
                  value={productForm.sku}
                  onChange={handleProductFormChange}
                  placeholder="e.g., POT-001"
                />
              </div>

              <div className="form-group">
                <label>Stock Quantity</label>
                <input
                  type="number"
                  name="stock"
                  value={productForm.stock}
                  onChange={handleProductFormChange}
                  placeholder="0"
                />
              </div>

              <div className="form-group">
                <label>Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  name="weight"
                  value={productForm.weight}
                  onChange={handleProductFormChange}
                  placeholder="0.0"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Product Image</label>
              <input
                type="file"
                name="image"
                onChange={handleProductFormChange}
                accept="image/*"
              />
              {productForm.image && <p className="file-name">✓ File selected: {productForm.image.name}</p>}
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {editingProductId ? 'Update Product' : 'Add Product'}
              </button>
              {editingProductId && (
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    setEditingProductId(null);
                    setProductForm({
                      name: '',
                      description: '',
                      price: '',
                      category: 'Ceramic',
                      sku: '',
                      stock: '',
                      weight: '',
                      image: null
                    });
                  }}
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>

          <div className="products-list">
            <h3>All Products ({products.length})</h3>
            {products.length === 0 ? (
              <p>No products yet. Add your first ceramic product!</p>
            ) : (
              <table className="products-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td>₹{product.price}</td>
                      <td>{product.stock}</td>
                      <td>
                        <button
                          className="btn-edit"
                          onClick={() => handleEditProduct(product)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="orders-tab">
          <h2>Orders Management ({orders.length})</h2>
          {orders.length === 0 ? (
            <p>No orders yet.</p>
          ) : (
            <div className="orders-list">
              {orders.map((order) => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <h4>Order #{order.id}</h4>
                    <span className={`status ${order.status}`}>{order.status}</span>
                  </div>
                  <div className="order-details">
                    <p><strong>Amount:</strong> ₹{order.total}</p>
                    <p><strong>Status:</strong> {order.status}</p>
                    <p><strong>Payment:</strong> {order.payment_status}</p>
                  </div>
                  <div className="order-actions">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                      className="status-select"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Coupons Tab */}
      {activeTab === 'coupons' && (
        <div className="coupons-tab">
          <h2>Manage Coupons</h2>

          <form className="coupon-form" onSubmit={handleCreateCoupon}>
            <div className="form-row">
              <div className="form-group">
                <label>Coupon Code *</label>
                <input
                  type="text"
                  value={couponForm.code}
                  onChange={(e) => setCouponForm({ ...couponForm, code: e.target.value })}
                  placeholder="e.g., SAVE10"
                  required
                />
              </div>

              <div className="form-group">
                <label>Discount % *</label>
                <input
                  type="number"
                  value={couponForm.discountPercent}
                  onChange={(e) => setCouponForm({ ...couponForm, discountPercent: e.target.value })}
                  placeholder="10"
                  required
                />
              </div>

              <div className="form-group">
                <label>Expires At</label>
                <input
                  type="datetime-local"
                  value={couponForm.expiresAt}
                  onChange={(e) => setCouponForm({ ...couponForm, expiresAt: e.target.value })}
                />
              </div>
            </div>

            <button type="submit" className="btn-primary">Create Coupon</button>
          </form>

          <div className="coupons-list">
            <h3>Active Coupons ({coupons.length})</h3>
            {coupons.length === 0 ? (
              <p>No coupons created yet.</p>
            ) : (
              <table className="coupons-table">
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Discount</th>
                    <th>Expires</th>
                    <th>Usage</th>
                  </tr>
                </thead>
                <tbody>
                  {coupons.map((coupon) => (
                    <tr key={coupon.id}>
                      <td><strong>{coupon.code}</strong></td>
                      <td>{coupon.discount_percent}%</td>
                      <td>{coupon.expires_at ? new Date(coupon.expires_at).toLocaleDateString() : 'No expiry'}</td>
                      <td>{coupon.usage_count || 0}/{coupon.usage_limit || '∞'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
