function ComplaintCard({ title, value }) {

  const colors = {
    Total: "#a2d2ff",
    Pending: "#ffd6a5",
    Assigned: "#bde0fe",
    Completed: "#80ed99"
  };

  return (
    <div style={{
      padding: "20px",
      borderRadius: "15px",
      minWidth: "130px",
      textAlign: "center",
      background: colors[title] || "#cdb4db",
      color: "#333",
      fontWeight: "bold",
      boxShadow: "0 6px 15px rgba(0,0,0,0.1)"
    }}>
      <h3>{title}</h3>
      <h2>{value}</h2>
    </div>
  );
}
export default ComplaintCard;