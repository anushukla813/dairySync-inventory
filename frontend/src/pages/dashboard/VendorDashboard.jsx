import { useState } from "react";

import "../../styles/dashboard/VendorDashboard.css";

import Sidebar from "../../components/common/Sidebar";

import {
  FaMoneyBillWave,
  FaShoppingCart,
  FaTint,
  FaChartLine,
  FaUserCircle
} from "react-icons/fa";

export default function VendorDashboard() {

  const [activePage, setActivePage] =
    useState("dashboard");

  const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser")
  );

  const role = loggedInUser?.role;

  const fullName =
    loggedInUser?.fullName || "Vendor";

  return (

    <div className="vendor-dashboard">

      {/* SIDEBAR */}

      <Sidebar
        role={role}
        activePage={activePage}
        setActivePage={setActivePage}
      />

      {/* MAIN CONTENT */}

      <main className="vendor-main">

        {/* TOPBAR */}

        <div className="vendor-topbar">

          <div>

            <h1>
              Welcome, {fullName}
            </h1>

            <p>
              Manage your dairy business smarter
            </p>

          </div>

          <div className="vendor-profile">

            <FaUserCircle
              className="vendor-profile-icon"
            />

            <div>

              <h4>{fullName}</h4>

              <span>
                {role === "ROLE_VENDOR"
                  ? "Vendor"
                  : "Seller"}
              </span>

            </div>

          </div>

        </div>

        {/* DASHBOARD */}

        {
          activePage === "dashboard" && (

            <>

              <div className="vendor-cards">

                <div className="vendor-card">

                  <div
                    className="vendor-card-icon"
                    style={{
                      background: "#198754"
                    }}
                  >
                    <FaMoneyBillWave />
                  </div>

                  <h3>Total Earnings</h3>

                  <p>₹25,000</p>

                </div>

                <div className="vendor-card">

                  <div
                    className="vendor-card-icon"
                    style={{
                      background: "#0d6efd"
                    }}
                  >
                    <FaTint />
                  </div>

                  <h3>Milk Supplied</h3>

                  <p>250L</p>

                </div>

                <div className="vendor-card">

                  <div
                    className="vendor-card-icon"
                    style={{
                      background: "#fd7e14"
                    }}
                  >
                    <FaShoppingCart />
                  </div>

                  <h3>Total Orders</h3>

                  <p>124</p>

                </div>

                <div className="vendor-card">

                  <div
                    className="vendor-card-icon"
                    style={{
                      background: "#20c997"
                    }}
                  >
                    <FaChartLine />
                  </div>

                  <h3>Growth</h3>

                  <p>+18%</p>

                </div>

              </div>

              {/* ANALYTICS */}

              <div className="vendor-analytics">

                <h2>
                  Milk Collection Analytics
                </h2>

                <div className="analytics-chart">

                  <div
                    className="bar"
                    style={{ height: "140px" }}
                  ></div>

                  <div
                    className="bar"
                    style={{ height: "90px" }}
                  ></div>

                  <div
                    className="bar"
                    style={{ height: "180px" }}
                  ></div>

                  <div
                    className="bar"
                    style={{ height: "120px" }}
                  ></div>

                  <div
                    className="bar"
                    style={{ height: "160px" }}
                  ></div>

                </div>

              </div>

            </>
          )
        }

        {/* MILK SUPPLY */}

        {
          activePage === "milk" && (

            <div className="vendor-analytics">

              <h2>Milk Supply</h2>

              <p>
                Milk supply form will come here.
              </p>

            </div>
          )
        }

        {/* SUPPLY HISTORY */}

        {
          activePage === "history" && (

            <div className="vendor-analytics">

              <h2>Supply History</h2>

              <p>
                Supply history data will come here.
              </p>

            </div>
          )
        }

        {/* PROFILE */}

        {
          activePage === "profile" && (

            <div className="vendor-analytics">

              <h2>Update Profile</h2>

              <p>
                Vendor profile update form
                will come here.
              </p>

            </div>
          )
        }

      </main>

    </div>
  );
}