import "../assets/css/components/Comment.css";
import { Row, Col } from "react-bootstrap";

const Comment = ({ role, comment, initials, dateOfComment }) => {
  let displayText = "";
  let profileColor = "";
  if (role === "User") {
    displayText = "Sent by you";
    profileColor = "userColor";
  } else if (role === "Admin") {
    displayText = "Munjiri Merchants";
    profileColor = "adminColor";
  } else {
    console.error("Not Admin or User Role");
  }

  return (
    <Row className="commentRow">
      <Col className="commentInitialsCol">
        <p className={`commentInitialsPicture ${profileColor}`}>{initials}</p>
      </Col>
      <Col>
        <p className="commentDisplayText">{displayText}</p>
        <p className="commentDate">{dateOfComment}</p>
        <p>{comment}</p>
      </Col>
    </Row>
  );
};
export default Comment;
