import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const [complaints, setComplaints] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 🔐 Check token before making API call
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      fetchComplaints();
    }
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await API.get("/complaints");
      console.log("Complaints:", res.data);
      setComplaints(res.data);
    } catch (err) {
      console.log("Error:", err.response?.data);

      // 🔴 If token expired / invalid
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/");
      }
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      
      <h2>Dashboard</h2>

      {/* Submit button */}
      <button onClick={() => navigate("/submit")}>
        Submit Complaint
      </button>

      <h3>My Complaints</h3>

      {/* Show complaints */}
      {complaints.length === 0 ? (
        <p>No complaints found</p>
      ) : (
        complaints.map((c) => (
          <div
            key={c.complaint_id}
            style={{
              border: "1px solid black",
              padding: "10px",
              margin: "10px 0"
            }}
          >
            <h4>{c.title}</h4>
            <p>{c.description}</p>
            <p><b>Category:</b> {c.category}</p>
            <p><b>Priority:</b> {c.priority}</p>
            <p><b>Status:</b> {c.status}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;