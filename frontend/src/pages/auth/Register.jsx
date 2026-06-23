import "../../styles/Auth.css";

import { Link } from "react-router-dom";

import {
  FaUser,
  FaEnvelope,
  FaLock
} from "react-icons/fa";

export default function Register() {

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

        <form>

          <div className="input-group">

            <FaUser className="input-icon" />

            <input
              type="text"
              placeholder="Full Name"
            />

          </div>

          <div className="input-group">

            <FaEnvelope className="input-icon" />

            <input
              type="email"
              placeholder="Enter Email"
            />

          </div>

          <div className="input-group">

            <FaLock className="input-icon" />

            <input
              type="password"
              placeholder="Create Password"
            />

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