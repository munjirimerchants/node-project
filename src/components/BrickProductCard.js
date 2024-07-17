import React from "react";
import { Card, Image } from "react-bootstrap";
import { resourceFolder, icons } from "../config/resources";

function BrickProductCard({ brickProduct, available, slug }) {
  const WhiteArrow = `${resourceFolder.icons}${icons.whiteArrow}`;

  return (
    <Card className={"brickproductBackground my-md-0 my-3"}>
      <Card.Title className="brickproductCardTitle px-3 pt-3 pb-1 mb-0">
        {brickProduct.name}
      </Card.Title>
      <Card.Text className="brickproductCardText px-3 py-0 mt-0 mb-1">
        {brickProduct.description}
      </Card.Text>
      <div className="d-flex align-self-center p-3">
        <Card.Img
          className="brickproductCardImg"
          variant="top"
          src={brickProduct.image}
          alt="Card image"
        />
      </div>
      <Card.Footer className="brickproductCardFooter">
        <div className="d-flex flex-row justify-content-between">
          <div>Available: {available}</div>
          <div>
            <a
              href={slug}
              className="text-decoration-none"
              style={{ color: "white" }}
            >
              <u
                style={{
                  textUnderlineOffset: "0.25rem",
                  textDecorationColor: "#FFBE32",
                }}
              >
                View product
              </u>
              <Image className="ms-2" src={WhiteArrow} />
            </a>
          </div>
        </div>
      </Card.Footer>
    </Card>
  );
}

export default BrickProductCard;
