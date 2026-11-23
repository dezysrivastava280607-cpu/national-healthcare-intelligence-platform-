import { getCurrentUser } from "../services/auth";
import "./Navbar.css";

function Navbar() {
  const user = getCurrentUser();

  const displayName = user?.name || "User";

  const firstLetter = displayName.charAt(0).toUpperCase();

  return (
    <header className="navbar">
      <div className="navbar-left">
        <h2>Healthcare Platform</h2>
      </div>

      <div className="navbar-right">
        <button className="notification-btn">🔔</button>

        <div className="user-profile">
          <div className="user-avatar">{firstLetter}</div>

          <div>
            <strong>{displayName}</strong>
            <p>{user?.role || "Patient"}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
