import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';

import './ContactUs.css';

function ContactUs() {
  return (
    <>
      <div className="container">
        <div className="contact">
          <div className="contact__info info">
            <Link to="/home" className="info__back-link">
              <svg
                className="info__back-link-svg"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polygon points="16.3515625 11.1015625 16.3515625 12.25 9.2421875 12.25 12.4960938 15.53125 11.6757812 16.3515625 7 11.6757812 11.6757812 7 12.4960938 7.8203125 9.2421875 11.1015625" />
              </svg>
              Back to Help Center
            </Link>
            <h1 className="info__title">Contact Customer Service</h1>
            <section className="info__section section">
              <h2 className="section__title">Call us from the iTechArt app</h2>
              <p className="section__text">
                Contacting iTechArt is now easier than ever when you contact us
                from the iTechArt app on your Android or iOS phone or tablet!
                Calling through the app is free - all you need is an internet or
                cellular connection.
              </p>
              <p className="section__text--bold">Download the iTechArt app:</p>
              <div className="section__download-icons download-icons">
                <Link to="/">
                  <img
                    src="/images/google-play.svg"
                    className="download-icon__google-play"
                    alt="download-in-google-play"
                  />
                </Link>
                <Link to="/" className="contact-us__download-link--as">
                  <img
                    src="/images/app-store.svg"
                    className="download-icon__apple-store"
                    alt="download-in-app-store"
                  />
                </Link>
              </div>
              <div className="section__learn-more learn-more">
                <span>Questions?</span>
                <Link to="/" className="learn-more__text--red">
                  Learn how to contact us from the iTechArt app!
                </Link>
              </div>
            </section>
            <section className="info__section section">
              <h2 className="section__title">Call us from any phone</h2>
              <p className="section__text--bold">
                Phone is currently unavailable.
              </p>
              <p className="section__text">
                Call us using the iTechArt app as we don&apos;t offer a phone number
                in your country
              </p>
              <div className="section__contact-button contact-button">
                <Link to="/" className="contact-button__button">
                  Call Us
                </Link>
              </div>
            </section>
            <section className="info__section section">
              <h2 className="section__title">Live chat</h2>
              <p className="section__text">
                You will need an internet or mobile phone connection.
              </p>
              <div className="section__contact-button contact-button">
                <Link to="/" className="contact-button__button">
                  Start Live Chat
                </Link>
              </div>
            </section>
            <h1 className="info__title">Contact Customer Service</h1>
            <h2 className="section__title">
              Looking for local contact information?
            </h2>
            <p className="section__text">
              You are currently visiting the ISS Global website. To find local
              contact information, please pick your country in the list below.
            </p>
          </div>

          <div className="questions-container">
            <div className="questions">
              <p className="questions__title">Popular Questions</p>
              <ul className="questions__list">
                <li className="questions__item">
                  <Link to="/" className="questions__link">
                    How do I reset my password?
                  </Link>
                </li>
                <li className="questions__item">
                  <Link to="/" className="questions__link">
                    How can I request a cleaning services?
                  </Link>
                </li>
                <li className="questions__item">
                  <Link to="/" className="questions__link">
                    How do I cancel my account?
                  </Link>
                </li>
                <li className="questions__item">
                  <Link to="/" className="questions__link">
                    Why isn&apos;t iTechArt Working?
                  </Link>
                </li>
                <li className="questions__item">
                  <Link to="/" className="questions__link">
                    What is iTechArt?
                  </Link>
                </li>
              </ul>
              <p className="questions__button-description">
                Find a different answer
              </p>
              <div className="questions__search search">
                <input className="search__input" placeholder="Search" />
                <button className="search__button" type="submit">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ContactUs;
