import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SigninPage.css";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Signing in...");

    try {
      const res = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Login successful!");
        console.log("Token:", data.token);
         navigate("/dashboard");
      } else {
        setMessage(`${data.error || "Login failed"}`);
      }
    } catch (error) {
  console.error("Signup error:", error);
  setMessage(`⚠️ ${error.message || "Network error. Please try again later."}`);
}
  };

  return (
    <div className="login-container">
      <div className="left-section">
        <div className="logo">CSCS</div>
        <h2>
          Welcome <br /> of hundreds<span className="underscore">_</span>
        </h2>
      </div>

      <div className="right-section">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Sign in</h2>

          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="btn-signin">
            Sign in
          </button>

          <div className="links">
            <a href="#">Forgot password?</a>
            <a href="#" onClick={() => navigate("/signup")}>
              Sign up
            </a>
          </div>

          {message && <p className="message">{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default Signin;