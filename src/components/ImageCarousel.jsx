import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function ImageCarousel() {
  const classes = {
    imageLayout: {
      position: 'absolute',

      background: 'linear-gradient(to left, #00000000, #00000099)',
      width: '100%',
      height: '500px',
      zIndex: '100',
    },

    image: {
      height: '500px',
      objectFit: 'cover',
    },
    title: {
      zIndex: '1000',
      fontSize: '3em',
      color: 'white',
      maxWidth: '600px',
    },
    description: {
      fontSize: '1.5em',
      color: 'white',
      maxWidth: '800px',
    },
    carouselContainer: { position: 'relative' },
    textWrapper: {
      opacity: 1,
      background: 'linear-gradient(to left, #00000000, #00000099)',
      borderRadius: '0px',
    },
  };

  const images = [1, 2, 3, 4, 5];

  const slideText = {
    title: 'Places that put safety, health and hygiene first',
    description: `People everywhere need to know they are visiting and working in places
    that are clean, safe and hygienic. It’s not enough that it’s spotless.
    Every day, our custom cleaning services keep people healthy and safe,
    nurture wellbeing and shape strong and reputable workplaces – offering
    smart technology, best-in-class products and expertly trained people
    to give you peace of mind.`,
  };

  return (
    <div className={`${classes.carouselContainer} carouselWrapper`}>
      <Carousel
        infiniteLoop
        useKeyboardArrows
        autoPlay
        showThumbs={false}
        dynamicHeight={false}
        swipeable
        emulateTouch
        interval={7000}
        transitionTime={700}
        showStatus={false}
        showArrows={false}
      >
        {images.map((image, i) => (
          <div className={classes.imageBlock} key={image}>
            <img
              style={classes.image}
              src={`../images/${i + 1}-min.jpg`}
              alt="houses"
            />
            <div
              style={classes.textWrapper}
              className="legend"
            >
              <p style={classes.title}>{slideText.title}</p>
              <p style={classes.description}>{slideText.description}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
