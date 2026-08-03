import { useEffect, useRef, useState } from "react";
import { FaBell } from "react-icons/fa";

export default function NotificationMenu() {

    const [open, setOpen] = useState(false);

    const [notifications] = useState([

        {
            id: 1,
            title: "Inventory Updated",
            message: "Cow Milk stock has been updated.",
            time: "5 min ago",
            unread: true
        },

        {
            id: 2,
            title: "Sale Completed",
            message: "A new sale has been recorded.",
            time: "20 min ago",
            unread: true
        },

        {
            id: 3,
            title: "Vendor Payment",
            message: "A vendor payment has been processed.",
            time: "Yesterday",
            unread: false
        }

    ]);

    const unreadCount = notifications.filter(
        notification => notification.unread
    ).length;

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

    return (

        <div
            className="notification-container"
            ref={menuRef}
        >

            <button
                type="button"
                className="header-icon-button notification-button"
                onClick={() => setOpen(!open)}
            >

                <FaBell />

                {

                    unreadCount > 0 && (

                        <span className="notification-badge">

                            {unreadCount}

                        </span>

                    )

                }

            </button>

            {

                open && (

                    <div className="notification-dropdown">

                        <div className="notification-header">

                            Notifications

                        </div>

                        {

                            notifications.length === 0 ?

                                (

                                    <div className="notification-empty">

                                        No notifications available.

                                    </div>

                                )

                                :

                                notifications.map(notification => (

                                    <div
                                        key={notification.id}
                                        className={
                                            notification.unread
                                                ? "notification-item unread"
                                                : "notification-item"
                                        }
                                    >

                                        <h4>

                                            {notification.title}

                                        </h4>

                                        <p>

                                            {notification.message}

                                        </p>

                                        <span>

                                            {notification.time}

                                        </span>

                                    </div>

                                ))

                        }

                    </div>

                )

            }

        </div>

    );

}