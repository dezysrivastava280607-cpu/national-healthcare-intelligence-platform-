import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    const user = await loginUser(email, password);

    if (!user) {
      setError("Invalid email or password.");
      return;
    }

    // Role ke according dashboard
    if (user.role === "doctor") {
      navigate("/doctor-dashboard");
    } else {
      navigate("/patient-dashboard");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Healthcare Platform</h1>

        <p>Login to your account</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="login-error">{error}</p>}

          <button type="submit">Login</button>
        </form>

        <p>
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            style={{
              background: "none",
              border: "none",
              color: "#2563eb",
              cursor: "pointer",
              padding: 0,
            }}
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
