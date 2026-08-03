import {
    FaTint,
    FaClock
} from "react-icons/fa";

export default function InventoryCard({ inventory }) {

    const formatDate = (date) => {

        if (!date) {

            return "--";

        }

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    };

    return (

        <div className="inventory-card">

            <div className="inventory-card-header">

                <div className="inventory-icon">

                    <FaTint />

                </div>

                <div>

                    <h3>

                        {inventory.milkType}

                    </h3>

                    <p>

                        Milk Type

                    </p>

                </div>

            </div>

            <div className="inventory-card-body">

                <h2>

                    {inventory.availableQuantity} {inventory.unit}

                </h2>

            </div>

            <div className="inventory-card-footer">

                <FaClock />

                <span>

                    Last Updated: {formatDate(inventory.lastUpdated)}

                </span>

            </div>

        </div>

    );

}