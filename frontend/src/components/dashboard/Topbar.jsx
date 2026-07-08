import "../../styles/dashboard/Dashboard.css";

import { FaBell, FaUserCircle } from "react-icons/fa";

export default function Topbar({
fullName,
role
}) {

return (

<div className="topbar">

<div className="topbar-left">

<h2>
Dashboard
</h2>

<p>
Welcome back, {fullName}
</p>

</div>

<div className="topbar-right">

<button className="notification-btn">

<FaBell/>

</button>

<div className="profile-box">

<FaUserCircle className="profile-icon"/>

<div>

<h4>{fullName}</h4>

<span>{role}</span>

</div>

</div>

</div>

</div>

);

}