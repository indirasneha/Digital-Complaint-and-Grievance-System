import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function ComplaintHistory() {

  const [complaints, setComplaints] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await API.get("/complaints");

      console.log("HISTORY:", res.data);

      let data = [];

      if (Array.isArray(res.data)) {
        data = res.data;
      } else if (Array.isArray(res.data.complaints)) {
        data = res.data.complaints;
      }

      //ONLY COMPLETED
      const completed = data.filter(
        (c) => c.status && c.status.toLowerCase() === "completed"
      );

      setComplaints(completed);

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
      <h2>Complaint History</h2>

      {complaints.length === 0 ? (
        <p>No completed complaints</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px"
          }}
        >
          <thead style={{ backgroundColor: "#f2f2f2" }}>
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
                <td style={td}>{c.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const th = {
  border: "1px solid #ddd",
  padding: "10px",
  textAlign: "left"
};

const td = {
  border: "1px solid #ddd",
  padding: "10px"
};

export default ComplaintHistory;