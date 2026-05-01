import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function SubmitComplaint() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    priority: ""   
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/complaints", form);

      alert("Complaint submitted successfully");

      navigate("/track");

    } catch (err) {
      console.log(err.response?.data);
      console.log(err.response?.status);
      alert(err.response?.data?.message || "Error submitting complaint");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Submit Complaint</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="title"
          placeholder="Complaint Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <br /><br />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <br /><br />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="Water">Water</option>
          <option value="Electricity">Electricity</option>
          <option value="Sanitation">Sanitation</option>
        </select>
        <br /><br />

        {/*NEW FIELD */}
        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          required
        >
          <option value="">Select Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <br /><br />

        <button type="submit">Submit</button>

      </form>
    </div>
  );
}

export default SubmitComplaint;