import {
  FaHome,
  FaTint,
  FaHistory,
  FaMoneyBillWave,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";

import logo from "../../../assets/images/cow.jpeg";

export default function VendorSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const menuItems = [
    {
      title: "Dashboard",
      path: "/vendor/dashboard",
      icon: <FaHome />,
    },
    {
      title: "Milk Supply",
      path: "/vendor/supply",
      icon: <FaTint />,
    },
    {
      title: "Supply History",
      path: "/vendor/history",
      icon: <FaHistory />,
    },
    {
      title: "Payments",
      path: "/vendor/payments",
      icon: <FaMoneyBillWave />,
    },
    {
      title: "Profile",
      path: "/vendor/profile",
      icon: <FaUserCircle />,
    },
  ];

  return (
    <aside className="vendor-sidebar">

      {/* Logo */}

      <div className="sidebar-top">

        <div className="logo-wrapper">

          <img
            src={logo}
            alt="DairySync"
            className="logo-image"
          />

          <div className="logo-text">

            <h2>DairySync</h2>

            <p>Smart Dairy</p>

          </div>

        </div>

        <nav className="sidebar-menu">

          {menuItems.map((item) => (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "menu-item active"
                  : "menu-item"
              }
            >
              <span className="menu-icon">
                {item.icon}
              </span>

              <span>{item.title}</span>

            </NavLink>
          ))}

        </nav>

      </div>

      {/* Logout */}

      <div className="sidebar-bottom">

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          <FaSignOutAlt />

          Logout

        </button>

      </div>

    </aside>
  );
}