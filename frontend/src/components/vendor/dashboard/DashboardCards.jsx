import earningsImage from "../../../assets/images/earnings.jpeg";
import milkSupplyImage from "../../../assets/images/milk-supply.jpeg";
import ordersImage from "../../../assets/images/orders.jpeg";
import growthImage from "../../../assets/images/growth.jpeg";

import "../../../styles/vendor/dashboardCards.css";


export default function DashboardCards({data}){


    const cards = [

        {
            title:"Total Earnings",
            value:`₹ ${data?.totalEarnings || 0}`,
            description:"Total income generated",
            image:earningsImage
        },


        {
            title:"Milk Supplied",
            value:`${data?.totalMilkSupplied || 0} L`,
            description:"Total milk collection",
            image:milkSupplyImage
        },


        {
            title:"Total Orders",
            value:data?.totalOrders || 0,
            description:"Completed dairy orders",
            image:ordersImage
        },


        {
            title:"Growth",
            value:`${data?.growth || 0}%`,
            description:"Monthly business growth",
            image:growthImage
        }


    ];



    return (

        <div className="dashboard-cards">


            {
                cards.map((card,index)=>(


                    <div 
                        className="kpi-card"
                        key={index}
                    >



                        {/* IMAGE */}

                        <div className="kpi-image">


                            <img
                                src={card.image}
                                alt={card.title}
                            />


                        </div>




                        {/* CONTENT */}

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