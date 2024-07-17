import React, { useEffect, useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";

function AccountOrderSummaryProduct({ index, formattedData }) {
  const getStatusColors = (status) => {
    switch (status) {
      // Return [backgroundColor, Color];
      case "Pending":
        return ["#F9F9F9", "#BBC8D4"];
      case "In Progress":
        return ["#FBF1D4", "#E7B41C"];
      case "Complete":
        return ["#C0DEC3", "#4BA154"];
      case "50%":
        return ["#FBF1D4", "#E7B41C"];
      case "Full":
        return ["#C0DEC3", "#4BA154"];
      default:
        return ["#F9F9F9", "#BBC8D4"];
    }
  };

  const getWindowWidth = () => window.innerWidth;

  const [isSmallScreen, setIsSmallScreen] = useState(getWindowWidth() <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(getWindowWidth() < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="accountOrderDiv">
      <Row className="accountOrderProductHeaderRow">
        <Col sm="12" md="6" lg="4">
          <div className="d-block">
            <span>Order </span>
            <span className="accountOrderProductOrderNumber">#12354&nbsp;</span>
          </div>
        </Col>
        <Col sm="12" md="6" lg="4">
          <div className="d-block">
            <span className="accountOrderProductDataTitle">Total&nbsp;</span>
            <span className="accountOrderProductData">
              {formattedData.totalPrice}
            </span>
          </div>
        </Col>
        <Col sm="12" md="12" lg="4">
          <span className="accountOrderProductDataTitle">
            Dispatch to&nbsp;
          </span>
          <span className="accountOrderProductData">
            {formattedData.firstName} {formattedData.surname}
          </span>
        </Col>
      </Row>

      <Row className="accountOrderProductHeaderRow2">
        {isSmallScreen ? (
          //If Screen is < md
          <>
            <Col sm="12">
              <span className="accountOrderProductDataTitle">
                Address&nbsp;
              </span>
            </Col>
            <Col sm="12">
              <span className="accountOrderProductData">
                {formattedData.addressLine1}, {formattedData.addressLine2}
              </span>
            </Col>

            <Col sm="12"></Col>
            <Col sm="12">
              <span className="accountOrderProductDataTitle">
                Order Date&nbsp;
              </span>
              <span className="accountOrderProductData">
                {formattedData.orderDate}
              </span>
            </Col>
          </>
        ) : (
          //If Screen is > md
          <>
            <Col md="4">
              <span className="accountOrderProductDataTitle">
                Address&nbsp;
              </span>
              <span className="accountOrderProductData">
                {formattedData.addressLine1}, {formattedData.addressLine2}
              </span>
            </Col>
            <Col md="4"></Col>
            <Col md="4">
              <span className="accountOrderProductDataTitle">
                Order Date&nbsp;
              </span>
              <span className="accountOrderProductData">
                {formattedData.orderDate}
              </span>
            </Col>
          </>
        )}
      </Row>
      {/* Render brick order items */}

      {formattedData.brickOrderItems.map((item, index) => (
        <div key={index}>
          <Row className="accountOrderProductRow">
            <Col xs="12" sm="3" className="accountOrderProductImageCol">
              <div className="accountOrderItemImageBackground">
                <Image
                  className="accountOrderItemImage"
                  src={item.brickProduct.image}
                  fluid
                ></Image>
              </div>
            </Col>
            <Col xs="12" sm="6" className="accountOrderProductDetailCol">
              <Row md="12">
                {item.isColoured ? (
                  <Row md="12">
                    <span className="accountOrderItemName p-0 m-0">
                      Item:&nbsp;
                      <span className="accountOrderItemName2 p-0 m-0">
                        Coloured {item.brickProduct.name}
                      </span>
                    </span>
                  </Row>
                ) : (
                  <Row md="12">
                    <span className="accountOrderItemName p-0 m-0">
                      Item:&nbsp;
                      <span className="accountOrderItemName2 p-0 m-0">
                        {item.brickProduct.name}
                      </span>
                    </span>
                  </Row>
                )}

                <Col xs="12" sm="6" className="p-0">
                  <span className="accountOrderItemName mt-2">
                    Amount:&nbsp;
                    <span className="accountOrderItemName2">{item.amount}</span>
                  </span>
                </Col>
                <Col xs="12" sm="6" className="p-0">
                  <span className="accountOrderItemName">
                    Item Price:&nbsp;
                    <span className="accountOrderItemName2">
                      ${item.itemPrice}
                    </span>
                  </span>
                </Col>
              </Row>
            </Col>
            <Col xs="12" sm="3" className="accountOrderBuyAgainCol">
              <Button className="accountOrderBuyAgain">BUY THIS AGAIN</Button>
            </Col>
          </Row>
        </div>
      ))}
      {/* End of Render brick order items */}
      <Row className="accountOrderFooter">
        <Col>
          <div>Order Status</div>
          <div
            style={{
              backgroundColor: getStatusColors(formattedData.orderStatus)[0],
              color: getStatusColors(formattedData.orderStatus)[1],
            }}
            className="accountOrderStatus"
          >
            {formattedData.orderStatus}
          </div>
        </Col>
        <Col>
          <div>Payment Status</div>
          <div
            style={{
              backgroundColor: getStatusColors(formattedData.paymentStatus)[0],
              color: getStatusColors(formattedData.paymentStatus)[1],
            }}
            className="accountOrderStatus"
          >
            {formattedData.paymentStatus}
          </div>
        </Col>
        <Col>
          <div>Date of Delivery</div>
          <div
            style={{
              backgroundColor: getStatusColors(formattedData.dateOfDelivery)[0],
              color: getStatusColors(formattedData.dateOfDelivery)[1],
            }}
            className="accountOrderStatus"
          >
            {formattedData.dateOfDelivery}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default AccountOrderSummaryProduct;
