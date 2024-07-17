import { Row, Col, Stack } from "react-bootstrap";
import { convertDate } from "../utils/dateConversion";

const EnquiryModalBody = ({ enquiry, getTextSize }) => {
  return (
    <Row className="enquiryModalRow">
      <Col>
        <Row>
          <Col className="enquiryModalCol">
            <Stack gap="0">
              <p className="enquiryModalCategoryTag">Name</p>
              <p
                className={`enquiryModalCategory ${getTextSize(
                  `${enquiry?.firstName} ${enquiry?.surname}`
                )}`}
              >
                {enquiry?.firstName} {enquiry?.surname}
              </p>
            </Stack>
          </Col>
        </Row>
        <Row>
          <Col className="enquiryModalCol">
            <Stack gap="0">
              <p className="enquiryModalCategoryTag">Enquiry Date</p>
              <p className="enquiryModalCategory">
                {convertDate(enquiry?.enquiryDate)}
              </p>
            </Stack>
          </Col>
        </Row>
      </Col>
      <Col>
        <Row>
          <Col className="enquiryModalCol">
            <Stack gap="0">
              <p className="enquiryModalCategoryTag">Telephone</p>
              <p className="enquiryModalCategory">{enquiry?.telephone}</p>
            </Stack>
          </Col>
        </Row>
        <Row>
          <Col className="enquiryModalCol">
            <Stack gap="0">
              <p className="enquiryModalCategoryTag">Hire Location</p>
              <p
                className={`enquiryModalCategory ${getTextSize(
                  enquiry?.email
                )}`}
              >
                {enquiry?.location}
              </p>
            </Stack>
          </Col>
        </Row>
      </Col>
      <Col>
        <Row>
          <Col className="enquiryModalCol">
            <Stack gap="0">
              <p className="enquiryModalCategoryTag">Email</p>
              <p
                className={`enquiryModalCategory ${getTextSize(
                  enquiry?.email
                )}`}
              >
                {enquiry?.email}
              </p>
            </Stack>
          </Col>
        </Row>
        <Row></Row>
      </Col>
    </Row>
  );
};
export default EnquiryModalBody;
