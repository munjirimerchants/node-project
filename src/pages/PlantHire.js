import "../assets/css/pages/PlantHire.css";

import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import MachineCard from "../components/MachineCard.js";
import MachineScrollTag from "../components/MachineScrollTag.js";
import MultiCarousel from "../components/MultiCarouselMachinery.js";
import MachineOffCanvas from "../components/MachineOffCanvas.js";
import LinkToButton from "../components/LinkToButton.js";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Banner from "../layouts/Banner";
import Enquiry from "../components/Enquiry";
import { connections, endpoints } from "../config/connections";
import { resourceFolder, images, icons } from "../config/resources";

function PlantHire() {
  const mach1Top = `${resourceFolder.images}${images.plantHireMachineryCombined}`;
  const bottomBannerImage = `${resourceFolder.images}${images.plantHireImage}`;
  const bannerImage = `${resourceFolder.images}${images.plantHirePageBannerImage}`;

  const CURRENT_ENQUIRY = "machine";

  const [listOfMachines, setListOfMachines] = useState([]);
  const [loading, setLoading] = useState(true);

  let machineCardArray = [];
  // This is the pill linking to the machine by href
  let machineTagArray = [];

  // All pictures that need to be displayed in the carousel get added here
  let myPicArray = [];
  let comingSoonNames = [];

  // This is the advantages and disadvantages pills
  let tagArray = [];
  let negativeTagArray = [];

  useEffect(() => {
    axios
      .get(`${connections.server}${endpoints.machineproducts}`)
      .then((response) => {
        setListOfMachines(response.data);
        setLoading(false);
      });
  }, []);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // With the data from the server: iterate over it, format, push as HTML to an array and render
  if (listOfMachines != null) {
    // Separate machines into two lists: availableNow and comingSoon
    const availableNow = listOfMachines.filter(
      (machine) => !machine.comingSoon
    );
    const comingSoon = listOfMachines.filter((machine) => machine.comingSoon);

    for (let i = 0; i < comingSoon.length; i++) {
      myPicArray.push(comingSoon[i].image);
      comingSoonNames.push(comingSoon[i].name);
    }

    for (let i = 0; i < availableNow.length; i++) {
      tagArray = [];
      negativeTagArray = [];
      for (let j = 0; j < availableNow[i].MachineAdvantages.length; j++) {
        tagArray.push(availableNow[i].MachineAdvantages[j].name);
      }
      for (let j = 0; j < availableNow[i].MachineDisadvantages.length; j++) {
        negativeTagArray.push(availableNow[i].MachineDisadvantages[j].name);
      }

      let pictureDir = "left";
      let hrefToMachineDetails = `/machine-detail/${availableNow[i].slug}`;
      // Make every other picture align to the right side
      if (i % 2 === 0) {
        pictureDir = "left";
      } else {
        pictureDir = "right";
      }

      machineTagArray.push(
        <MachineScrollTag
          key={i}
          machineName={availableNow[i].name}
          id={`#${availableNow[i].slug}`}
          handleClose={handleClose}
        />
      );
      machineCardArray.push(
        <MachineCard
          machine={availableNow[i]}
          id={`${availableNow[i].slug}`}
          pictureDirection={pictureDir}
          image={availableNow[i]?.image || "no image"}
          machineName={availableNow[i]?.name || "default name"}
          tags={tagArray}
          negativeTags={negativeTagArray}
          text={availableNow[i]?.description || "default text"}
          availability={availableNow[i]?.availability || -1}
          href={hrefToMachineDetails}
          button={<LinkToButton navLink={hrefToMachineDetails} />}
        />
      );
    }
  }

  const getWindowWidth = () => window.innerWidth;

  const [isSmallScreen, setIsSmallScreen] = useState(getWindowWidth() <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(getWindowWidth() <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [modalShow, setModalShow] = useState(false);

  function openModal() {
    setModalShow(true);
  }

  if (loading) {
    return <p className="plantHireCentered">loading...</p>;
  }

  return (
    <div>
      <Banner image={bannerImage} />
      <div className="py-5" />
      <Container className="d-flex justify-content-center plantSpecialHeader">
        <Col>
          <Row className="d-flex justify-content-start">
            <h1 className="plantTitleHome1">PLANT </h1>
          </Row>
          <Row className="d-flex justify-content-start">
            <h1 className="plantTitleHome2">MACHINERY </h1>
          </Row>
          <Row className="d-flex justify-content-end">
            <h1 className="plantTitleHome3">HIRE </h1>
          </Row>
        </Col>
      </Container>
      <Container fluid className="plantTopImageContainer">
        <Image fluid className="plantTopImage" src={mach1Top}></Image>
      </Container>
      <Container>
        <Row className="mt-3 scrollTags d-flex machineRow">
          {isSmallScreen ? (
            <Container className="machineListSmallContainer">
              <MachineOffCanvas
                machineTagArray={machineTagArray}
                show={show}
                handleClose={handleClose}
                handleShow={handleShow}
              />
              <Button
                href="#comingSoon"
                variant="primary"
                className="machineComingSoonBtn"
              >
                Coming Soon
              </Button>
            </Container>
          ) : (
            <>
              {machineTagArray}

              <Col className="d-flex machineCol">
                <Button href="#comingSoon" className="machineScrollTagSoon">
                  Coming Soon
                </Button>
              </Col>
            </>
          )}
        </Row>
      </Container>
      <Enquiry
        currentEnquiryType={CURRENT_ENQUIRY}
        modalShow={modalShow}
        setModalShow={setModalShow}
      />

      <div className="machineCardDiv">{machineCardArray}</div>
      <Container className="d-flex justify-content-center">
        <p id="comingSoon" className="text-nowrap">
          COMING SOON
        </p>
      </Container>
      <MultiCarousel
        pics={myPicArray}
        titles={comingSoonNames}
        autoPlay={true}
        arrows={true}
        imageStyle={"carouselStyle"}
      />

      <Container
        fluid
        className="py-5 mt-5"
        style={{
          backgroundColor: "#0a303d",
          maxWidth: "100%",
          margin: "auto",
          marginBottom: " 4rem",
        }}
      >
        <Row>
          <Col className="ms-5" xs="10" md="6">
            <p
              style={{
                color: "#FFFFFF",
                fontSize: "1.875rem",
                fontStyle: "normal",
                fontWeight: "900",
                lineHeight: "normal",
                maxWidth: "90%",
              }}
            >
              Didn't find what you're looking for?
            </p>

            {/* 5 marign unless less than medium device, then set to 0 margin */}

            <p
              style={{
                color: "#FFFFFF",
                fontWeight: "400",
                fontStyle: "normal",
                maxWidth: "85%",
              }}
            >
              Let us know what equipment you need and would like to hire so that
              we can add it to our list of available plant machinery. We are
              also open to machinery hired out on a contract farming basis for
              all those farmers out there.
            </p>

            <Button onClick={openModal} className="plantEnquireButton">
              ENQUIRE NOW
            </Button>
          </Col>
          <Col className="me-5" xs>
            <Image
              className="plantBottomBannerImage"
              src={bottomBannerImage}
              fluid
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default PlantHire;
