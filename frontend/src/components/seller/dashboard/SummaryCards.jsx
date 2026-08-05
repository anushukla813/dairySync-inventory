import totalInventoryImage from "../../../assets/images/totalInven.jpeg";
import milkTypeImage from "../../../assets/images/milk-type.jpeg";
import lowItemImage from "../../../assets/images/lowItem.jpeg";

import "../../../styles/vendor/dashboardCards.css";


export default function SummaryCards({dashboard}){


    const cards=[


        {

            title:"Total Inventory",

            value:dashboard?.totalInventory ?? 0,

            description:"Total stock available",

            image:totalInventoryImage

        },


        {

            title:"Milk Types",

            value:dashboard?.totalMilkTypes ?? 0,

            description:"Available milk categories",

            image:milkTypeImage

        },


        {

            title:"Low Stock Items",

            value:dashboard?.lowStockItems ?? 0,

            description:"Items requiring attention",

            image:lowItemImage

        }


    ];



    return(


        <div className="dashboard-cards">


            {
                cards.map((card,index)=>(


                    <div
                        className="kpi-card"
                        key={index}
                    >


                        <div className="kpi-image">

                            <img
                                src={card.image}
                                alt={card.title}
                            />

                        </div>



                        <div className="kpi-content">


                            <h3>
                                {card.title}
                            </h3>


                            <h2>
                                {card.value}
                            </h2>


                            <p>
                                {card.description}
                            </p>


                        </div>


                    </div>


                ))
            }


        </div>


    );


}