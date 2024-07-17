import { Col, Row } from "react-bootstrap";

const UserProfileDisplay = ({ user }) => {
  // Accessing the user and delivery information
  const userDeliveryInformations = user?.UserDeliveryInformations || [];
  const firstDeliveryInfo =
    userDeliveryInformations.length > 0 ? userDeliveryInformations[0] : null;

  return (
    <div className="profileForm">
      <Row>
        <Col sm="12" md="12" lg="6">
          <label className="profileSmallText">First Name</label>
          <div className="profileDisplayText">
            <p>{user.firstName}</p>
          </div>
        </Col>
        <Col sm="12" md="12" lg="6">
          <label className="profileSmallText">Surname</label>
          <div className="profileDisplayText">
            <p>{user.surname}</p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm="12" md="12" lg="6">
          <label className="profileSmallText">Telephone</label>
          <div className="profileDisplayText">
            <p>{user.telephone}</p>
          </div>
        </Col>
        <Col sm="12" md="12" lg="6">
          <label className="profileSmallText">Email</label>
          <div className="profileDisplayText">
            <p>{user.email}</p>
          </div>
        </Col>
      </Row>
      <div className="profileDeliveryInfoText pt-5">Billing Address</div>
      <Row>
        <Col>
          <Row>
            <Col sm="12" md="12" lg="6">
              <label className="profileSmallText">Address Line 1</label>
              <div className="profileDisplayText">
                <p>{user.addressLine1}</p>
              </div>
            </Col>
            <Col sm="12" md="12" lg="6">
              <label className="profileSmallText">Address Line 2</label>
              <div className="profileDisplayText">
                <p>{user.addressLine2}</p>
              </div>
            </Col>
          </Row>

          <Row>
            <Col sm="12" md="12" lg="6">
              <label className="profileSmallText">Town/City</label>
              <div className="profileDisplayText">
                <p>{user.townCity}</p>
              </div>
            </Col>
            <Col sm="12" md="12" lg="6">
              <label className="profileSmallText">Postcode</label>
              <div className="profileDisplayText">
                <p>{user.postcode}</p>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <div className="profileDeliveryInfoText pt-5">Delivery Address</div>
      <Row>
        <Col>
          <Row>
            <Col sm="12" md="12" lg="6">
              <label className="profileSmallText">Address Line 1</label>
              <div className="profileDisplayText">
                <p>{firstDeliveryInfo?.addressLine1}</p>
              </div>
            </Col>
            <Col sm="12" md="12" lg="6">
              <label className="profileSmallText">Address Line 2</label>
              <div className="profileDisplayText">
                <p>{firstDeliveryInfo?.addressLine2}</p>
              </div>
            </Col>
          </Row>

          <Row>
            <Col sm="12" md="12" lg="6">
              <label className="profileSmallText">Town/City</label>
              <div className="profileDisplayText">
                <p>{firstDeliveryInfo?.townCity}</p>
              </div>
            </Col>
            <Col sm="12" md="12" lg="6">
              <label className="profileSmallText">Postcode</label>
              <div className="profileDisplayText">
                <p>{firstDeliveryInfo?.postcode}</p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm="12" md="12" lg="12">
              <label className="profileSmallText">Comments</label>
              <div className="profileDisplayText">
                <p>{firstDeliveryInfo?.comments}</p>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default UserProfileDisplay;
