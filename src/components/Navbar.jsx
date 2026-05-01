import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) return null;

  const user = JSON.parse(localStorage.getItem("user"));

  const navStyle = {
  padding: "15px 25px",
  background: "rgba(255,255,255,0.2)",
  backdropFilter: "blur(10px)",
  color: "#333",
  display: "flex",
  gap: "15px",
  alignItems: "center",
  borderRadius: "0 0 15px 15px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
};

const btnStyle = {
  background: "#a2d2ff",
  border: "none",
  padding: "8px 15px",
  borderRadius: "20px",
  color: "#333",
  cursor: "pointer",
  fontWeight: "500"
};

  return (
    <div style={navStyle}>

      {user?.role === "user" && (
        <>
          <button style={btnStyle} onClick={() => navigate("/user")}>Dashboard</button>
          <button style={btnStyle} onClick={() => navigate("/submit")}>Submit</button>
          <button style={btnStyle} onClick={() => navigate("/track")}>Track</button>
          <button style={btnStyle} onClick={() => navigate("/history")}>History</button>
        </>
      )}

      {user?.role === "admin" && (
        <>
          <button style={btnStyle} onClick={() => navigate("/admin")}>Admin Dashboard</button>
          <button style={btnStyle} onClick={() => navigate("/manage")}>Manage Complaints</button>
        </>
      )}

      <button
        onClick={() => {
          logout();
          navigate("/");
        }}
        style={{ ...btnStyle, marginLeft: "auto", background: "#ffafcc" }}
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;