import "../../styles/dashboard/Dashboard.css";
import cowLogo from "../../assets/images/cow.jpeg";

import {
  FaChartLine,
  FaBoxOpen,
  FaUserEdit,
  FaUsers,
  FaReceipt,
  FaCrown,
  FaTint,
  FaHistory
} from "react-icons/fa";

export default function Sidebar({
  role,
  activePage,
  setActivePage
}) {

  return (

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

        {/* DASHBOARD */}

        <li
          className={
            activePage === "dashboard"
              ? "active"
              : ""
          }

          onClick={() =>
            setActivePage("dashboard")
          }
        >
          <FaChartLine />
          Dashboard
        </li>

        {/* SELLER SIDEBAR */}

        {
          role === "ROLE_SELLER" && (
            <>

              <li
                className={
                  activePage === "vendors"
                    ? "active"
                    : ""
                }

                onClick={() =>
                  setActivePage("vendors")
                }
              >
                <FaUsers />
                Manage Vendors
              </li>

              <li
                className={
                  activePage === "sales"
                    ? "active"
                    : ""
                }

                onClick={() =>
                  setActivePage("sales")
                }
              >
                <FaReceipt />
                Create Sale
              </li>

              <li
                className={
                  activePage === "inventory"
                    ? "active"
                    : ""
                }

                onClick={() =>
                  setActivePage("inventory")
                }
              >
                <FaBoxOpen />
                Inventory
              </li>

              <li
                className={
                  activePage === "subscription"
                    ? "active"
                    : ""
                }

                onClick={() =>
                  setActivePage("subscription")
                }
              >
                <FaCrown />
                Subscription
              </li>

            </>
          )
        }

        {/* VENDOR SIDEBAR */}

        {
          role === "ROLE_VENDOR" && (
            <>

              <li
                className={
                  activePage === "milk"
                    ? "active"
                    : ""
                }

                onClick={() =>
                  setActivePage("milk")
                }
              >
                <FaTint />
                Milk Supply
              </li>

              <li
                className={
                  activePage === "history"
                    ? "active"
                    : ""
                }

                onClick={() =>
                  setActivePage("history")
                }
              >
                <FaHistory />
                Supply History
              </li>

              <li
                className={
                  activePage === "profile"
                    ? "active"
                    : ""
                }

                onClick={() =>
                  setActivePage("profile")
                }
              >
                <FaUserEdit />
                Update Profile
              </li>

            </>
          )
        }

      </ul>

    </aside>
  );
}