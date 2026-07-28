import { useEffect, useRef, useState } from "react";
import { FaBell } from "react-icons/fa";

export default function NotificationMenu() {

    const [open, setOpen] = useState(false);

    // Later this data will come from Spring Boot API
    const [notifications] = useState([
        {
            id: 1,
            title: "New Milk Supply Added",
            message: "250 Litres Cow Milk",
            time: "2 min ago",
            unread: true
        },
        {
            id: 2,
            title: "Payment Received",
            message: "₹2,450 credited",
            time: "15 min ago",
            unread: true
        },
        {
            id: 3,
            title: "Supply Approved",
            message: "Buffalo Milk",
            time: "Yesterday",
            unread: false
        }
    ]);

    const unreadCount = notifications.filter(
        item => item.unread
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
                className="header-icon-button notification-button"
                onClick={() => setOpen(!open)}
            >

                <FaBell />

                {

                    unreadCount > 0 &&

                    <span className="notification-badge">

                        {unreadCount}

                    </span>

                }

            </button>

            {

                open &&

                <div className="notification-dropdown">

                    <div className="notification-header">

                        Notifications

                    </div>

                    {

                        notifications.length === 0 ?

                        (

                            <div className="notification-empty">

                                No Notifications

                            </div>

                        )

                        :

                        notifications.map(item => (

                            <div
                                key={item.id}
                                className={
                                    item.unread
                                        ? "notification-item unread"
                                        : "notification-item"
                                }
                            >

                                <h4>

                                    {item.title}

                                </h4>

                                <p>

                                    {item.message}

                                </p>

                                <span>

                                    {item.time}

                                </span>

                            </div>

                        ))

                    }

                </div>

            }

        </div>

    );

}