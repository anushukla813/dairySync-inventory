import "../../styles/Auth.css";

import { Link } from "react-router-dom";

import {
  FaEnvelope,
  FaLock,
  FaUserCircle
} from "react-icons/fa";

export default function Login() {

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

        <form>

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
              placeholder="Enter Password"
            />

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