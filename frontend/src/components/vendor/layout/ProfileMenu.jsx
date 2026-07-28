import { useEffect, useRef, useState } from "react";

import {
    FaUserCircle,
    FaChevronDown,
    FaUser,
    FaCog,
    FaSignOutAlt
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

export default function ProfileMenu() {

    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("loggedInUser")
    );

    const [open, setOpen] = useState(false);

    const menuRef = useRef(null);

    useEffect(() => {

        function handleClickOutside(e) {

            if (
                menuRef.current &&
                !menuRef.current.contains(e.target)
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

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("loggedInUser");

        navigate("/login");

    };

    return (

        <div
            className="profile-container"
            ref={menuRef}
        >

            <button

                className="profile-button"

                onClick={() => setOpen(!open)}

            >

                <FaUserCircle
                    className="profile-image"
                />

                <div className="profile-info">

                    <h4>

                        {user?.fullName || "Vendor"}

                    </h4>

                    <span>

                        Vendor

                    </span>

                </div>

                <FaChevronDown />

            </button>

            {

                open &&

                <div className="profile-dropdown">

                    <button
                        onClick={() =>
                            navigate("/vendor/profile")
                        }
                    >

                        <FaUser />

                        My Profile

                    </button>

                    <button>

                        <FaCog />

                        Account Settings

                    </button>

                    <button

                        className="logout-dropdown"

                        onClick={logout}

                    >

                        <FaSignOutAlt />

                        Logout

                    </button>

                </div>

            }

        </div>

    );

}