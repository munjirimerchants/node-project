import "../../assets/css/components/GeneralFormModal.css";

import { Row, Col, Container, Image, Form } from "react-bootstrap";
import { useFormikContext } from "formik";
import { resourceFolder, images } from "../../config/resources";

const GeneralFormHeader = ({ currentEnquiry, onEnquiryChange }) => {
  const formik = useFormikContext();

  const pictMachine = `${resourceFolder.images}${images.tractor}`;
  const pictBrick = `${resourceFolder.images}${images.brickImage1}`;
  const pictGeneral = `${resourceFolder.images}${images.pictGeneral}`;

  const handleChange = (enquiryType) => {
    formik.setFieldValue("enquiryType", enquiryType);
    onEnquiryChange(enquiryType);
  };

  return (
    <Container>
      <Row className="modalRow">
        <Col xs="12">
          <p className="generalEnquireNowHeader">ENQUIRE NOW</p>
        </Col>
        <Row className="generalFormRow">
          <Col xs="12" md="4" lg="2" className="generalFormCol">
            <Form.Check
              className="generalFormLabel"
              label="General Enquiry"
              type="radio"
              id="enquiryType-general"
              name="enquiryType"
              value="general"
              checked={formik.values.enquiryType === "general"}
              onChange={() => handleChange("general")}
            />
          </Col>
          <Col xs="12" md="4" lg="2" className="generalFormCol">
            <Form.Check
              className="generalFormLabel"
              label="Machine Enquiry"
              type="radio"
              id="enquiryType-machine"
              name="enquiryType"
              value="machine"
              checked={formik.values.enquiryType === "machine"}
              onChange={() => handleChange("machine")}
            />
          </Col>
          <Col xs="12" md="4" lg="2" className="generalFormCol">
            <Form.Check
              className="generalFormLabel"
              label="Brick Enquiry"
              type="radio"
              id="enquiryType-brick"
              name="enquiryType"
              value="brick"
              checked={formik.values.enquiryType === "brick"}
              onChange={() => handleChange("brick")}
            />
          </Col>

          <Col className="imageModal" xs="12" lg="6">
            <Image
              style={{
                width: "10rem",
                height: "10rem",
                objectFit: "contain",
              }}
              fluid
              src={
                currentEnquiry === "machine"
                  ? pictMachine
                  : currentEnquiry === "brick"
                  ? pictBrick
                  : pictGeneral
              }
            ></Image>
          </Col>
        </Row>
      </Row>
    </Container>
  );
};

export default GeneralFormHeader;
