import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";

import { useState } from "react";

import "../../../styles/vendor/analytics.css";


export default function AnalyticsChart({data}){


    const [filter,setFilter] = useState("Week");



    /*
        Temporary data

        Later only replace this with API response.

        Expected backend format:

        [
          {
            name:"Jan",
            milk:300,
            earnings:25000
          }
        ]

    */


    const weeklyData = [

        {
            name:"Mon",
            milk:120,
            earnings:5000
        },

        {
            name:"Tue",
            milk:180,
            earnings:7500
        },

        {
            name:"Wed",
            milk:150,
            earnings:6200
        },

        {
            name:"Thu",
            milk:220,
            earnings:9000
        },

        {
            name:"Fri",
            milk:260,
            earnings:11000
        },

        {
            name:"Sat",
            milk:240,
            earnings:10000
        },

        {
            name:"Sun",
            milk:300,
            earnings:13000
        }

    ];



    const monthlyData = [

        {
            name:"Jan",
            milk:900,
            earnings:35000
        },

        {
            name:"Feb",
            milk:1100,
            earnings:42000
        },

        {
            name:"Mar",
            milk:1300,
            earnings:50000
        },

        {
            name:"Apr",
            milk:1500,
            earnings:58000
        }

    ];



    const yearlyData = [

        {
            name:"2023",
            milk:12000,
            earnings:450000
        },

        {
            name:"2024",
            milk:15000,
            earnings:560000
        },

        {
            name:"2025",
            milk:18000,
            earnings:700000
        }

    ];



    const getChartData = ()=>{


        if(filter==="Month")
            return monthlyData;


        if(filter==="Year")
            return yearlyData;


        return weeklyData;

    };



    return (

        <div className="analytics-card">


            <div className="analytics-header">


                <div>

                    <h2>
                        Milk Supply Analytics
                    </h2>


                    <p>
                        Track your milk collection and earnings
                    </p>


                </div>



                <div className="analytics-buttons">


                    {
                        ["Week","Month","Year"]
                        .map((item)=>(


                            <button

                                key={item}

                                className={
                                    filter===item
                                    ?
                                    "active"
                                    :
                                    ""
                                }

                                onClick={()=>
                                    setFilter(item)
                                }

                            >

                                {item}

                            </button>


                        ))
                    }


                </div>


            </div>




            <div className="chart-area">


                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >


                    <LineChart
                        data={
                            data || getChartData()
                        }
                    >


                        <CartesianGrid
                            strokeDasharray="3 3"
                            opacity={0.15}
                        />


                        <XAxis
                            dataKey="name"
                        />


                        <YAxis/>


                        <Tooltip/>


                        <Legend/>




                        <Line

                            type="monotone"

                            dataKey="milk"

                            name="Milk Supply (L)"

                            stroke="#7C5CFC"

                            strokeWidth={3}

                            dot={{
                                r:5
                            }}

                        />



                        <Line

                            type="monotone"

                            dataKey="earnings"

                            name="Earnings"

                            stroke="#37B9F1"

                            strokeWidth={3}

                            dot={{
                                r:5
                            }}

                        />



                    </LineChart>


                </ResponsiveContainer>


            </div>


        </div>

    );

}