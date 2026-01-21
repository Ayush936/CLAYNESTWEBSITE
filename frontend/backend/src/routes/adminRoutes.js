const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { adminMiddleware } = require('../middleware/auth');
const upload = require('../utils/fileUpload');
const adminController = require('../controllers/adminController');

// Product routes
router.post('/products', auth, adminMiddleware, upload.single('image'), adminController.addProduct);
router.put('/products/:id', auth, adminMiddleware, upload.single('image'), adminController.updateProduct);
router.delete('/products/:id', auth, adminMiddleware, adminController.deleteProduct);

// Order routes
router.get('/orders', auth, adminMiddleware, adminController.getAllOrders);
router.put('/orders/:id', auth, adminMiddleware, adminController.updateOrderStatus);

// Coupon routes
router.post('/coupons', auth, adminMiddleware, adminController.createCoupon);
router.get('/coupons', auth, adminMiddleware, adminController.getCoupons);

// Dashboard
router.get('/dashboard/stats', auth, adminMiddleware, adminController.getDashboardStats);

module.exports = router;
