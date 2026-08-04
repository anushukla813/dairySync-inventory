import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SummaryCards from "./SummaryCards";
import InventoryCard from "./InventoryCard";

import {
    getInventory,
    getSellerDashboard
} from "../../../services/sellerService";

import "../../../styles/seller/dashboard.css";


export default function Dashboard() {

    const navigate = useNavigate();

    const [dashboard, setDashboard] = useState(null);
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {

        loadDashboard();

        const refreshInventory = () => {
            loadDashboard();
        };

        window.addEventListener(
            "inventoryUpdated",
            refreshInventory
        );

        return () => {
            window.removeEventListener(
                "inventoryUpdated",
                refreshInventory
            );
        };

    }, []);



    const loadDashboard = async () => {

        try {

            setLoading(true);

            const dashboardData =
                await getSellerDashboard();

            const inventoryData =
                await getInventory();

            setDashboard(dashboardData);
            setInventory(inventoryData);
            setError("");

        }
        catch (err) {

            console.error(
                "Dashboard Error:",
                err
            );

            setError(
                "Unable to load seller dashboard."
            );

        }
        finally {

            setLoading(false);

        }

    };


    return (

        <div className="seller-dashboard">

            <section className="dashboard-heading">

                <h1>
                    Seller Dashboard
                </h1>

                <p>
                    Monitor inventory, manage stock and track milk availability.
                </p>

            </section>


            {
                loading ?

                <div className="dashboard-loading">
                    Loading dashboard...
                </div>

                :

                error ?

                <div className="dashboard-error">
                    {error}
                </div>

                :

                <>

                    <SummaryCards
                        dashboard={dashboard}
                        inventory={inventory}
                    />


                    <section className="quick-actions">

                        <button
                            onClick={() =>
                                navigate("/seller/update-stock")
                            }
                        >
                            Update Stock
                        </button>


                        <button
                            onClick={() =>
                                navigate("/seller/reduce-stock")
                            }
                        >
                            Reduce Stock
                        </button>


                        <button
                            onClick={() =>
                                navigate("/seller/history")
                            }
                        >
                            Stock History
                        </button>

                    </section>


                    <section className="inventory-section">

                        <div className="section-title">

                            <div>

                                <h2>
                                    Current Inventory
                                </h2>

                                <p>
                                    Live inventory available in storage
                                </p>

                            </div>

                        </div>


                        {
                            inventory.length === 0 ?

                            <div className="empty-state">

                                <h3>
                                    Inventory Not Available
                                </h3>

                                <p>
                                    No inventory records were found.
                                </p>

                            </div>

                            :

                            <div className="inventory-grid">

                                {
                                    inventory.map(item => (

                                        <InventoryCard
                                            key={item.inventoryId}
                                            inventory={item}
                                        />

                                    ))
                                }

                            </div>
                        }


                    </section>

                </>
            }

        </div>

    );

}