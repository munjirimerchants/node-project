import "../assets/css/components/NavbarAdmin.css";

import AdminUsersTable from "../components/AdminUsersTable";
import { Container } from "react-bootstrap";
import AdminTopNavbar from "../components/AdminTopNavbar";

function AdminUsers() {
  return (
    <div className="adminContentContainer">
      <AdminTopNavbar />
      <div className="adminLeftSpacer">
        <div className="adminHeading">Users</div>
        <div className="adminSubHeading">
          Get a quick glimpse of everything taking place on the website
        </div>
        <div className="adminBorderBottom"></div>
      </div>
      <Container className="adminTableContainer">
        <AdminUsersTable></AdminUsersTable>
      </Container>
    </div>
  );
}

export default AdminUsers;
