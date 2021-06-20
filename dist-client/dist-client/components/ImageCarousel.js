"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_responsive_carousel_1 = require("react-responsive-carousel");
require("react-responsive-carousel/lib/styles/carousel.min.css");
function ImageCarousel() {
    var classes = {
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
    var images = [1, 2, 3, 4, 5];
    var slideText = {
        title: 'Places that put safety, health and hygiene first',
        description: "People everywhere need to know they are visiting and working in places\n    that are clean, safe and hygienic. It\u2019s not enough that it\u2019s spotless.\n    Every day, our custom cleaning services keep people healthy and safe,\n    nurture wellbeing and shape strong and reputable workplaces \u2013 offering\n    smart technology, best-in-class products and expertly trained people\n    to give you peace of mind.",
    };
    return (react_1.default.createElement("div", { className: classes.carouselContainer + " carouselWrapper" }, react_1.default.createElement(react_responsive_carousel_1.Carousel, { infiniteLoop: true, useKeyboardArrows: true, autoPlay: true, showThumbs: false, dynamicHeight: false, swipeable: true, emulateTouch: true, interval: 7000, transitionTime: 700, showStatus: false, showArrows: false }, images.map(function (image, i) {
        return (react_1.default.createElement("div", { className: classes.imageBlock, key: image }, react_1.default.createElement("img", { style: classes.image, src: "../images/" + (i + 1) + "-min.jpg", alt: "houses" }), react_1.default.createElement("div", { style: classes.textWrapper, className: "legend" }, react_1.default.createElement("p", { style: classes.title }, slideText.title), react_1.default.createElement("p", { style: classes.description }, slideText.description))));
    }))));
}
exports.default = ImageCarousel;
