import { loginUser } from "../../services/authService";
import { useState } from "react";
import "../../styles/Auth.css";

import { Link, useNavigate } from "react-router-dom";

import {
  FaEnvelope,
  FaLock,
  FaUserCircle
} from "react-icons/fa";

export default function Login() {

  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
  email: "",
  password: ""
});

const [errors, setErrors] = useState({});

const handleChange = (e) => {

  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};

const handleSubmit = (e) => {

  e.preventDefault();

  let newErrors = {};

  if (!formData.email) {
    newErrors.email = "Email is required";
  }

  if (!formData.password) {
    newErrors.password = "Password is required";
  }

  setErrors(newErrors);

  if (Object.keys(newErrors).length === 0) {

    const result = loginUser(
      formData.email,
      formData.password
    );

    if (!result.success) {

      setErrors({
        password: result.message
      });

      return;
    }

    navigate("/dashboard");
  }
};

  return (

    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-logo">
          <FaUserCircle />
        </div>

        <h2>Welcome Back</h2>

        <p>
          Sign in to continue to DairySync
        </p>

        <form onSubmit={handleSubmit}>

          <div className="input-group">

            <FaEnvelope className="input-icon" />

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
            />

            {
              errors.email &&
              <p className="error-text">
                {errors.email}
              </p>
            }

          </div>

          <div className="input-group">

            <FaLock className="input-icon" />

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
            />

            {
              errors.password &&
              <p className="error-text">
                {errors.password}
              </p>
            }

          </div>

          <div className="auth-options">

            <label>
              <input type="checkbox" />
              Remember Me
            </label>

            <Link to="/forgot-password">
              Forgot Password?
            </Link>

          </div>

          <button type="submit">
            Sign In
          </button>

        </form>

        <div className="auth-footer">

          Don’t have an account?

          <Link to="/register">
            Register
          </Link>

        </div>

      </div>

    </div>
  );
}