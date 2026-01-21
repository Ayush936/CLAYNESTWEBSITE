const dataService = require('../services/dataService');

const getAllProducts = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 12 } = req.query;
    
    let products = dataService.getAllProducts();
    
    // Filter by category
    if (category) {
      products = products.filter(p => p.category === category);
    }
    
    // Filter by search
    if (search) {
      const searchLower = search.toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(searchLower) || 
        p.description.toLowerCase().includes(searchLower)
      );
    }
    
    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const offset = (pageNum - 1) * limitNum;
    const paginatedProducts = products.slice(offset, offset + limitNum);
    
    res.json({ 
      success: true, 
      products: paginatedProducts,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: products.length
      }
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch products' });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const product = dataService.getProductById(id);
    
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    
    res.json({ success: true, product });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch product' });
  }
};

const getCategories = async (req, res) => {
  try {
    const products = dataService.getAllProducts();
    const categories = [...new Set(products.map(p => p.category))];
    
    res.json({ success: true, categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch categories' });
  }
};

const getCoupon = async (req, res) => {
  try {
    const { code } = req.params;
    
    // Get all coupons from dataService
    const allCoupons = dataService.getAllCoupons ? dataService.getAllCoupons() : [];
    const coupon = allCoupons.find(c => c.code === code);
    
    if (!coupon) {
      return res.status(404).json({ success: false, message: 'Coupon not found' });
    }
    
    // Check if coupon is active/expired
    if (coupon.expires_at && new Date(coupon.expires_at) < new Date()) {
      return res.status(400).json({ success: false, message: 'Coupon has expired' });
    }
    
    if (!coupon.active) {
      return res.status(400).json({ success: false, message: 'Coupon is not active' });
    }
    
    res.json({ success: true, coupon });
  } catch (error) {
    console.error('Get coupon error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch coupon' });
  }
};

// Export products as CSV
const exportProductsCSV = async (req, res) => {
  try {
    const products = dataService.getAllProducts();
    
    if (products.length === 0) {
      return res.status(404).json({ success: false, message: 'No products found' });
    }
    
    // Create CSV header
    const headers = ['ID', 'Name', 'Category', 'Price', 'Stock', 'Description', 'Image URL'];
    
    // Create CSV rows
    const rows = products.map(product => [
      product.id,
      `"${product.name || ''}"`,
      product.category || '',
      product.price || 0,
      product.stock || 0,
      `"${(product.description || '').replace(/"/g, '""')}"`,
      product.image || ''
    ]);
    
    // Combine headers and rows
    const csv = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="claynest_products.csv"');
    res.send(csv);
  } catch (error) {
    console.error('Export CSV error:', error);
    res.status(500).json({ success: false, message: 'Failed to export products' });
  }
};

// Export products as JSON
const exportProductsJSON = async (req, res) => {
  try {
    const products = dataService.getAllProducts();
    
    if (products.length === 0) {
      return res.status(404).json({ success: false, message: 'No products found' });
    }
    
    const exportData = {
      exportDate: new Date().toISOString(),
      totalProducts: products.length,
      products: products
    };
    
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename="claynest_products.json"');
    res.send(JSON.stringify(exportData, null, 2));
  } catch (error) {
    console.error('Export JSON error:', error);
    res.status(500).json({ success: false, message: 'Failed to export products' });
  }
};

module.exports = { getAllProducts, getProductById, getCategories, getCoupon, exportProductsCSV, exportProductsJSON };
