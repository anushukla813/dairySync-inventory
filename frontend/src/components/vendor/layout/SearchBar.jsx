import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {

    const [query,setQuery]=useState("");

    const menu=[

        {
            name:"Dashboard",
            path:"/vendor/dashboard"
        },

        {
            name:"Milk Supply",
            path:"/vendor/supply"
        },

        {
            name:"Supply History",
            path:"/vendor/history"
        },

        {
            name:"Payments",
            path:"/vendor/payments"
        },

        {
            name:"Profile",
            path:"/vendor/profile"
        }

    ];

    const result=menu.filter(item=>

        item.name.toLowerCase().includes(
            query.toLowerCase()
        )

    );

    return(

        <div className="search-wrapper">

            <div className="search-box">

                <FaSearch/>

                <input

                    value={query}

                    onChange={(e)=>setQuery(e.target.value)}

                    placeholder="Search pages..."

                />

            </div>

            {

                query &&

                <div className="search-result">

                    {

                        result.length>0 ?

                        result.map((item,index)=>(

                            <div

                                key={index}

                                className="search-item"

                            >

                                {item.name}

                            </div>

                        ))

                        :

                        <div className="search-empty">

                            No Result Found

                        </div>

                    }

                </div>

            }

        </div>

    );

}