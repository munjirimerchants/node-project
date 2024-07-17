import "react-datepicker/dist/react-datepicker.css";
import "../assets/css/pages/AdminDetails.css";

import React, { useEffect, useState } from "react";
import AdminTopNavbar from "../components/AdminTopNavbar";
import DropdownButton from "../components/DropdownButton";
import DatePicker from "react-datepicker";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import axios from "axios";
import { connections, endpoints } from "../config/connections";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  convertDate,
  convertDateFormatDateAndTime,
} from "../utils/dateConversion";
import AdminItemBreadcrumb from "../components/AdminItemBreadcrumb";

function AdminBrickOrdersDetails() {
  const [brickDetails, setBrickDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentOrderStatus, setCurrentOrderStatus] = useState(null);
  const [currentPaymentStatus, setCurrentPaymentStatus] = useState(null);

  const [initialOrderVal, setInitialOrderVal] = useState(null);
  const [initialPaymentVal, setInitialPaymentVal] = useState(null);

  const [orderStatus, setOrderStatus] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState([]);

  const { id } = useParams();
  const { userStatus } = useAuth();

  const [selectedDate, setSelectedDate] = useState(null);

  const [totalQtyAmount, setTotalQtyAmount] = useState(null);
  const [totalPriceAmount, setTotalPriceAmount] = useState(null);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    getBrickDetails();
    setOrderStatus(["Pending", "In Progress", "Complete"]);
    setPaymentStatus(["Pending", "50%", "Full"]);

    if (!loading) {
      setTotalQtyAmount(
        brickDetails?.BrickOrderItems.reduce(
          (accumulator, item) => accumulator + item.amount,
          0
        )
      );

      setTotalPriceAmount(
        brickDetails?.BrickOrderItems.reduce(
          (accumulator, item) => accumulator + parseFloat(item.itemPrice),
          0
        )
      );
    }
  }, [loading]);

  async function getBrickDetails() {
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
            `${connections.server}${endpoints.brickorders}/${id}`,
            payloadHeader
          );

          setBrickDetails(response.data);

          setCurrentOrderStatus(brickDetails?.orderStatus);
          setCurrentPaymentStatus(brickDetails?.paymentStatus);

          setInitialOrderVal(brickDetails?.orderStatus);
          setInitialPaymentVal(brickDetails?.paymentStatus);

          setLoading(false);

          // Check if machineID exists in enquiryDetails and fetch machine details
          if (response.data.machineID) {
            const machineDetailsResponse = await axios.get(
              `${connections.server}${endpoints.machineproducts}/${response.data.machineID}`,
              payloadHeader
            );
            // Update enquiryDetails with machine details
            setBrickDetails((prevDetails) => ({
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

  const getStatusColors = (status) => {
    switch (status) {
      case "Pending":
        return ["#FF8282", "#F20000"];
      case "In Progress":
        return ["#FBF1D4", "#E7B41C"];
      case "Complete":
        return ["#C0DEC3", "#4BA154"];
      default:
        return ["#F9F9F9", "#BBC8D4"];
    }
  };

  if (loading) {
    return <p>loading</p>;
  }

  const handleOrderStatusSelect = (eventKey) => {
    setCurrentOrderStatus(eventKey);
  };
  const handlePaymentStatusSelect = (eventKey) => {
    setCurrentPaymentStatus(eventKey);
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
          orderStatus: currentOrderStatus,
          paymentStatus: currentPaymentStatus,
          dateOfDelivery: convertDate(selectedDate),
        };

        try {
          const response = await axios.patch(
            `${connections.server}${endpoints.brickorders}/${id}`,
            statusPayload,
            payloadHeader
          );
          setInitialOrderVal(currentOrderStatus);
          setInitialPaymentVal(currentPaymentStatus);
        } catch (error) {
          console.error(`Failed to patch brickorder with ID ${id}:`, error);
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
            itemCategory="Brick Order"
            currentItem={`Brick #${brickDetails?.brickOrderID}`}
            previousPage="/admin/brick-orders"
          />
        </div>
        <div>
          <Row className="d-flex justify-content-start adminMargin">
            <Col xs="auto" className="adminHeading">
              {brickDetails?.firstName}&nbsp;{brickDetails?.surname}
              &nbsp;|&nbsp;
            </Col>
            <Col xs="auto" className="adminHeading">
              Qty&nbsp;{totalQtyAmount}&nbsp;|&nbsp;
            </Col>
            <Col xs="auto" className="adminHeading">
              Price&nbsp;${totalPriceAmount}
            </Col>
          </Row>
          <div
            style={{
              backgroundColor: getStatusColors(initialOrderVal)[0],
              color: getStatusColors(initialOrderVal)[1],
            }}
            className="adminInitialOrderVal adminDropdownButton"
          >
            {initialOrderVal}
          </div>
        </div>
        <div className="adminLine" />{" "}
        <Row className="d-flex justify-content-start">
          <Col xs="auto" className="">
            <span className="adminEnquiryTitle2">
              Order&nbsp;
              <span className="adminEnquiryNumber">
                #{brickDetails?.brickOrderID}&nbsp;|&nbsp;
              </span>
            </span>
          </Col>
          <Col xs="auto" className="">
            <span className="adminEnquiryTitle2">
              Order&nbsp;Date&nbsp;
              <span className="adminEnquiryNumber">
                {convertDateFormatDateAndTime(brickDetails?.orderDate)}
              </span>
              &nbsp;|&nbsp;
            </span>
          </Col>
          <Col xs="auto" className="">
            <span className="adminEnquiryTitle2">
              Job&nbsp;Location&nbsp;
              <span className="adminEnquiryNumber">
                {brickDetails?.addressLine1}
                {brickDetails?.addressLine2}
              </span>
            </span>
          </Col>
        </Row>
        <div className="adminLine" />
        {brickDetails?.BrickOrderItems.map((item, index) => (
          <Row key={index} className="my-3">
            <Col xs="auto" className="adminDetailsCol1">
              <div className="adminPictureContainer">
                <div className="adminPictureWrapper">
                  <Image
                    className="adminDetailsImage"
                    src={item?.BrickProduct?.image}
                    fluid
                  />
                </div>
              </div>
            </Col>
            <Col xs="auto">
              <div className="adminEnquiryTitle">Item</div>
              <div className="adminEnquiryName">{item?.BrickProduct?.name}</div>
              <div className="adminEnquiryTitle">Quantity</div>
              <div className="adminEnquiryName">{item?.amount}</div>
              <div className="adminEnquiryTitle">Price</div>
              <div className="adminEnquiryName">${item?.itemPrice}</div>
            </Col>
          </Row>
        ))}
        <div className="adminLine" />
        <Row>
          <Col>
            <div className="adminEnquiryTitle">Order Status</div>
            <div>
              <DropdownButton
                handleSelect={handleOrderStatusSelect}
                currentlySelected={currentOrderStatus}
                initialVal={initialOrderVal}
                status={orderStatus}
              />
            </div>
          </Col>
          <Col>
            <div className="adminEnquiryTitle">Payment Status</div>
            <div>
              <DropdownButton
                handleSelect={handlePaymentStatusSelect}
                currentlySelected={currentPaymentStatus}
                initialVal={initialPaymentVal}
                status={paymentStatus}
              />
            </div>
          </Col>
          <Col>
            <div className="adminEnquiryTitle">Date of Delivery</div>{" "}
            <div>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                minDate={new Date()}
                dateFormat="MM/dd/yyyy"
                placeholderText="Select a date"
              />
            </div>
          </Col>
        </Row>
        <div className="adminLine" />
        <Button onClick={patchChanges}>Confirm Changes</Button>
      </Container>
    </div>
  );
}

export default AdminBrickOrdersDetails;
