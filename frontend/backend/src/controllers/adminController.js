const dataService = require('../services/dataService');
const { sendOrderConfirmation } = require('../utils/emailService');

// Products
const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, sku, stock, weight } = req.body;
    let imageUrl = req.body.image || null;

    // If file was uploaded, use the file path
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    if (!name || !price || !category) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, price, and category are required' 
      });
    }
    
    const product = dataService.addProduct({
      name,
      description,
      price: parseFloat(price),
      category,
      sku: sku || '',
      stock: parseInt(stock) || 0,
      image: imageUrl,
      weight: parseFloat(weight) || 0
    });
    
    res.status(201).json({ 
      success: true, 
      message: 'Product added successfully',
      product,
      imageUrl: imageUrl
    });
  } catch (error) {
    console.error('Add product error:', error);
    res.status(500).json({ success: false, message: 'Failed to add product', error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, sku, stock, weight } = req.body;
    let imageUrl = req.body.image;

    // If file was uploaded, use the file path
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }
    
    const product = dataService.updateProduct(id, {
      name,
      description,
      price: parseFloat(price),
      category,
      sku: sku || '',
      stock: parseInt(stock) || 0,
      ...(imageUrl && { image: imageUrl }),
      weight: parseFloat(weight) || 0
    });
    
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    
    res.json({ success: true, message: 'Product updated successfully', product, imageUrl });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ success: false, message: 'Failed to update product', error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    dataService.deleteProduct(id);
    
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete product' });
  }
};

// Orders
const getAllOrders = async (req, res) => {
  try {
    const orders = dataService.getAllOrders();
    
    res.json({ success: true, orders });
  } catch (error) {
    console.error('Get all orders error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch orders' });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    
    const order = dataService.getOrderById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    
    order.status = status;
    dataService.saveData();
    
    res.json({ success: true, message: 'Order status updated' });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ success: false, message: 'Failed to update order status' });
  }
};

// Coupons
const createCoupon = async (req, res) => {
  try {
    const { code, discount_percent, expires_at, usage_limit } = req.body;
    
    const coupon = dataService.addCoupon({
      code,
      discount_percent: parseInt(discount_percent),
      expires_at,
      usage_limit: parseInt(usage_limit) || null,
      active: true,
      usage_count: 0
    });
    
    res.status(201).json({ success: true, message: 'Coupon created successfully', coupon });
  } catch (error) {
    console.error('Create coupon error:', error);
    res.status(500).json({ success: false, message: 'Failed to create coupon' });
  }
};

const getCoupons = async (req, res) => {
  try {
    const coupons = dataService.getAllCoupons();
    
    res.json({ success: true, coupons });
  } catch (error) {
    console.error('Get coupons error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch coupons' });
  }
};

// Dashboard Stats
const getDashboardStats = async (req, res) => {
  try {
    const orders = dataService.getAllOrders();
    const products = dataService.getAllProducts();
    const users = dataService.getAllUsers().filter(u => u.role === 'customer');
    
    const completedOrders = orders.filter(o => o.status === 'completed');
    const totalRevenue = completedOrders.reduce((sum, o) => sum + (o.total || 0), 0);
    
    res.json({ 
      success: true, 
      stats: {
        totalOrders: orders.length,
        totalRevenue,
        totalCustomers: users.length,
        totalProducts: products.length
      }
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch dashboard stats' });
  }
};

module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllOrders,
  updateOrderStatus,
  createCoupon,
  getCoupons,
  getDashboardStats
};
