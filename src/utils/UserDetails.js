import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { connections, endpoints } from "../config/connections";

function UserDetails() {
  const { currentUser } = useAuth();
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      const fetchData = async () => {
        try {
          const userIDCookie = Cookies.get("userID");
          if (userIDCookie) {
            const bearerToken = await currentUser?.getIdToken();
            if (bearerToken) {
              const response = await axios.get(
                `${connections.server}${endpoints.usersByUserID}/${userIDCookie}`,
                {
                  headers: {
                    Authorization: `Bearer ${bearerToken}`,
                  },
                }
              );
              setUserDetails(response.data);
            } else {
              console.error("Error: Bearer token not available");
            }
          } else {
            console.error("Error: No userID cookie found");
          }
        } catch (error) {
          console.error("Error fetching user details:", error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [currentUser]);

  return { loading, userDetails };
}

export default UserDetails;
