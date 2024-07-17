import "../assets/css/components/NavbarOffCanvas.css";

import React, { useEffect } from "react";
import { ChartSquareBarIcon, MenuIcon, UserIcon } from "@heroicons/react/solid";
import { Container, Image, Button, Offcanvas } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { XIcon } from "@heroicons/react/outline";
import { resourceFolder, images } from "../config/resources";

const NavbarAdminOffCanvas = ({
  show,
  handleClose,
  handleShow,
  userStatus,
  setModal,
}) => {
  const Logo = `${resourceFolder.images}${images.adminLogo}`;
  const navigate = useNavigate();
  // Prevent scrolling to the top when Offcanvas is closed
  const handleOffcanvasHide = () => {
    handleClose(false);
  };

  useEffect(() => {
    // Add or remove class to body based on offcanvas show state
    if (show) {
      document.body.classList.add("offcanvas-open");
    } else {
      document.body.classList.remove("offcanvas-open");
    }
  }, [show]);

  function handleNavigation(event, link) {
    event.preventDefault();
    handleOffcanvasHide();
    navigate(link);
  }

  function handleLogout(event) {
    event.preventDefault();
    handleOffcanvasHide();
    setModal(true);
  }
  return (
    <>
      <Button
        variant="primary"
        className="adminNavOffScreenBtn"
        onClick={handleShow}
      >
        <MenuIcon className="navMenuIcon" />
      </Button>
      <Offcanvas
        show={show}
        onHide={handleOffcanvasHide}
        restoreFocus={false}
        placement="start"
        className="adminOffCanvas"
        name="start"
      >
        <Container className="adminOffCanvasNavbar">
          <div className="customHeader">
            <button className="close" onClick={handleOffcanvasHide}>
              {/* Replace the default 'X' icon with the HeroIcon */}
              <XIcon className="icon" />
            </button>
          </div>
          <Offcanvas.Body className="adminOffCanvasBody">
            <div
              className="adminLogoDiv"
              onClick={(event) => handleNavigation(event, "/admin/dashboard")}
            >
              <div className="adminLink">
                <Image src={Logo} className="adminLogo" />
              </div>
            </div>
            <div className="adminLinkDiv">
              <div
                onClick={(event) => handleNavigation(event, "/admin/dashboard")}
                className="adminLink"
              >
                <div className="adminNavbarSize">
                  <ChartSquareBarIcon className="adminIcons" />
                  &nbsp; Dashboard
                </div>
              </div>
              <div
                onClick={(event) => handleNavigation(event, "/admin/enquiries")}
                className="adminLink"
              >
                <div className="adminNavbarSize">
                  <UserIcon className="adminIcons" />
                  &nbsp; Enquiries
                </div>
              </div>
              <div
                onClick={(event) =>
                  handleNavigation(event, "/admin/brick-orders")
                }
                className="adminLink"
              >
                <div className="adminNavbarSize">
                  <UserIcon className="adminIcons" />
                  &nbsp; Brick Orders
                </div>
              </div>
              <div
                onClick={(event) => handleNavigation(event, "/admin/users")}
                className="adminLink"
              >
                <div className="adminNavbarSize">
                  <UserIcon className="adminIcons" />
                  &nbsp; Website Users
                </div>
              </div>
              {userStatus && (
                <>
                  <Button
                    className="navbarLogoutInOffCanvas mt-5"
                    onClick={(event) => handleLogout(event)}
                  >
                    Logout
                  </Button>{" "}
                </>
              )}
            </div>
          </Offcanvas.Body>
        </Container>
      </Offcanvas>
    </>
  );
};

export default NavbarAdminOffCanvas;
