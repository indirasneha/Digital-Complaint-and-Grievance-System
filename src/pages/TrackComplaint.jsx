import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function TrackComplaint() {
  const [complaints, setComplaints] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/");
    return;
  }

  fetchComplaints();
}, []);

  const fetchComplaints = async () => {
    try {
      const res = await API.get("/complaints");

      console.log("TRACK DATA:", res.data);

      let data = [];

      if (Array.isArray(res.data)) {
        data = res.data;
      } else if (Array.isArray(res.data.complaints)) {
        data = res.data.complaints;
      }

      setComplaints(data);

    } catch (err) {
      console.log(err.response?.data);

      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/");
      }
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
      <h2>Track Complaints</h2>

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {complaints.length === 0 ? (
            <tr>
              <td colSpan="2">No complaints found</td>
            </tr>
          ) : (
            complaints.map((c) => (
              <tr key={c.complaint_id}>
                <td>{c.title}</td>
                <td>{c.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TrackComplaint;