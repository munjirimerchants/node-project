import "../assets/css/pages/ConfirmationPage.css";

import { Container } from "react-bootstrap";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import { resourceFolder, images } from "../config/resources";

import Banner from "../layouts/Banner";

function ConfirmationPage() {
  const banner = `${resourceFolder.images}${images.loginPageBannerImage}`;

  return (
    <>
      <Container className="px-0 pt-2">
        <Banner image={banner} />
        <div className="py-5" />
        <Container className="confirmationDiv">
          <CheckCircleIcon className="checkIcon" aria-hidden="true" />
          <p className="confirmationLine1">THANK YOU!</p>
          <p className="confirmationLine2">Your submission has been sent.</p>
          <Link to="/">Back to Home</Link>
        </Container>
        <Container className="d-flex justify-content-center"></Container>
        <Container className="py-5 my-5"></Container>
      </Container>
    </>
  );
}

export default ConfirmationPage;
