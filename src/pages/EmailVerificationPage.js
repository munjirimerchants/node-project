import "../assets/css/pages/Register.css";
import "../assets/css/pages/EmailVerificationPage.css";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Container, Alert, Button } from "react-bootstrap";
import {
  CheckCircleIcon,
  ExclamationIcon,
  MailIcon,
} from "@heroicons/react/solid";

import Banner from "../layouts/Banner";
import { resourceFolder, images, icons } from "../config/resources";

//TODO: fix warning EmailVerificationPage.js:60 Warning: Cannot update a component (`BrowserRouter`) while rendering a different component (`EmailVerificationPage`)
//TODO: make email verification resend button disabled

const EmailVerificationPage = () => {
  const bannerPath = `${resourceFolder.images}${images.loginPageBannerImage}`;

  const { storedUser, setStoredUser, sendEmailVerification, setError } =
    useAuth();
  const [loading, setLoading] = useState(false);

  const messageContent = (
    <>
      {" "}
      <Alert variant="warning" className="verificationLine2">
        <ExclamationIcon
          style={{
            width: "2rem",
            height: "2rem",
            marginRight: "0.5rem",
            alignSelf: "center",
          }}
        />{" "}
        Please verify your email before continuing
      </Alert>
    </>
  );
  const [verificationMessage, setVerificationMessage] =
    useState(messageContent);
  const navigate = useNavigate();
  const [loginRedirect, setLoginRedirect] = useState(false);
  console.log("STORED USER", storedUser);
  const handleResendVerificationEmail = async () => {
    try {
      setLoading(true);
      await sendEmailVerification(storedUser);
      const messageContent = (
        <>
          <Alert variant="success" className="verificationLine2">
            <CheckCircleIcon
              style={{ width: "2rem", height: "2rem", marginRight: "0.5rem" }}
            />
            Verification email resent successfully.
          </Alert>
        </>
      );
      setVerificationMessage(messageContent);
    } catch (error) {
      console.error("Error resending verification email:", error.message);
      setError("Error resending verification email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Container className="px-0 pt-2">
        <Banner image={bannerPath} />
        <div className="py-5" />
        <Container className="verificationDiv">
          <MailIcon className="verificationCheckIcon" aria-hidden="true" />
          <p className="verificationLine1">
            A confirmation email has been sent.
          </p>
          {verificationMessage && <>{verificationMessage}</>}
          {storedUser && (
            <Button
              variant="primary"
              onClick={handleResendVerificationEmail}
              disabled={loading}
            >
              Resend Verification Email
            </Button>
          )}

          <Link to="/login" className="verificationGoLogin">
            Go to Login
          </Link>
        </Container>
        <Container className="d-flex justify-content-center"></Container>
        <Container className="py-5 my-5"></Container>
      </Container>
    </>
  );
};

export default EmailVerificationPage;
