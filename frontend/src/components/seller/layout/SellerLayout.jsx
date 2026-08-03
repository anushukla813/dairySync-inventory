import { Outlet } from "react-router-dom";

import SellerSidebar from "./SellerSidebar";
import SellerHeader from "./SellerHeader";

import "../../../styles/seller/seller.css";


export default function SellerLayout(){

    return (

        <div className="seller-layout">


            {/* Sidebar */}

            <SellerSidebar />


            {/* Main Content */}

            <div className="seller-content">


                {/* Header */}

                <SellerHeader />


                {/* Page Content */}

                <main className="seller-page">

                    <Outlet />

                </main>


            </div>


        </div>

    );

}