import "../assets/css/components/NavbarAdmin.css";

import AdminOrdersTable from "../components/AdminOrdersTable";
import { Container } from "react-bootstrap";
import AdminTopNavbar from "../components/AdminTopNavbar";

function AdminEnquiries() {
  return (
    <div className="adminContentContainer">
      <AdminTopNavbar />
      <div className="adminLeftSpacer">
        <div className="adminHeading">Brick Orders</div>
        <div className="adminSubHeading">
          Get a quick glimpse of everything taking place on the website
        </div>
        <div className="adminBorderBottom"></div>
      </div>
      <Container className="adminTableContainer">
        <AdminOrdersTable></AdminOrdersTable>
      </Container>
    </div>
  );
}

export default AdminEnquiries;
