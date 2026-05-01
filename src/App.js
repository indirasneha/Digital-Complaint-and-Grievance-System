import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import SubmitComplaint from "./pages/SubmitComplaint";
import TrackComplaint from "./pages/TrackComplaint";
import ComplaintHistory from "./pages/ComplaintHistory";
import AllComplaints from "./pages/AllComplaints";
import ManageComplaints from "./pages/ManageComplaints";
import "./App.css";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

function App() {
  const role = localStorage.getItem("role") || "";

  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* Auth */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* USER ROUTES (UNCHANGED) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/submit"
          element={
            <ProtectedRoute>
              <SubmitComplaint />
            </ProtectedRoute>
          }
        />

        <Route
          path="/track"
          element={
            <ProtectedRoute>
              <TrackComplaint />
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <ComplaintHistory />
            </ProtectedRoute>
          }
        />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* ✅ NEW: Manage Complaints */}
        <Route
          path="/manage"
          element={
            <ProtectedRoute>
              <ManageComplaints />
            </ProtectedRoute>
          }
        />

        {/* Existing admin-only route */}
        <Route
          path="/all"
          element={
            role === "admin" ? (
              <ProtectedRoute>
                <AllComplaints />
              </ProtectedRoute>
            ) : (
              <Navigate to="/user" />
            )
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;