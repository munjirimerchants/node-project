import "bootstrap/dist/css/bootstrap.css";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { Image } from "react-bootstrap";
import React, { useState, useEffect } from "react";
const MultiCarouselMachinery = (carouselData) => {
  let allImagesArr = [];

  let dog = (
    <div
      className={carouselData.imageStyle}
      style={{
        width: "95%",
        height: "100%",
        paddingInline: "2rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ color: "blue", marginTop: "2rem" }}>
        <p
          style={{
            color: "black",
            marginBottom: "1.2rem",
            textAlign: "center",
          }}
        ></p>
      </div>
    </div>
  );

  //dynamically fill divs inside allImagesArr, length is determines by the pic array
  for (let i = 0; i < carouselData.pics.length; i++) {
    allImagesArr.push(
      <div
        className={carouselData.imageStyle}
        style={{
          width: "95%",
          height: "100%",
          paddingInline: "2rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Image
            className="rounded"
            src={carouselData.pics[i]} //you can also use prop arrays!
            fluid
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              paddingTop: "2rem",
              maxHeight: "15rem",
            }}
          />
        </div>
        <div style={{ color: "blue", marginTop: "2rem" }}>
          <p
            style={{
              color: "black",
              marginBottom: "1.2rem",
              textAlign: "center",
            }}
          >
            {carouselData.titles[i]}
          </p>
        </div>
      </div>
    );
  }

  const calculateItems = (numImages, maxItems) => {
    if (numImages > 0) {
      return Math.min(maxItems, Math.max(1, numImages));
    } else {
      return 0;
    }
  };

  const numImages = carouselData.pics.length;
  const itemsToShow = calculateItems(numImages, 3); // Use 3 as the maximum number of items
  const [widthOfCarousel, setWidthOfCarousel] = useState("");
  const [autoPlay, setAutoPlay] = useState(carouselData.autoPlay);
  const [arrows, setArrows] = useState(carouselData.arrows);

  useEffect(() => {
    // Update widthOfCarousel after the component has mounted
    if (itemsToShow === 0) {
      setWidthOfCarousel("15rem");
      setAutoPlay(false);
      setArrows(false);
      console.log("no play");
    } else if (itemsToShow === 1) {
      setWidthOfCarousel("30rem");
      setAutoPlay(false);
      setArrows(false);
    } else if (itemsToShow === 2) {
      setWidthOfCarousel("55rem");
      setAutoPlay(true);
      setArrows(true);
    } else {
      setWidthOfCarousel("100rem");
      setAutoPlay(true);
      setArrows(true);
    }
    if (carouselData.arrows === false) {
      setArrows(false);
    }
  }, [itemsToShow]); // Only re-run the effect when itemsToShow changes

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: itemsToShow >= 3 ? 3 : 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 992 },
      items: itemsToShow >= 3 ? 3 : 1,
    },
    tablet: {
      breakpoint: { max: 992, min: 540 },
      items: itemsToShow >= 2 ? 2 : 1,
    },
    mobile: {
      breakpoint: { max: 540, min: 0 },
      items: 1,
    },
  };
  console.log(itemsToShow);

  return (
    <div className="p-3">
      <div
        style={{
          width: "auto",
          margin: "auto",
          maxWidth: widthOfCarousel,
        }}
      >
        <Carousel
          pauseOnHover={false}
          arrows={arrows}
          swipeable={false}
          draggable={false}
          showDots={false}
          responsive={responsive}
          infinite={true}
          autoPlay={autoPlay}
          autoPlaySpeed={carouselData.autoPlaySpeed}
          keyBoardControl={true}
          transitionDuration={500}
          containerClass="carousel-container"
          itemClass="carousel-item-padding-50-px"
        >
          {allImagesArr.length > 0 ? allImagesArr : dog}
        </Carousel>
      </div>
    </div>
  );
};

// Setting default value for props
MultiCarouselMachinery.defaultProps = {
  titles: [""],
  arrows: true,
  autoPlay: true,
  autoPlaySpeed: 3000,
};

export default MultiCarouselMachinery;
