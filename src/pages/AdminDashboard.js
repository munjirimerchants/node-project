import "../assets/css/components/NavbarAdmin.css";

import AdminTopNavbar from "../components/AdminTopNavbar";

function AdminDashboard() {
  return (
    <div className="adminContentContainer">
      <AdminTopNavbar />

      <div className="adminLeftSpacer">
        <div className="adminHeading">Dashboard</div>
        <div className="adminSubHeading">
          Get a quick glimpse of everything taking place on the website
        </div>
        <div className="adminBorderBottom"></div>
      </div>
    </div>
  );
}

export default AdminDashboard;
