import "bootstrap/dist/css/bootstrap.css";
import "../assets/css/components/OrderSummaryProductInfo.css";

import { Row, Col, Image, Stack } from "react-bootstrap";

const OrderSummaryProductInfo = ({ brickProduct, quantity, price }) => {
  return (
    <div className="my-5 ordersummaryItemProductDiv">
      <Row>
        <Col xs="12" sm="4" className="d-flex ordersummaryItemImageCol">
          <div className="ordersummaryItemImageBackground">
            <Image
              className="ordersummaryItemImage"
              src={brickProduct.image}
              fluid
            ></Image>
          </div>
        </Col>

        <Col
          xs="12"
          sm="4"
          className="ordersummaryItemImageCol ordersummaryItemCol"
        >
          <div className="ordersummaryItemDiv">
            <div>
              <p className="ordersummaryItemName p-0 m-0">Item</p>
              <p className="ordersummaryItemName2 p-0 m-0">
                {brickProduct.name}
              </p>
            </div>

            <Stack className="ordersummaryItemStack">
              <p className="ordersummaryQtyTotal mt-2">Qty</p>
              <p className="ordersummaryFormQty">{quantity}</p>
            </Stack>
          </div>
          <div className="d-flex justify-content-center">
            <hr className="p-0 m-0 ordersummaryLine"></hr>
          </div>
        </Col>
        <Col
          xs="12"
          sm="4"
          className="ordersummaryItemImageCol ordersummaryItemPrice"
        >
          <Stack className="ordersummaryItemPriceStack">
            <p className="ordersummaryQtyTotal mt-2">Total Including VAT</p>

            <div className="ordersummaryFormTotal">
              {price}
              <span className="ordersummaryFormUSD mx-3">USD</span>
            </div>
          </Stack>
        </Col>
        <div className="d-flex justify-content-center">
          <hr className="p-0 m-2 ordersummaryLine"></hr>
        </div>
      </Row>
    </div>
  );
};

export default OrderSummaryProductInfo;
