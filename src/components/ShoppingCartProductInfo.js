// BrickPrice.js
import "bootstrap/dist/css/bootstrap.css";
import "../assets/css/components/ShoppingCartProductInfo.css";

import { useState } from "react";
import { Row, Col, Form, Image } from "react-bootstrap";
import { XIcon } from "@heroicons/react/solid";

//TODO: ask if there is maximum order quantity / what we should set it to?
const ShoppingCartProductInfo = ({
  brickProduct,
  quantity,
  price,
  colourOption,
  savedCartItems,
  setSavedCartItems,
  key,
  index,
}) => {
  // setting val = MOQ
  const [calculatedQuantity, setCalculatedQuantity] = useState(quantity);
  const [calculatedValue, setCalculatedValue] = useState("");
  // changes the value to the nearest MOQ when user types
  console.log("QTY.. ", quantity, " £££.. ", price, " CO.. ", colourOption);

  function updatePrice(newQuantity) {
    let roundedValue =
      Math.ceil(newQuantity / brickProduct?.minimumOrderQuantity) *
      brickProduct?.minimumOrderQuantity;
    let priceCalc;
    if (colourOption === "coloured") {
      priceCalc = roundedValue * brickProduct?.priceColour;
    } else if (colourOption === "nonColoured") {
      priceCalc = roundedValue * brickProduct?.price;
    }
    priceCalc = priceCalc.toFixed(2);
    return priceCalc; // Return the calculated price
  }

  const handleDeleteItem = () => {
    // Create a copy of savedCartItems and remove the item at the specified index
    const updatedItems = [
      ...savedCartItems.slice(0, index),
      ...savedCartItems.slice(index + 1),
    ];
    // Update the state with the modified savedCartItems array
    setSavedCartItems(updatedItems);
    // Update local storage by removing the corresponding item
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  };

  function changeSavedCartItem(updatedPrice, newQuantity) {
    const updatedItems = savedCartItems.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          price: updatedPrice, // Update price
          quantity: newQuantity, // Update quantity
        };
      }
      return item;
    });
    setSavedCartItems(updatedItems); // Update state
    // Update local storage by saving the updated items
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
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

    changeSavedCartItem(updatedPrice, newQuantity); // Update item with new price
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

      changeSavedCartItem(updatedPrice, newQuantity); // Update item with new price
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="my-5 shoppingCartItemProductDiv">
      <Row xs={1} md={2}>
        <Col>
          <div className="d-flex shoppingCartItemImageBackground">
            <Image
              className="shoppingCartItemImage"
              src={brickProduct?.image}
              fluid
            ></Image>
          </div>
        </Col>
        <Col>
          <Col>
            <p className="shoppingcartItemName p-0 m-0">Item</p>
            {colourOption === "coloured" ? (
              <p className="shoppingcartItemName2 p-0 m-0">
                Coloured {brickProduct?.name}
              </p>
            ) : (
              <p className="shoppingcartItemName2 p-0 m-0">
                {brickProduct?.name}
              </p>
            )}

            <Row>
              <p className="brickpriceQtyTotal my-2">Qty</p>
              <Form onSubmit={handleSubmit}>
                <Form.Control
                  className="brickpriceFormQty my-2"
                  type="number"
                  id="brickQty"
                  placeholder={quantity}
                  step={brickProduct?.minimumOrderQuantity}
                  value={calculatedQuantity}
                  min={brickProduct?.minimumOrderQuantity}
                  max="100000"
                  onChange={(e) => setCalculatedQuantity(e.target.value)}
                  onBlur={handleBlur}
                  onKeyDown={handleKeyEvent}
                />
              </Form>

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
                    placeholder={price}
                  />
                  <span className="brickpriceFormUSD mx-3">USD</span>
                </div>
              </Form>
            </Row>
          </Col>
        </Col>
      </Row>
      <div>
        <div onClick={handleDeleteItem}>
          <XIcon className="shoppingCartProductInfoX"></XIcon>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartProductInfo;
