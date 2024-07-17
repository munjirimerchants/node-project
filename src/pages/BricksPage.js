import "bootstrap/dist/css/bootstrap.css";
import "../assets/css/pages/BricksPage.css";
import axios from "axios";

import { Row, Col, Container, Badge, Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import { connections, endpoints } from "../config/connections";
import { resourceFolder, images, icons } from "../config/resources";

import BrickProduct from "../components/BrickProduct";
import FormModal from "../components/FormModal";

import Banner from "../layouts/Banner";

import GeneralFormHeader from "../components/generalForm/GeneralFormHeader";
import GeneralFormBody from "../components/generalForm/GeneralFormBody";
import GeneralFormValues from "../components/generalForm/GeneralFormValues";

function BricksPage() {
  const brickPageBannerImage = `${resourceFolder.images}${images.brickPageBannerImage}`;
  const BannerBricks1 = `${resourceFolder.images}${images.bannerImage1}`;
  const BannerBricks2 = `${resourceFolder.images}${images.bannerImage2}`;
  const BannerBricks3 = `${resourceFolder.images}${images.bannerImage3}`;

  // store bricks
  const CURRENT_ENQUIRY = "brick";

  const [currentEnquiry, setCurrentEnquiry] = useState(CURRENT_ENQUIRY);
  const handleEnquiryChange = (enquiryType) => {
    setCurrentEnquiry(enquiryType);
  };

  //sets the enquiry to brick (can also be general or machine)
  const { initialValues, validationSchema, loading } =
    GeneralFormValues(CURRENT_ENQUIRY);

  const [modalShow, setModalShow] = useState(false);

  function openModal() {
    setModalShow(true);
  }

  function closeModal() {
    setModalShow(false);
    setCurrentEnquiry("brick");
  }

  const [brickProducts, setBrickProducts] = useState([]);
  // check if getting data
  const [isLoading, setIsLoading] = useState(false);
  const [uniqueTypesMap, setUniqueTypesMap] = useState({});

  // method for getting products
  const getBrickProducts = async () => {
    try {
      // waiting for data, set loading
      setIsLoading(true);
      // get data into response
      const response = await axios.get(
        `${connections.server}${endpoints.brickproducts}`
      );
      // setting products in array
      setBrickProducts(response.data);
      // when all data in, set not loading
      setIsLoading(false);
      // catch error
    } catch (error) {
      console.log(error);
    }
  };

  const renderBrickProductsByType = () => {
    return Object.keys(uniqueTypesMap).map((type, index) => (
      <div className="py-4 px-2 border-bottom" key={index}>
        {/* Add section title or other information based on the type */}
        <Container className="py-5 px-2" id={type}>
          <Row className="mx-0">
            <Col xs="12" md="6" className="bricksCol ps-0 pe-2">
              <p className="bricksDescriptionTitle1 p-0 my-0">{type} </p>
            </Col>
            <Col xs="12" md="6" className="bricksCol2 ps-0">
              <p className="bricksDescriptionSubtitle1 p-0 ">made to order</p>
            </Col>
          </Row>
          <hr className="bricksBorderDivider" />
          <p className="bricksSubDescriptionTitle pt-4 mb-1">
            About {type} Bricks
          </p>
          <p className="bricksSubDescriptionInfo">
            {type} Bricks: These are masonry units made from a mixture of
            cement, sand, and water. The mixture is placed in moulds and
            subjected to high pressure to form bricks. They're typically solid
            and offer a uniform, smooth appearance.
          </p>
        </Container>
        <Row xs={1} md={2} xl={3}>
          {/* Map over brick products for the current type */}
          {uniqueTypesMap[type].map((brickProduct, productIndex) => (
            <Col key={productIndex}>
              <BrickProduct
                id={productIndex}
                brickProduct={brickProduct}
                slug={`/bricks-detail/${brickProduct.slug}`}
              />
            </Col>
          ))}
        </Row>
      </div>
    ));
  };

  const DynamicPills = () => {
    // Create an array of dynamic hrefs for all unique types
    const hrefsArray = Object.keys(uniqueTypesMap).map((type) => `#${type}`);

    return (
      <>
        {hrefsArray.map((dynamicHref, index) => (
          <Col className="bricksPillCols">
            <a
              key={index}
              style={{ textDecoration: "none" }}
              href={dynamicHref}
            >
              <Badge pill className="bricksPillCustom px-3">
                Go to {dynamicHref.substring(1)} Bricks
              </Badge>
            </a>
          </Col>
        ))}
      </>
    );
  };

  // application loads, call this method to get bricks
  useEffect(() => {
    getBrickProducts();
  }, []);

  useEffect(() => {
    const typesMap = brickProducts.reduce((acc, brickProduct) => {
      const type = brickProduct.category;
      acc[type] = acc[type] || [];
      acc[type].push(brickProduct);
      return acc;
    }, {});
    setUniqueTypesMap(typesMap);
  }, [brickProducts]);

  console.log("unique types map:", uniqueTypesMap);

  return (
    <Container className="px-0 pt-2">
      <Banner image={brickPageBannerImage} />
      <div className="py-5" />
      {/* Title */}
      <Container className="d-flex justify-content-center py-5 bricksPageHeaderDiv">
        <Row>
          <Col className="d-flex flex-column justify-content-center">
            <div className="text-uppercase ms-2 bricksTitleHome1">Munjiri</div>
            <div className="text-uppercase px-1 bricksTitleHome2">Bricks</div>
            <div className="py-0 my-0 pe-2  bricksTitleHome3">
              made to order
            </div>
          </Col>
        </Row>
      </Container>
      <FormModal
        show={modalShow}
        onHide={closeModal}
        modalstyleheader="machineModalStyleHeader"
        modalstylebody="machineModalStyleBody"
        HeaderComponent={GeneralFormHeader}
        BodyComponent={(props) => (
          <GeneralFormBody {...props} currentEnquiry={currentEnquiry} />
        )}
        headerProps={{ currentEnquiry, onEnquiryChange: handleEnquiryChange }}
        initialValues={initialValues}
        validationSchema={validationSchema}
        loading={loading}
      />
      {/* 3 images in banner */}
      <Container>
        <Container className="d-flex justify-content-center flex-row px-0 pb-4">
          <Container>
            <Row className="">
              <Col className="p-0">
                <Card className="cardDimension">
                  <Card.Img
                    className="align-items-center  w-100 h-100"
                    src={BannerBricks1}
                    style={{
                      width: "100%",
                      overflow: "hidden",
                    }}
                  />
                </Card>
              </Col>
              <Col className="p-0">
                <Card className="cardDimension">
                  <Card.Img
                    className="align-items-center  w-100 h-100"
                    src={BannerBricks2}
                    style={{
                      width: "100%",
                      overflow: "hidden",
                    }}
                  />
                </Card>
              </Col>
              <Col className="p-0">
                <Card className="cardDimension">
                  <Card.Img
                    className="align-items-center w-100 h-100"
                    src={BannerBricks3}
                    style={{
                      width: "100%",
                      overflow: "hidden",
                    }}
                  />
                </Card>
              </Col>
            </Row>

            {/* pills */}
            <Row className="py-2 bricksPillRow">
              <DynamicPills />
            </Row>
            <Col className="bricksPillColsEnquire">
              <a style={{ textDecoration: "none" }} href="#cementBricks">
                <Badge
                  onClick={openModal}
                  pill
                  className="bricksPillCustomEnquire px-3 align-content-end"
                >
                  ENQUIRE ABOUT BRICKS
                </Badge>
              </a>
            </Col>
          </Container>
        </Container>
      </Container>
      {/* alignment Container */}
      {/* GETTING BRICKS PRODUCTS */}
      <Container>
        {/* Check if app is loading*/}
        {isLoading ? (
          // display loading text
          "Loading"
        ) : (
          // Fragment
          <>
            {/* When Loads check the length of array */}
            {brickProducts.length > 0 ? (
              <>
                {/* If Bigger than 0, dispaly */}
                {renderBrickProductsByType()}
              </>
            ) : (
              // Otherwise display no products
              <div>There is no product</div>
            )}
          </>
        )}
      </Container>
    </Container>
  );
}

export default BricksPage;
