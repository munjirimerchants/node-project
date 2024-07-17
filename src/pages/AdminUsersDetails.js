import "../assets/css/pages/AdminDetails.css";

import React, { useEffect, useState } from "react";
import AdminTopNavbar from "../components/AdminTopNavbar";
import DropdownButton from "../components/DropdownButton";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import { connections, endpoints } from "../config/connections";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { convertDateFormatDateAndTime } from "../utils/dateConversion";
import AdminItemBreadcrumb from "../components/AdminItemBreadcrumb";

function AdminEnquiryDetails() {
  const [userDetails, setUserDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentlySelected, setCurrentlySelected] = useState(null);
  const [initialVal, setInitialVal] = useState(null);
  const [status, setStatus] = useState([]);
  const { id } = useParams();
  const { userStatus } = useAuth();

  useEffect(() => {
    getUserEnquiries();
    setStatus(["Active", "Inactive"]);
  }, [loading]);

  async function getUserEnquiries() {
    if (userStatus) {
      const token = await userStatus.getIdToken();
      if (token) {
        const payloadHeader = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        try {
          const response = await axios.get(
            `${connections.server}${endpoints.usersByUserID}/${id}`,
            payloadHeader
          );
          setUserDetails(response.data);
          setCurrentlySelected(userDetails?.status);
          setInitialVal(userDetails?.status);
          setLoading(false);

          // Check if machineID exists in enquiryDetails and fetch machine details
          if (response.data.machineID) {
            const machineDetailsResponse = await axios.get(
              `${connections.server}${endpoints.machineproducts}/${response.data.machineID}`,
              payloadHeader
            );
            // Update enquiryDetails with machine details
            setUserDetails((prevDetails) => ({
              ...prevDetails,
              machineDetails: machineDetailsResponse.data,
            }));
          }
        } catch (error) {
          console.error("Error fetching enquiries:", error);
          setLoading(false);
        }
      } else {
        console.error("no token");
      }
    } else {
      console.error("no user status");
    }
  }

  const handleSelect = (eventKey) => {
    setCurrentlySelected(eventKey);
  };

  async function patchChanges() {
    if (userStatus) {
      const token = await userStatus.getIdToken();
      if (token) {
        const payloadHeader = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const statusPayload = {
          status: currentlySelected,
        };
        try {
          const response = await axios.patch(
            `${connections.server}${endpoints.users}/${id}`,
            statusPayload,
            payloadHeader
          );
          setInitialVal(currentlySelected);
        } catch (error) {
          console.error(`Failed to patch user with ID ${id}:`, error);
        }
      } else {
        console.error("no token");
      }
    } else {
      console.error("no user status");
    }
  }

  return (
    <div className="adminContentContainer">
      <AdminTopNavbar />
      <Container>
        <div>
          <AdminItemBreadcrumb
            itemCategory="Users"
            currentItem={`User #${userDetails?.userID}`}
            previousPage="/admin/users"
          />
        </div>
        <div className="adminHeading">
          {userDetails?.firstName}&nbsp;
          {userDetails?.surname}
        </div>
        <div>
          <DropdownButton
            handleSelect={handleSelect}
            currentlySelected={currentlySelected}
            initialVal={initialVal}
            status={status}
            patchChanges={patchChanges}
          />
        </div>
        <div className="adminLine" />
        <Row>
          <Col>
            <Row>
              <Col>
                <div className="adminEnquiryTitle">First Name</div>
                <div className="adminEnquiryName">{userDetails?.firstName}</div>
              </Col>
              <Col>
                <div className="adminEnquiryTitle">Surname</div>
                <div className="adminEnquiryName">{userDetails?.surname}</div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="adminEnquiryTitle">Date Added</div>
                <div className="adminEnquiryName">
                  {convertDateFormatDateAndTime(userDetails?.createdAt)}
                </div>
              </Col>
              <Col>
                <div className="adminEnquiryTitle">Address</div>
                <div className="adminEnquiryName">
                  {userDetails?.addressLine1}&nbsp;{userDetails?.addressLine2}
                </div>
              </Col>
            </Row>
            <div className="adminLine" />
            <Row>
              <Col>
                <div className="adminEnquiryTitle">Email</div>
                <div className="adminEnquiryName">{userDetails?.email}</div>
              </Col>
              <Col>
                <div className="adminEnquiryTitle">Telephone</div>
                <div className="adminEnquiryName">{userDetails?.telephone}</div>
              </Col>
            </Row>
          </Col>
        </Row>
        <div className="adminLine" />
      </Container>
    </div>
  );
}

export default AdminEnquiryDetails;
