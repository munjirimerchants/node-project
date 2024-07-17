import "../assets/css/components/MachineCard.css";
import { Container, Card, Row, Col, Image, Stack } from "react-bootstrap";
import React, { useEffect, useState } from "react";

const MachineCard = (cardData) => {
  const [directionLeft, setDirectionLeft] = useState(null);
  const [directionRight, setDirectionRight] = useState(null);
  let TEXTCUTOFF = 500;

  let myTags = [];
  let negativeTags = [];

  //dynamically render the amount of tags
  for (let i = 0; i < cardData.tags?.length; i++) {
    myTags.push(
      <Col xs="2" className="tag">
        <p className="tagSize">{cardData.tags[i]}</p>
      </Col>
    );
  }

  //dynamically render the amount of negative tags
  for (let i = 0; i < cardData.negativeTags?.length; i++) {
    negativeTags.push(
      <Col xs="2" className="tagNegative">
        <p className="tagSize">{cardData.negativeTags[i]}</p>
      </Col>
    );
  }

  useEffect(() => {
    function changeDirection(dir) {
      if (dir === "left") {
        setDirectionRight(null);
        setDirectionLeft(
          <Col lg={6} className="d-flex imageAlignLeft mb-5">
            <Image
              fluid
              className="noBorder imageMaxSize"
              src={cardData.image}
            ></Image>
          </Col>
        );
      } else if (dir === "right") {
        setDirectionLeft(null);
        setDirectionRight(
          <Col lg={6} className="d-flex imageAlignRight">
            <Image
              fluid
              className="noBorder imageMaxSize"
              src={cardData.image}
            ></Image>
          </Col>
        );
      }
    }

    function checkWidthAndChangeDir(x) {
      if (x.matches) {
        changeDirection("left");
      } else {
        changeDirection(cardData.pictureDirection);
      }
    }

    const x = window.matchMedia("(max-width: 1200px)");
    checkWidthAndChangeDir(x);
    x.addEventListener("change", () => {
      checkWidthAndChangeDir(x);
    });

    // Cleanup the event listener on component unmount
    return () => {
      x.removeEventListener("change", () => {
        checkWidthAndChangeDir(x);
      });
    };
  }, [cardData.image, cardData.pictureDirection]);

  //if the description text is too long, cut it at the size given in TEXTCUTOFF
  //and display it only as "show more" text
  const [showMore, setShowMore] = useState(false);
  const [showAlways, setShowAlways] = useState(true);

  const [textShown, setTextShown] = useState("");
  const [textHidden, setTextHidden] = useState("");

  useEffect(() => {
    if (cardData.text !== "default") {
      sliceText();
    }
  }, [cardData.text]);

  function sliceText() {
    if (cardData.text.length > TEXTCUTOFF) {
      setShowMore(true);
      setTextHidden(cardData.text.slice(0, TEXTCUTOFF));
      setTextShown(cardData.text);
    } else {
      setShowAlways(false);
      setTextShown(cardData.text);
      setTextHidden(cardData.text);
    }
  }

  const falseToggle = () => {
    setShowMore(false);
  };
  const trueToggle = () => {
    setShowMore(true);
  };
  return (
    <Container
      fluid
      id={cardData.id}
      className={`backgroundContainer ${cardData.extraStyle}`}
    >
      <Container className="pt-2">
        <Card className="machineCard">
          <Card.Body>
            <Row>
              {directionLeft}
              <Col lg={12} xl={6}>
                <Card.Title className="bigHeadline">
                  {cardData.machineName}
                </Card.Title>
                <hr className="underline-yellow" />
                <Row>
                  {myTags}
                  {negativeTags}
                </Row>

                <Card.Text>
                  <div>
                    {showMore ? (
                      <>
                        {showAlways && (
                          <div>
                            <p className="gradientText machineText">
                              {textHidden}

                              <span>...</span>
                            </p>
                            <p>
                              <button
                                className="readMore myBtn"
                                onClick={falseToggle}
                              >
                                Read More
                              </button>
                            </p>
                          </div>
                        )}
                      </>
                    ) : (
                      <div>
                        <p className="machineText">{textShown}</p>
                        <p>
                          {showAlways && (
                            <button
                              className="readMore myBtn"
                              onClick={trueToggle}
                            >
                              Read Less
                            </button>
                          )}
                        </p>
                      </div>
                    )}
                  </div>
                </Card.Text>
                <hr className="underline-grey" />
                <Stack direction="horizontal" gap={2}>
                  <p className="availText">Availability</p>
                  <p className="greyBox availNumber">{cardData.availability}</p>
                </Stack>
                {cardData.button}
              </Col>
              {directionRight}
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </Container>
  );
};

MachineCard.defaultProps = {
  tags: ["addSome", "tags"],
  text: "default",
};

export default MachineCard;
