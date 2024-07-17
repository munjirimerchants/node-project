import "bootstrap/dist/css/bootstrap.css";
import "../assets/css/components/BrickProductCard.css";

import { useState, useEffect } from "react";
import { Col, Container, Row, Image } from "react-bootstrap";

import BrickOption from "./BrickOption";
import BrickPrice from "./BrickPrice";

function BrickProduct({ id, brickProduct, slug }) {
  const [selectedOption, setSelectedOption] = useState("nonColoured");
  const [selectedPrice, setSelectedPrice] = useState(brickProduct?.price);
  console.log(slug);
  let available = "No";
  let showPriceColoured = null;
  let showPrice = 0;

  if (brickProduct) {
    available = "No";
    showPriceColoured = null;
    showPrice = brickProduct.price * brickProduct.perUnit;

    if (brickProduct.priceColour != null) {
      showPriceColoured = brickProduct.priceColour * brickProduct.perUnit;
    }
    if (brickProduct.availability == 1) {
      available = "Yes";
    } else {
      available = "No";
    }
  } else {
    brickProduct = {
      name: "undefined",
      price: 0,
      description: "undefined",
      image: "undefined",
      perUnit: 0,
      code: "undefined",
      minimumOrderQuantity: 0,
      priceColour: 0,
      brickType: "undefined",
      productionTime: "undefined",
      category: "undefined",
    };
  }

  // Function to handle changes in the radio button selection
  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "coloured") {
      setSelectedPrice(brickProduct.priceColour);
    }
    if (selectedValue === "nonColoured") {
      setSelectedPrice(brickProduct.price);
    }
    setSelectedOption(selectedValue);
  };

  useEffect(() => {
    console.log("Selected Option:", selectedPrice);
  }, [selectedPrice]);

  return (
    <div>
      <Row xs={1} md={2}>
        <Col className="bricksdetailImageCol">
          <div className="bricksdetailImageDiv">
            <Image
              fluid
              src={brickProduct.image}
              className="bricksdetailImage"
            />
          </div>
        </Col>
        <Col className="">
          <Container>
            <h1 className="bricksdetailHeading1">{brickProduct.name}</h1>
            <hr className="bricksdetailBorderDivider" />
            <p>{brickProduct.description}</p>

            <BrickOption
              key={`brickOption_${id}`}
              selectedOption={selectedOption}
              handleOptionChange={handleOptionChange}
              showPrice={showPrice}
              showPriceColoured={showPriceColoured}
              brickProduct={brickProduct}
            />
            <BrickPrice
              selectedPrice={selectedPrice}
              key={`brickPrice_${id}`}
              brickProduct={brickProduct}
              colourOption={selectedOption}
            />
          </Container>
        </Col>
      </Row>
    </div>
  );
}

export default BrickProduct;
