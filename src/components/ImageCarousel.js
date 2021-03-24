import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function ImageCarousel() {
  //   const getConfigurableProps = () => ({
  //     showArrows: boolean('showArrows', true, tooglesGroupId),
  //     showStatus: boolean('showStatus', true, tooglesGroupId),
  //     showIndicators: boolean('showIndicators', true, tooglesGroupId),
  //     infiniteLoop: boolean('infiniteLoop', true, tooglesGroupId),
  //     showThumbs: boolean('showThumbs', true, tooglesGroupId),
  //     useKeyboardArrows: boolean('useKeyboardArrows', true, tooglesGroupId),
  //     autoPlay: boolean('autoPlay', true, tooglesGroupId),
  //     stopOnHover: boolean('stopOnHover', true, tooglesGroupId),
  //     swipeable: boolean('swipeable', true, tooglesGroupId),
  //     dynamicHeight: boolean('dynamicHeight', true, tooglesGroupId),
  //     emulateTouch: boolean('emulateTouch', true, tooglesGroupId),
  //     autoFocus: boolean('autoFocus', false, tooglesGroupId),
  //     thumbWidth: number('thumbWidth', 100, {}, valuesGroupId),
  //     selectedItem: number('selectedItem', 0, {}, valuesGroupId),
  //     interval: number('interval', 2000, {}, valuesGroupId),
  //     transitionTime: number('transitionTime', 500, {}, valuesGroupId),
  //     swipeScrollTolerance: number('swipeScrollTolerance', 5, {}, valuesGroupId),
  // });

  const classes = {
    imageLayout: {
      position: "absolute",
      // background: "#00000038",
      background: "linear-gradient(to left, #00000000, #00000099)",
      width: "100%",
      height: "500px",
      zIndex: "100",
    },

    image: {
      height: "500px",
      objectFit: "cover",
    },
    title: {
      // padding: "20px",
      zIndex: "1000",
      fontSize: "3em",
      color: "white",
      maxWidth: "600px",
    },
    description: {
      // padding: "20px",
      fontSize: "1.5em",
      color: "white",
      maxWidth: "800px",
    },
  };

  const images = [1, 2, 3, 4, 5];

  const slideText = {
    title: "Places that put safety, health and hygiene first",
    description: `People everywhere need to know they are visiting and working in places
    that are clean, safe and hygienic. It’s not enough that it’s spotless.
    Every day, our custom cleaning services keep people healthy and safe,
    nurture wellbeing and shape strong and reputable workplaces – offering
    smart technology, best-in-class products and expertly trained people
    to give you peace of mind.`,
  };

  return (
    <div style={{ position: "relative" }} className="carouselWrapper">
      {/* <div style={{ position: "absolute", zIndex: "2000" }}>
        <p
          style={{
            padding: "20px",
            fontSize: "3em",
            color: "white",
            maxWidth: "600px",
          }}
        >
          Places that put safety, health and hygiene first
        </p>
        <p
          style={{
            padding: "20px",
            fontSize: "1.5em",
            color: "white",
            maxWidth: "800px",
          }}
        >
          People everywhere need to know they are visiting and working in places
          that are clean, safe and hygienic. It’s not enough that it’s spotless.
          Every day, our custom cleaning services keep people healthy and safe,
          nurture wellbeing and shape strong and reputable workplaces – offering
          smart technology, best-in-class products and expertly trained people
          to give you peace of mind.
        </p>
      </div>*/}
      {/* <div style={classes.imageLayout}></div> */}
      <Carousel
        infiniteLoop
        useKeyboardArrows
        autoPlay
        showThumbs={false}
        dynamicHeight={false}
        swipeable={true}
        emulateTouch={true}
        interval={7000}
        transitionTime={700}
        showStatus={false}
        showArrows={false}
      >
        {images.map((image, i) => {
          return (
            <div className={classes.imageBlock} key={i}>
              <img
                style={classes.image}
                src={`../images/${i + 1}.jpg`}
                alt="houses"
              />
              <div
                className="legend"
                style={{
                  opacity: 1,
                  background: "linear-gradient(to left, #00000000, #00000099)",
                  borderRadius: "0px",
                }}
              >
                <p style={classes.title}>{slideText.title}</p>
                <p style={classes.description}>{slideText.description}</p>
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}
