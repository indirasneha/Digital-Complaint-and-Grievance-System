const express = require("express");
const router = express.Router();

// ❌ removed middleware

const {
  getAssignedComplaints,
  updateAssignedComplaint,
} = require("../controllers/officerController");

// ✅ simple routes

router.get("/complaints", getAssignedComplaints);
router.put("/complaints/:id", updateAssignedComplaint);

module.exports = router;