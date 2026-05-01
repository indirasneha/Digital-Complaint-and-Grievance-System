const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // ⭐ added

// ================= REGISTER =================
exports.register = async (req, res) => {
  const { name, email, password, role = "user" } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required." });
  }

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
    if (err) return res.status(500).json({ message: err.message });

    if (result.length > 0) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, role],
      (err2, data) => {
        if (err2) return res.status(500).json({ message: err2.message });

        res.status(201).json({
          message: "User registered successfully.",
          userId: data.insertId,
        });
      }
    );
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
    if (err) return res.status(500).json({ message: err.message });

    if (result.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    const user = result[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // ✅ FIXED TOKEN (with role)
    const token = jwt.sign(
      { 
        id: user.user_id,role: user.role,
        role: user.role
      },
      "secret123",
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful.",
      token,
      role: user.role, // ✅ easy frontend access
      user: {
        id: user.user_id,
        name: user.name,
        email: user.email,
      },
    });
  });
};
