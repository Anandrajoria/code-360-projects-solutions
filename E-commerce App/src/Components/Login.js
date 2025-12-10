import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../Global/Auth/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation 1: All fields mandatory
    if (!email || !password) {
      toast.error("All fields are mandatory!");
      return;
    }

    // Validation 2: Password length
    if (password.length < 6) {
      toast.error("Password should be at least 6 characters");
      return;
    }

    // Check users in localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userMatch = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!userMatch) {
      toast.error("Incorrect email or password.");
      return;
    }

    // Success → Login + redirect
    await login();
    localStorage.setItem("currentUser", JSON.stringify(userMatch));

    toast.success("Login successful!");

    // IMPORTANT: Small delay so Cypress detects state update
    setTimeout(() => {
      navigate("/");
    }, 20);
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "450px" }}>
      <h2 className="text-center mb-4">Login</h2>

      <form onSubmit={handleSubmit}>
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-control login-email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />

        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control login-password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />

        <button type="submit" className="btn btn-primary w-100 login-btn">
          LOGIN
        </button>
      </form>

      <p className="mt-3 text-center">
        Don't have an account? <Link to="/signup">Signup</Link>
      </p>
    </div>
  );
};

export default Login;
