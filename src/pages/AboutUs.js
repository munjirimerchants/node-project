import "../assets/css/pages/AboutUs.css";

import Container from "react-bootstrap/Container";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import MultiCarousel from "../components/MultiCarouselMachinery";
import { Link } from "react-router-dom";
import Banner from "../layouts/Banner";
import AboutUsListItem from "../components/AboutUsListItem";
import {
  AboutUsBricksSection,
  AboutUsBricksSectionItem,
} from "../components/AboutUsSection";

import { resourceFolder, images, icons } from "../config/resources";

//TODO: On smaller screen fix the problem that you can scroll to left / right (usually related to margins on outer elements)
//TODO: Fix Title on small screen
const AboutUs = () => {
  // icon paths
  const fbIconPath = `${resourceFolder.icons}${icons.fb}`;
  const linkedIconPath = `${resourceFolder.icons}${icons.linkedin}`;
  const igIconPath = `${resourceFolder.icons}${icons.ig}`;
  const blackArrowIconPath = `${resourceFolder.icons}${icons.blackArrow}`;
  // image paths
  const brickImagePath = `${resourceFolder.images}${images.brickImage}`;
  const machineImagePath = `${resourceFolder.images}${images.machineImage}`;
  const aboutUsBannerPath = `${resourceFolder.images}${images.aboutUsBannerImage}`;
  // carousel images
  const logo1Path = `${resourceFolder.images}${images.carouselLogo1}`;
  const logo2Path = `${resourceFolder.images}${images.carouselLogo2}`;
  const logo3Path = `${resourceFolder.images}${images.carouselLogo3}`;
  const logo4Path = `${resourceFolder.images}${images.carouselLogo4}`;

  //all pictures that need to be displayed in the carousel get added here!
  let myPicArray = [logo1Path, logo2Path, logo3Path, logo4Path];

  const captionText = [
    "At Munjiri Merchants we are a small business offering various types of plant hire and bricks for construction.",
    "A list and description of the available plant hire equipment for hire. A list and description of bricks available for purchasing. A table of Areas that we supply and sell to  for both bricks and plant equipment. A table of Areas that we supply and sell to for both bricks and plant equipment. A table of Areas that we supply and sell to for both bricks and plant equipment.",
  ];

  const aboutusBricksText = [
    "We offer both cement bricks of varying types as well as innovative interlocking clay bricks that take the stress out of building, ensure all your sides are straight and reduce construction time whilst still providing a sleek finish. Click on our bricks page to view some of the available options.",
  ];

  const aboutusPlantHireText = [
    "Our plant hire equipment tends to be hired out for several months at a time. We offer both short- and long-term hire periods and if we don't have what you are looking for in stock then we may be able to source it for you. Enquire today and let us know what you need.",
  ];
  return (
    <div className="px-2 pt-2">
      <Banner image={aboutUsBannerPath} height={"19rem"} />
      <div className="py-5" />
      <Container className="d-flex justify-content-center py-5">
        <p className="text-uppercase p-0 aboutusTitleHome1">About</p>
        <span className="text-uppercase p-0 mx-2 aboutusTitleHome2">Us</span>
      </Container>

      <div className="py-4" />

      <Container>
        <Row
          s={12}
          className="d-flex align-items-stretch justify-content-between flex-wrap gy-3 gy-md-0"
        >
          <Col md={8} className="p-0">
            <div className="py-5 px-5 aboutusCardBackgroundColor1 h-100 w-100">
              <div className="d-flex flex-column justify-content-center h-100 w-100">
                <div className="py-1 aboutusCardSubTitle">Who we are</div>
                <p className="py-1 aboutusCardTitle">
                  Bringing quality to the people
                </p>
                <p className="m-0 aboutusCardText1">
                  {captionText[0]}
                  <br />
                  <br />
                  {captionText[1]}
                </p>
              </div>
            </div>
          </Col>

          <Col md={3} className="p-0 ms-md-4 me-md-4">
            <div className="aboutusCardBackgroundColor2 h-100 w-100">
              <div className="py-3 mx-5">
                <div>
                  <AboutUsListItem text="Excellent Customer Service" />
                  <AboutUsListItem text="Premium Bricks" />
                  <AboutUsListItem text="Premium Machinery" />
                  <AboutUsListItem text="Good prices" />
                  <AboutUsListItem text="Good prices" />
                </div>
                <div className="d-flex align-items-center justify-content-center py-2">
                  <AboutUsListItem
                    text="Social Media"
                    showCaptionLine={false}
                  />
                  <Image className="px-2" src={fbIconPath} />
                  <Image className="px-2" src={linkedIconPath} />
                  <Image className="px-2" src={igIconPath} />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <Container fluid className="py-5">
        <div className="aboutusOurClient d-flex justify-content-center text-uppercase">
          Our Clients
        </div>

        <div className="aboutusHowWeTrust d-flex justify-content-center text-uppercase">
          Trust In Us
        </div>
      </Container>

      <Container>
        <MultiCarousel
          pics={myPicArray}
          imageStyle={"aboutusCarouselStyle"}
          autoPlay={true}
          autoPlaySpeed={2800}
          arrows={false}
        />
      </Container>

      <Container fluid className="py-5">
        <div className="aboutusHowWeTrust d-flex justify-content-center text-uppercase">
          How We Work
        </div>
      </Container>

      <Container>
        <Row className="d-flex align-items-stretch">
          <Col lg={6} className="aboutusCol2">
            <div className="px-0 aboutusBackgroundBlue w-100">
              {/* Content for the first column */}
              <AboutUsBricksSection
                aboutusBricksText={aboutusPlantHireText}
                aboutusTitle1="Plan"
                aboutusTitle2="t Machinery Hire"
              >
                <AboutUsBricksSectionItem
                  title="Short term hire"
                  description="From as short as 60 mins"
                />
                <AboutUsBricksSectionItem
                  title="Long term hire"
                  description="For as long as 6 months"
                />
                <AboutUsBricksSectionItem
                  title="Don’t find what you’re looking for?"
                  description="Just make an enquiry and we will source it for you"
                />
              </AboutUsBricksSection>
              <div className="aboutusHeightRemaining">
                <Link to="/plant-hire" className="aboutusLinkStyle">
                  <p className="m-0">
                    MAKE AN ENQUIRY <Image src={blackArrowIconPath} />
                  </p>
                </Link>
              </div>
            </div>
          </Col>

          <Col lg={6} className="p-0">
            <Image
              src={machineImagePath}
              className="aboutusBigImage m-0 p-0 w-100"
            />
          </Col>
        </Row>
        <div className="py-2"></div>
        <Row className="d-flex align-items-stretch">
          <Col lg={6} className="aboutusCol2">
            <div className="px-0 aboutusBackgroundBlue w-100">
              <AboutUsBricksSection
                aboutusBricksText={aboutusBricksText}
                aboutusTitle1="Bric"
                aboutusTitle2="ks"
              >
                <hr className="aboutusSectionLine" />
                <AboutUsBricksSectionItem
                  title="Range"
                  description="Wide range to choose from"
                />
                <AboutUsBricksSectionItem
                  title="Perfection"
                  description="Perfectly aligned bricks"
                />
                <AboutUsBricksSectionItem
                  title="Don’t find what you’re looking for?"
                  description="We can custom make bricks for you"
                />
              </AboutUsBricksSection>
              <div className="aboutusHeightRemaining">
                <Link to="/bricks-page" className="aboutusLinkStyle">
                  <p>
                    BROWSE BRICKS COLLECTION <Image src={blackArrowIconPath} />
                  </p>
                </Link>
              </div>
            </div>
          </Col>

          <Col lg={6} className="p-0">
            <Image
              src={brickImagePath}
              className="aboutusBigImage m-0 p-0 w-100"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AboutUs;
