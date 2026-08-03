import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {

    const navigate = useNavigate();

    const [query, setQuery] = useState("");

    const menu = [

        {
            name: "Dashboard",
            path: "/seller/dashboard"
        },

        {
            name: "Inventory",
            path: "/seller/inventory"
        },

        {
            name: "Update Stock",
            path: "/seller/update-stock"
        },

        {
            name: "Reduce Stock",
            path: "/seller/reduce-stock"
        },

        {
            name: "Stock History",
            path: "/seller/history"
        },

        {
            name: "Sales",
            path: "/seller/sales"
        },

        {
            name: "Vendor Payments",
            path: "/seller/payments"
        }

    ];

    const result = menu.filter(item =>
        item.name
            .toLowerCase()
            .includes(query.toLowerCase())
    );

    const handleNavigation = (path) => {

        navigate(path);

        setQuery("");

    };

    return (

        <div className="search-wrapper">

            <div className="search-box">

                <FaSearch />

                <input

                    type="text"

                    value={query}

                    onChange={(e) => setQuery(e.target.value)}

                    placeholder="Search pages..."

                />

            </div>

            {

                query &&

                <div className="search-result">

                    {

                        result.length > 0 ?

                            result.map((item) => (

                                <div

                                    key={item.path}

                                    className="search-item"

                                    onClick={() => handleNavigation(item.path)}

                                >

                                    {item.name}

                                </div>

                            ))

                            :

                            <div className="search-empty">

                                No results found

                            </div>

                    }

                </div>

            }

        </div>

    );

}