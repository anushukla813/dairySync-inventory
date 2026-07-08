import Sidebar from "../components/common/Sidebar";

export default function DashboardLayout({

  role,
  children

}) {

  return (

    <div className="dashboard-page">

      {/* SIDEBAR */}

      <Sidebar role={role} />

      {/* PAGE CONTENT */}

      <main className="dashboard-main">

        {children}

      </main>

    </div>
  );
}