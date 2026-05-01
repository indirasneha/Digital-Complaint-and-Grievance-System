import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ComplaintTable from "../components/ComplaintTable";
import FilterComplaints from "../components/FilterComplaints";

function AllComplaints() {
  const navigate = useNavigate();

  const [filter, setFilter] = useState("All");

  const [complaints, setComplaints] = useState([
    { id: 101, title: "WiFi Issue", status: "Pending" },
    { id: 102, title: "Water Leakage", status: "In Progress" },
    { id: 103, title: "Electric Problem", status: "Resolved" }
  ]);

  const handleStatusChange = (id, newStatus) => {
    const updated = complaints.map((c) =>
      c.id === id ? { ...c, status: newStatus } : c
    );
    setComplaints(updated);
  };

  const filteredComplaints =
    filter === "All"
      ? complaints
      : complaints.filter((c) => c.status === filter);

  return (
    <div style={{ padding: "40px" }}>
      <h1>All Complaints</h1>

      <button onClick={() => navigate("/")}>
        Back to Dashboard
      </button>

      <FilterComplaints filter={filter} setFilter={setFilter} />

      <ComplaintTable
        complaints={filteredComplaints}
        handleStatusChange={handleStatusChange}
      />
    </div>
  );
}

export default AllComplaints;