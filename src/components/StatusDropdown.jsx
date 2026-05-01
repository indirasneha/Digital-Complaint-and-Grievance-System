import React from "react";

function StatusDropdown({ status, onChange }) {
  return (
    <select value={status} onChange={(e) => onChange(e.target.value)}>
      <option>Pending</option>
      <option>In Progress</option>
      <option>Resolved</option>
    </select>
  );
}

export default StatusDropdown;