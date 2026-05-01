import React from "react";

function ComplaintTable({ complaints }) {
  return (
    <table style={{
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "20px",
      background: "rgba(255,255,255,0.9)",
      backdropFilter: "blur(8px)",
      borderRadius: "12px",
      overflow: "hidden"
    }}>
      
      <thead style={{ background: "#a2d2ff", color: "#333" }}>
        <tr>
          <th style={th}>ID</th>
          <th style={th}>Title</th>
          <th style={th}>Status</th>
        </tr>
      </thead>

      <tbody>
        {complaints.map((c) => (
          <tr key={c.complaint_id || c.id}>
            <td style={td}>{c.complaint_id || c.id}</td>
            <td style={td}>{c.title}</td>

            {/* 🌈 SOFT STATUS BADGE */}
            <td style={td}>
              <span style={{
                padding: "6px 12px",
                borderRadius: "20px",
                color: "#333",
                fontSize: "12px",
                fontWeight: "500",
                background:
                  c.status === "Pending" ? "#ffd6a5" :      // soft peach
                  c.status === "Assigned" ? "#a2d2ff" :     // soft blue
                  c.status === "Completed" ? "#80ed99" :    // mint green
                  "#ffafcc"                                // soft pink
              }}>
                {c.status}
              </span>
            </td>

          </tr>
        ))}
      </tbody>
    </table>
  );
}

const th = {
  padding: "12px",
  textAlign: "left"
};

const td = {
  padding: "12px",
  borderBottom: "1px solid #eee"
};

export default ComplaintTable;