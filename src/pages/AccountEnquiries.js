import "../assets/css/pages/Profile.css";

import { useAuth } from "../context/AuthContext";
import Banner from "../layouts/Banner";
import { Col, Container, Row, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import ProfileTabs from "../components/ProfileTabs";
import EnquiriesTable from "../components/EnquiriesTable";
import Cookies from "js-cookie";
import axios from "axios";
import { connections, endpoints } from "../config/connections";
import Enquiry from "../components/Enquiry";
import { resourceFolder, images } from "../config/resources";

function AccountEnquiries() {
  const bannerImage = `${resourceFolder.images}${images.profilePageBannerImage}`;
  const CURRENT_ENQUIRY = "general";
  const { currentUser, setError } = useAuth();
  const [userEnquiries, setUserEnquiries] = useState({});
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [modalShow, setModalShow] = useState(false);

  function openModal() {
    setModalShow(true);
  }

  const updateUserEnquiry = (userEnquiryID, updatedEnquiryData) => {
    // Find the userEnquiry with the given ID
    const foundEnquiry = userEnquiries.find(
      (enquiry) => enquiry.userEnquiryID === userEnquiryID
    );

    if (foundEnquiry) {
      // Update the found userEnquiry
      const updatedEnquiries = userEnquiries.map((enquiry) => {
        if (enquiry.userEnquiryID === userEnquiryID) {
          return {
            ...enquiry,
            ...updatedEnquiryData,
          };
        }
        return enquiry;
      });

      setUserEnquiries(updatedEnquiries);
    } else {
      console.error(`User enquiry with ID ${userEnquiryID} not found.`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const userIDCookie = Cookies.get("userID");
      if (userIDCookie) {
        const user = currentUser;

        if (user) {
          try {
            const bearerToken = await user.getIdToken();

            // Check if the bearer token is available before making the request
            if (bearerToken) {
              const response = await axios.get(
                `${connections.server}${endpoints.enquiriesByUserID}/${userIDCookie}`,
                {
                  headers: {
                    Authorization: `Bearer ${bearerToken}`,
                  },
                }
              );

              setUserEnquiries(response.data);

              setLoadingDetails(false);
            } else {
              console.error("Error: Bearer token not available");
            }
          } catch (error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.error(
                `Server error: ${error.response.status} - ${JSON.stringify(
                  error.response.data
                )}`
              );

              if (error.response.status !== 404) {
                setError("Error fetching user details");
              } else {
                console.error("User details not found");
              }
            } else if (error.request) {
              // The request was made but no response was received
              console.error("No response received from the server");
            } else {
              // Something happened in setting up the request that triggered an Error
              console.error(`Error during request setup: ${error.message}`);
            }
          }
        } else {
          console.error("Error: User not authenticated");
          setError("User not authenticated");
        }
      } else {
        console.error("No userID cookie found");
      }
    };

    fetchData();
  }, [setError, currentUser]);

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
        <Enquiry
          currentEnquiryType={CURRENT_ENQUIRY}
          modalShow={modalShow}
          setModalShow={setModalShow}
        />
        <ProfileTabs />
      </Container>
      <Container className="py-5">
        <Row>
          <Col>
            <div>
              <div className="profileText text-uppercase">Enquiries</div>
            </div>
          </Col>
          <Col className="enquiryMakeEnquiryButtonCol">
            <Button onClick={openModal} className="enquiryMakeEnquiryButton">
              MAKE ENQUIRY
            </Button>
          </Col>
          <div className="profileLine my-2" />
        </Row>
      </Container>
      <Container>
        <EnquiriesTable
          data={userEnquiries}
          updateUserEnquiry={updateUserEnquiry}
          entriesPerPage={5}
          loadingDetails={loadingDetails}
        />
      </Container>
    </div>
  );
}

export default AccountEnquiries;
