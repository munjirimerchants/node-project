import "bootstrap/dist/css/bootstrap.css";
import "../assets/css/pages/App.css";
import "../assets/css/components/Navbar.css";

import { useEffect, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { useAuth } from "../context/AuthContext";
import { Nav, Navbar, Container, Image, Button, Col } from "react-bootstrap";
import { resourceFolder, images } from "../config/resources";
import { BellIcon } from "@heroicons/react/solid";
import { connections, endpoints } from "../config/connections";

import axios from "axios";
import auth from "../config/firebase-config";
import Logout from "../pages/Logout";
import ShoppingCartIcon from "./ShoppingCartIcon";
import NavbarsDropDown from "./NavbarsDropDown.js";
import NavbarOffCanvas from "../components/NavbarOffCanvas.js";

//TODO: Maybe fix Toast error (Very MINOR )

const Navbars = (prop) => {
  const Logo = `${resourceFolder.images}${images.adminPageLogo}`;
  const LogoSmall = `${resourceFolder.images}${images.adminPageLogoSmall}`;
  const location = useLocation();

  const [modal, setModal] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const { currentUser } = useAuth();
  const { cartItems, showToast, toasts, setToasts } = useShoppingCart();

  const isHome = location.pathname === "/";
  const isAboutUs = location.pathname === "/about-us";
  const isPlantHire = location.pathname === "/plant-hire";
  const isBricks = location.pathname === "/bricks-page";
  const isUsefulInfo = location.pathname === "/useful-information";
  const isContactUs = location.pathname === "/contact-us";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = auth.currentUser;
        const token = user && (await user.getIdToken());
        if (token) {
          //TOKEN HERE
          console.log("Token: ", token);
          console.log("UUID" + user.uid);

          const payloadHeader = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          };

          const response = await axios.get(
            `${connections.server}`,
            payloadHeader
          );
          console.log(response.data);
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, []);

  //******** OffCanvas code ********//
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getWindowWidth = () => window.innerWidth;

  const [isSmallScreen, setIsSmallScreen] = useState(getWindowWidth() <= 1400);
  const [isVerySmallScreen, setIsVerySmallScreen] = useState(
    getWindowWidth() <= 900
  );

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(getWindowWidth() <= 1400);
      setIsVerySmallScreen(getWindowWidth() <= 900);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function closeOffCanvasAndLogout() {
    setModal(true);
    handleClose();
  }

  const navLinks = (
    <Container>
      <Col className="navbarLinkDivOffCanvas">
        <Link to="/" onClick={() => handleClose()}>
          <Button className="navbarLinkInOffCanvas">Home</Button>
        </Link>
      </Col>
      <Col className="navbarLinkDivOffCanvas">
        <Link to="/about-us" onClick={() => handleClose()}>
          <Button className="navbarLinkInOffCanvas">About Us</Button>
        </Link>
      </Col>
      <Col className="navbarLinkDivOffCanvas">
        <Link to="/plant-hire" onClick={() => handleClose()}>
          <Button className="navbarLinkInOffCanvas">Plant Hire</Button>
        </Link>
      </Col>
      <Col className="navbarLinkDivOffCanvas">
        <Link to="/bricks-page" onClick={() => handleClose()}>
          <Button className="navbarLinkInOffCanvas">Bricks</Button>
        </Link>
      </Col>
      <Col className="navbarLinkDivOffCanvas">
        <Link to="/useful-information" onClick={() => handleClose()}>
          <Button className="navbarLinkInOffCanvas">Useful Information</Button>
        </Link>
      </Col>
      <Col className="navbarLinkDivOffCanvas">
        <Link to="/contact-us" onClick={() => handleClose()}>
          <Button className="navbarLinkInOffCanvas">Contact Us</Button>
        </Link>
      </Col>
      {currentUser && (
        <>
          <Col className="navbarLinkDivOffCanvas">
            <Link to="/account/profile" onClick={() => handleClose()}>
              <Button className="navbarProfileInOffCanvas">Profile</Button>
            </Link>
          </Col>
          <Col className="navbarLinkDivOffCanvas">
            <Button
              className="navbarLogoutInOffCanvas"
              onClick={closeOffCanvasAndLogout}
            >
              Logout
            </Button>
          </Col>
        </>
      )}
      {!currentUser && (
        <>
          <Col className="navbarLinkDivOffCanvas">
            <Link to="/login" onClick={() => handleClose()}>
              <Button className="navbarLogoutInOffCanvas">Login</Button>
            </Link>
            <Link to="/register" onClick={() => handleClose()}>
              <Button className="navbarLogoutInOffCanvas">Register</Button>
            </Link>
          </Col>
        </>
      )}
    </Container>
  );

  return (
    <>
      {location.pathname === "/login" ||
      location.pathname === "/register" ||
      location.pathname === "/forgot-password" ? (
        <>
          <Navbar expanded={expanded} className="navbarTop">
            <Link to="/">
              <Navbar.Brand>
                <Image src={Logo} />
              </Navbar.Brand>
            </Link>
          </Navbar>
        </>
      ) : (
        <>
          <Navbar
            expanded={expanded}
            expand="xxl"
            className="navbarTop"
            style={{
              color: "#FFF",
              fontSize: "1rem",
              fontStyle: "normal",
              fontWeight: "400",
            }}
          >
            <Container className="navDiv">
              {isVerySmallScreen ? (
                <Navbar.Brand className="navLogoSmall">
                  <Link to="/">
                    <Image src={LogoSmall} />
                  </Link>
                </Navbar.Brand>
              ) : (
                <Navbar.Brand>
                  <Link to="/">
                    <Image src={Logo} />
                  </Link>
                </Navbar.Brand>
              )}

              {isSmallScreen ? (
                <div className="navSmallScreenDiv">
                  <ShoppingCartIcon />
                  <BellIcon className="navBellIcon" />
                  <NavbarsDropDown
                    currentUser={currentUser}
                    setModal={setModal}
                  ></NavbarsDropDown>
                  <NavbarOffCanvas
                    links={navLinks}
                    show={show}
                    handleClose={handleClose}
                    handleShow={handleShow}
                  />
                </div>
              ) : (
                <>
                  <Navbar.Collapse style={{ justifyContent: "center" }}>
                    <div className="nav-holder">
                      <Container className="d-flex collapseDiv">
                        <Nav
                          className="me-auto justify-content-center textNav "
                          style={{ flexGrow: "1" }}
                        >
                          <Link
                            to="/"
                            onClick={() => setExpanded(false)}
                            className={isHome ? "activeLink" : ""}
                          >
                            <div className="text-white px-4 text-nowrap">
                              Home
                            </div>
                          </Link>
                          <Link
                            to="/about-us"
                            onClick={() => setExpanded(false)}
                            className={isAboutUs ? "activeLink" : ""}
                          >
                            <div className="text-white px-4 text-nowrap">
                              About Us
                            </div>
                          </Link>
                          <Link
                            to="/plant-hire"
                            onClick={() => setExpanded(false)}
                            className={isPlantHire ? "activeLink" : ""}
                          >
                            <div className="text-white px-4 text-nowrap">
                              Plant Hire
                            </div>
                          </Link>
                          <Link
                            to="/bricks-page"
                            onClick={() => setExpanded(false)}
                            className={isBricks ? "activeLink" : ""}
                          >
                            <div className="text-white px-4 text-nowrap">
                              Bricks
                            </div>
                          </Link>
                          <Link
                            to="/useful-information"
                            onClick={() => setExpanded(false)}
                            className={isUsefulInfo ? "activeLink" : ""}
                          >
                            <div className="text-white px-4 text-nowrap">
                              Useful Information
                            </div>
                          </Link>
                          <Link
                            to="/contact-us"
                            onClick={() => setExpanded(false)}
                            className={isContactUs ? "activeLink" : ""}
                          >
                            <div className="text-white px-4 text-nowrap">
                              Contact Us
                            </div>
                          </Link>
                          <ShoppingCartIcon />
                          {currentUser && (
                            <>
                              <BellIcon className="navBellIcon" />
                              <NavbarsDropDown
                                currentUser={currentUser}
                                setModal={setModal}
                              ></NavbarsDropDown>
                            </>
                          )}
                          {!currentUser && (
                            <>
                              <NavbarsDropDown></NavbarsDropDown>
                            </>
                          )}
                        </Nav>
                        <Nav
                          className="justify-content-center buttonDiv"
                          style={{
                            flexShrink: "1",
                            alignContent: "center",
                          }}
                        ></Nav>
                      </Container>
                    </div>
                  </Navbar.Collapse>
                </>
              )}
            </Container>
          </Navbar>
          {cartItems && showToast > 0 && (
            <div className="navToastHolder">
              <ToastContainer position="top-end" className="p-3">
                {toasts.map((toast) => (
                  <Toast
                    key={toast.id}
                    onClose={() =>
                      setToasts(toasts.filter((t) => t.id !== toast.id))
                    }
                    delay={3000}
                    autohide
                  >
                    <Toast.Header
                      closeButton={false}
                      className="navToastHeader"
                    >
                      <strong className="me-auto">Item Added to Cart</strong>
                    </Toast.Header>
                    <Toast.Body className="navToastBody">
                      You added{" "}
                      <span className="navToastCartItem">
                        {toast.item.brickProduct.name}
                      </span>{" "}
                      to cart
                    </Toast.Body>
                  </Toast>
                ))}
              </ToastContainer>
            </div>
          )}

          {modal && <Logout modal={modal} setModal={setModal} />}
        </>
      )}
    </>
  );
};

export default Navbars;
