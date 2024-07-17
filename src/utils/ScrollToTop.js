import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Add a time delay of 500 milliseconds (adjust as needed)
    const timeoutId = setTimeout(() => {
      // Scroll to the top of the page on route change
      window.scrollTo(0, 0);
    }, 50); // Adjust the delay in milliseconds

    return () => {
      // Clear the timeout to avoid unnecessary scroll on fast navigations
      clearTimeout(timeoutId);
    };
  }, [pathname, navigate]);

  // Render nothing, this component doesn't have any UI
  return null;
}

export default ScrollToTop;
