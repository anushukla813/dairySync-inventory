import DashboardCards from "../../components/vendor/dashboard/DashboardCards";

import { useEffect, useState } from "react";

import { getVendorDashboard } from "../../services/vendorService";

import "../../styles/vendor/dashboard.css";


export default function Dashboard(){


    const user = JSON.parse(
        localStorage.getItem("loggedInUser")
    );

    const [greeting,setGreeting] = useState("");

    const [dashboardData,setDashboardData] = useState(null);

    const [loading,setLoading] = useState(true);

    const updateGreeting = ()=>{

        const hour = new Date().getHours();

        if(hour >=5 && hour <12){

            setGreeting("Good Morning");

        }
        else if(hour >=12 && hour <17){

            setGreeting("Good Afternoon");

        }
        else if(hour >=17 && hour <21){

            setGreeting("Good Evening");

        }
        else{

            setGreeting("Good Night");

        }

    };

    const loadDashboard = async()=>{

        try{

            const data = await getVendorDashboard();

            setDashboardData(data);

        }
        catch(error){


            console.log(
                "Dashboard API Error:",
                error
            );


        }
        finally{


            setLoading(false);


        }

    };

    useEffect(()=>{

        updateGreeting();


        loadDashboard();

        const timer = setInterval(

            updateGreeting,

            60000

        );

        return ()=>clearInterval(timer);


    },[]);


    if(loading){


        return(

            <div className="dashboard-loading">

                Loading Dashboard...

            </div>

        );

    }

    return (

        <div className="vendor-dashboard">

            <div className="dashboard-welcome">


                <h1>

                    {greeting}, {user?.fullName || "Vendor"} 

                </h1>

                <p>

                    Here is your dairy business overview

                </p>

            </div>

            <DashboardCards

                data={dashboardData}

            />

        </div>

    );

}