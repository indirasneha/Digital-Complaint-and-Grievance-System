const db = require("../config/db");

// ================= CREATE =================
exports.createComplaint = (req, res) => {
  const { title, description, category, priority } = req.body;

  //  SAFETY CHECK
  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  const user_id = req.user.id;
  const file_path = req.file ? req.file.path : null;

  //  DEBUG
  console.log("INSERT USER ID:", user_id);

  if (!title || !description || !category || !priority) {
    return res.status(400).json({ message: "All complaint fields are required." });
  }

  const sql = `
    INSERT INTO complaints (user_id, title, description, category, priority, file_path)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [user_id, title, description, category, priority, file_path], (err, result) => {
    if (err) {
      console.log("INSERT ERROR:", err);
      return res.status(500).json({ message: err.message });
    }

    console.log("Complaint inserted ID:", result.insertId);

    res.status(201).json({
      message: "Complaint submitted successfully.",
      complaintId: result.insertId,
    });
  });
};

// ================= GET MY COMPLAINTS =================
exports.getMyComplaints = (req, res) => {

  //  SAFETY CHECK
  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  const user_id = req.user.id;

  //  DEBUG
  console.log("FETCH USER ID:", user_id);

  db.query(
    "SELECT * FROM complaints WHERE user_id = ? ORDER BY created_at DESC",
    [user_id],
    (err, result) => {
      if (err) {
        console.log("FETCH ERROR:", err);
        return res.status(500).json({ message: err.message });
      }

      // 🔍 DEBUG
      console.log("DB RESULT:", result);

      res.status(200).json({
       complaints: result
      });;
    }
  );
};

// ================= GET BY ID =================
exports.getComplaintById = (req, res) => {
  const user_id = req.user.id;

  db.query(
    "SELECT * FROM complaints WHERE complaint_id = ? AND user_id = ?",
    [req.params.id, user_id],
    (err, result) => {
      if (err) return res.status(500).json({ message: err.message });

      if (result.length === 0) {
        return res.status(404).json({ message: "Complaint not found." });
      }

      res.status(200).json(result[0]);
    }
  );
};

// ================= UPDATE-user =================
exports.updateComplaint = (req, res) => {
  const { title, description, category, priority } = req.body;

  db.query(
    "SELECT * FROM complaints WHERE complaint_id = ?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ message: err.message });

      if (result.length === 0) {
        return res.status(404).json({ message: "Complaint not found." });
      }

      if (result[0].status !== "Pending") {
        return res.status(400).json({
          message: "Complaint cannot be edited after processing starts.",
        });
      }

      db.query(
        "UPDATE complaints SET title = ?, description = ?, category = ?, priority = ? WHERE complaint_id = ?",
        [title, description, category, priority, req.params.id],
        (err2) => {
          if (err2) return res.status(500).json({ message: err2.message });

          res.status(200).json({ message: "Complaint updated successfully." });
        }
      );
    }
  );
};
// ================= UPDATE STATUS (ADMIN) =================
exports.updateComplaintStatus = (req, res) => {
  const { status } = req.body;
  const id = req.params.id;

  db.query(
    "UPDATE complaints SET status = ? WHERE complaint_id = ?",
    [status, id],
    (err, result) => {
      if (err) {
        console.log("STATUS UPDATE ERROR:", err);
        return res.status(500).json({ message: err.message });
      }

      res.status(200).json({ message: "Status updated successfully" });
    }
  );
};

// ================= DELETE =================
exports.deleteComplaint = (req, res) => {

  db.query(
    "SELECT * FROM complaints WHERE complaint_id = ?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ message: err.message });

      if (result.length === 0) {
        return res.status(404).json({ message: "Complaint not found." });
      }

      if (result[0].status !== "Pending") {
        return res.status(400).json({
          message: "Complaint cannot be deleted after processing starts.",
        });
      }

      db.query(
        "DELETE FROM complaints WHERE complaint_id = ?",
        [req.params.id],
        (err2) => {
          if (err2) return res.status(500).json({ message: err2.message });

          res.status(200).json({ message: "Complaint deleted successfully." });
        }
      );
    }
  );
};

// ================= GET ALL COMPLAINTS (ADMIN) =================
exports.getAllComplaints = (req, res) => {

  db.query(
    "SELECT * FROM complaints ORDER BY created_at DESC",
    (err, result) => {
      if (err) {
        console.log("FETCH ALL ERROR:", err);
        return res.status(500).json({ message: err.message });
      }

      console.log("ALL COMPLAINTS:", result);

      res.status(200).json({
       complaints: result
      });;
    }
  );
};

// ================= ADMIN UPDATE STATUS =================
exports.updateComplaintStatus = (req, res) => {
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: "Status is required" });
  }

  db.query(
    "UPDATE complaints SET status = ? WHERE complaint_id = ?",
    [status, req.params.id],
    (err) => {
      if (err) {
        console.log("UPDATE ERROR:", err);
        return res.status(500).json({ message: err.message });
      }
      res.json({ message: "Status updated successfully" });
      
    }
  );
};