// export const Signup = () => {
//     const signup = () => {
//         // Basic validation checks
//         if(!name || !email || !password) {
//             toast.error('Please fill in all fields');
//             return;
//         }

//         if(password.length < 6) {
//             toast.error('Password should be at least 6 characters');
//             return;
//         }

//                 toast.success('Signup successful. Redirecting to login...');

//                 toast.error('Failed to store user details.');

//                 toast.error('Email is already in use.');

//                 toast.error('Signup failed.');
//             }

//     }

//     return (
//         <div className='container'>
//             <br />
//             <h2>Sign up</h2>
//             <br />
//             <form  >
//                 <label htmlFor="name">Name</label>
//                 <input type="text"  />
//                 <br />
//                 <label htmlFor="email">Email</label>
//                 <input type="email" />
//                 <br />
//                 <label htmlFor="password">Password</label>
//                 <input type="password" />
//                 <br />
//                 <button type="submit" >SUBMIT</button>
//             </form>

//         </div>
//     )
// }

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = (e) => {
    e.preventDefault();

    // Validation
    if (!name || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      toast.error("Password should be at least 6 characters");
      return;
    }

    // Check existing emails
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const emailExists = existingUsers.some((u) => u.email === email);

    if (emailExists) {
      toast.error("Email is already in use.");
      return;
    }

    // Save user
    const newUser = { name, email, password };
    const updatedUsers = [...existingUsers, newUser];

    try {
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      toast.success("Signup successful! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch {
      toast.error("Failed to store user details.");
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="card shadow p-4" style={{ width: "380px" }}>
        <h3 className="text-center mb-4">Create Account</h3>

        <form onSubmit={signup}>
          {/* Name */}
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Minimum 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Button */}
          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </form>
        <div className="text-center mt-3">
          <span>Already have an account? </span>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
