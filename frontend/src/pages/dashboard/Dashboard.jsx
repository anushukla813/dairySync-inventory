import "../../styles/Dashboard.css";
import cowLogo from "../../assets/images/cow.jpeg";

import {
  FaChartLine,
  FaBoxOpen,
  FaUserEdit,
  FaUsers,
  FaReceipt,
  FaCrown
} from "react-icons/fa";

export default function Dashboard() {

  const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser")
  );

  const role = loggedInUser?.role;

  const fullName = loggedInUser?.fullName;

  return (

    <div className="dashboard-page">

      {/* SIDEBAR */}

      <aside className="sidebar">

        {/* LOGO */}

        <div className="dashboard-logo">

          <img
            src={cowLogo}
            alt="DairySync Logo"
          />

          <h2>DairySync</h2>

        </div>

        <ul>

          <li>
            <FaChartLine />
            Dashboard
          </li>

          {
            role === "seller" && (
              <>
                <li>
                  <FaUsers />
                  Manage Vendors
                </li>

                <li>
                  <FaReceipt />
                  Create Sale
                </li>

                <li>
                  <FaBoxOpen />
                  Inventory
                </li>

                <li>
                  <FaCrown />
                  Subscription
                </li>
              </>
            )
          }

          {
            role === "vendor" && (
              <>
                <li>
                  <FaBoxOpen />
                  Manage Inventory
                </li>

                <li>
                  <FaUserEdit />
                  Update Profile
                </li>
              </>
            )
          }

        </ul>

      </aside>

      {/* MAIN CONTENT */}

      <main className="dashboard-content">

        <h1>
          Welcome {fullName}
        </h1>

        <p className="role-text">
          Role: {role}
        </p>

        <div className="dashboard-cards">

          <div className="dashboard-card">
            <h3>Total Sales</h3>
            <p>₹25,000</p>
          </div>

          <div className="dashboard-card">
            <h3>Earnings</h3>
            <p>₹12,400</p>
          </div>

          <div className="dashboard-card">
            <h3>Orders</h3>
            <p>124 Orders</p>
          </div>

          <div className="dashboard-card">
            <h3>Total Milk</h3>
            <p>250 Liters</p>
          </div>

        </div>

      </main>

    </div>
  );
}