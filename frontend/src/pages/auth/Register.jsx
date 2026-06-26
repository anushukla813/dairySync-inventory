import { useState } from "react";

import "../../styles/Auth.css";

import { Link, useNavigate } from "react-router-dom";

import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaMapMarkerAlt,
  FaUserTag
} from "react-icons/fa";

import { registerUser } from "../../services/authService";

export default function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    fullName: "",
    email: "",
    password: "",
    phone: "",
    location: "",
    role: ""

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

    if (!formData.fullName) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.location) {
      newErrors.location = "Location is required";
    }

    if (!formData.role) {
      newErrors.role = "Select role";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {

      registerUser(formData);

      alert("Registration Successful");

      navigate("/login");
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
          Register as vendor or seller
        </p>

        <form onSubmit={handleSubmit}>

          <div className="input-group">

            <FaUser className="input-icon" />

            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
            />

            {
              errors.fullName &&
              <p className="error-text">
                {errors.fullName}
              </p>
            }

          </div>

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
              placeholder="Create Password"
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

          <div className="input-group">

            <FaPhone className="input-icon" />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />

            {
              errors.phone &&
              <p className="error-text">
                {errors.phone}
              </p>
            }

          </div>

          <div className="input-group">

            <FaMapMarkerAlt className="input-icon" />

            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
            />

            {
              errors.location &&
              <p className="error-text">
                {errors.location}
              </p>
            }

          </div>

          <div className="input-group">

            <FaUserTag className="input-icon" />

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="role-select"
            >
              <option value="">
                Select Role
              </option>

              <option value="seller">
                Seller
              </option>

              <option value="vendor">
                Vendor
              </option>

            </select>

          </div>

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