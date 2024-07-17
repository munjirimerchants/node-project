import { Link } from "react-router-dom";
import { Button, Dropdown } from "react-bootstrap";
import { UserCircleIcon, UserIcon } from "@heroicons/react/solid";
import { LogoutIcon } from "@heroicons/react/outline";

const NavbarsDropDown = ({ currentUser, setModal }) => {
  return (
    <Dropdown className="navDropDown">
      <Dropdown.Toggle
        as={Button}
        className="navDropDownButton"
        id="dropdown-basic"
      >
        <UserCircleIcon className="navDropDownIcon" />
      </Dropdown.Toggle>
      {currentUser ? (
        <Dropdown.Menu className="navDropDownDiv">
          <Link to="/account/profile">
            <Button className="navbarButtonInOffCanvas navbarProfileButton">
              <UserIcon className="navbarUserIcon"></UserIcon>
              Profile
            </Button>
          </Link>

          <Button
            className="navbarButtonInOffCanvas mt-3 navbarLogoutButton"
            onClick={() => setModal(true)}
          >
            <LogoutIcon className="navbarLogoutIcon"></LogoutIcon>
            Logout
          </Button>
        </Dropdown.Menu>
      ) : (
        <Dropdown.Menu className="navDropDownDiv">
          <Link to="/login">
            <Button className="navbarButtonInOffCanvas navbarLogoutButton">
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button className="navbarButtonInOffCanvas mt-3 navbarLogoutButton">
              Register
            </Button>
          </Link>
        </Dropdown.Menu>
      )}
    </Dropdown>
  );
};

export default NavbarsDropDown;
