import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SummaryCards from "./SummaryCards";
import InventoryCard from "./InventoryCard";

import { getInventory } from "../../../services/sellerService";

import "../../../styles/seller/dashboard.css";

export default function Dashboard() {

    const navigate = useNavigate();

    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        loadInventory();

    }, []);

    const loadInventory = async () => {

        try {

            setLoading(true);

            const response = await getInventory();

            setInventory(response);

            setError("");

        }
        catch (err) {

            console.error(err);

            setError("Unable to load inventory.");

        }
        finally {

            setLoading(false);

        }

    };

    return (

        <div className="seller-dashboard">

            <section className="dashboard-heading">

                <h1>Seller Dashboard</h1>

                <p>

                    Monitor inventory, manage stock and track milk availability.

                </p>

            </section>

            {

                loading ?

                <div className="dashboard-loading">

                    Loading inventory...

                </div>

                :

                error ?

                <div className="dashboard-error">

                    {error}

                </div>

                :

                <>

                    <SummaryCards inventory={inventory} />

                    <section className="quick-actions">

                        <button
                            onClick={() => navigate("/seller/update-stock")}
                        >
                            Update Stock
                        </button>

                        <button
                            onClick={() => navigate("/seller/reduce-stock")}
                        >
                            Reduce Stock
                        </button>

                        <button
                            onClick={() => navigate("/seller/history")}
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

                            (

                                <div className="empty-state">

                                    <h3>

                                        Inventory Not Available

                                    </h3>

                                    <p>

                                        No inventory records were found.

                                    </p>

                                </div>

                            )

                            :

                            (

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

                            )

                        }

                    </section>

                </>

            }

        </div>

    );

}