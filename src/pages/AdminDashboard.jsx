import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

//SOFT CARD STYLE
const cardStyle = {
  padding: "20px",
  background: "linear-gradient(135deg, #cdb4db, #a2d2ff)",
  color: "#333",
  borderRadius: "16px",
  minWidth: "130px",
  textAlign: "center",
  fontWeight: "bold",
  boxShadow: "0 6px 15px rgba(0,0,0,0.1)"
};

function AdminDashboard() {

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }

    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await API.get("/complaints/all");

      if (Array.isArray(res.data)) {
        setComplaints(res.data);
      } else if (res.data.complaints) {
        setComplaints(res.data.complaints);
      } else {
        setComplaints([]);
      }

    } catch (err) {
      console.log(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      padding: "30px",
      margin: "20px",
      background: "rgba(255,255,255,0.6)",
      backdropFilter: "blur(12px)",
      borderRadius: "16px",
      boxShadow: "0 8px 20px rgba(0,0,0,0.1)"
    }}>
      <h1>Admin Dashboard</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/*STATS */}
          <div style={{
            display: "flex",
            gap: "20px",
            marginBottom: "30px",
            flexWrap: "wrap"
          }}>
            <div style={cardStyle}>Total: {complaints.length}</div>

            <div style={cardStyle}>
              Pending: {complaints.filter(c => c.status?.toLowerCase() === "pending").length}
            </div>

            <div style={cardStyle}>
              Assigned: {complaints.filter(c => c.status?.toLowerCase() === "assigned").length}
            </div>

            <div style={cardStyle}>
              Completed: {complaints.filter(c => c.status?.toLowerCase() === "completed").length}
            </div>

            <div style={cardStyle}>
              Rejected: {complaints.filter(c => c.status?.toLowerCase() === "rejected").length}
            </div>
          </div>

          {/*TABLE */}
          {complaints.length === 0 ? (
            <p>No complaints found</p>
          ) : (
            <table style={{
              width: "100%",
              borderCollapse: "collapse",
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
                  <tr key={c.complaint_id}>
                    <td style={td}>{c.complaint_id}</td>
                    <td style={td}>{c.title}</td>

                    {/*SOFT STATUS */}
                    <td style={td}>
                      <span style={{
                        padding: "6px 12px",
                        borderRadius: "20px",
                        color: "#333",
                        fontSize: "12px",
                        fontWeight: "500",
                        background:
                          c.status === "Pending" ? "#ffd6a5" :
                          c.status === "Assigned" ? "#a2d2ff" :
                          c.status === "Completed" ? "#80ed99" :
                          "#ffafcc"
                      }}>
                        {c.status}
                      </span>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
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

export default AdminDashboard;