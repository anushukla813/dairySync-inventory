import { useEffect, useMemo, useState } from "react";
import { FaBoxOpen, FaCalendarAlt, FaArrowUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { getInventory } from "../../../services/sellerService";

import "../../../styles/seller/inventory.css";

export default function InventoryList() {

    const navigate = useNavigate();

    const [inventory, setInventory] = useState([]);

    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadInventory();

    }, []);

    const loadInventory = async () => {

        try {

            const data = await getInventory();

            setInventory(data);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    const filteredInventory = useMemo(() => {

        return inventory.filter(item =>

            item.milkType
                .toLowerCase()
                .includes(search.toLowerCase())

        );

    }, [inventory, search]);

    const totalQuantity = useMemo(() => {

        return inventory.reduce(

            (sum, item) =>

                sum + Number(item.availableQuantity),

            0

        );

    }, [inventory]);

    const getStatus = (quantity) => {

        if (quantity <= 0) {

            return "Out of Stock";

        }

        if (quantity < 50) {

            return "Low Stock";

        }

        return "Available";

    };

    return (

        <div className="inventory-container">

            <div className="inventory-top">

                <div>

                    <h1>Inventory</h1>

                    <p>

                        Manage and monitor available milk inventory.

                    </p>

                </div>

                <input

                    className="inventory-search"

                    placeholder="Search milk type..."

                    value={search}

                    onChange={(e) => setSearch(e.target.value)}

                />

            </div>

            <div className="inventory-summary">

                <div className="summary-card">

                    <h5>Total Products</h5>

                    <h2>{inventory.length}</h2>

                </div>

                <div className="summary-card">

                    <h5>Total Quantity</h5>

                    <h2>{totalQuantity} L</h2>

                </div>

                <div className="summary-card">

                    <h5>Available Types</h5>

                    <h2>{inventory.length}</h2>

                </div>

            </div>

            {

                loading ?

                (

                    <div className="inventory-loading">

                        Loading inventory...

                    </div>

                )

                :

                (

                    <div className="inventory-grid">

                        {

                            filteredInventory.map(item => (

                                <div

                                    key={item.inventoryId}

                                    className="inventory-box"

                                >

                                    <div className="inventory-card-header">

                                        <div className="inventory-icon">

                                            <FaBoxOpen />

                                        </div>

                                        <div>

                                            <h3>{item.milkType}</h3>

                                            <p>

                                                {item.availableQuantity} {item.unit}

                                            </p>

                                        </div>

                                    </div>

                                    <div className="inventory-info">

                                        <div>

                                            <span>Status</span>

                                            <strong>

                                                {getStatus(item.availableQuantity)}

                                            </strong>

                                        </div>

                                        <div>

                                            <span>Last Updated</span>

                                            <strong>

                                                <FaCalendarAlt />

                                                {" "}

                                                {

                                                    item.lastUpdated ?

                                                    new Date(item.lastUpdated).toLocaleDateString()

                                                    :

                                                    "--"

                                                }

                                            </strong>

                                        </div>

                                    </div>

                                    <button

                                        className="update-stock-btn"

                                        onClick={() =>

                                            navigate("/seller/update-stock")

                                        }

                                    >

                                        <FaArrowUp />

                                        Update Stock

                                    </button>

                                </div>

                            ))

                        }

                    </div>

                )

            }

        </div>

    );

}