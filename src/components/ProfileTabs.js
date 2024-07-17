// ProfileTabs.js

import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Dropdown, DropdownButton } from "react-bootstrap";

const ProfileTabs = () => {
  const location = useLocation();

  const isActiveTab = (tabPath) => {
    return location.pathname === tabPath;
  };

  const getWindowWidth = () => window.innerWidth;

  const [isSmallScreen, setIsSmallScreen] = useState(getWindowWidth() <= 576);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(getWindowWidth() <= 576);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function getTabName() {
    if (location.pathname === "/account/profile") {
      return "Profile";
    } else if (location.pathname === "/account/orders") {
      return "Orders";
    } else if (location.pathname === "/account/enquiries") {
      return "Enquiries";
    } else if (location.pathname === "/account/security") {
      return "Security";
    } else {
      return "";
    }
  }
  return (
    <>
      {isSmallScreen ? (
        <DropdownButton
          id="dropdown-basic-button"
          title={getTabName()}
          className="profileDropdownButton"
        >
          <Dropdown.Item
            className={`profileTabsDropdown d-flex  align-items-center ${
              isActiveTab("/account/profile") && "profileTabsDropdownActive"
            }`}
          >
            <Link
              to="/account/profile"
              className="text-decoration-none profileTabDropdownLink"
            >
              Profile
            </Link>
          </Dropdown.Item>

          <Dropdown.Item
            className={`profileTabsDropdown d-flex  align-items-center ${
              isActiveTab("/account/orders") && "profileTabsDropdownActive"
            }`}
          >
            <Link
              to="/account/orders"
              className=" text-decoration-none profileTabDropdownLink"
            >
              Orders
            </Link>
          </Dropdown.Item>
          <Dropdown.Item
            className={`profileTabsDropdown d-flex  align-items-center ${
              isActiveTab("/account/enquiries") && "profileTabsDropdownActive"
            }`}
          >
            <Link
              to="/account/enquiries"
              className="text-decoration-none profileTabDropdownLink"
            >
              Enquiries
            </Link>
          </Dropdown.Item>
          <Dropdown.Item
            className={`profileTabsDropdown d-flex align-items-center ${
              isActiveTab("/account/security") && "profileTabsDropdownActive"
            }`}
          >
            <Link
              to="/account/security"
              className=" text-decoration-none profileTabDropdownLink"
            >
              Security
            </Link>
          </Dropdown.Item>
        </DropdownButton>
      ) : (
        <div className="d-flex text-uppercase">
          <div
            className={`profileTabs d-flex px-2 me-2 align-items-center ${
              isActiveTab("/account/profile") && "profileTabsActive"
            }`}
          >
            <Link
              to="/account/profile"
              className="py-1 px-2 text-white text-decoration-none"
            >
              Profile
            </Link>
          </div>
          <div
            className={`profileTabs d-flex px-2 mx-2 align-items-center ${
              isActiveTab("/account/orders") && "profileTabsActive"
            }`}
          >
            <Link
              to="/account/orders"
              className="py-1 px-2 text-white text-decoration-none"
            >
              Orders
            </Link>
          </div>
          <div
            className={`profileTabs d-flex px-2 mx-2 align-items-center ${
              isActiveTab("/account/enquiries") && "profileTabsActive"
            }`}
          >
            <Link
              to="/account/enquiries"
              className="py-1 px-2 text-white text-decoration-none"
            >
              Enquiries
            </Link>
          </div>
          <div
            className={`profileTabs d-flex px-2 mx-2 align-items-center ${
              isActiveTab("/account/security") && "profileTabsActive"
            }`}
          >
            <Link
              to="/account/security"
              className="px-2 text-white text-decoration-none"
            >
              Security
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileTabs;
