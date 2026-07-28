import DashboardCards from "./DashboardCards";
import AnalyticsChart from "../../components/vendor/dashboard/AnalyticsChart";
import "../../../styles/vendor/dashboard.css";

export default function Dashboard(){


    const user = JSON.parse(
        localStorage.getItem("loggedInUser")
    );


    return (

        <div className="vendor-dashboard">


            {/* Welcome Section */}

            <div className="dashboard-welcome">

                <h1>
                    Welcome back, {user?.fullName || "Vendor"}
                </h1>

                <p>
                    Here is your dairy business overview
                </p>

            </div>



            {/* Cards */}

            <DashboardCards />

            <AnalyticsChart />


        </div>

    );

}