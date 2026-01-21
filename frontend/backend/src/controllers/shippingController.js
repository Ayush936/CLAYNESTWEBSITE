const dataService = require("../services/dataService");

const trackShipment = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const order = dataService.getOrderById(orderId);
    if (!order || order.user_id !== userId) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    const trackingInfo = {
      orderId: order.id,
      status: order.status || "pending",
      trackingUrl: `https://track.shiprocket.in/tracking/${order.id}`,
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString()
    };
    res.json({ success: true, tracking: trackingInfo });
  } catch (error) {
    console.error("Track shipment error:", error);
    res.status(500).json({ success: false, message: "Failed to track shipment" });
  }
};

module.exports = { trackShipment };
