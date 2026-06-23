import "../../styles/Auth.css";

import {
  FaEnvelope,
  FaUnlockAlt
} from "react-icons/fa";

export default function ForgotPassword() {

  return (

    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-logo">
          <FaUnlockAlt />
        </div>

        <h2>Forgot Password</h2>

        <p>
          Reset your account password
        </p>

        <form>

          <div className="input-group">

            <FaEnvelope className="input-icon" />

            <input
              type="email"
              placeholder="Enter Registered Email"
            />

          </div>

          <button type="submit">
            Send Reset Link
          </button>

        </form>

      </div>

    </div>
  );
}