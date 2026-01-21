const dataService = require("../services/dataService");

const createOrder = async (req, res) => {
  try {
    const userId = req.user?.id || req.body.userId;
    const { items, shippingAddress, city, state, zipCode, phone, couponCode, paymentMethod = "cod", totalAmount } = req.body;
    if (!userId || !items || items.length === 0) {
      return res.status(400).json({ success: false, message: "User ID and items are required" });
    }
    const order = dataService.addOrder({
      user_id: userId,
      items: items,
      shipping_address: shippingAddress,
      city,
      state,
      zip_code: zipCode,
      phone,
      coupon_code: couponCode,
      status: paymentMethod === "cod" ? "pending" : "awaiting_payment",
      payment_method: paymentMethod,
      total: parseFloat(totalAmount) || 0,
      created_at: new Date().toISOString()
    });
    res.status(201).json({ success: true, message: "Order created successfully", order });
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({ success: false, message: "Failed to create order" });
  }
};

const getOrders = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const orders = dataService.getOrdersByUserId(userId);
    res.json({ success: true, orders });
  } catch (error) {
    console.error("Get orders error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};

const getOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const order = dataService.getOrderById(id);
    if (!order || order.user_id !== userId) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    res.json({ success: true, order });
  } catch (error) {
    console.error("Get order error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch order" });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = dataService.updateOrderStatus(id, status);
    res.json({ success: true, message: "Order updated", order });
  } catch (error) {
    console.error("Update order error:", error);
    res.status(500).json({ success: false, message: "Failed to update order" });
  }
};

module.exports = { createOrder, getOrders, getOrder, updateOrderStatus };
