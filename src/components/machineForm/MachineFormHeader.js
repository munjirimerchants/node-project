import "../../assets/css/components/MachineFormModal.css";

import { Row, Col, Container, Stack, Image } from "react-bootstrap";
import { useState, useEffect } from "react";
import { MachineDynamicSelectForm } from "./MachineDynamicSelectForm";
import { useFormikContext } from "formik";
import { MACHINE_ENQUIRY_FIELDS as FIELD_NAMES } from "../../forms/FormFieldNames";

const MachineFormHeader = ({ currentMachine }) => {
  const formik = useFormikContext();

  console.log("MACHINE: " + currentMachine.name);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const handleSelectMachine = (machine) => {
    setSelectedMachine(machine);
    // sets values in Formik context when a machine is selected
    formik.setValues({
      ...formik.values, // keep existing values
      [FIELD_NAMES.machineID]: machine.machineID,
    });
  };

  // set values in Formik context to currentMachine if selectedMachine is null
  useEffect(() => {
    if (!selectedMachine && currentMachine) {
      formik.setValues({
        ...formik.values, // keep existing values
        [FIELD_NAMES.machineID]: currentMachine.machineID,
      });
    }
  }, [currentMachine, selectedMachine]);

  return (
    <Container>
      <Row className="machineModalRow">
        <Col xs="12" lg="6">
          <p className="machineEnquireNowHeader">ENQUIRE NOW</p>
          <div className="machineDropDownDiv">
            <MachineDynamicSelectForm
              onSelectMachine={handleSelectMachine}
              currentMachine={currentMachine}
            />
            <Stack direction="horizontal" gap={2} className="availStackModal">
              <p className="availTextModal">Availability</p>
              <p className="greyBoxModal availNumberModal">
                {selectedMachine
                  ? selectedMachine.availability
                  : currentMachine && currentMachine.availability !== null
                  ? currentMachine.availability
                  : "N/A"}
              </p>
            </Stack>
          </div>
        </Col>
        <Col className="machineImageModal" xs="12" lg="6">
          <Image
            style={{
              width: "15rem",
              height: "15rem",
              objectFit: "contain",
            }}
            fluid
            src={
              selectedMachine ? selectedMachine.image : currentMachine?.image
            }
          ></Image>
        </Col>
      </Row>
    </Container>
  );
};

export default MachineFormHeader;
