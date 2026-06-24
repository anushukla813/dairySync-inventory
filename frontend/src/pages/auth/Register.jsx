import { useState } from "react";

import "../../styles/Auth.css";

import { Link } from "react-router-dom";

import {
  FaUser,
  FaEnvelope,
  FaLock
} from "react-icons/fa";

import {
  registerUser
} from "../../services/authService";

import {
  validateRegister
} from "../../utils/validations";

export default function Register() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});

  const [successMessage, setSuccessMessage] =
    useState("");

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    const validationErrors =
      validateRegister(formData);

    setErrors(validationErrors);

    if (
      Object.keys(validationErrors).length === 0
    ) {

      const result =
        registerUser(formData);

      if (!result.success) {

        setErrors({
          email: result.message
        });

        return;
      }

      setSuccessMessage(
        "Registration Successful"
      );

      setFormData({
        name: "",
        email: "",
        password: ""
      });

      setTimeout(() => {

        window.location.href = "/login";

      }, 1500);
    }
  };

  return (

    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-logo">
          <FaUser />
        </div>

        <h2>Create Account</h2>

        <p>
          Register your DairySync account
        </p>

        {
          successMessage &&
          <p className="success-text">
            {successMessage}
          </p>
        }

        <form onSubmit={handleSubmit}>

          <div className="input-group">

            <FaUser className="input-icon" />

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
            />

          </div>

          {
            errors.name &&
            <p className="error-text">
              {errors.name}
            </p>
          }

          <div className="input-group">

            <FaEnvelope className="input-icon" />

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
            />

          </div>

          {
            errors.email &&
            <p className="error-text">
              {errors.email}
            </p>
          }

          <div className="input-group">

            <FaLock className="input-icon" />

            <input
              type="password"
              name="password"
              placeholder="Create Password"
              value={formData.password}
              onChange={handleChange}
            />

          </div>

          {
            errors.password &&
            <p className="error-text">
              {errors.password}
            </p>
          }

          <button type="submit">
            Register
          </button>

        </form>

        <div className="auth-footer">

          Already have an account?

          <Link to="/login">
            Login
          </Link>

        </div>

      </div>

    </div>
  );
}