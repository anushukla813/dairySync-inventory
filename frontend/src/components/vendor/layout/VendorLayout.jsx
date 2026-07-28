import { Outlet } from "react-router-dom";

import VendorSidebar from "./VendorSidebar";
import VendorHeader from "./VendorHeader";

import "../../../styles/vendor/vendor.css";


export default function VendorLayout(){

    return (

        <div className="vendor-layout">


            {/* Sidebar */}

            <VendorSidebar />



            {/* Main Content */}

            <div className="vendor-content">


                {/* Header */}

                <VendorHeader />



                {/* Child Routes */}

                <main className="vendor-page">

                    <Outlet />

                </main>


            </div>


        </div>

    );

}