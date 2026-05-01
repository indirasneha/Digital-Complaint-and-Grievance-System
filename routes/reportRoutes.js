const express = require("express");
const router = express.Router();

// ❌ removed middleware

const { getAnalytics } = require("../controllers/reportController");

// ✅ simple route

router.get("/", getAnalytics);

module.exports = router;