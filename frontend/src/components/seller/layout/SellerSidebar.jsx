import {
    FaHome,
    FaBoxes,
    FaArrowCircleUp,
    FaArrowCircleDown,
    FaHistory,
    FaShoppingCart,
    FaMoneyBillWave,
    FaSignOutAlt
} from "react-icons/fa";


import {
    NavLink,
    useNavigate
} from "react-router-dom";


import logo from "../../../assets/images/cow.jpeg";


import "../../../styles/seller/sidebar.css";



export default function SellerSidebar(){


    const navigate = useNavigate();



    const handleLogout = () => {


        localStorage.removeItem("loggedInUser");

        localStorage.removeItem("token");


        navigate("/login");


    };



    const menuItems = [


        {
            title:"Dashboard",
            path:"/seller/dashboard",
            icon:<FaHome/>
        },


        {
            title:"Inventory",
            path:"/seller/inventory",
            icon:<FaBoxes/>
        },


        {
            title:"Update Stock",
            path:"/seller/update-stock",
            icon:<FaArrowCircleUp/>
        },


        {
            title:"Reduce Stock",
            path:"/seller/reduce-stock",
            icon:<FaArrowCircleDown/>
        },


        {
            title:"Stock History",
            path:"/seller/history",
            icon:<FaHistory/>
        },


        {
            title:"Sales",
            path:"/seller/sales",
            icon:<FaShoppingCart/>
        },


        {
            title:"Vendor Payments",
            path:"/seller/payments",
            icon:<FaMoneyBillWave/>
        }


    ];



    return (


        <aside className="seller-sidebar">


            <div className="sidebar-top">


                <div className="logo-wrapper">


                    <img

                        src={logo}

                        alt="DairySync"

                        className="logo-image"

                    />


                    <div className="logo-text">


                        <h2>
                            DairySync
                        </h2>


                        <p>
                            Seller Panel
                        </p>


                    </div>


                </div>



                <nav className="sidebar-menu">


                    {

                        menuItems.map((item)=>(


                            <NavLink

                                key={item.title}

                                to={item.path}


                                className={({isActive})=>

                                    isActive

                                    ?

                                    "menu-item active"

                                    :

                                    "menu-item"

                                }


                            >


                                <span className="menu-icon">

                                    {item.icon}

                                </span>


                                <span>

                                    {item.title}

                                </span>


                            </NavLink>


                        ))

                    }


                </nav>


            </div>



            <div className="sidebar-bottom">


                <button

                    className="logout-button"

                    onClick={handleLogout}

                >


                    <FaSignOutAlt/>


                    Logout


                </button>


            </div>



        </aside>


    );


}