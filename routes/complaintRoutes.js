const express = require("express");
const router = express.Router();

const {
  createComplaint,
  getMyComplaints,
  getComplaintById,
  updateComplaint,
  deleteComplaint,
  getAllComplaints,
  updateComplaintStatus
} = require("../controllers/complaintController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// ================= USER =================
router.post("/", authMiddleware, createComplaint);
router.get("/", authMiddleware, getMyComplaints);

// ================= ADMIN =================
router.get("/all", authMiddleware, adminMiddleware, getAllComplaints);
router.put("/:id/status", authMiddleware, adminMiddleware, updateComplaintStatus);

// ================= COMMON =================
router.get("/:id", authMiddleware, getComplaintById);

// (optional)
router.put("/:id", authMiddleware, updateComplaint);
router.delete("/:id", authMiddleware, deleteComplaint);

module.exports = router;