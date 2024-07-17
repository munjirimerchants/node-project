import GeneralEnquiryForm from "../../forms/GeneralEnquiryForm";

const BodyContent = (currentEnquiry) => {
  return (
    <>
      <GeneralEnquiryForm currentEnquiry={currentEnquiry} />
    </>
  );
};

export default BodyContent;
