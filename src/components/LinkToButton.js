import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function LinkToButton({ navLink }) {
  return (
    <>
      <Link to={navLink} className="text-decoration-none">
        <Button className="machineEnquireButton">Enquire Now</Button>
      </Link>
    </>
  );
}

export default LinkToButton;
