import {
    FaBoxes,
    FaTint,
    FaExclamationTriangle
} from "react-icons/fa";


export default function SummaryCards({dashboard}){


    const cards=[


        {

            title:"Total Inventory",

            value:dashboard?.totalInventory ?? 0,

            icon:<FaBoxes/>

        },



        {

            title:"Milk Types",

            value:dashboard?.totalMilkTypes ?? 0,

            icon:<FaTint/>

        },



        {

            title:"Low Stock Items",

            value:dashboard?.lowStockItems ?? 0,

            icon:<FaExclamationTriangle/>

        }


    ];



    return(


        <div className="summary-card-container">


            {


                cards.map(card=>(


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