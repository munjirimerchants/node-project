import "../assets/css/pages/AdminDetails.css";
import React from "react";
import { Button, Dropdown } from "react-bootstrap";
import { useLocation } from "react-router-dom";

function DropdownButton({
  handleSelect,
  currentlySelected,
  status,
  initialVal,
  patchChanges,
}) {
  const location = useLocation();
  const isBrickOrdersPage = location.pathname.includes("/admin/brick-orders");

  const getStatusColors = (status) => {
    switch (status) {
      // Return [backgroundColor, Color];
      case "Open":
        return ["#FF8282", "#F20000"];
      case "Closed":
        return ["#C0DEC3", "#4BA154"];
      //////////////////////////////
      case "Pending":
        return ["#FF8282", "#F20000"];
      case "In Progress":
        return ["#FBF1D4", "#E7B41C"];
      //////////////////////////////
      case "Complete":
        return ["#C0DEC3", "#4BA154"];
      case "50%":
        return ["#FBF1D4", "#E7B41C"];
      case "Full":
        return ["#C0DEC3", "#4BA154"];
      //////////////////////////////
      case "Active":
        return ["#C0DEC3", "#4BA154"];
      case "Inactive":
        return ["#FF8282", "#F20000"];
      default:
        return ["#F9F9F9", "#BBC8D4"];
    }
  };

  return (
    <>
      <Dropdown onSelect={handleSelect}>
        <Dropdown.Toggle
          id="dropdown-basic"
          style={{
            border: "none",
            backgroundColor: getStatusColors(currentlySelected)[0],
            color: getStatusColors(currentlySelected)[1],
          }}
          className="adminDropdownButton"
        >
          {currentlySelected}
        </Dropdown.Toggle>
        <Dropdown.Menu className="adminDropdown">
          {status.map((option, index) => (
            <Dropdown.Item
              key={index}
              eventKey={option}
              className="adminDropdownItem"
            >
              {option}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
        {!isBrickOrdersPage && (
          <span className="ms-4">
            {initialVal !== currentlySelected && (
              <Button onClick={patchChanges}>Confirm Changes</Button>
            )}
          </span>
        )}
      </Dropdown>
    </>
  );
}

export default DropdownButton;
