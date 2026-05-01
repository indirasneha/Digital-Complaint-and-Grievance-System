const db = require("../config/db");

exports.getAssignedComplaints = (req, res) => {
  const userId = req.user.id;

  db.query("SELECT officer_id FROM officers WHERE user_id = ?", [userId], (err, officerData) => {
    if (err) return res.status(500).json({ message: err.message });

    if (officerData.length === 0) {
      return res.status(404).json({ message: "Officer record not found." });
    }

    const officerId = officerData[0].officer_id;

    const sql = `
      SELECT c.*, ca.status AS assignment_status, ca.remarks
      FROM complaints c
      JOIN complaint_assignments ca ON c.complaint_id = ca.complaint_id
      WHERE ca.officer_id = ?
      ORDER BY c.created_at DESC
    `;

    db.query(sql, [officerId], (err2, result) => {
      if (err2) return res.status(500).json({ message: err2.message });
      res.status(200).json(result);
    });
  });
};

exports.updateAssignedComplaint = (req, res) => {
  const { status, remarks } = req.body;
  const complaintId = req.params.id;

  db.query(
    "UPDATE complaint_assignments SET status = ?, remarks = ? WHERE complaint_id = ?",
    [status, remarks || null, complaintId],
    (err) => {
      if (err) return res.status(500).json({ message: err.message });

      db.query(
        "UPDATE complaints SET status = ? WHERE complaint_id = ?",
        [status, complaintId],
        (err2) => {
          if (err2) return res.status(500).json({ message: err2.message });

          res.status(200).json({ message: "Complaint updated successfully by officer." });
        }
      );
    }
  );
};