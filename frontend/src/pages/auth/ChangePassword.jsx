import "../../styles/Auth.css";

import {
  FaLock,
  FaShieldAlt
} from "react-icons/fa";

export default function ChangePassword() {

  return (

    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-logo">
          <FaShieldAlt />
        </div>

        <h2>Change Password</h2>

        <p>
          Update your password securely
        </p>

        <form>

          <div className="input-group">

            <FaLock className="input-icon" />

            <input
              type="password"
              placeholder="Current Password"
            />

          </div>

          <div className="input-group">

            <FaLock className="input-icon" />

            <input
              type="password"
              placeholder="New Password"
            />

          </div>

          <button type="submit">
            Update Password
          </button>

        </form>

      </div>

    </div>
  );
}