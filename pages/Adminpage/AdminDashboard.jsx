import React from "react";
import Sidebar from "../../Components/AdminPageComponents/Sidebar";
import Topbar from "../../Components/AdminPageComponents/Topbar";
import DashboardMain from "../../Components/AdminPageComponents/DashboardMain";
function AdminDashboard() {
  return (
    <div>
      <Topbar />
      <Sidebar />
      <DashboardMain
        // products={products}
        // transaction={transaction}
        // users={users}
      />
    </div>
  );
}

export default AdminDashboard;
