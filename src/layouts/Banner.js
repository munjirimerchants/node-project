import "./Banner.css";

const Banner = ({ image, height }) => {
  const bannerStyle = { height: height || "35.3rem" };
  let myHeight = height || "50rem";

  return (
    <div className="banner-container" style={bannerStyle}>
      <div
        className="banner-image"
        style={{
          backgroundImage: `url(${image}`,
          height: `${myHeight}`,
        }}
      ></div>
    </div>
  );
};

export default Banner;
