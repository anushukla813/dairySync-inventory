import {
  FaChartPie,
  FaTint,
  FaHistory,
  FaUserEdit,
  FaSignOutAlt
} from "react-icons/fa";

import "../../styles/dashboard/VendorDashboard.css";

export default function VendorSidebar() {

  return (

    <aside className="vendor-sidebar">

      <div className="vendor-logo">

        <h2>DairySync</h2>

        <p>Vendor Panel</p>

      </div>

      <ul className="vendor-menu">

        <li className="active">
          <FaChartPie />
          Dashboard
        </li>

        <li>
          <FaTint />
          Milk Supply
        </li>

        <li>
          <FaHistory />
          Supply History
        </li>

        <li>
          <FaUserEdit />
          Update Profile
        </li>

      </ul>

      <button className="logout-btn">

        <FaSignOutAlt />

        Logout

      </button>

    </aside>
  );
}