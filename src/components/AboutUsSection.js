import React from "react";

const AboutUsBricksSection = ({
  aboutusBricksText,
  aboutusTitle1,
  aboutusTitle2,
  children,
}) => {
  return (
    <div fluid className="aboutusHeight">
      <div className="aboutusSectionTitle">
        <span className="aboutusSectionTitleUnderline">{aboutusTitle1}</span>
        <span>{aboutusTitle2}</span>
      </div>
      <div className="aboutusSectionDesc py-2">{aboutusBricksText}</div>
      <div className="aboutusFigureCaptionLine2" />

      {children}
    </div>
  );
};

const AboutUsBricksSectionItem = ({
  title,
  description,
  showCaptionLine = true,
}) => (
  <>
    <div className="aboutusHeight2">
      <div className="aboutusHowText2">{title}</div>
      <div className="aboutusHowText3">{description}</div>
      {showCaptionLine && <div className="aboutusFigureCaptionLine2" />}
    </div>

    <hr className="aboutusSectionLine" />
  </>
);

export { AboutUsBricksSection, AboutUsBricksSectionItem };
