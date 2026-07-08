import "../../styles/dashboard/VendorDashboard.css";

import VendorSidebar from "../../components/vendor/VendorSidebar";

export default function VendorHistory() {

  return (

    <div className="vendor-dashboard">

      <VendorSidebar />

      <div className="vendor-main">

        <div className="vendor-topbar">

          <div>

            <h1>Supply History</h1>

            <p>
              View all supply records
            </p>

          </div>

        </div>

        <div className="vendor-analytics">

          <h2>History Table</h2>

        </div>

      </div>

    </div>
  );
}