import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  hashPassword,
  getRegisteredUsers,
  saveRegisteredUser,
} from "../services/auth";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("patient");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Check password
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Minimum password length
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    // Get existing users
    const users = getRegisteredUsers();

    // Check duplicate email
    const alreadyExists = users.some(
      (user) => user.email.toLowerCase() === email.toLowerCase(),
    );

    if (alreadyExists) {
      setError("An account with this email already exists.");
      return;
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user
    const newUser = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      role: role,
      passwordHash: passwordHash,
    };

    // Save user
    saveRegisteredUser(newUser);

    setSuccess("Account created successfully!");

    // Go to login after short delay
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <div className="register-header">
          <h1 className="register-title">Create Account</h1>

          <p className="register-subtitle">Join our Healthcare Platform</p>
        </div>

        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Full Name</label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone</label>

            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Role</label>

            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="patient">Patient</option>

              <option value="doctor">Doctor</option>
            </select>
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>

            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="form-error">{error}</p>}

          {success && <p className="form-success">{success}</p>}

          <button type="submit" className="register-button">
            Create Account
          </button>
        </form>

        <div className="login-link">
          <p>
            Already have an account?{" "}
            <button type="button" onClick={() => navigate("/")}>
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
