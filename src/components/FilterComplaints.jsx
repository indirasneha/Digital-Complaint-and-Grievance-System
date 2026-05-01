import React from "react";

function FilterComplaints({ filter, setFilter }) {
  return (
    <select
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      style={{ marginBottom: "20px", padding: "5px" }}
    >
      <option value="All">All</option>
      <option value="Pending">Pending</option>
      <option value="In Progress">In Progress</option>
      <option value="Resolved">Resolved</option>
    </select>
  );
}

export default FilterComplaints;