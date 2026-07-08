import "../../styles/dashboard/VendorDashboard.css";

import VendorSidebar from "../../components/vendor/VendorSidebar";

export default function VendorProfile() {

  return (

    <div className="vendor-dashboard">

      <VendorSidebar />

      <div className="vendor-main">

        <div className="vendor-topbar">

          <div>

            <h1>Vendor Profile</h1>

            <p>
              Update your profile details
            </p>

          </div>

        </div>

        <div className="vendor-analytics">

          <h2>Profile Form</h2>

        </div>

      </div>

    </div>
  );
}