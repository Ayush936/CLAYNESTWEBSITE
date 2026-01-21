const dataService = require("../services/dataService");

const getCart = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const cartItems = dataService.getCartByUserId(userId);
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    res.json({ success: true, items: cartItems, total });
  } catch (error) {
    console.error("Get cart error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch cart" });
  }
};

const addToCart = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { productId, quantity } = req.body;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const product = dataService.getProductById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    const cartItem = dataService.addToCart(userId, productId, quantity || 1);
    res.json({ success: true, message: "Added to cart", item: cartItem });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ success: false, message: "Failed to add to cart" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    dataService.removeFromCart(id);
    res.json({ success: true, message: "Item removed from cart" });
  } catch (error) {
    console.error("Remove from cart error:", error);
    res.status(500).json({ success: false, message: "Failed to remove item" });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    const { quantity } = req.body;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const updatedItem = dataService.updateCartItem(id, quantity);
    res.json({ success: true, message: "Cart updated", item: updatedItem });
  } catch (error) {
    console.error("Update cart error:", error);
    res.status(500).json({ success: false, message: "Failed to update cart" });
  }
};

const clearCart = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    dataService.clearCart(userId);
    res.json({ success: true, message: "Cart cleared" });
  } catch (error) {
    console.error("Clear cart error:", error);
    res.status(500).json({ success: false, message: "Failed to clear cart" });
  }
};

module.exports = { getCart, addToCart, removeFromCart, updateCartItem, clearCart };
