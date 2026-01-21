import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const register = (data) => api.post('/auth/register', data);
export const login = (data) => api.post('/auth/login', data);

// Products
export const getProducts = (params) => api.get('/products', { params });
export const getAllProducts = (params) => api.get('/products', { params });
export const getProduct = (id) => api.get(`/products/${id}`);
export const getCategories = () => api.get('/products/categories');

// Cart
export const getCart = () => api.get('/cart');
export const addToCart = (data) => api.post('/cart/add', data);
export const removeFromCart = (id) => api.delete(`/cart/${id}`);
export const updateCartItem = (id, data) => api.put(`/cart/${id}`, data);
export const clearCart = () => api.delete('/cart');

// Wishlist
export const getWishlist = () => api.get('/wishlist');
export const addToWishlist = (data) => api.post('/wishlist/add', data);
export const removeFromWishlist = (id) => api.delete(`/wishlist/${id}`);

// Orders
export const createOrder = (data) => api.post('/orders/create', data);
export const getOrders = () => api.get('/orders');
export const getOrder = (id) => api.get(`/orders/${id}`);

// Payments
export const createPaymentOrder = (data) => api.post('/payments/create-order', data);
export const verifyPayment = (data) => api.post('/payments/verify', data);

// Shipping
export const trackShipment = (orderId) => api.get(`/shipping/track/${orderId}`);

// User
export const getUserProfile = () => api.get('/users/profile');
export const updateUserProfile = (data) => api.put('/users/profile', data);

// Admin
export const getAdminStats = () => api.get('/admin/dashboard/stats');
export const addProduct = (data) => {
  const config = { headers: { 'Content-Type': 'multipart/form-data' } };
  return api.post('/admin/products', data, config);
};
export const updateProduct = (id, data) => {
  const config = { headers: { 'Content-Type': 'multipart/form-data' } };
  return api.put(`/admin/products/${id}`, data, config);
};
export const deleteProduct = (id) => api.delete(`/admin/products/${id}`);
export const getAllOrders = () => api.get('/admin/orders');
export const updateOrderStatus = (id, data) => api.put(`/admin/orders/${id}`, data);
export const createCoupon = (data) => api.post('/admin/coupons', data);
export const getCoupons = () => api.get('/admin/coupons');

export default api;
