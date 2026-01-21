const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Public routes
router.post('/submit', contactController.submitContactForm);
router.get('/info', contactController.getContactInfo);

// Admin routes (should be protected with auth middleware in production)
router.get('/inquiries', contactController.getContactInquiries);
router.put('/inquiries/:id', contactController.updateInquiryStatus);
router.delete('/inquiries/:id', contactController.deleteInquiry);

module.exports = router;
