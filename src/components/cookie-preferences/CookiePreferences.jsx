/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './CookiePreferences.css';

function CookiePreferences({ closeCookiePreferences }) {
  const dataArray = [
    {
      button: 'General Description',
      description: 'This cookie tool will help you understand who is using cookies to collect information from your device, for what purposes they use the information, and how you can control the use of cookies for non-essential activities.\niTechArt supports the Self-Regulatory Principles for Online Behavioral Advertising of the Digital Advertising Alliance (DAA), the Digital Advertising Alliance of Canada (DAAC), and the European Interactive Digital Advertising Alliance (EDAA).\nIf you opt out of advertising cookies, you may still see iTechArt ads on other sites, but those ads will not be customized by us or our service providers and we will continue to customize your experience on our website via our use of cookies you have not refused.\nAlternatively, privacy settings in most browsers will allow you to prevent your browser from accepting new cookies, have it notify you when you receive a new cookie, or disable cookies altogether. If your browser is set to not accept any cookies, you will not receive Interest-Based Advertising, but your use of the iTechArt service may be impaired or unavailable. In addition, if you use our cookie tool to opt-out of certain cookies, your opt-out preferences will be remembered by placing a cookie on your device. It is therefore important that your browser is configured to accept cookies for your preferences to take effect. If you delete or clear your cookies, or if you change which web browser you are using, you will need to set your cookie preferences again.\nNote that from time to time we are over-inclusive in which cookies are listed in the opt-out tool. For example, we do not use Facebook, Twitter or Google cookies in all regions.\nFor more information on our use of cookies, please visit the Cookies and Internet Advertising section of our Privacy Statement.',
      closed: false,
    },
    {
      button: 'Essential Cookies',
      description: 'These cookies are strictly necessary to provide our website or online service. For example, we and our Service Providers may use these cookies to authenticate and identify visitors when they use our websites and applications so we can provide our service to them. They also help us to enforce our Terms of Use, prevent fraud and maintain the security of our services.\nLifespan: Most cookies are session cookies (which are only active until you close your browser) or are cookies which are only active for one day. Some cookies are active for a longer time, ranging from 3 to 12 months. The cookies used to prevent fraud and maintain the security or our services are active for a maximum period of 24 months.',
      closed: true,
    },
    {
      button: 'Performance and Functionality Cookies',
      description: 'These cookies help us to customize and enhance your online experience with iTechArt. For example, they help us to remember your preferences and prevent you from needing to re-enter information you previously provided (for example, during member sign up). We also use these cookies to collect information (such as popular pages, conversion rates, viewing patterns, click-through and other information) about our visitors\' use of the iTechArt service so that we can enhance and customize our website and service and conduct market research. Deletion of these types of cookies may result in limited functionality of our service.\nLifespan: Most cookies are only active for one day. Some cookies are active for a longer time, ranging from 3 to 12 months.',
      closed: true,
    },
    {
      button: 'Advertising Cookies',
      description: 'These cookies use information about your use of this and other websites and apps, your response to ads and emails, and to deliver ads that are more relevant to you and for analytics and optimization purposes. These types of ads are called "interest-based advertising" and will be shown to you outside the iTechArt domain. iTechArt uses contractual and technical measures designed to prevent advertising partners from accessing information regarding specific title selections you make, URLs you land on, or shows you have watched on our service. We do not share information about title selections or your shows you have watched on our service. The advertising cookies associated with our service belong to our advertising partners as listed under cookie details. Please choose your settings for advertising cookies below. If you want to opt out of the advertising cookies across all websites, go here.\nNote that from time to time we are over-inclusive in which cookies are listed in the opt-out tool. For example, we do not use Facebook, Twitter or Google cookies in all regions.',
      closed: true,
    },
  ];

  const [cookiesInfo, setCookiesInfo] = useState([]);

  useEffect(() => {
    setCookiesInfo(dataArray);
  }, []);

  const showDescriptions = () => {
    if (cookiesInfo.length === 0) {
      return (
        <p key={`default-${cookiesInfo.length}`}>
          {' '}
          {dataArray[0].description}
        </p>
      );
    }
    const currentCookie = cookiesInfo.filter((element) => element.closed === false);

    return (
      <div>
        <h3 className="right__title-text">{currentCookie[0].button}</h3>
        {currentCookie[0].description.split('\n').map((element) => (
          <p className="right__main-text" key={`description-${element}`}>
            {element}
          </p>
        ))}
      </div>
    );
  };

  const openCookiesInfo = (index, event) => {
    event.preventDefault();
    dataArray[0].closed = true;
    dataArray[index].closed = !dataArray[index].closed;

    setCookiesInfo(dataArray);
  };

  return (
    <div id="id-cookie-preferences" className="wrapper">
      <div className="cookie-modal">
        <div className="cookie-modal__header header">
          <div className="header__logo logo">
            <div className="logo__image">
              <img src="https://raw.githubusercontent.com/Shayrmochka/itechart-project/c7f9aea867a06641fb59270e75e61bbf61a2621f/public/images/itechart-black.svg" alt="logo" />
            </div>
          </div>
          <div className="header__modal-title modal-title">
            <span className="modal-title__text">Privacy Preference Center</span>
            <div className="header__button button">
              <button
                type="button"
                className="button__close"
                onClick={() => closeCookiePreferences()}
              >
                <svg
                  viewBox="0 0 20 20"
                  className="button__icon-close"
                  focusable="true"
                >
                  <path d="M10.5 9.3L1.8 0.5 0.5 1.8 9.3 10.5 0.5 19.3 1.8 20.5 10.5 11.8 19.3 20.5 20.5 19.3 11.8 10.5 20.5 1.8 19.3 0.5 10.5 9.3Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="cookie-modal__main-section main-section">
          <div className="main-section__left left">
            {cookiesInfo.map((element, index) => (
              <div key={element.description}>
                <button
                  type="button"
                  className={
                    element.closed
                      ? 'left__button'
                      : 'left__button left__button--active'
                  }
                  onClick={(event) => openCookiesInfo(index, event)}
                >
                  {element.button}
                </button>
              </div>
            ))}
          </div>
          <div className="main-section__right right">{showDescriptions()}</div>
        </div>
        <div className="cookie-modal__footer footer">
          <div className="footer__link link">
            <Link to="/" className="link__text">
              Powered by
              <span className="link__text--green"> OneTrust</span>
            </Link>
          </div>
          <div className="footer__button button">
            <button
              type="button"
              className="button__save"
              onClick={() => closeCookiePreferences()}
            >
              Save settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// CookiePreferences.propTypes = {
//   closeCookiePreferences: PropTypes.func.isRequired,
// };

export default CookiePreferences;
