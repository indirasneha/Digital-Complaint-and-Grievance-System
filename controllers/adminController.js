const db = require("../config/db");

exports.getAllComplaints = (req, res) => {
  const { status, category, priority } = req.query;

  let sql = "SELECT * FROM complaints WHERE 1=1";
  let values = [];

  if (status) {
    sql += " AND status = ?";
    values.push(status);
  }

  if (category) {
    sql += " AND category = ?";
    values.push(category);
  }

  if (priority) {
    sql += " AND priority = ?";
    values.push(priority);
  }

  sql += " ORDER BY created_at DESC";

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    res.status(200).json(result);
  });
};

exports.assignComplaint = (req, res) => {
  const { complaint_id, officer_id } = req.body;

  if (!complaint_id || !officer_id) {
    return res.status(400).json({ message: "Complaint ID and Officer ID are required." });
  }

  db.query(
    "INSERT INTO complaint_assignments (complaint_id, officer_id) VALUES (?, ?)",
    [complaint_id, officer_id],
    (err) => {
      if (err) return res.status(500).json({ message: err.message });

      db.query(
        "UPDATE complaints SET status = 'Assigned' WHERE complaint_id = ?",
        [complaint_id],
        (err2) => {
          if (err2) return res.status(500).json({ message: err2.message });

          res.status(200).json({ message: "Complaint assigned successfully." });
        }
      );
    }
  );
};

exports.updateComplaintStatus = (req, res) => {
  const { complaint_id, status, remarks } = req.body;

  if (!complaint_id || !status) {
    return res.status(400).json({ message: "Complaint ID and status are required." });
  }

  db.query(
    "UPDATE complaints SET status = ? WHERE complaint_id = ?",
    [status, complaint_id],
    (err) => {
      if (err) return res.status(500).json({ message: err.message });

      db.query(
        "UPDATE complaint_assignments SET status = ?, remarks = ? WHERE complaint_id = ?",
        [status, remarks || null, complaint_id],
        (err2) => {
          if (err2) return res.status(500).json({ message: err2.message });

          res.status(200).json({ message: "Complaint status updated successfully." });
        }
      );
    }
  );
};

exports.deleteComplaintByAdmin = (req, res) => {
  db.query(
    "DELETE FROM complaints WHERE complaint_id = ?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json({ message: err.message });
      res.status(200).json({ message: "Complaint deleted successfully by admin." });
    }
  );
};

exports.getUsers = (req, res) => {
  db.query(
    "SELECT user_id, name, email, role, created_at FROM users ORDER BY created_at DESC",
    (err, result) => {
      if (err) return res.status(500).json({ message: err.message });
      res.status(200).json(result);
    }
  );
};

exports.respondToComplaint = (req, res) => {
  const { response } = req.body;

  if (!response) {
    return res.status(400).json({ message: "Response message is required." });
  }

  db.query(
    "UPDATE complaints SET admin_response = ?, response_date = NOW() WHERE complaint_id = ?",
    [response, req.params.complaint_id],
    (err) => {
      if (err) return res.status(500).json({ message: err.message });

      res.status(200).json({ message: "Admin response added successfully." });
    }
  );
};