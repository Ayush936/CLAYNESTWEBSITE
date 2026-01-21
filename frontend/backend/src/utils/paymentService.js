const crypto = require('crypto');

// Razorpay Payment Service
// Using test keys - replace with actual keys in production

const createOrder = async (amount, currency = 'INR', receipt) => {
  try {
    // In production, use actual Razorpay SDK
    // For now, create a mock order object
    const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    return {
      id: orderId,
      entity: 'order',
      amount: Math.round(amount * 100), // in paise
      amount_paid: 0,
      amount_due: Math.round(amount * 100),
      currency: currency,
      receipt: receipt || `receipt_${Date.now()}`,
      status: 'created',
      attempts: 0,
      notes: {},
      created_at: Math.floor(Date.now() / 1000)
    };
  } catch (error) {
    console.error('Order creation error:', error);
    throw error;
  }
};

const verifyPayment = async (razorpayOrderId, razorpayPaymentId, razorpaySignature) => {
  try {
    const body = razorpayOrderId + '|' + razorpayPaymentId;
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'test_secret_key')
      .update(body)
      .digest('hex');
    
    return generatedSignature === razorpaySignature;
  } catch (error) {
    console.error('Payment verification error:', error);
    return false;
  }
};

const createPaymentLink = async (customerId, amount, currency = 'INR') => {
  try {
    // Mock payment link for testing
    const paymentLinkId = `plink_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    return {
      id: paymentLinkId,
      entity: 'payment_link',
      accept_partial: true,
      amount: Math.round(amount * 100),
      amount_paid: 0,
      cancelled_at: 0,
      created_at: Math.floor(Date.now() / 1000),
      currency: currency,
      customer: {
        name: customerId,
        contact: '',
        email: ''
      },
      description: 'ClayNest Order Payment',
      expire_by: Math.floor(Date.now() / 1000) + 2592000, // 30 days
      expired_at: 0,
      first_min_partial_amount: 100,
      notify: {
        sms: true,
        email: true
      },
      notes: {},
      notify_count: 0,
      payments: null,
      reference_id: '',
      short_url: `https://rzp.io/${paymentLinkId}`,
      status: 'created',
      updated_at: Math.floor(Date.now() / 1000),
      upi_link: false,
      user_id: ''
    };
  } catch (error) {
    console.error('Payment link creation error:', error);
    throw error;
  }
};

// Mock webhook handler for payment status
const handleWebhook = async (event) => {
  try {
    if (event.event === 'payment.authorized') {
      return {
        success: true,
        message: 'Payment authorized',
        paymentId: event.payload.payment.entity.id
      };
    } else if (event.event === 'payment.failed') {
      return {
        success: false,
        message: 'Payment failed',
        paymentId: event.payload.payment.entity.id
      };
    }
    return { success: true, message: 'Webhook processed' };
  } catch (error) {
    console.error('Webhook error:', error);
    throw error;
  }
};

module.exports = {
  createOrder,
  verifyPayment,
  createPaymentLink,
  handleWebhook
};
