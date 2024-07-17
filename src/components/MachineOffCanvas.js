import "../assets/css/components/MachineOffCanvas.css";
import React from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

const MachineOffCanvas = ({
  machineTagArray,
  show,
  handleClose,
  handleShow,
}) => {
  // Prevent scrolling to the top when Offcanvas is closed
  const handleOffcanvasHide = () => {
    handleClose(false);
  };

  return (
    <>
      <Button variant="primary" className="offScreenBtn" onClick={handleShow}>
        Our Machines
      </Button>
      <Offcanvas show={show} onHide={handleOffcanvasHide} restoreFocus={false}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Our Machines</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="machineOffCanvasBody">
          {machineTagArray}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default MachineOffCanvas;
