const express = require("express");
const router = express.Router();

// ❌ removed middleware

const {
  getAllComplaints,
  assignComplaint,
  updateComplaintStatus,
  deleteComplaintByAdmin,
  getUsers,
  respondToComplaint,
} = require("../controllers/adminController");

// ✅ simple routes (no auth)

router.get("/complaints", getAllComplaints);
router.put("/assign-complaint", assignComplaint);
router.put("/update-status", updateComplaintStatus);
router.delete("/complaint/:id", deleteComplaintByAdmin);
router.get("/users", getUsers);
router.post("/respond/:complaint_id", respondToComplaint);

module.exports = router;