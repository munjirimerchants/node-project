import "../assets/css/pages/ShoppingCart.css";

import { Col, Container, Row } from "react-bootstrap";
import BrickProduct from "../components/BrickProduct";
import Button from "react-bootstrap/Button";
import Banner from "../layouts/Banner";
import BrickUtils from "../utils/BrickUtils";
import ShoppingCartProduct from "../components/ShoppingCartProduct";
import { useState, useEffect } from "react";
import OrderSummaryModal from "../components/OrderSummaryModal";
import OrderSummaryBody from "../components/OrderSummaryBody";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { resourceFolder, images, icons } from "../config/resources";

function ShoppingCart() {
  const bannerImage = `${resourceFolder.images}${images.aboutUsBannerImage}`;

  const AMOUNT_OF_BRICKPRODUCTS = 3;
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDelivery, setTotalDelivery] = useState(12);
  const [modalShow, setModalShow] = useState(false);

  const { cartItems, setCartItems } = useShoppingCart();

  function openModal() {
    setModalShow(true);
  }

  const { listOfBricks, isLoading } = BrickUtils(AMOUNT_OF_BRICKPRODUCTS);

  useEffect(() => {
    // Retrieve the JSON string from local storage
    const savedCartItemsString = localStorage.getItem("cartItems");

    // Parse the JSON string into a JavaScript array
    const savedCartItemsParsed = JSON.parse(savedCartItemsString);
    setCartItems(savedCartItemsParsed);
  }, []);

  const calculateTotalPrice = () => {
    let total = 0;
    cartItems?.forEach((item) => {
      const { price } = item;
      // Convert price to number before adding to total
      total += parseFloat(price);
    });
    return total;
  };

  // Update totalPrice whenever savedCartItems changes
  useEffect(() => {
    setTotalPrice(calculateTotalPrice());
  }, [cartItems]);

  //Window adjustment
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

  const BrickProductList = ({ listOfBricks }) => {
    return (
      <>
        {listOfBricks.map((brick, index) => (
          <Col key={index}>
            <BrickProduct
              cardStyle="brickBackground"
              name={brick.name}
              text="Advantage 1"
              availability="YES"
              price="150"
              production_time="3-5"
              brickProduct={brick}
              slug={`/bricks-detail/${brick.slug}`}
            ></BrickProduct>
          </Col>
        ))}
      </>
    );
  };

  const CartItemsList = ({ cartItems }) => {
    return (
      <>
        {cartItems?.map((item, index) => (
          <>
            <ShoppingCartProduct
              key={index}
              index={index}
              brickProduct={item.brickProduct}
              price={item.price}
              quantity={item.quantity}
              colourOption={item.colourOption}
              savedCartItems={cartItems}
              setSavedCartItems={setCartItems}
            />

            <div className="shoppingcartLine" />
          </>
        ))}
      </>
    );
  };

  const OrderSummaryList = ({ savedCartItems }) => {
    return (
      <>
        {savedCartItems?.map((item, index) => (
          <OrderSummaryBody
            brickProduct={item.brickProduct}
            price={item.price}
            quantity={item.quantity}
          />
        ))}
      </>
    );
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Container className="px-0 pt-2">
        <Banner image={bannerImage} height={"19rem"} />
        <div className="py-5" />
        <div className="d-flex justify-content-center">
          <div>
            <div className="shoppingcartTitle1 d-flex text-uppercase">
              Your Cart
            </div>
            <div className="shoppingcartTitle2 d-flex text-uppercase justify-content-end">
              For Bricks
            </div>
          </div>
        </div>
        <div>
          <Row className="shoppingcartMainDiv">
            {isSmallScreen && cartItems && cartItems?.length > 0 && (
              <Col xs={12} sm={12} md={3}>
                <div className="shoppingcartSummaryHead text-uppercase">
                  Summary
                </div>
                <div className="shoppingcartLine" />
                <div className="d-flex shoppingcartSmalltext py-1">
                  <div className="flex-grow-1">Subtotal</div>
                  <div>${totalPrice}</div>
                  <span className=" shoppingcartSmallUSD">&nbsp;USD</span>
                </div>

                <div className="d-flex shoppingcartSmalltext py-1">
                  <div className="flex-grow-1">Delivery</div>
                  <div>${totalDelivery}</div>
                  <span className="shoppingcartSmallUSD">&nbsp;USD</span>
                </div>
                <div className="shoppingcartLine" />
                <div className="d-flex shoppingcartDeliveryHead py-1">
                  <div className="flex-grow-1">Delivery</div>
                  <div>${totalPrice + totalDelivery}</div>
                  <span className="shoppingcartDeliveryUSD">&nbsp;USD</span>
                </div>
                <div>
                  <Button
                    onClick={openModal}
                    className="shoppingcartOrderAllButton"
                  >
                    Order All Now
                  </Button>
                </div>
                <OrderSummaryModal
                  modalShow={modalShow}
                  setModalShow={setModalShow}
                  savedCartItems={cartItems}
                  OrderSummaryList={OrderSummaryList}
                />
              </Col>
            )}
            <Col xs={12} sm={12} md={8}>
              <div className="shoppingcartText text-uppercase">Cart Items</div>
              <div className="shoppingcartLine"></div>
              {cartItems && cartItems?.length > 0 ? (
                <>
                  <CartItemsList cartItems={cartItems} />
                </>
              ) : (
                <div
                  style={{
                    display: "flex",

                    justifyContent: "center",
                  }}
                >
                  <p className="shoppingcartEmptyText">
                    Your shopping cart is empty
                  </p>
                </div>
              )}
              <div className="shoppingcartLine"></div>
            </Col>
            {!isSmallScreen && cartItems && cartItems?.length > 0 && (
              <Col xs={6} sm={6} md={4} className="shoppingcartSummaryCol">
                <div className="shoppingcartSummaryHead text-uppercase">
                  Summary
                </div>
                <div className="shoppingcartLine" />
                <div className="d-flex shoppingcartSmalltext py-1">
                  <div className="flex-grow-1">Subtotal</div>
                  <div>${totalPrice}</div>
                  <span className=" shoppingcartSmallUSD">&nbsp;USD</span>
                </div>
                <div className="d-flex shoppingcartSmalltext py-1">
                  <div className="flex-grow-1">Delivery</div>
                  <div>${totalDelivery}</div>
                  <span className="shoppingcartSmallUSD">&nbsp;USD</span>
                </div>
                <div className="shoppingcartLine" />
                <div className="d-flex shoppingcartDeliveryHead py-1">
                  <div className="flex-grow-1">Delivery</div>
                  <div>${totalPrice + totalDelivery}</div>
                  <span className="shoppingcartDeliveryUSD">&nbsp;USD</span>
                </div>
                <div>
                  <Button
                    onClick={openModal}
                    className="shoppingcartOrderAllButton"
                  >
                    Order All Now
                  </Button>
                </div>
                <OrderSummaryModal
                  modalShow={modalShow}
                  setModalShow={setModalShow}
                  savedCartItems={cartItems}
                  OrderSummaryList={OrderSummaryList}
                />
              </Col>
            )}
          </Row>
          <div className="shoppingcartRecommendations py-4 text-uppercase">
            Recommendations
          </div>
        </div>
      </Container>{" "}
      <Container>
        <Row xs={1} md={3}>
          <BrickProductList listOfBricks={listOfBricks} />
        </Row>
      </Container>
    </>
  );
}

export default ShoppingCart;
