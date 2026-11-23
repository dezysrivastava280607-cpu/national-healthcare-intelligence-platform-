import Navbar from "../component/Navbar";
import Sidebar from "../component/Sidebar";
import HealthCard from "../component/HealthCard";
import ReportCard from "../component/ReportCard";
import { useNavigate } from "react-router-dom";
import "./PatientDashboard.css";

function PatientDashboard() {
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("currentUser");

  const user = storedUser ? JSON.parse(storedUser) : { name: "User" };
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <Navbar />

        <main className="dashboard-content">
          {/* Welcome */}
          <section className="welcome-banner">
            <div>
              <p className="welcome-small">Welcome back</p>
              <h1>Good Morning, {user.name} 👋</h1>
              <p className="welcome-text">
                Here is an overview of your healthcare activity.
              </p>
            </div>

            <div className="welcome-icon">🩺</div>
          </section>

          {/* Health Cards */}
          <section className="health-cards">
            <HealthCard title="Blood Group" value="O+" icon="🩸" />

            <HealthCard title="Medical Reports" value="4" icon="📄" />

            <HealthCard title="Appointments" value="2" icon="📅" />

            <HealthCard title="Health Records" value="12" icon="❤️" />
          </section>

          {/* Main Grid */}
          <section className="dashboard-grid">
            {/* Reports */}
            <div className="dashboard-card">
              <div className="card-header">
                <div>
                  <h2>Recent Reports</h2>
                  <p>Your latest medical reports</p>
                </div>

                <button
                  className="text-button"
                  onClick={() => navigate("/reports")}
                >
                  View all →
                </button>
              </div>

              <div className="reports-list">
                <ReportCard
                  title="Complete Blood Count"
                  date="20 Aug 2026"
                  status="Available"
                />

                <ReportCard
                  title="Lipid Profile"
                  date="18 Aug 2026"
                  status="Available"
                />

                <ReportCard
                  title="Blood Glucose Test"
                  date="15 Aug 2026"
                  status="Available"
                />
              </div>
            </div>

            {/* Appointment */}
            <div className="dashboard-card">
              <div className="card-header">
                <div>
                  <h2>Next Appointment</h2>
                  <p>Your upcoming doctor visit</p>
                </div>

                <span className="appointment-status">Upcoming</span>
              </div>

              <div className="appointment-main">
                <div className="doctor-avatar">👨‍⚕️</div>

                <div className="doctor-details">
                  <h3>Dr. Raj Sharma</h3>
                  <p>General Physician</p>
                </div>
              </div>

              <div className="appointment-info">
                <div>
                  <span>📅</span>
                  <div>
                    <small>Date</small>
                    <strong>25 August 2026</strong>
                  </div>
                </div>

                <div>
                  <span>🕙</span>
                  <div>
                    <small>Time</small>
                    <strong>10:00 AM</strong>
                  </div>
                </div>
              </div>

              <button
                className="primary-button full-button"
                onClick={() => navigate("/appointments")}
              >
                View Appointment
              </button>
            </div>
          </section>

          {/* Quick Actions */}
          <section className="quick-section">
            <div className="card-header">
              <div>
                <h2>Quick Actions</h2>
                <p>Access frequently used features</p>
              </div>
            </div>

            <div className="quick-actions">
              <button
                onClick={() => navigate("/reports")}
                className="quick-card"
              >
                <span>📄</span>
                <div>
                  <h3>Medical Reports</h3>
                  <p>View and upload reports</p>
                </div>
              </button>

              <button
                onClick={() => navigate("/appointments")}
                className="quick-card"
              >
                <span>📅</span>
                <div>
                  <h3>Appointments</h3>
                  <p>Manage doctor visits</p>
                </div>
              </button>

              <button
                onClick={() => navigate("/history")}
                className="quick-card"
              >
                <span>📋</span>
                <div>
                  <h3>Medical History</h3>
                  <p>View your health timeline</p>
                </div>
              </button>

              <button
                onClick={() => navigate("/profile")}
                className="quick-card"
              >
                <span>👤</span>
                <div>
                  <h3>My Profile</h3>
                  <p>Manage your information</p>
                </div>
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default PatientDashboard;
