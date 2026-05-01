import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ComplaintCard from "../components/ComplaintCard";
import ComplaintTable from "../components/ComplaintTable";
import API from "../services/api";

function UserDashboard() {

  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);

  
  const btn = {
    padding: "10px 15px",
    border: "none",
    borderRadius: "20px",
    background: "#48cae4",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "500",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    fetchComplaints();

    //AUTO REFRESH
    const interval = setInterval(() => {
      fetchComplaints();
    }, 3000);

    return () => clearInterval(interval);

  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await API.get("/complaints");

      console.log("USER DATA:", res.data);

      let data = [];

      if (Array.isArray(res.data)) {
        data = res.data;
      } else if (Array.isArray(res.data.complaints)) {
        data = res.data.complaints;
      }

      setComplaints(data);

    } catch (err) {
      console.log(err.response?.data);
      setComplaints([]);
    }
  };

  const total = complaints.length;
  const pending = complaints.filter(c => c?.status === "Pending").length;
  const assigned = complaints.filter(c => c?.status === "Assigned").length;

  return (
    <div style={{
      padding: "30px",
      margin: "20px",
      background: "rgba(255,255,255,0.6)",
      backdropFilter: "blur(12px)",
      borderRadius: "16px",
      boxShadow: "0 8px 20px rgba(0,0,0,0.1)"
    }}>

      <h2>User Dashboard</h2>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <ComplaintCard title="Total" value={total} />
        <ComplaintCard title="Pending" value={pending} />
        <ComplaintCard title="Assigned" value={assigned} />
      </div>

      <h3 style={{ marginTop: "30px" }}>Recent Complaints</h3>

      {complaints.length === 0 ? (
        <p>No complaints found</p>
      ) : (
        <ComplaintTable complaints={complaints} />
      )}

      <div style={{ marginTop: "20px" }}>
        <button style={btn} onClick={() => navigate("/submit")}>
          Submit Complaint
        </button>

        <button
          style={{ ...btn, marginLeft: "10px", background: "#48cae4" }}
          onClick={() => navigate("/track")}
        >
          Track
        </button>
      </div>

    </div>
  );
}

export default UserDashboard;