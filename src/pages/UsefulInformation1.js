import "../assets/css/pages/useful-information.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Badge from "react-bootstrap/Badge";
import Banner from "../layouts/Banner";

import { resourceFolder, images, icons } from "../config/resources";

function About() {
  const Tractorfield = `${resourceFolder.images}${images.tractorFieldImage}`;
  const Tractorbackground = `${resourceFolder.images}${images.tractorBackGroundImage}`;
  const Solidclaybricks = `${resourceFolder.images}${images.solidClayBrickImage}`;
  const Claybrick = `${resourceFolder.images}${images.clayBrickImage}`;
  const Brickwall = `${resourceFolder.images}${images.brickWallImage}`;
  const Chargingstation = `${resourceFolder.images}${images.chargingStationImage}`;
  const bannerImage = `${resourceFolder.images}${images.aboutUsBannerImage}`;

  return (
    <Container className="px-0 pt-2">
      <Banner image={bannerImage} height={"19rem"} />

      <div className="usefulPadding" />

      <Container className="d-flex justify-content-center">
        <Row>
          <Col className="text-uppercase usefulinformationTitleHome">
            Useful
          </Col>
          <Col className="text-uppercase usefulinformationTitleHome">
            Information
          </Col>
        </Row>
      </Container>

      <div className="usefulPadding" />

      <Container className="usefulBackgroundColour">
        <Row className="usefulRow">
          <Col className="usefulCol">
            <div className="usefulText">
              <div>Bricks</div>
              <Image className="usefulImage" src={Brickwall} />
              <div className="usefulSubtext">
                Discover useful bricks information
              </div>
            </div>
          </Col>

          <div className="usefulinfoLine"></div>

          <Col className="usefulCol2">
            <div className="usefulText">
              <div>Plant Machinery</div>
              <Image className="usefulImage" src={Chargingstation} />
              <div className="usefulSubtext">
                Discover useful plant machinery information
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <Container>
        {/*Pills section*/}
        <Row className="py-2">
          <Col className="bricksPillCols">
            <a className="usefulinfoLinkText" href="#PlantMachinery">
              <Badge pill className="bricksPillCustom px-3">
                Plant Machinery Information
              </Badge>
            </a>
          </Col>
          <Col className="bricksPillCols">
            <a className="usefulinfoLinkText" href="#Bricks">
              <Badge pill className="bricksPillCustom px-3">
                Bricks Information
              </Badge>
            </a>
          </Col>
        </Row>
      </Container>

      <Container //Plant machinery section
        className="px-0"
        width="100%"
        height="100%"
        align-items="stretch"
      >
        <Container className="usefulinfoBlackText">
          <h2 id="PlantMachinery" className="m-0 usefulinfoTitleText">
            Plant Machinery
          </h2>
          <hr className="my-2 usefulinfoYellowLine"></hr>
          <p>Below are links you find helpful in the use of plant machinery</p>
        </Container>
        <Row className="h-100 m-0 vertical-center d-flex justify-content-around">
          <Col lg={4} md={4} className="usefulinfoColumnText">
            <Card>
              {/*card image overlay section*/}
              <Card.Img
                src={Tractorfield}
                alt="Card image"
                className="usefulinfoCardImg"
              />
              <Card.ImgOverlay className="usefulinfoCardImgOverlay">
                <Card.Text className="usefulinfoCardText2"></Card.Text>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button className="btn usefulinfoBtnColor" href="#">
                    Visit Link
                  </button>
                </div>
                <Card.Text className="usefulinfoCardText1">
                  https://www.placeholder12345.com
                </Card.Text>
              </Card.ImgOverlay>
            </Card>
            <hr className="my-1"></hr>
            <p className="usefulinfoTextpara1">
              How to use your tractor in farming 1
            </p>
          </Col>
          <Col lg={4} md={4} className="usefulinfoColumnText">
            <Card>
              <Card.Img
                src={Tractorbackground}
                alt="Card image"
                className="usefulinfoCardImg"
              />
              <Card.ImgOverlay className="usefulinfoCardImgOverlay">
                <Card.Text className="usefulinfoCardText2"></Card.Text>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button className="btn usefulinfoBtnColor" href="#">
                    Visit Link
                  </button>
                </div>
                <Card.Text className="usefulinfoCardText1">
                  https://www.placeholder12345.com
                </Card.Text>
              </Card.ImgOverlay>
            </Card>
            <hr className="my-1"></hr>
            <p className="usefulinfoTextpara1">
              How to use your tractor in farming 2
            </p>
          </Col>
          <Col lg={4} md={4} className="usefulinfoColumnText">
            <Card>
              <Card.Img
                src={Tractorfield}
                alt="Card image"
                className="usefulinfoCardImg"
              />
              <Card.ImgOverlay className="usefulinfoCardImgOverlay">
                <Card.Text className="usefulinfoCardText2"></Card.Text>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button className="btn usefulinfoBtnColor" href="#">
                    Visit Link
                  </button>
                </div>
                <Card.Text className="usefulinfoCardText1">
                  https://www.placeholder12345.com
                </Card.Text>
              </Card.ImgOverlay>
            </Card>
            <hr className="my-1"></hr>
            <p className="usefulinfoTextpara1">
              How to use your tractor in farming 3
            </p>
          </Col>
        </Row>

        <div className="p-2"></div>

        <Row className="h-100 m-0 vertical-center d-flex justify-content-around">
          <Col lg={4} md={4} className="usefulinfoColumnText">
            <Card>
              <Card.Img
                src={Tractorfield}
                alt="Card image"
                className="usefulinfoCardImg"
              />
              <Card.ImgOverlay className="usefulinfoCardImgOverlay">
                <Card.Text className="usefulinfoCardText2"></Card.Text>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button className="btn usefulinfoBtnColor" href="#">
                    Visit Link
                  </button>
                </div>
                <Card.Text className="usefulinfoCardText1">
                  https://www.placeholder12345.com
                </Card.Text>
              </Card.ImgOverlay>
            </Card>
            <hr className="my-1"></hr>
            <p className="usefulinfoTextpara1">
              How to use your tractor in farming 4
            </p>
          </Col>

          <Col lg={4} md={4} className="usefulinfoColumnText">
            <Card>
              <Card.Img
                src={Tractorbackground}
                alt="Card image"
                className="usefulinfoCardImg"
              />
              <Card.ImgOverlay className="usefulinfoCardImgOverlay">
                <Card.Text className="usefulinfoCardText2"></Card.Text>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button className="btn usefulinfoBtnColor" href="#">
                    Visit Link
                  </button>
                </div>
                <Card.Text className="usefulinfoCardText1">
                  https://www.placeholder12345.com
                </Card.Text>
              </Card.ImgOverlay>
            </Card>
            <hr className="my-1"></hr>
            <p className="usefulinfoTextpara1">
              How to use your tractor in farming 5
            </p>
          </Col>
          <Col lg={4} md={4} className="usefulinfoColumnText">
            <Card>
              <Card.Img
                src={Tractorfield}
                alt="Card image"
                className="usefulinfoCardImg"
              />
              <Card.ImgOverlay className="usefulinfoCardImgOverlay">
                <Card.Text className="usefulinfoCardText2"></Card.Text>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button className="btn usefulinfoBtnColor" href="#">
                    Visit Link
                  </button>
                </div>
                <Card.Text className="usefulinfoCardText1">
                  https://www.placeholder12345.com
                </Card.Text>
              </Card.ImgOverlay>
            </Card>
            <hr className="my-1"></hr>
            <p className="usefulinfoTextpara1">
              How to use your tractor in farming 6
            </p>
          </Col>
        </Row>
      </Container>

      <Container //Bricks section
        className="px-0"
        width="100%"
        height="100%"
        align-items="stretch"
      >
        <Container className="usefulinfoBlackText">
          <h2 id="Bricks" className="m-0 usefulinfoTitleText">
            Bricks
          </h2>
          <hr className="my-2 usefulinfoYellowLine"></hr>
          <p>Below are links you find helpful in the use of bricks</p>
        </Container>
        <Row className="h-100 m-0 vertical-center d-flex justify-content-around">
          <Col lg={4} md={4} className="usefulinfoColumnText">
            <Card>
              <Card.Img
                src={Tractorfield}
                alt="Card image"
                className="usefulinfoCardImg"
              />
              <Card.ImgOverlay className="usefulinfoCardImgOverlay">
                <Card.Text className="usefulinfoCardText2"></Card.Text>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button className="btn usefulinfoBtnColor" href="#">
                    Visit Link
                  </button>
                </div>
                <Card.Text className="usefulinfoCardText1">
                  https://www.placeholder12345.com
                </Card.Text>
              </Card.ImgOverlay>
            </Card>
            <hr className="my-1"></hr>
            <p className="usefulinfoTextpara1">
              How to use your tractor in farming a
            </p>
          </Col>
          <Col lg={4} md={4} className="usefulinfoColumnText">
            <Card>
              <Card.Img
                src={Solidclaybricks}
                alt="Card image"
                className="usefulinfoCardImg"
              />
              <Card.ImgOverlay className="usefulinfoCardImgOverlay">
                <Card.Text className="usefulinfoCardText2"></Card.Text>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button className="btn usefulinfoBtnColor" href="#">
                    Visit Link
                  </button>
                </div>
                <Card.Text className="usefulinfoCardText1">
                  https://www.placeholder12345.com
                </Card.Text>
              </Card.ImgOverlay>
            </Card>
            <hr className="my-1"></hr>
            <p className="usefulinfoTextpara1">
              How to use your tractor in farming b
            </p>
          </Col>
          <Col lg={4} md={4} className="usefulinfoColumnText">
            <Card>
              <Card.Img
                src={Claybrick}
                alt="Card image"
                className="usefulinfoCardImg"
              />
              <Card.ImgOverlay className="usefulinfoCardImgOverlay">
                <Card.Text className="usefulinfoCardText2"></Card.Text>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button className="btn usefulinfoBtnColor" href="#">
                    Visit Link
                  </button>
                </div>
                <Card.Text className="usefulinfoCardText1">
                  https://www.placeholder12345.com
                </Card.Text>
              </Card.ImgOverlay>
            </Card>
            <hr className="my-1"></hr>
            <p className="usefulinfoTextpara1">
              How to use your tractor in farming c
            </p>
          </Col>
        </Row>

        <div className="p-2"></div>

        <Row className="h-100 m-0 vertical-center d-flex justify-content-around">
          <Col lg={4} md={4} className="usefulinfoColumnText">
            <Card>
              <Card.Img
                src={Tractorfield}
                alt="Card image"
                className="usefulinfoCardImg"
              />
              <Card.ImgOverlay className="usefulinfoCardImgOverlay">
                <Card.Text className="usefulinfoCardText2"></Card.Text>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button className="btn usefulinfoBtnColor" href="#">
                    Visit Link
                  </button>
                </div>
                <Card.Text className="usefulinfoCardText1">
                  https://www.placeholder12345.com
                </Card.Text>
              </Card.ImgOverlay>
            </Card>
            <hr className="my-1"></hr>
            <p className="usefulinfoTextpara1">
              How to use your tractor in farming d
            </p>
          </Col>

          <Col lg={4} md={4} className="usefulinfoColumnText">
            <Card>
              <Card.Img
                src={Tractorbackground}
                alt="Card image"
                className="usefulinfoCardImg"
              />
              <Card.ImgOverlay className="usefulinfoCardImgOverlay">
                <Card.Text className="usefulinfoCardText2"></Card.Text>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button className="btn usefulinfoBtnColor" href="#">
                    Visit Link
                  </button>
                </div>
                <Card.Text className="usefulinfoCardText1">
                  https://www.placeholder12345.com
                </Card.Text>
              </Card.ImgOverlay>
            </Card>
            <hr className="my-1"></hr>
            <p className="usefulinfoTextpara1">
              How to use your tractor in farming e
            </p>
          </Col>
          <Col lg={4} md={4} className="usefulinfoColumnText">
            <Card>
              <Card.Img
                src={Tractorfield}
                alt="Card image"
                className="usefulinfoCardImg"
              />
              <Card.ImgOverlay className="usefulinfoCardImgOverlay">
                <Card.Text className="usefulinfoCardText2"></Card.Text>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button className="btn usefulinfoBtnColor" href="#">
                    Visit Link
                  </button>
                </div>
                <Card.Text className="usefulinfoCardText1">
                  https://www.placeholder12345.com
                </Card.Text>
              </Card.ImgOverlay>
            </Card>
            <hr className="my-1"></hr>
            <p className="usefulinfoTextpara1">
              How to use your tractor in farming f
            </p>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default About;
