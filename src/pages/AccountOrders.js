import "../assets/css/pages/Profile.css";

import { useAuth } from "../context/AuthContext";
import Banner from "../layouts/Banner";
import { Container } from "react-bootstrap";
import AccountOrderSummary from "../components/AccountOrderSummary";
import { useEffect, useState } from "react";
import ProfileTabs from "../components/ProfileTabs";
import axios from "axios";
import Cookies from "js-cookie";
import { connections, endpoints } from "../config/connections";
import { resourceFolder, images } from "../config/resources";

function AccountOrders() {
  const bannerImage = `${resourceFolder.images}${images.profilePageBannerImage}`;
  const { currentUser, setError } = useAuth();
  const [brickOrders, setBrickOrders] = useState({});
  const [loadingDetails, setLoadingDetails] = useState(true);

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
                `${connections.server}${endpoints.brickordersByUserID}/${userIDCookie}`,
                {
                  headers: {
                    Authorization: `Bearer ${bearerToken}`,
                  },
                }
              );
              const sortedData = response.data.sort((a, b) => {
                // Sort in descending order
                return new Date(b.orderDate) - new Date(a.orderDate);
              });

              setBrickOrders(sortedData);

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
        console.log("No userID cookie found");
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
        <ProfileTabs />
      </Container>
      <Container className="pt-5">
        <div className="py-2 profileText text-uppercase">
          Items You Have Ordered
          <span className="accountOrderAmountSpan">{brickOrders.length}</span>
        </div>
        <div className="profileLine my-2" />
      </Container>
      <Container>
        <AccountOrderSummary
          brickOrders={brickOrders}
          loadingDetails={loadingDetails}
        />
      </Container>
    </div>
  );
}

export default AccountOrders;
