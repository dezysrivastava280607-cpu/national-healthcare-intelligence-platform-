
import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { logoutUser } from "../services/auth";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        🏥
        <span>HealthCare</span>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/patient-dashboard" className="sidebar-link">
          🏠
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/reports" className="sidebar-link">
          📄
          <span>Medical Reports</span>
        </NavLink>

        <NavLink to="/history" className="sidebar-link">
          📋
          <span>Medical History</span>
        </NavLink>

        <NavLink to="/appointments" className="sidebar-link">
          📅
          <span>Appointments</span>
        </NavLink>

        <NavLink to="/profile" className="sidebar-link">
          👤
          <span>Profile</span>
        </NavLink>
      </nav>

      <div className="sidebar-bottom">
        <button
          className="sidebar-logout"
          onClick={() => {
            localStorage.removeItem("currentUser");
            navigate("/");
          }}
        >
          🚪
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
