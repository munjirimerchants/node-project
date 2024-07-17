import "bootstrap/dist/css/bootstrap.css";
import "../assets/css/pages/BricksDetail.css";
import axios from "axios";

import { useEffect, useState } from "react";
import { Row, Col, Container, Image } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";

import BricksBreadcrumb from "../components/ItemBreadcrumb";
import BrickProduct from "../components/BrickProduct";
import BrickProductForDetails from "../components/BrickProductForDetails";

import Banner from "../layouts/Banner";

import BrickUtils from "../utils/BrickUtils";

import { connections, endpoints } from "../config/connections";
import { resourceFolder, images, icons } from "../config/resources";

function BricksDetail() {
  const AMOUNT_OF_BRICKPRODUCTS = 3;
  const { slug: slugRoute } = useParams();

  const blueArrowIconPath = `${resourceFolder.icons}${icons.blueArrow}`;
  const brickDetailBannerPath = `${resourceFolder.images}${images.brickDetailBannerImage}`;

  const [slug, setSlug] = useState(slugRoute);
  const [brickProduct, setBrickProduct] = useState({});
  const [brickProductsRandom, setBrickProductsRandom] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  // Update id state when routeId changes
  useEffect(() => {
    setSlug(slugRoute);
  }, [slugRoute]);

  useEffect(() => {
    console.log("SLUG: " + slug);
    if (slug) {
      axios
        .get(`${connections.server}${endpoints.brickproductsBySlug}/${slug}`)
        .then((response) => {
          setBrickProduct(response.data);
          console.log(response.data);
          setLoadingData(false);
        });
    }
  }, [slug]);

  const { listOfBricks, isLoading } = BrickUtils(AMOUNT_OF_BRICKPRODUCTS);

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
              slug={`/bricks-detail/${brick.slug}`}
            ></BrickProduct>
          </Col>
        ))}
      </>
    );
  };

  //this is the advantages and disadvantages pills

  const [tagArray, setTagArray] = useState([]);
  const [negativeTagArray, setNegativeTagArray] = useState([]);

  useEffect(() => {
    if (brickProduct && brickProduct.length > 0) {
      const tags = brickProduct.BrickAdvantages.map((advantage, index) => {
        return (
          <Col key={index} xs="2" className="tag">
            {advantage.title}
          </Col>
        );
      });

      const negativeTags = brickProduct.BrickDisadvantages.map(
        (disadvantage, index) => (
          <Col key={index} xs="2" className="tagNegative">
            {disadvantage.title}
          </Col>
        )
      );

      setTagArray(tags);
      setNegativeTagArray(negativeTags);
    }
  }, [brickProduct]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {!loadingData && (
        <div className="px-2 pt-2">
          <Container className="px-0 pt-2 bricksDetails-bannerContainer">
            <Banner image={brickDetailBannerPath} height="24rem" />
            <div className="py-5 mt-5" />
            <div className="brickDetails-titleContainer mb-3">
              <div class="brickDetails-titleContent">
                <h1 className=" text-uppercase ms-2 bricksdetailTitleHome1">
                  {" "}
                  {brickProduct.name}
                </h1>

                <h2 className="text-uppercase p-0 mx-1 bricksdetailTitleHome2">
                  Detail{" "}
                  <span className="text-uppercase p-0 mx-1 bricksdetailTitleHome3">
                    {" "}
                    Page
                  </span>
                </h2>
              </div>
            </div>
            <Container>
              <BricksBreadcrumb
                itemCategory="Bricks"
                currentItem={brickProduct.name}
                previousPage="/bricks-page"
              />
            </Container>
          </Container>

          <div className="py-2" />

          <Container className="my-2">
            <Link to="/bricks-page" className="text-decoration-none">
              <button className="machineDetails-backToButton">
                <Image
                  src={blueArrowIconPath}
                  className="machineDetails-arrow"
                />
                Back to list
              </button>
            </Link>
          </Container>
          <Container className="py-2">
            <BrickProductForDetails brickProduct={brickProduct} />
          </Container>
          <Container>
            <hr></hr>
          </Container>
          <Container>
            <div className="bricksdetailHeading2 mb-2">
              About {brickProduct.name}
            </div>
            <Row>{tagArray}</Row>
            <Row>{negativeTagArray}</Row>
            <Row xs={1} md={2}>
              <Col className="mt-3">
                <h3 className="bricksdetailBenefitTitle">Measurments</h3>
                <p className="bricksdetailNormalText">
                  {brickProduct.length} mm x {brickProduct.width} mm x{" "}
                  {brickProduct.height} mm
                </p>
              </Col>

              <Col className="mt-3">
                <h3 className="bricksdetailBenefitTitle">
                  Compressive Strength{" "}
                </h3>
                <p className="bricksdetailNormalText">
                  {brickProduct.compressiveStrength} MPa
                </p>
              </Col>
            </Row>
          </Container>
          <Container>
            <hr></hr>
          </Container>
          <Container>
            <div className="bricksdetailHeading2">
              About {brickProduct.BrickCategory.category} Bricks
            </div>
            <div className="bricksdetailNormalText">
              These are masonry units made from a mixture of cement, sand, and
              water. The mixture is placed in moulds and subjected to high
              pressure to form bricks. They're typically solid and offer a
              uniform, smooth appearance.
            </div>
          </Container>
          <Container>
            <hr />
          </Container>
          <Container className="pb-5">
            <div className="bricksdetailHeading2">Benefits</div>
            <div className="bricksdetailNormalText">
              Specific Benefits of Cement Bricks
            </div>
          </Container>
          <Container>
            <Row xs={1} md={2}>
              {brickProduct.BrickCategory.BrickCategoryAdvantages.map(
                (advantage, index) => (
                  <Col>
                    <h3 className="bricksdetailBenefitTitle">
                      {advantage.title}
                    </h3>
                    <p className="bricksdetailNormalText">
                      {advantage.description}
                    </p>
                  </Col>
                )
              )}
            </Row>
            <p className="bricksdetailNormalText">
              Both cement bricks and hollow cement bricks offer a set of unique
              advantages that cater to different construction needs. The choice
              between them often depends on the specific requirements of a
              construction project, be it structural needs, budgetary
              constraints, or aesthetic preferences.
            </p>
          </Container>
          <Container>
            <hr />
          </Container>
          <Container>
            <div className="bricksdetailHeading2">Delivery & Returns</div>
            <Row>
              <Col>
                <h3 className="bricksdetailBenefitTitle">Estimated Delivery</h3>
                <p className="bricksdetailNormalText">
                  One delivery fee to most locations (check our Location in Home
                  Page) | Free returns within 14 days (excludes final sale and
                  made-to-order items)
                </p>
              </Col>
              <Col>
                <h3 className="bricksdetailBenefitTitle">Estimated Delivery</h3>
                <p className="bricksdetailNormalText">
                  5 workings day time (5 Nov 2023)
                </p>
              </Col>
            </Row>
          </Container>
          <Container>
            <hr />
          </Container>

          <Container>
            <h1 className="bricksdetailHeading1">Other Bricks</h1>
            <hr className="bricksdetailBorderDivider" />
          </Container>
          <Container>
            <Row xs={1} md={3}>
              <BrickProductList listOfBricks={listOfBricks} />
            </Row>
          </Container>
        </div>
      )}
    </>
  );
}

export default BricksDetail;
