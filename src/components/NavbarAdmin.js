import "../assets/css/components/NavbarAdmin.css"; // Import the CSS file containing the styles
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Image } from "react-bootstrap";
import { ChartSquareBarIcon, UserIcon } from "@heroicons/react/solid";
import NavbarAdminOffCanvas from "./NavbarAdminOffCanvas";
import { useAuth } from "../context/AuthContext";
import AdminLogout from "../pages/AdminLogout";

import { resourceFolder, images } from "../config/resources";

function NavbarAdmin() {
  const Logo = `${resourceFolder.images}${images.adminLogo}`;

  const getWindowWidth = () => window.innerWidth;

  const [isSmallScreen, setIsSmallScreen] = useState(getWindowWidth() <= 768);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(getWindowWidth() <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { userStatus } = useAuth();
  const [modal, setModal] = useState(false);

  return (
    <>
      {isSmallScreen ? (
        <NavbarAdminOffCanvas
          handleClose={handleClose}
          handleShow={handleShow}
          show={show}
          userStatus={userStatus}
          setModal={setModal}
        />
      ) : (
        <Container className="adminNavbar">
          <div className="adminLogoDiv">
            <Link to="/admin/dashboard" className="adminLink">
              <Image src={Logo} className="adminLogo" />
            </Link>
          </div>
          <div className="adminLinkDiv">
            <Link to="/admin/dashboard" className="adminLink">
              <div className="adminNavbarSize">
                <ChartSquareBarIcon className="adminIcons" />
                &nbsp; Dashboard
              </div>
            </Link>
            <Link to="/admin/enquiries" className="adminLink">
              <div className="adminNavbarSize">
                <UserIcon className="adminIcons" />
                &nbsp; Enquiries
              </div>
            </Link>
            <Link to="/admin/brick-orders" className="adminLink">
              <div className="adminNavbarSize">
                <UserIcon className="adminIcons" />
                &nbsp; Brick Orders
              </div>
            </Link>
            <Link to="/admin/users" className="adminLink">
              <div className="adminNavbarSize">
                <UserIcon className="adminIcons" />
                &nbsp; Website Users
              </div>
            </Link>

            {userStatus && (
              <>
                <Button
                  className="navbarLogoutInOffCanvas mt-5"
                  onClick={setModal}
                >
                  Logout
                </Button>{" "}
              </>
            )}
          </div>
        </Container>
      )}
      {modal && <AdminLogout modal={modal} setModal={setModal} />}
    </>
  );
}

export default NavbarAdmin;
