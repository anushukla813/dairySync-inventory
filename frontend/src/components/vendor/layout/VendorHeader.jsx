import SearchBar from "./SearchBar";
import NotificationMenu from "./NotificationMenu";
import ProfileMenu from "./ProfileMenu";

import {
    FaSearch,
    FaBell,
    FaCog,
    FaChevronDown,
    FaCalendarAlt,
    FaUser,
    FaSignOutAlt,
    FaUserCircle
} from "react-icons/fa";
import { useEffect, useState } from "react";

import "../../../styles/vendor/header.css";

export default function VendorHeader() {

    const [currentDate, setCurrentDate] = useState("");

    useEffect(() => {

        const updateDate = () => {

            const now = new Date();

            const options = {

                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"

            };

            setCurrentDate(

                now.toLocaleDateString(
                    "en-IN",
                    options
                )

            );

        };

        updateDate();

        const interval = setInterval(updateDate, 60000);

        return () => clearInterval(interval);

    }, []);

    return (

        <header className="vendor-header">

            {/* Left */}

            <div className="header-left">

                <SearchBar />

            </div>

            {/* Right */}

            <div className="header-actions">

                <div className="header-date">

                    <FaCalendarAlt />

                    <span>

                        {currentDate}

                    </span>

                </div>

                <button
                    className="header-icon-button"
                    title="Settings"
                >

                    <FaCog />

                </button>

                <NotificationMenu />

                <ProfileMenu />

            </div>

        </header>

    );

}