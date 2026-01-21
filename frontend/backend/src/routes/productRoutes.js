const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getAllProducts);
router.get('/categories', productController.getCategories);
router.get('/coupon/:code', productController.getCoupon);
router.get('/export/csv', productController.exportProductsCSV);
router.get('/export/json', productController.exportProductsJSON);
router.get('/:id', productController.getProductById);

module.exports = router;
