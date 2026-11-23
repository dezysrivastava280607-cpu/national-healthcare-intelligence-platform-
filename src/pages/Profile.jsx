import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, updateCurrentUser } from "../services/auth";
import Sidebar from "../component/Sidebar";
import Navbar from "../component/Navbar";
import "./Profile.css";
function formatDateForInput(dateValue) {
  if (!dateValue) {
    return "";
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
    return dateValue;
  }

  const parts = dateValue.split("-");

  if (parts.length === 3) {
    const [day, month, year] = parts;

    if (
      day.length === 2 &&
      month.length === 2 &&
      year.length === 4
    ) {
      return `${year}-${month}-${day}`;
    }
  }

  return "";
}

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    bloodGroup: "O+",
    address: "",
  });

  useEffect(() => {
    const currentUser = getCurrentUser();

    if (!currentUser) {
      navigate("/");
      return;
    }

    setUser(currentUser);

    setFormData({
      name: currentUser.name || "",
      phone: currentUser.phone || "",
      dateOfBirth: currentUser.dateOfBirth || "",
      gender: currentUser.gender || "",
      bloodGroup: currentUser.bloodGroup || "O+",
      address: currentUser.address || "",
    });
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const updatedUser = updateCurrentUser({
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      bloodGroup: formData.bloodGroup,
      address: formData.address.trim(),
    });

    setUser(updatedUser);
    setEditing(false);
    setMessage("Profile updated successfully.");

    // Hide message after 3 seconds
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const handleCancel = () => {
    if (!user) {
      return;
    }

    setFormData({
      name: user.name || "",
      phone: user.phone || "",
      dateOfBirth: user.dateOfBirth || "",
      gender: user.gender || "",
      bloodGroup: user.bloodGroup || "O+",
      address: user.address || "",
    });

    setEditing(false);
  };

  if (!user) {
    return null;
  }

  const firstLetter = user.name?.charAt(0).toUpperCase() || "D";

  return (
    <div className="profile-layout">
      <Sidebar />

      <div className="profile-main">
        <Navbar />

        <div className="profile-page">
          {/* Header */}

          <div className="profile-page-header">
            <div>
              <h1>My Profile</h1>

              <p>Manage your personal and health information.</p>
            </div>

            {!editing ? (
              <button
                className="edit-profile-button"
                onClick={() => setEditing(true)}
              >
                ✏️ Edit Profile
              </button>
            ) : (
              <div className="profile-header-actions">
                <button className="cancel-edit-button" onClick={handleCancel}>
                  Cancel
                </button>

                <button className="save-profile-button" onClick={handleSave}>
                  Save Changes
                </button>
              </div>
            )}
          </div>

          {/* Success message */}

          {message && <div className="profile-message">✓ {message}</div>}

          {/* Profile Header Card */}

          <div className="profile-user-card">
            <div className="profile-avatar-large">{firstLetter}</div>

            <div className="profile-user-details">
              <h2>{user.name}</h2>

              <p>Patient</p>

              <span>{user.email}</span>
            </div>
          </div>

          {/* Cards */}

          <div className="profile-grid">
            {/* Personal Information */}

            <div className="profile-card">
              <div className="profile-card-title">
                <span>👤</span>

                <div>
                  <h2>Personal Information</h2>
                  <p>Your basic personal details</p>
                </div>
              </div>

              <div className="profile-fields">
                <div className="profile-field">
                  <label>Full Name</label>

                  {editing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  ) : (
                    <strong>{user.name}</strong>
                  )}
                </div>

                <div className="profile-field">
                  <label>Email</label>

                  <strong>{user.email}</strong>

                  <small>Email cannot be changed here.</small>
                </div>

                <div className="profile-field">
                  <label>Phone</label>

                  {editing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                    />
                  ) : (
                    <strong>{user.phone || "Not added"}</strong>
                  )}
                </div>

                <div className="profile-field">
                  <label>Date of Birth</label>

                  {editing ? (
                    <div className="date-picker-wrapper">
                      <input
                        id="dateOfBirth"
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth || ""}
                        onChange={handleChange}
                        className="date-input"
                        max={new Date().toISOString().split("T")[0]}
                      />

                      <button
                        type="button"
                        className="calendar-button"
                        onClick={() => {
                          document
                            .getElementById("dateOfBirth")
                            ?.showPicker?.();
                        }}
                        aria-label="Open date picker"
                      >
                        📅
                      </button>
                    </div>
                  ) : (
                    <strong>{user.dateOfBirth || "Not added"}</strong>
                  )}
                </div>

                <div className="profile-field">
                  <label>Gender</label>

                  {editing ? (
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <option value="">Select Gender</option>

                      <option value="Female">Female</option>

                      <option value="Male">Male</option>

                      <option value="Other">Other</option>
                    </select>
                  ) : (
                    <strong>{user.gender || "Not added"}</strong>
                  )}
                </div>
              </div>
            </div>

            {/* Health Information */}

            <div className="profile-card">
              <div className="profile-card-title">
                <span>❤️</span>

                <div>
                  <h2>Health Information</h2>
                  <p>Your basic health details</p>
                </div>
              </div>

              <div className="profile-fields">
                <div className="profile-field">
                  <label>Blood Group</label>

                  {editing ? (
                    <select
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleChange}
                    >
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                  ) : (
                    <strong>{user.bloodGroup || "O+"}</strong>
                  )}
                </div>

                <div className="profile-field">
                  <label>Role</label>
                  <strong>Patient</strong>
                </div>

                <div className="profile-field">
                  <label>Patient Status</label>

                  <span className="active-status">● Active</span>
                </div>
              </div>
            </div>

            {/* Address */}

            <div className="profile-card full-profile-card">
              <div className="profile-card-title">
                <span>📍</span>

                <div>
                  <h2>Address</h2>
                  <p>Your residential address</p>
                </div>
              </div>

              <div className="profile-field">
                {editing ? (
                  <textarea
                    name="address"
                    rows="4"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your address"
                  />
                ) : (
                  <p className="address-value">
                    {user.address || "No address added yet."}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
