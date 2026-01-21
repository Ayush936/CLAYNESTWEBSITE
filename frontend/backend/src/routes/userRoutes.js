const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const dataService = require("../services/dataService");

router.get("/profile", auth, (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const user = dataService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    const { password, ...userWithoutPassword } = user;
    res.json({ success: true, user: userWithoutPassword });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch profile" });
  }
});

router.put("/profile", auth, (req, res) => {
  try {
    const userId = req.user?.id;
    const { name, phone } = req.body;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const updatedUser = dataService.updateUser(userId, { name, phone });
    const { password, ...userWithoutPassword } = updatedUser;
    res.json({ success: true, message: "Profile updated", user: userWithoutPassword });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ success: false, message: "Failed to update profile" });
  }
});

module.exports = router;
