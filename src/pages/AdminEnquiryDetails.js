import "../assets/css/pages/AdminDetails.css";

import React, { useEffect, useState } from "react";
import AdminTopNavbar from "../components/AdminTopNavbar";
import DropdownButton from "../components/DropdownButton";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import axios from "axios";
import { connections, endpoints } from "../config/connections";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import renderUserComments from "../components/RenderUserCommets";
import { convertDateFormatDateAndTime } from "../utils/dateConversion";
import AdminItemBreadcrumb from "../components/AdminItemBreadcrumb";

function AdminEnquiryDetails() {
  const [enquiryDetails, setEnquiryDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentlySelected, setCurrentlySelected] = useState(null);
  const [initialVal, setInitialVal] = useState(null);
  const [status, setStatus] = useState([]);
  const { id } = useParams();
  const { userStatus } = useAuth();

  useEffect(() => {
    getUserEnquiries();
    setStatus(["Open", "Closed"]);
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
            `${connections.server}${endpoints.enquiries}/${id}`,
            payloadHeader
          );
          setEnquiryDetails(response.data);
          setCurrentlySelected(enquiryDetails?.enquiryStatus);
          setInitialVal(enquiryDetails?.enquiryStatus);
          setLoading(false);

          // Check if machineID exists in enquiryDetails and fetch machine details
          if (response.data.machineID) {
            const machineDetailsResponse = await axios.get(
              `${connections.server}${endpoints.machineproducts}/${response.data.machineID}`,
              payloadHeader
            );
            // Update enquiryDetails with machine details
            setEnquiryDetails((prevDetails) => ({
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
        const statusPayload = { enquiryStatus: currentlySelected };
        try {
          const response = await axios.patch(
            `${connections.server}${endpoints.enquiries}/${id}`,
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

  const [comment, setComment] = useState("");

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };
  async function sendComment() {
    if (userStatus) {
      const token = await userStatus.getIdToken();
      if (token) {
        const payloadHeader = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const statusPayload = { comment: comment };

        try {
          const response = await axios.post(
            `${connections.server}${endpoints.enquiries}/${id}/userComment`,
            statusPayload,
            payloadHeader
          );
          const newEnquiry = response.data;
          setEnquiryDetails(newEnquiry);
        } catch (error) {
          console.error(`Failed to patch enquiry with ID ${id}:`, error);
        }
      } else {
        console.error("no token");
      }
    } else {
      console.error("no user status");
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    sendComment();
    setComment("");
  };

  return (
    <div className="adminContentContainer">
      <AdminTopNavbar />
      <Container>
        <div>
          <AdminItemBreadcrumb
            itemCategory="Enquiries"
            currentItem={`Enquiry #${enquiryDetails?.userEnquiryID}`}
            previousPage="/admin/enquiries"
          />
        </div>
        <div className="adminHeading">
          <span className="">
            {enquiryDetails?.firstName}&nbsp;
            {enquiryDetails?.surname}
          </span>
          &nbsp;<span>|</span>&nbsp;
          {enquiryDetails.enquiryType === "Machine" ? (
            <>
              <span>{enquiryDetails.machineDetails?.name}</span>
            </>
          ) : (
            <>
              {enquiryDetails.enquiryType === "Brick" ? (
                <>
                  <span>Brick Enquiry</span>
                </>
              ) : (
                <>General Enquiry</>
              )}
            </>
          )}
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

        <Row className="d-flex justify-content-start adminMargin">
          {enquiryDetails.machineID != null ? (
            <>
              <Col md="6" className="adminDetailsCol1">
                <div className="adminPictureContainer">
                  <div className="adminPictureWrapper">
                    <Image
                      className="adminDetailsImage"
                      src={enquiryDetails.machineDetails?.image}
                      fluid
                    />
                  </div>
                </div>
              </Col>
            </>
          ) : (
            <> </>
          )}
          <Col md="6" className="adminDetailsCol2">
            <span id="EnquiryTitle" className="adminEnquiryTitle adminUnique">
              Enquiry
            </span>
            &nbsp;
            <span className="adminEnquiryNumber">
              #{enquiryDetails?.userEnquiryID}
            </span>
            <Row>
              <Col>
                <div className="adminEnquiryTitle">Product</div>
                <div className="adminEnquiryName">
                  {(enquiryDetails?.enquiryType === "Machine") &
                  (enquiryDetails.machineID != null) ? (
                    <>{enquiryDetails.machineDetails?.name}</>
                  ) : enquiryDetails.enquiryType === "Bricks" ? (
                    <>Bricks</>
                  ) : enquiryDetails.enquiryType === "General" ? (
                    <>General</>
                  ) : (
                    <>None</>
                  )}
                </div>
              </Col>
              <Col>
                <div className="adminEnquiryTitle">Category</div>
                <div className="adminEnquiryName">
                  {enquiryDetails?.enquiryType}
                </div>
              </Col>
            </Row>
            <div className="adminLine" />
            <Row>
              <Col>
                <div className="adminEnquiryTitle">Name of Enquirer</div>
                <div className="adminEnquiryName">
                  {enquiryDetails?.firstName}&nbsp;
                  {enquiryDetails?.surname}
                </div>
              </Col>
              <Col>
                <div className="adminEnquiryTitle">Telephone</div>
                <div className="adminEnquiryName">
                  {enquiryDetails?.telephone}
                </div>
              </Col>
              <Col>
                <div className="adminEnquiryTitle">Email</div>
                <div className="adminEnquiryName">{enquiryDetails?.email}</div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="adminEnquiryTitle">Enquiry Date</div>
                <div className="adminEnquiryName">
                  {convertDateFormatDateAndTime(enquiryDetails?.enquiryDate)}
                </div>
              </Col>
              <Col>
                <div className="adminEnquiryTitle">Hire Location</div>
                <div className="adminEnquiryName">
                  {enquiryDetails?.location}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <div className="adminLine" />

        <div>{renderUserComments(enquiryDetails)}</div>
        <Form className="mt-5" onSubmit={handleSubmit}>
          <Form.Group controlId="commentInput">
            <Form.Control
              as="textarea"
              rows={3}
              value={comment}
              onChange={handleCommentChange}
              placeholder="Enter your comment"
            />
          </Form.Group>
          <Button className="mt-5 mb-5" type="submit">
            Write back
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default AdminEnquiryDetails;
