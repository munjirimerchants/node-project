import "../assets/css/components/NavbarAdmin.css";

import AdminEnquiriesTable from "../components/AdminEnquiriesTable";
import { Container } from "react-bootstrap";
import AdminTopNavbar from "../components/AdminTopNavbar";

function AdminEnquiries() {
  return (
    <div className="adminContentContainer">
      <AdminTopNavbar />
      <div className="adminLeftSpacer">
        <div className="adminHeading">Enquiries</div>
        <div className="adminSubHeading">
          Get a quick glimpse of everything taking place on the website
        </div>
        <div className="adminBorderBottom"></div>
      </div>
      <Container className="adminTableContainer">
        <AdminEnquiriesTable></AdminEnquiriesTable>
      </Container>
    </div>
  );
}

export default AdminEnquiries;
