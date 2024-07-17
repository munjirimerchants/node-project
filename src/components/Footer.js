import "bootstrap/dist/css/bootstrap.css";
import "../assets/css/components/Footer.css";
import { Link } from "react-router-dom";
import {
  Card,
  Row,
  Col,
  Stack,
  Nav,
  Image,
  Button,
  Container,
} from "react-bootstrap";
import { resourceFolder, icons, images } from "../config/resources";

function MyFooter() {
  /* image sources! */
  const face = `${resourceFolder.icons}${icons.fb}`;
  const link = `${resourceFolder.icons}${icons.linkedin}`;
  const insta = `${resourceFolder.icons}${icons.ig}`;
  const callIcon = `${resourceFolder.icons}${icons.call}`;
  const emailIcon = `${resourceFolder.icons}${icons.email}`;

  const logoImg = `${resourceFolder.images}${images.adminPageLogo}`;

  /* link sources! */
  let getInTouch = "/contact-us";
  let home = "/";
  let aboutUs = "/about-us";
  let services = "/";
  let news = "/";
  let resources = "/";
  let contact = "/contact-us";
  let training = "/";
  let vetting = "/";
  let recruitment = "/";
  let websiteTerms = "/";
  let privacyTerms = "/";
  let cookiesTerms = "/";
  let disabilityTerms = "/";
  let social1 = "/";
  let social2 = "/";
  let social3 = "/";

  return (
    <div className="footerBody p-0 mt-5">
      <Card.Footer className="footerCard ps-4 pe-4 pb-4 pt-4">
        <Row className="padding-left">
          <Col sm={4} className="text-left my-2">
            <div>
              <Image
                src={logoImg}
                alt="Card image"
                style={{
                  objectFit: "cover",
                  height: "100%",
                  width: "100%",
                  minWidth: "80px",
                  maxWidth: "180px",
                }}
              ></Image>
            </div>
            <div className="textStyle2 p-0 m-0">
              <p className="mb-0 mt-3">Address Line1 Line 2</p>
              <p>City, Country</p>
            </div>
            <div>
              <Button
                className="fw-bolder custom-button btn-primary my-2 py-2 text-nowrap"
                href={getInTouch}
                style={{
                  width: "100%",
                  maxWidth: "180px",
                  minWidth: "100px",
                }}
              >
                GET IN TOUCH
              </Button>
            </div>
          </Col>
          <Col sm={8} className="my-2">
            <Row>
              <Col className="m-2">
                <Nav className="flex-column text-left">
                  <p className="textStyle1 mb-1">Company</p>
                  <Nav.Link className="footer-nav" href={home}>
                    Home
                  </Nav.Link>
                  <Nav.Link className="footer-nav" href={aboutUs}>
                    About Us
                  </Nav.Link>
                  <Nav.Link className="footer-nav" href={services}>
                    Services
                  </Nav.Link>
                  <Nav.Link className="footer-nav" href={news}>
                    News
                  </Nav.Link>
                  <Nav.Link className="footer-nav" href={resources}>
                    Resources
                  </Nav.Link>
                  <Nav.Link className="footer-nav" href={contact}>
                    Contact
                  </Nav.Link>
                </Nav>
              </Col>
              <Col className="m-2">
                <Nav defaultActiveKey="/home" className="flex-column text-left">
                  <p className="textStyle1 mb-1">Services</p>
                  <Nav.Link className="footer-nav" href={training}>
                    Training
                  </Nav.Link>
                  <Nav.Link className="footer-nav" href={vetting}>
                    Vetting
                  </Nav.Link>
                  <Nav.Link className="footer-nav" href={recruitment}>
                    Recruitment
                  </Nav.Link>
                </Nav>
              </Col>
              <Col className="m-2">
                <Nav defaultActiveKey="/home" className="flex-column text-left">
                  <p className="textStyle1 mb-1">Legal</p>
                  <Nav.Link className="footer-nav" href={websiteTerms}>
                    Website Terms and Conditions
                  </Nav.Link>
                  <Nav.Link className="footer-nav" href={privacyTerms}>
                    Privacy Policy
                  </Nav.Link>
                  <Nav.Link className="footer-nav" href={cookiesTerms}>
                    Cookies Policy
                  </Nav.Link>
                  <Nav.Link className="footer-nav" href={disabilityTerms}>
                    Disability Policy
                  </Nav.Link>
                </Nav>
              </Col>
              <Col className="m-2">
                <Nav defaultActiveKey="/home" className="flex-column text-left">
                  <p className="textStyle1 mb-1">Contact Us</p>

                  <div className="footer-nav d-flex flex-row justify-content-start align-items-center">
                    <Image
                      className="micro-btn me-1"
                      src={emailIcon}
                      alt=""
                    ></Image>
                    <p className="m-0">something@blabla123.com </p>
                  </div>

                  <div className="footer-nav d-flex flex-row justify-content-start align-items-center">
                    <Image
                      className="micro-btn me-1"
                      src={callIcon}
                      alt=""
                    ></Image>
                    <p className="m-0">1234567890</p>
                  </div>
                </Nav>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="text-left padding-left mt-1">
          <Col sm={4} className="d-flex justify-content-center">
            <Container className="p-0">
              <p className="textStyle2 p-0 mb-1">Copyright text here</p>
              <p className="textStyle3 p-0 mb-0">
                Bsdwaj Wadwif is a company registered in Eawdjio and WDAiao with
                company number xxxxxxxxxxx. VAT Number xxxxxxxxxxxx
              </p>
            </Container>
          </Col>
          <Col
            sm={4}
            className="d-flex justify-content-start mt-2 ms-0  ms-sm-2"
            style={{ paddingLeft: "12px" }}
          >
            <Row>
              <Stack direction="horizontal">
                <p className="textStyle1 mt-2 mb-2 me-2 text-nowrap">
                  Social Media
                </p>
                <Link to={social1}>
                  <Image
                    className="mini-btn ms-2 me-2"
                    src={face}
                    alt="facebook_icon"
                  ></Image>
                </Link>
                <Link to={social2}>
                  <Image
                    className="mini-btn ms-2 me-2"
                    src={link}
                    alt="linkedin_icon"
                  ></Image>
                </Link>
                <Link to={social3}>
                  <Image
                    className="mini-btn ms-2 me-2"
                    src={insta}
                    alt="instagram_icon"
                  ></Image>
                </Link>
              </Stack>
            </Row>
          </Col>
          <Col sm={4}></Col>
        </Row>
      </Card.Footer>
      <Row className="bottom-footer">
        <p className="textStyle2 mb-0 text-center">
          Ssfdwahf AWDwa is a company registered in AWdwafa and WAdafa with
          company number xxxxxxx. VAT Number xxxxxxx
        </p>
      </Row>
    </div>
  );
}

export default MyFooter;
