import "../assets/css/components/NavbarOffCanvas.css";
import React, { useEffect } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { MenuIcon } from "@heroicons/react/solid";

const NavbarOffCanvas = ({ links, show, handleClose, handleShow }) => {
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

  return (
    <>
      <Button
        variant="primary"
        className="navOffScreenBtn"
        onClick={handleShow}
      >
        <MenuIcon className="navMenuIcon" />
      </Button>
      <Offcanvas
        show={show}
        onHide={handleOffcanvasHide}
        restoreFocus={false}
        placement="end"
      >
        <Offcanvas.Header closeButton></Offcanvas.Header>
        <Offcanvas.Body className="machineOffCanvasBody">
          {links}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default NavbarOffCanvas;
