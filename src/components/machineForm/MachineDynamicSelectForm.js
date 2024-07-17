import "../../assets/css/components/MachineFormModal.css";

import axios from "axios";

import { Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { MACHINE_ENQUIRY_FIELDS as FIELD_NAMES } from "../../forms/FormFieldNames";
import { useFormikContext } from "formik";
import { connections, endpoints } from "../../config/connections";

const MachineDynamicSelectForm = ({ onSelectMachine, currentMachine }) => {
  const formik = useFormikContext();
  const [listOfMachines, setListOfMachines] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedMachineName, setSelectedMachineName] = useState(
    currentMachine?.name || ""
  );

  useEffect(() => {
    axios
      .get(`${connections.server}${endpoints.machineproducts}`)
      .then((response) => {
        const availableNow = response.data.filter(
          (machine) => !machine.comingSoon
        );
        setListOfMachines(availableNow);
      });
  }, []);

  useEffect(() => {
    if (listOfMachines.length > 0) {
      const machineNameArray = listOfMachines.map((machine) => machine.name);
      setOptions(machineNameArray);

      if (currentMachine) {
        setSelectedMachineName(currentMachine.name);
      } else {
        setSelectedMachineName(machineNameArray[0]);
      }
    }
  }, [listOfMachines, currentMachine]);

  const handleSelectChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedMachineName(selectedOption);

    const selectedMachine = listOfMachines.find(
      (machine) => machine.name === selectedOption
    );

    const machineID = selectedMachine ? selectedMachine.id : "";
    formik.setFieldValue(FIELD_NAMES.machineID, machineID);

    onSelectMachine(selectedMachine || null); // Handle the case where selectedMachine is null
  };

  if (listOfMachines.length === 0) {
    // Optionally, display a loading state or default option
    return <p>Loading...</p>;
  }
  return (
    <div className="machineDropDownDiv">
      <Form.Label className="machineDropDownTitle">Machine name</Form.Label>
      <Form.Select
        className="machineDropDown"
        id="selectedOption"
        name="selectedOption"
        onChange={handleSelectChange}
        value={selectedMachineName}
      >
        {options.map((option) => (
          <option key={option} value={option} label={option} />
        ))}
      </Form.Select>
    </div>
  );
};

export { MachineDynamicSelectForm };
