import React from "react";
import { Image } from "react-bootstrap";
import { resourceFolder, images } from "../config/resources";

function AdminTopNavbar() {
  const AdminLogo = `${resourceFolder.images}${images.adminLogo}`;

  return (
    <>
      <div className="adminTopNavBarContainer">
        <div className="adminTopNavWrapper">
          <Image src={AdminLogo} className="adminTopNavLogo" />
        </div>

        <div className="adminTopNavBarShadow"></div>
      </div>
    </>
  );
}

export default AdminTopNavbar;
