const db = require("../config/db");

exports.getAnalytics = (req, res) => {
  const report = {};

  db.query("SELECT COUNT(*) AS totalComplaints FROM complaints", (err, totalResult) => {
    if (err) return res.status(500).json({ message: err.message });

    report.totalComplaints = totalResult[0].totalComplaints;

    db.query(
      "SELECT COUNT(*) AS resolvedComplaints FROM complaints WHERE status = 'Resolved'",
      (err2, resolvedResult) => {
        if (err2) return res.status(500).json({ message: err2.message });

        report.resolvedComplaints = resolvedResult[0].resolvedComplaints;

        db.query(
          "SELECT COUNT(*) AS pendingComplaints FROM complaints WHERE status = 'Pending'",
          (err3, pendingResult) => {
            if (err3) return res.status(500).json({ message: err3.message });

            report.pendingComplaints = pendingResult[0].pendingComplaints;

            db.query(
              "SELECT category, COUNT(*) AS count FROM complaints GROUP BY category",
              (err4, categoryResult) => {
                if (err4) return res.status(500).json({ message: err4.message });

                report.categoryWiseComplaints = categoryResult;

                res.status(200).json(report);
              }
            );
          }
        );
      }
    );
  });
};