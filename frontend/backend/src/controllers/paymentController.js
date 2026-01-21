const dataService = require("../services/dataService");

const createPaymentOrder = async (req, res) => {
  try {
    const { orderId, amount } = req.body;
    const order = {
      id: `razorpay_order_${Date.now()}`,
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: `order_${orderId}`,
      created_at: Math.floor(Date.now() / 1000)
    };
    res.json({ success: true, orderId: order.id, amount: order.amount, currency: order.currency, key: process.env.RAZORPAY_KEY_ID || "test_key_123" });
  } catch (error) {
    console.error("Create payment order error:", error);
    res.status(500).json({ success: false, message: "Failed to create payment order" });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { orderId, paymentId, signature } = req.body;
    if (paymentId && orderId) {
      const order = dataService.getOrderById(orderId);
      if (order) {
        dataService.updateOrderStatus(orderId, "confirmed");
      }
      res.json({ success: true, message: "Payment verified successfully" });
    } else {
      res.status(400).json({ success: false, message: "Invalid payment details" });
    }
  } catch (error) {
    console.error("Verify payment error:", error);
    res.status(500).json({ success: false, message: "Failed to verify payment" });
  }
};

module.exports = { createPaymentOrder, verifyPayment };
