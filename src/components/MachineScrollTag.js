import React from "react";
import { Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const MachineScrollTag = ({ machineName, id, handleClose }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    // e.preventDefault();
    handleClose();
    navigate(id);
    return false;
  };

  return (
    <Col className="d-flex machineCol">
      <Button href={id} className="machineScrollTag" onClick={handleClick}>
        {machineName}
      </Button>
    </Col>
  );
};

export default MachineScrollTag;
