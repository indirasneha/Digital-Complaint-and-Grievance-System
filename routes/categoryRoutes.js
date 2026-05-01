const express = require("express");
const router = express.Router();

// ❌ removed middleware

const {
  addCategory,
  getCategories,
  deleteCategory,
} = require("../controllers/categoryController");

// ✅ simple routes

router.post("/", addCategory);
router.get("/", getCategories);
router.delete("/:id", deleteCategory);

module.exports = router;