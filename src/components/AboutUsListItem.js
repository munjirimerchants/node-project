const AboutUsListItem = ({ text, showCaptionLine = true }) => (
  <div>
    <div className="aboutusCardText2 py-2 text-center">{text}</div>
    {showCaptionLine && (
      <div className="d-flex justify-content-center align-items-center">
        <div className="aboutusFigureCaptionLine" />
      </div>
    )}
  </div>
);

export default AboutUsListItem;
