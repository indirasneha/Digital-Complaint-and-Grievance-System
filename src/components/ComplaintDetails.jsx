import React from "react";
import { useNavigate } from "react-router-dom";

function ComplaintDetails() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "40px" }}>
      <h1>Complaint Details</h1>

      <p><strong>ID:</strong> 101</p>
      <p><strong>Title:</strong> WiFi Issue</p>
      <p><strong>Description:</strong> Internet not working properly</p>
      <p><strong>Status:</strong> Pending</p>

      <button onClick={() => navigate("/")}>
        Back
      </button>
    </div>
  );
}

export default ComplaintDetails;