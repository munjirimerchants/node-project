import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { connections, endpoints } from "../config/connections";
import axios from "axios";
import { useEffect, useState } from "react";

const WithPrivateRoute = ({ children }) => {
  const { userStatus } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkIsAdmin = async () => {
      if (userStatus) {
        const token = await userStatus.getIdToken();
        if (token) {
          const payloadHeader = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          };
          try {
            const response = await axios.get(
              `${connections.server}${endpoints.adminIsAdmin}`,
              payloadHeader
            );
            if (response.status === 200) {
              setIsAdmin(true);
              console.log("Admin verification success");
            } else {
              console.error("Admin verification failed:", response);
            }
          } catch (error) {
            console.error("Error verifying admin status:", error);
          } finally {
            setLoading(false);
          }
        } else {
          setLoading(false);
          console.log("No token found");
        }
      } else {
        setLoading(false);
        console.log("No user status found");
      }
    };

    checkIsAdmin();
  }, [userStatus]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userStatus || !isAdmin) {
    return <Navigate to="/admin/login" />;
  }

  return children;
};

export default WithPrivateRoute;
