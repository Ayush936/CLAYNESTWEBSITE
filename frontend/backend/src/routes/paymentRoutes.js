const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const paymentController = require('../controllers/paymentController');

router.post('/create-order', auth, paymentController.createPaymentOrder);
router.post('/verify', auth, paymentController.verifyPayment);

module.exports = router;
