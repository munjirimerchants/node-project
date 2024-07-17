import "../assets/css/pages/Profile.css";

import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import Banner from "../layouts/Banner";
import ProfileTabs from "../components/ProfileTabs";
import ResetPasswordModal from "../components/ResetPasswordModal";
import { resourceFolder, images } from "../config/resources";

function AccountSecurity() {
  const bannerImage = `${resourceFolder.images}${images.profilePageBannerImage}`;
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);

  const handleShowResetPasswordModal = () => {
    setShowResetPasswordModal(true);
  };

  const handleCloseResetPasswordModal = () => {
    setShowResetPasswordModal(false);
  };

  return (
    <div className="px-2 pt-2">
      <Banner image={bannerImage} height={"19rem"} />
      <div className="py-5" />
      <Container className="d-flex justify-content-center py-5">
        <p className="text-uppercase p-0 profileTitleHome1">Your</p>
        <span className="text-uppercase p-0 mx-2 profileTitleHome2">
          Account
        </span>
      </Container>
      <div className="profilePaddingDiv"></div>
      <Container>
        <ProfileTabs />
      </Container>
      <Container className="py-5">
        <div>
          <div className="profileText text-uppercase">Reset Password</div>
          <Button
            className="profileResetButton"
            onClick={handleShowResetPasswordModal}
          >
            Reset Password
          </Button>
          <div className="profileLine my-2" />
        </div>
      </Container>
      <Container>
        <ResetPasswordModal
          show={showResetPasswordModal}
          handleClose={handleCloseResetPasswordModal}
        />
      </Container>
    </div>
  );
}

export default AccountSecurity;
