const dataService = require('../services/dataService');

// Submit contact form
const submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, subject, message, inquiryType } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide name, email, subject, and message' 
      });
    }

    // Create contact inquiry
    const inquiry = {
      id: Date.now().toString(),
      name,
      email,
      phone: phone || '',
      subject,
      message,
      inquiryType: inquiryType || 'general',
      status: 'new',
      createdAt: new Date().toISOString()
    };

    // Save to data service
    const allInquiries = dataService.getContactInquiries ? dataService.getContactInquiries() : [];
    allInquiries.push(inquiry);
    
    // Store inquiries (using a simple in-memory storage for now)
    if (!global.contactInquiries) {
      global.contactInquiries = [];
    }
    global.contactInquiries.push(inquiry);

    // In production, send email via nodemailer here
    console.log('New contact inquiry:', inquiry);

    res.json({ 
      success: true, 
      message: 'Thank you for your inquiry. We will contact you shortly.',
      inquiryId: inquiry.id
    });
  } catch (error) {
    console.error('Submit contact form error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to submit contact form' 
    });
  }
};

// Get all contact inquiries (admin only)
const getContactInquiries = async (req, res) => {
  try {
    const { status, limit = 50, page = 1 } = req.query;

    // Get all inquiries
    let inquiries = global.contactInquiries || [];

    // Filter by status if provided
    if (status) {
      inquiries = inquiries.filter(i => i.status === status);
    }

    // Sort by newest first
    inquiries = inquiries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const offset = (pageNum - 1) * limitNum;
    const paginatedInquiries = inquiries.slice(offset, offset + limitNum);

    res.json({
      success: true,
      inquiries: paginatedInquiries,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: inquiries.length
      }
    });
  } catch (error) {
    console.error('Get contact inquiries error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch contact inquiries' 
    });
  }
};

// Update inquiry status
const updateInquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide status' 
      });
    }

    // Find and update inquiry
    const inquiries = global.contactInquiries || [];
    const inquiryIndex = inquiries.findIndex(i => i.id === id);

    if (inquiryIndex === -1) {
      return res.status(404).json({ 
        success: false, 
        message: 'Inquiry not found' 
      });
    }

    inquiries[inquiryIndex].status = status;
    inquiries[inquiryIndex].updatedAt = new Date().toISOString();

    res.json({ 
      success: true, 
      message: 'Inquiry status updated',
      inquiry: inquiries[inquiryIndex]
    });
  } catch (error) {
    console.error('Update inquiry status error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update inquiry status' 
    });
  }
};

// Delete inquiry
const deleteInquiry = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete inquiry
    let inquiries = global.contactInquiries || [];
    const inquiryIndex = inquiries.findIndex(i => i.id === id);

    if (inquiryIndex === -1) {
      return res.status(404).json({ 
        success: false, 
        message: 'Inquiry not found' 
      });
    }

    inquiries.splice(inquiryIndex, 1);
    global.contactInquiries = inquiries;

    res.json({ 
      success: true, 
      message: 'Inquiry deleted' 
    });
  } catch (error) {
    console.error('Delete inquiry error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to delete inquiry' 
    });
  }
};

// Get contact info
const getContactInfo = async (req, res) => {
  try {
    const contactInfo = {
      email: 'ayushsinghrajput643@gmail.com',
      whatsapp: '+91 93696 35323',
      phone: '+91 93696 35323',
      businessName: 'ClayNest',
      businessType: 'Wholesale Ceramic Products',
      hours: {
        monday_friday: '9:00 AM - 6:00 PM',
        saturday: '10:00 AM - 4:00 PM',
        sunday: 'Closed'
      }
    };

    res.json({ success: true, contactInfo });
  } catch (error) {
    console.error('Get contact info error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch contact info' 
    });
  }
};

module.exports = {
  submitContactForm,
  getContactInquiries,
  updateInquiryStatus,
  deleteInquiry,
  getContactInfo
};
