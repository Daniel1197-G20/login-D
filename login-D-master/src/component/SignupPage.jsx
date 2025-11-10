import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupPage.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) return setMessage("Name is required.");
    if (!agree) return setMessage("You must accept the terms.");
    if (password.length < 8) return setMessage("Password must be 8+ characters.");

    setMessage("Creating account...");

    try {
      const res = await fetch("https://reqres.in/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Account created successfully!");
        console.log("Token:", data.token);
        navigate("/signin");
      } else {
        setMessage(`${data.error || "Registration failed"}`);
      }
    } catch (error) {
  console.error("Signup error:", error);
  setMessage(`⚠️ ${error.message || "Network error. Please try again later."}`);
}
  };

  return (
    <div className="signup-container">
      <div className="left-side">
        <div className="logo">CSCS</div>

        <div className="testimonial-card">
          <p>
            “A major impact that CSCS made was the amount of time and stress
            saved.”
          </p>
          <div className="profile">
            <img
              src="https://randomuser.me/api/portraits/men/75.jpg"
              alt=""
              className="profile-pic"
            />
            <div>
              <strong>Cscs </strong>
              <p className="subtitle">Founder </p>
            </div>
          </div>
        </div>

        <div className="testimonial-footer">
          <h3>K-Collect reduced infrastructure costs by 700%</h3>
          <p>Join thousands of developers building amazing apps with Appwrite</p>
        </div>
      </div>

      <div className="right-side">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Sign up</h2>

          <label>Name</label>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <small>Password must be at least 8 characters long</small>

          <div className="terms">
            <input
              type="checkbox"
              id="terms"
              checked={agree}
              onChange={() => setAgree(!agree)}
            />
            <label htmlFor="terms">
              By registering, you agree to our <a href="#">Privacy Policy</a> and{" "}
              <a href="#">Terms of Use</a>.
            </label>
          </div>

          <button type="submit" className="btn-signup">
            Sign up
          </button>

          <p className="signin-link">
            Already have an account?{" "}
            <a href="#" onClick={() => navigate("/signin")}>
              Sign in
            </a>
          </p>

          {message && <p className="message">{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default Signup;