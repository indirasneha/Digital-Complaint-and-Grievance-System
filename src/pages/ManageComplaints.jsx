import React, { useEffect, useState } from "react";
import API from "../services/api";

function ManageComplaints() {

  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await API.get("/complaints/all");

      if (res.data.complaints) {
        setComplaints(res.data.complaints);
      } else {
        setComplaints(res.data);
      }

    } catch (err) {
      console.log(err);
    }
  };

  // ✅ UPDATE STATUS
  const updateStatus = async (id, newStatus) => {
    try {
      await API.put(`/complaints/${id}/status`, {
        status: newStatus
      });

      // refresh data
      fetchComplaints();

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Manage Complaints</h2>

      <table border="1" width="100%" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Change Status</th>
          </tr>
        </thead>

        <tbody>
          {complaints.map((c) => (
            <tr key={c.complaint_id}>
              <td>{c.complaint_id}</td>
              <td>{c.title}</td>
              <td>{c.status}</td>

              <td>
                <select
                  value={c.status}
                  onChange={(e) =>
                    updateStatus(c.complaint_id, e.target.value)
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="Assigned">Assigned</option>
                  <option value="Completed">Completed</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageComplaints;