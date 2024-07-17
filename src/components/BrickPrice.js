// BrickPrice.js
import "bootstrap/dist/css/bootstrap.css";
import "../assets/css/components/BrickPrice.css";

import { Button, Row, Col, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { useNavigate } from "react-router-dom";

//TODO: find out VAT
//TODO: make sure double is rounded properly!!!

const BrickPrice = ({ brickProduct, selectedPrice, colourOption }) => {
  const [calculatedQuantity, setCalculatedQuantity] = useState(
    brickProduct?.minimumOrderQuantity
  );

  const [calculatedValue, setCalculatedValue] = useState(0);
  const { isButtonDisabled, addItemToCart } = useShoppingCart();
  const [firstRender, setFirstRender] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (firstRender) {
      if (brickProduct) {
        setCalculatedQuantity(brickProduct.minimumOrderQuantity);
        let priceCalc = (
          brickProduct?.minimumOrderQuantity * selectedPrice
        ).toFixed(2);
        setCalculatedValue(priceCalc);
        setFirstRender(false);
      }
    }
  }, [brickProduct]);

  useEffect(() => {
    setCalculatedValue((calculatedQuantity * selectedPrice).toFixed(2));
  }, [selectedPrice]);

  function updatePrice(newQuantity) {
    let roundedValue =
      Math.ceil(newQuantity / brickProduct?.minimumOrderQuantity) *
      brickProduct?.minimumOrderQuantity;
    let priceCalc;
    console.log(colourOption);
    priceCalc = (roundedValue * selectedPrice).toFixed(2);
    return priceCalc; // Return the calculated price
  }

  const handleBlur = (e) => {
    let inputValue = parseInt(e.target.value);
    if (inputValue > 100000) {
      inputValue = 100000;
    }
    const minOrderQuantity = parseInt(brickProduct?.minimumOrderQuantity);
    // Round the input value to the next number that is divisible by the minimumOrderQuantity
    const newQuantity =
      Math.ceil(inputValue / minOrderQuantity) * minOrderQuantity;

    setCalculatedQuantity(newQuantity);
    const updatedPrice = updatePrice(newQuantity); // Calculate new price
    setCalculatedValue(updatedPrice);
  };

  const handleKeyEvent = (e) => {
    if (e.key === "Enter") {
      let inputValue = parseInt(e.target.value);
      if (inputValue > 100000) {
        inputValue = 100000;
      }
      const minOrderQuantity = parseInt(brickProduct?.minimumOrderQuantity);
      // Round the input value to the next number that is divisible by the minimumOrderQuantity
      const newQuantity =
        Math.ceil(inputValue / minOrderQuantity) * minOrderQuantity;
      setCalculatedQuantity(newQuantity);
      const updatedPrice = updatePrice(newQuantity); // Calculate new price
      setCalculatedValue(updatedPrice);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleAddToCart = () => {
    // Create an item object with relevant data
    const item = {
      brickProduct: brickProduct,
      price: calculatedValue,
      quantity: calculatedQuantity,
      colourOption: colourOption,
    };
    console.log("Items: " + JSON.stringify(item));
    // Add item to the shopping cart
    addItemToCart(item);
  };

  const handleOrderNow = () => {
    // Create an item object with relevant data
    const item = {
      brickProduct: brickProduct,
      price: calculatedValue,
      quantity: calculatedQuantity,
      colourOption: colourOption,
    };
    console.log("Items: " + JSON.stringify(item));
    // Add item to the shopping cart
    addItemToCart(item);
    navigate("/shopping-cart");
  };

  return (
    <Row xs={1} lg={2}>
      <Col>
        <p className="brickpriceQtyTotal my-2">Qty</p>
        <Form onSubmit={handleSubmit}>
          <Form.Control
            className="brickpriceFormQty my-2"
            type="number"
            id="brickQty"
            placeholder={brickProduct?.minimumOrderQuantity}
            step={brickProduct?.minimumOrderQuantity}
            value={calculatedQuantity}
            min={brickProduct?.minimumOrderQuantity}
            max="100000"
            onChange={(e) => setCalculatedQuantity(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyEvent}
          />
        </Form>

        <Button
          onClick={handleOrderNow}
          className="brickpriceBtnOrderNow d-flex my-2"
          disabled={isButtonDisabled}
        >
          Order Now
        </Button>
      </Col>
      <Col>
        <p className="brickpriceQtyTotal my-2">Total Including VAT</p>

        <Form style={{ pointerEvents: "none" }}>
          <div
            className="my-2"
            style={{
              display: "flex",
              background: "#F9F9F9",
              height: "2.7rem",
            }}
          >
            <Form.Control
              className="brickpriceFormTotal py-2"
              type="text"
              value={calculatedValue}
              readOnly
              placeholder={(
                brickProduct?.minimumOrderQuantity * selectedPrice
              ).toFixed(2)}
            />
            <span className="brickpriceFormUSD mx-3">USD</span>
          </div>
        </Form>
        {!firstRender && (
          <Button
            className="brickpriceBtnAddCart d-flex py-2"
            onClick={handleAddToCart}
            disabled={isButtonDisabled}
          >
            Add to Cart
          </Button>
        )}
      </Col>
    </Row>
  );
};

export default BrickPrice;
