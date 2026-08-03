import {
    FaBoxes,
    FaTint,
    FaClock
} from "react-icons/fa";

export default function SummaryCards({ inventory }) {

    const totalMilk = inventory.reduce(

        (total, item) =>

            total + Number(item.availableQuantity),

        0

    );

    const milkTypes = inventory.length;

    const lastUpdated = inventory.length > 0
        ? "Today"
        : "--";

    const cards = [

        {
            title: "Total Milk",
            value: `${totalMilk} L`,
            icon: <FaTint />
        },

        {
            title: "Milk Types",
            value: milkTypes,
            icon: <FaBoxes />
        },

        {
            title: "Last Updated",
            value: lastUpdated,
            icon: <FaClock />
        }

    ];

    return (

        <div className="summary-card-container">

            {

                cards.map((card) => (

                    <div
                        key={card.title}
                        className="summary-card"
                    >

                        <div className="summary-icon">

                            {card.icon}

                        </div>

                        <div className="summary-content">

                            <h4>

                                {card.title}

                            </h4>

                            <h2>

                                {card.value}

                            </h2>

                        </div>

                    </div>

                ))

            }

        </div>

    );

}