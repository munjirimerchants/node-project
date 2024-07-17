import React from "react";

import { resourceFolder, images } from "../config/resources";
import { Carousel, Button, Modal, Container, Image } from "react-bootstrap";
import { useState } from "react";

function Carousel1() {
  const pic = `${resourceFolder.images}${images.brickImage1}`;

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  return (
    <Container>
      <Carousel
        fade
        className="d-block w-30"
        style={{
          width: "auto",
          margin: "auto",
          maxWidth: "500px",
        }}
      >
        <Carousel.Item>
          <Image
            src={pic}
            style={{ height: "100%", width: "100%", objectFit: "contain" }}
          />
          <Carousel.Caption>
            <Button variant="primary" onClick={handleShow2}>
              Enquire Now
            </Button>

            <Modal
              show={show2}
              onHide={handleClose2}
              aria-labelledby="enquire-now"
            >
              <Modal.Header closeButton>
                <Modal.Title id="enquire-now">Enquire Now</Modal.Title>
              </Modal.Header>
              <Modal.Body id="enquire-now">
                Woohoo, you are ready to enquire now!
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose2}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose2}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>

            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image
            src={pic}
            style={{ height: "100%", width: "100%", objectFit: "contain" }}
          />
          <Carousel.Caption>
            <Button variant="primary" onClick={handleShow}>
              Order Now
            </Button>

            <Modal show={show} onHide={handleClose} aria-labelledby="order-now">
              <Modal.Header closeButton>
                <Modal.Title id="order-now">ORDER NOW</Modal.Title>
              </Modal.Header>
              <Modal.Body id="order-now">
                Woohoo, you are now ready to order!
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>

            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
}

export default Carousel1;
