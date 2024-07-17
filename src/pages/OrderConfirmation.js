import "../assets/css/pages/ConfirmationPage.css";

import { Alert, Container } from "react-bootstrap";
import Banner from "../layouts/Banner";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { resourceFolder, images, icons } from "../config/resources";

function OrderConfirmation() {
  const bannerImage = `${resourceFolder.images}${images.loginPageBannerImage}`;

  const [isNewUserState, setIsNewUserState] = useState(false);
  const { isNewUser } = useParams();

  useEffect(() => {
    const isNewUserBool = isNewUser === "true";
    setIsNewUserState(isNewUserBool);
  }, [isNewUser]);

  return (
    <>
      <Container className="px-0 pt-2">
        <Banner image={bannerImage} />
        <div className="py-5" />
        <Container className="confirmationDiv">
          <CheckCircleIcon className="checkIcon" aria-hidden="true" />
          <p className="confirmationLine1">THANK YOU!</p>
          <p className="confirmationLine2">Your order has been processed.</p>

          {isNewUserState && (
            <>
              <Alert variant="success" className="verificationLine2">
                <CheckCircleIcon
                  style={{
                    width: "2rem",
                    height: "2rem",
                    marginRight: "0.5rem",
                  }}
                />
                Please verify your email address.
              </Alert>
            </>
          )}

          <Link to="/">Back to Home</Link>
        </Container>
        <Container className="d-flex justify-content-center"></Container>
        <Container className="py-5 my-5"></Container>
      </Container>
    </>
  );
}

export default OrderConfirmation;
