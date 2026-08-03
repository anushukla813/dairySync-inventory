import {
    useEffect,
    useState
} from "react";


import {
    FaCalendarAlt,
    FaCog
} from "react-icons/fa";


import SearchBar from "./SearchBar";
import NotificationMenu from "./NotificationMenu";
import ProfileMenu from "./ProfileMenu";


import "../../../styles/seller/header.css";



export default function SellerHeader(){


    const [currentDate,setCurrentDate]=useState("");



    useEffect(()=>{


        const updateDate=()=>{


            const now=new Date();


            const options={

                weekday:"long",

                day:"numeric",

                month:"long",

                year:"numeric"

            };


            setCurrentDate(

                now.toLocaleDateString(

                    "en-IN",

                    options

                )

            );


        };



        updateDate();



        const interval=setInterval(

            updateDate,

            60000

        );



        return ()=>clearInterval(interval);



    },[]);




    return (


        <header className="seller-header">


            <div className="header-left">


                <SearchBar/>


            </div>



            <div className="header-actions">



                <div className="header-date">


                    <FaCalendarAlt/>


                    <span>

                        {currentDate}

                    </span>


                </div>



                <button

                    className="header-icon-button"

                    title="Settings"

                >


                    <FaCog/>


                </button>



                <NotificationMenu/>


                <ProfileMenu/>



            </div>



        </header>


    );


}