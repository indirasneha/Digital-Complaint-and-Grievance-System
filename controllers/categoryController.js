const db = require("../config/db");

exports.addCategory = (req, res) => {
  const { category_name } = req.body;

  if (!category_name) {
    return res.status(400).json({ message: "Category name is required." });
  }

  db.query(
    "INSERT INTO categories (category_name) VALUES (?)",
    [category_name],
    (err, result) => {
      if (err) return res.status(500).json({ message: err.message });

      res.status(201).json({
        message: "Category added successfully.",
        categoryId: result.insertId,
      });
    }
  );
};

exports.getCategories = (req, res) => {
  db.query("SELECT * FROM categories ORDER BY category_name ASC", (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    res.status(200).json(result);
  });
};

exports.deleteCategory = (req, res) => {
  db.query(
    "DELETE FROM categories WHERE category_id = ?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json({ message: err.message });
      res.status(200).json({ message: "Category deleted successfully." });
    }
  );
};