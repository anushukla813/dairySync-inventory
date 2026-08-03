import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FaUserCircle,
    FaChevronDown,
    FaUser,
    FaCog,
    FaSignOutAlt
} from "react-icons/fa";

export default function ProfileMenu() {

    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("loggedInUser")
    );

    const [open, setOpen] = useState(false);

    const menuRef = useRef(null);

    useEffect(() => {

        function handleClickOutside(event) {

            if (
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {

                setOpen(false);

            }

        }

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () =>

            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

    }, []);

    const handleLogout = () => {

        localStorage.removeItem("loggedInUser");
        localStorage.removeItem("token");

        navigate("/login");

    };

    return (

        <div
            className="profile-container"
            ref={menuRef}
        >

            <button
                className="profile-button"
                type="button"
                onClick={() => setOpen(!open)}
            >

                <FaUserCircle className="profile-image" />

                <div className="profile-info">

                    <h4>

                        {user?.fullName || "Seller"}

                    </h4>

                    <span>

                        Seller

                    </span>

                </div>

                <FaChevronDown className="dropdown-icon" />

            </button>

            {

                open && (

                    <div className="profile-dropdown">

                        <button
                            type="button"
                            onClick={() => navigate("/seller/profile")}
                        >

                            <FaUser />

                            My Profile

                        </button>

                        <button
                            type="button"
                        >

                            <FaCog />

                            Account Settings

                        </button>

                        <button
                            type="button"
                            className="logout-dropdown"
                            onClick={handleLogout}
                        >

                            <FaSignOutAlt />

                            Logout

                        </button>

                    </div>

                )

            }

        </div>

    );

}