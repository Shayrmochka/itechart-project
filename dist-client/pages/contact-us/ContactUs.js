"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_router_dom_1 = require("react-router-dom");
var Footer_1 = __importDefault(require("../../components/Footer"));
require("./ContactUs.css");
function ContactUs() {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: "container" },
            react_1.default.createElement("div", { className: "contact" },
                react_1.default.createElement("div", { className: "contact__info info" },
                    react_1.default.createElement(react_router_dom_1.Link, { to: "/home", className: "info__back-link" },
                        react_1.default.createElement("svg", { className: "info__back-link-svg", width: "24px", height: "24px", viewBox: "0 0 24 24", version: "1.1", xmlns: "http://www.w3.org/2000/svg" },
                            react_1.default.createElement("polygon", { points: "16.3515625 11.1015625 16.3515625 12.25 9.2421875 12.25 12.4960938 15.53125 11.6757812 16.3515625 7 11.6757812 11.6757812 7 12.4960938 7.8203125 9.2421875 11.1015625" })),
                        "Back to Help Center"),
                    react_1.default.createElement("h1", { className: "info__title" }, "Contact Customer Service"),
                    react_1.default.createElement("section", { className: "info__section section" },
                        react_1.default.createElement("h2", { className: "section__title" }, "Call us from the iTechArt app"),
                        react_1.default.createElement("p", { className: "section__text" }, "Contacting iTechArt is now easier than ever when you contact us from the iTechArt app on your Android or iOS phone or tablet! Calling through the app is free - all you need is an internet or cellular connection."),
                        react_1.default.createElement("p", { className: "section__text--bold" }, "Download the iTechArt app:"),
                        react_1.default.createElement("div", { className: "section__download-icons download-icons" },
                            react_1.default.createElement(react_router_dom_1.Link, { to: "/" },
                                react_1.default.createElement("img", { src: "/images/google-play.svg", className: "download-icon__google-play", alt: "download-in-google-play" })),
                            react_1.default.createElement(react_router_dom_1.Link, { to: "/", className: "contact-us__download-link--as" },
                                react_1.default.createElement("img", { src: "/images/app-store.svg", className: "download-icon__apple-store", alt: "download-in-app-store" }))),
                        react_1.default.createElement("div", { className: "section__learn-more learn-more" },
                            react_1.default.createElement("span", null, "Questions?"),
                            react_1.default.createElement(react_router_dom_1.Link, { to: "/", className: "learn-more__text--red" }, "Learn how to contact us from the iTechArt app!"))),
                    react_1.default.createElement("section", { className: "info__section section" },
                        react_1.default.createElement("h2", { className: "section__title" }, "Call us from any phone"),
                        react_1.default.createElement("p", { className: "section__text--bold" }, "Phone is currently unavailable."),
                        react_1.default.createElement("p", { className: "section__text" }, "Call us using the iTechArt app as we don't offer a phone number in your country"),
                        react_1.default.createElement("div", { className: "section__contact-button contact-button" },
                            react_1.default.createElement(react_router_dom_1.Link, { to: "/", className: "contact-button__button" }, "Call Us"))),
                    react_1.default.createElement("section", { className: "info__section section" },
                        react_1.default.createElement("h2", { className: "section__title" }, "Live chat"),
                        react_1.default.createElement("p", { className: "section__text" }, "You will need an internet or mobile phone connection."),
                        react_1.default.createElement("div", { className: "section__contact-button contact-button" },
                            react_1.default.createElement(react_router_dom_1.Link, { to: "/", className: "contact-button__button" }, "Start Live Chat"))),
                    react_1.default.createElement("h1", { className: "info__title" }, "Contact Customer Service"),
                    react_1.default.createElement("h2", { className: "section__title" }, "Looking for local contact information?"),
                    react_1.default.createElement("p", { className: "section__text" }, "You are currently visiting the ISS Global website. To find local contact information, please pick your country in the list below.")),
                react_1.default.createElement("div", { className: "questions-container" },
                    react_1.default.createElement("div", { className: "questions" },
                        react_1.default.createElement("p", { className: "questions__title" }, "Popular Questions"),
                        react_1.default.createElement("ul", { className: "questions__list" },
                            react_1.default.createElement("li", { className: "questions__item" },
                                react_1.default.createElement(react_router_dom_1.Link, { to: "/", className: "questions__link" }, "How do I reset my password?")),
                            react_1.default.createElement("li", { className: "questions__item" },
                                react_1.default.createElement(react_router_dom_1.Link, { to: "/", className: "questions__link" }, "How can I request a cleaning services?")),
                            react_1.default.createElement("li", { className: "questions__item" },
                                react_1.default.createElement(react_router_dom_1.Link, { to: "/", className: "questions__link" }, "How do I cancel my account?")),
                            react_1.default.createElement("li", { className: "questions__item" },
                                react_1.default.createElement(react_router_dom_1.Link, { to: "/", className: "questions__link" }, "Why isn't iTechArt Working?")),
                            react_1.default.createElement("li", { className: "questions__item" },
                                react_1.default.createElement(react_router_dom_1.Link, { to: "/", className: "questions__link" }, "What is iTechArt?"))),
                        react_1.default.createElement("p", { className: "questions__button-description" }, "Find a different answer"),
                        react_1.default.createElement("div", { className: "questions__search search" },
                            react_1.default.createElement("input", { className: "search__input", placeholder: "Search" }),
                            react_1.default.createElement("button", { className: "search__button", type: "submit" }, "Search")))))),
        react_1.default.createElement(Footer_1.default, null)));
}
exports.default = ContactUs;
