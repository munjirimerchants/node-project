import "bootstrap/dist/css/bootstrap.css";
import "../assets/css/components/MachineProductCard.css";

import React, { useEffect, useState } from "react";
import { Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { resourceFolder, icons } from "../config/resources";

const MachineProductCard = (machineCardData) => {
  const WhiteArrow = `${resourceFolder.icons}${icons.whiteArrow}`;
  const TEXTCUTOFF = 300;
  const [textShown, setTextShown] = useState("");

  useEffect(() => {
    if (machineCardData.text !== "default") {
      sliceText();
    }
  }, [machineCardData.text]);

  function sliceText() {
    if (machineCardData.text.length > TEXTCUTOFF) {
      setTextShown(machineCardData.text.slice(0, TEXTCUTOFF) + "...");
    } else {
      setTextShown(machineCardData.text);
    }
  }

  return (
    <div>
      <Card className={"machineCardBackground my-md-0 my-3"}>
        {/* ` backward quotes is literal for multiline expression and string */}

        <Card.Title className="machineCardTitle ps-3 pt-3 mb-1">
          {machineCardData.title}
        </Card.Title>
        <Card.Text className="machineCardText ps-3 pe-3">{textShown}</Card.Text>
        <Card.Text className="machineCardTextMore ps-3 pe-3">
          <Link to={machineCardData.href} style={{ textDecoration: "none" }}>
            FIND OUT MORE
          </Link>
        </Card.Text>
        <div className="d-flex align-self-center" style={{ height: "14.5rem" }}>
          <Card.Img
            className="machineCardImg"
            variant="top"
            src={machineCardData.img}
            alt="Card image"
          />
        </div>

        <Card.Footer className="machineCardFooter">
          <div className="d-flex flex-row justify-content-between">
            <div>Available: {machineCardData.availability}</div>
            <div>
              <Link
                to={machineCardData.href}
                className="text-decoration-none"
                style={{
                  color: "white",
                }}
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
              </Link>
            </div>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default MachineProductCard;
