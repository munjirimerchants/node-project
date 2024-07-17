import "bootstrap/dist/css/bootstrap.css";
import "../assets/css/pages/Home.css";

import { useState } from "react";
import {
  Container,
  Table,
  Row,
  Col,
  Button,
  Image,
  Stack,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { resourceFolder, images, icons } from "../config/resources";

import BannerCards from "../components/BannerCard";
import BrickProduct from "../components/BrickProduct";
import MachineProductCard from "../components/MachineProductCard";
import LocationTableHeader from "../components/LocationTableHeader";
import LocationTableContent from "../components/LocationTableContent";
import Enquiry from "../components/Enquiry.js";
import LinkToButton from "../components/LinkToButton.js";

import Banner from "../layouts/Banner";

import BrickUtils from "../utils/BrickUtils";
import MachineUtils from "../utils/MachineUtils";

function Home() {
  const locationPath = `${resourceFolder.icons}${icons.location}`;
  const blueArrowPath = `${resourceFolder.icons}${icons.blueArrow}`;
  const darkBlueArrow = `${resourceFolder.icons}${icons.darkBlueArrow}`;

  const brickBackgroundPath = `${resourceFolder.images}${images.brickBackground}`;
  const plantBackgroundPath = `${resourceFolder.images}${images.plantBackground}`;
  const bannerImage = `${resourceFolder.images}${images.homePageBannerImage}`;

  const CURRENT_ENQUIRY = "general";
  const AMOUNT_OF_BRICKPRODUCTS = 3;
  const AMOUNT_OF_MACHINES = 3;

  const [modalShow, setModalShow] = useState(false);

  function openModal() {
    setModalShow(true);
  }

  //fetches the given amount of random bricks and machines
  const { listOfBricks, isLoading } = BrickUtils(AMOUNT_OF_BRICKPRODUCTS);
  const { listOfMachines, isLoadingMachines } =
    MachineUtils(AMOUNT_OF_MACHINES);

  if (isLoading && isLoadingMachines) {
    return <p>Loading...</p>;
  }

  //
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
              slug={`/bricks-detail/${brick.slug}`} //
            ></BrickProduct>
          </Col>
        ))}
      </>
    );
  };

  const MachineList = ({ listOfMachines }) => {
    return (
      <>
        {listOfMachines.map((machine, index) => (
          <Col key={index}>
            <MachineProductCard
              title={machine.name}
              img={machine?.image || "no image"}
              machineName={machine?.name || "default name"}
              text={machine?.description || "default"}
              availability={machine?.availability || -1}
              href={`/machine-detail/${machine.slug}`}
              button={
                <LinkToButton navLink={`/machine-detail/${machine.slug}`} />
              }
            />
          </Col>
        ))}
      </>
    );
  };

  return (
    <div className="px-2 pt-2">
      <Banner image={bannerImage} />
      <div className="py-5" />

      <Container className="py-5 homeHeaderDiv">
        <h1 className="titleHome">
          Merchants you <u className="titleUnderline">can trust</u>
        </h1>
      </Container>

      <Enquiry
        currentEnquiryType={CURRENT_ENQUIRY}
        modalShow={modalShow}
        setModalShow={setModalShow}
      />

      <Container className="d-flex justify-content-center flex-row px-0">
        <Row className="py-3 mx-0" xs={1} md={2}>
          <Col className="p-1">
            <BannerCards
              textColour1="bannerTextThinWhite"
              textColour2="bannerTextThickYellow"
              img={brickBackgroundPath}
              title="Durable"
              title2="Bricks"
              text="Some text here"
              button="Enquire Now"
              href="/bricks-page"
            />
          </Col>
          <Col className="p-1">
            <BannerCards
              textColour1="bannerTextThickYellow"
              textColour2="bannerTextThinWhite"
              img={plantBackgroundPath}
              title="Plant Machinery"
              title2="Hire"
              text="Some text here"
              button="Enquire Now"
              href="/plant-hire"
            />
          </Col>
        </Row>
      </Container>

      <Container className="my-5">
        <h1 className="heading1Blue">Plant Machinery</h1>
        <h2 className="heading2Blue">Hire</h2>
        <div className="d-flex align-items-center">
          <Link to="/plant-hire" style={{ textDecoration: "none" }}>
            <Stack direction="horizontal" gap={0}>
              <h3 className="heading3Blue">Browse All Machinery</h3>
              <Image className="ps-2 pb-2" src={blueArrowPath} />
            </Stack>
          </Link>
        </div>
      </Container>

      <Container>
        <Row xs={1} md={3}>
          <MachineList listOfMachines={listOfMachines} />
        </Row>
      </Container>

      <Container className="d-flex justify-content-center">
        <Link to="/plant-hire" style={{ textDecoration: "none" }}>
          <Stack direction="horizontal" gap={0}>
            <p className="darkBlueText d-flex justify-content-center m-0 p-3">
              Browse All Machinery
            </p>
            <Image
              className="d-flex justify-content-center"
              src={darkBlueArrow}
            />
          </Stack>
        </Link>
      </Container>

      <Container className="my-5">
        <h1 className="heading1Blue">Quality Bricks</h1>
        <h2 className="heading2Blue">Booking</h2>
        <div className="d-flex align-items-center">
          <Link to="/bricks-page" style={{ textDecoration: "none" }}>
            <Stack direction="horizontal" gap={0}>
              <h3 className="heading3Blue">Browse All Bricks</h3>
              <Image className="ps-2 pb-2" src={blueArrowPath} />
            </Stack>
          </Link>
        </div>
      </Container>

      <Container>
        <Row xs={1} md={3}>
          <BrickProductList listOfBricks={listOfBricks} />
        </Row>
      </Container>

      <Container className="d-flex justify-content-center">
        <Link to="/bricks-page" style={{ textDecoration: "none" }}>
          <Stack direction="horizontal" gap={0}>
            <p className="darkBlueText d-flex justify-content-center m-0 p-3">
              Browse All Bricks
            </p>
            <Image
              className="d-flex justify-content-center"
              src={blueArrowPath}
            />
          </Stack>
        </Link>
      </Container>

      <Container className="d-flex justify-content-center">
        <Image src={locationPath} style={{ padding: "0.5rem" }} />
        <h1 id="homeAreasWeCover" className="my-5">
          AR
          <u className="homeAreasUnderline">EAS WE CO</u>
          VER
        </h1>
      </Container>

      <Container>
        <Row className="d-flex">
          <Col
            className="d-flex justify-content-start flex-direction-row"
            xs={6}
          ></Col>
          <Col
            className="d-flex justify-content-start flex-direction-row"
            xs={6}
          ></Col>
        </Row>
      </Container>

      <Container>
        <Row xs={1} md={2}>
          <Col>
            <Container
              className="d-flex flex-direction-row p-4"
              style={{
                color: "#FFFFFF",
                backgroundColor: "#003142",
                width: "max-content",
                margin: "0",
                borderRadius: "0.125rem",
                marginBottom: "1rem",
              }}
            >
              <p
                className="d-flex align-content-center p-0 me-2"
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  fontStyle: "normal",
                  lineHeight: "0",
                  alignSelf: "flex-end",
                  margin: "auto",
                }}
              >
                Bricks
              </p>
              <p
                className="d-flex align-content-end p-0"
                style={{
                  fontSize: "0.875rem",
                  fontStyle: "normal",
                  fontWeight: "400",
                  lineHeight: "0",
                  alignSelf: "flex-end",
                  margin: "auto",
                }}
              >
                Location
              </p>
            </Container>

            <Table
              style={{ borderCollapse: "separate", borderSpacing: "0 3px" }}
            >
              <LocationTableHeader
                title1="Location"
                title2="Delivery"
                title3="Delivery"
              />
              <LocationTableContent
                location="Gweru"
                delivery1="Yes"
                delivery2="Yes"
              />
              <LocationTableContent
                location="Masvingo"
                delivery1="Yes"
                delivery2="Yes"
              />
              <LocationTableContent
                location="Mutare"
                delivery1="Yes"
                delivery2="Yes"
              />
              <LocationTableContent
                location="Harare"
                delivery1="Yes"
                delivery2="Yes"
              />
              <LocationTableContent
                location="Kadoma"
                delivery1="Yes"
                delivery2="Yes"
              />
              <LocationTableContent
                location="Chegutu"
                delivery1="Yes"
                delivery2="Yes"
              />
            </Table>
          </Col>
          <Col>
            <Container
              className="d-flex flex-direction-row p-4"
              style={{
                color: "#FFFFFF",
                backgroundColor: "#0089A0",
                width: "max-content",
                margin: "0",
                borderRadius: "0.125rem",
                marginBottom: "1rem",
              }}
            >
              <p
                className="d-flex align-content-center p-0 me-2"
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  fontStyle: "normal",
                  lineHeight: "0",
                  margin: "auto",
                }}
              >
                Plant Machinery
              </p>
              <p
                className="d-flex align-content-center p-0"
                style={{
                  fontSize: "0.875rem",
                  fontStyle: "normal",
                  fontWeight: "400",
                  lineHeight: "0",
                  margin: "auto",
                }}
              >
                Locations
              </p>
            </Container>

            <Table
              style={{ borderCollapse: "separate", borderSpacing: "0 3px" }}
            >
              <LocationTableHeader
                title1="Location"
                title2="Delivery"
                title3="Delivery"
              />
              <LocationTableContent
                location="Gweru"
                delivery1="Yes"
                delivery2="Yes"
              />
              <LocationTableContent
                location="Masvingo"
                delivery1="Yes"
                delivery2="Yes"
              />
              <LocationTableContent
                location="Mutare"
                delivery1="Yes"
                delivery2="Yes"
              />
              <LocationTableContent
                location="Harare"
                delivery1="Yes"
                delivery2="Yes"
              />
              <LocationTableContent
                location="Kadoma"
                delivery1="Yes"
                delivery2="Yes"
              />
              <LocationTableContent
                location="Chegutu"
                delivery1="Yes"
                delivery2="Yes"
              />
            </Table>
          </Col>
        </Row>
      </Container>
      <div
        className="py-5"
        style={{
          backgroundColor: "#E7B41C",
          borderRadius: "0.625rem",
          maxWidth: "90%",
          margin: "auto",
        }}
      >
        <Row className="d-flex justify-content-start px-5">
          <Col sm={8} className="p-0">
            <p
              style={{
                color: "#FFFFFF",
                fontSize: "1.875rem",
                fontStyle: "normal",
                fontWeight: "900",
                lineHeight: "normal",
              }}
            >
              If you don’t find what you’re looking for, send us an enquiry
              anyway!
            </p>
          </Col>
        </Row>
        <Row id="homeYellowBoxRow" className="my-md-0 my-4 px-5">
          {/* 5 marign unless less than medium device, then set to 0 margin */}

          <Col xs="6" id="yellowLineDiv" className="px-0">
            <hr className="yellowLineInYellowBox" />
          </Col>
          <Col xs="6" id="homeEnquireButtonDiv">
            <Button onClick={openModal} className="homeEnquireButtonYellowBox">
              Make Enquiry
            </Button>
          </Col>
        </Row>
        <Row className="px-5">
          <Col className="p-0" sm={7}>
            <p className="homeEnquiryLowerText">
              Let us know what equipment you need and would like to hire so that
              we can add it to our list of available plant. We are also open to
              machinery hired out on a contract farming basis for all those
              farmers out there.
            </p>
          </Col>
          <Col></Col>
        </Row>
      </div>
    </div>
  );
}

export default Home;
