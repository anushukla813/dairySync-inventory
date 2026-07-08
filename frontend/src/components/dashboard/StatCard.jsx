import "../../styles/dashboard/Dashboard.css";

export default function StatCard({
    title,
    value,
    icon,
    color
}) {

return (

<div className="dashboard-card">

<div
className="card-icon"
style={{
background: color
}}
>
{icon}
</div>

<h3>{title}</h3>

<p>{value}</p>

</div>

);
}