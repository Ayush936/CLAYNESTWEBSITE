const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const shippingController = require('../controllers/shippingController');

router.get('/track/:orderId', auth, shippingController.trackShipment);

module.exports = router;
