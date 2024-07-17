import FormModal from "../components/FormModal";
import GeneralFormHeader from "../components/generalForm/GeneralFormHeader";
import GeneralFormBody from "../components/generalForm/GeneralFormBody";
import GeneralFormValues from "../components/generalForm/GeneralFormValues";
import { useState } from "react";

const Enquiry = ({ currentEnquiryType, modalShow, setModalShow }) => {
  const [currentEnquiry, setCurrentEnquiry] = useState(currentEnquiryType);
  const handleEnquiryChange = (enquiryType) => {
    setCurrentEnquiry(enquiryType);
  };

  //sets the enquiry to general (can also be brick or machine)
  const { initialValues, validationSchema, loading } =
    GeneralFormValues(currentEnquiryType);

  function closeModal() {
    setModalShow(false);
    setCurrentEnquiry(currentEnquiryType);
  }

  return (
    <FormModal
      show={modalShow}
      onHide={closeModal}
      modalstyleheader="machineModalStyleHeader"
      modalstylebody="machineModalStyleBody"
      HeaderComponent={GeneralFormHeader}
      BodyComponent={(props) => (
        <GeneralFormBody {...props} currentEnquiry={currentEnquiry} />
      )}
      headerProps={{ currentEnquiry, onEnquiryChange: handleEnquiryChange }}
      initialValues={initialValues}
      validationSchema={validationSchema}
      loading={loading}
    />
  );
};

export default Enquiry;
