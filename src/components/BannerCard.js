import "../assets/css/components/BannerCard.css";
import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const BannerCard = (cardData) => {
  return (
    <Card style={{ borderRadius: "0.625rem", border: "none" }}>
      <div className="gradient-overlay">
        <Card.Img
          className="bannerCardImg"
          src={cardData.img}
          alt="Card image"
        />
      </div>
      <Card.ImgOverlay>
        <Card.Title className="d-flex flex-column">
          <p
            className={`text-uppercase my-md-0 py-md-0 fs-md-4 ${cardData.textColour1}`}
          >
            {cardData.title}
          </p>
          <p
            className={`text-uppercase my-md-0 py-md-0 fs-md-4 ${cardData.textColour2}`}
          >
            {cardData.title2}
          </p>
        </Card.Title>
        <Card.Text className="bannerTextDescription">{cardData.text}</Card.Text>
        <Link to={cardData.href}>
          <Button className="bannerCardBtnStyle position-absolute bottom-0 start-0 m-3 px-5">
            {cardData.button}
          </Button>
        </Link>
      </Card.ImgOverlay>
    </Card>
  );
};

export default BannerCard;
