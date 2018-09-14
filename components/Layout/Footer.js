import React from "react";
import Link from "next/link";
import { globalStyles } from "../../utility/GlobalStyles";
import { endpoints } from "../../config";
const {
  fontSizes,
  lineHeights,
  colors: { vomo_black, vomo_light_bg, vomo_dkblack }
} = globalStyles;

class Footer extends React.Component {
  render() {
    return (
      <div>
        <div className="container padding-top-60">
          <div className="row">
            <div className="col-12 col-md-4 text-xs-center text-md-left">
              <img
                src="https://d37xp64nemtox5.cloudfront.net/2018/02/vomo-logo-full.png"
                alt="VOMO Logo"
                title="VOMO Logo"
                className="logo__desktop"
              />
            </div>
            <div className="col-12 col-md-8">
              <div className="row">
                <div className="col-6 col-sm-3 margin-bottom-35">
                  <div className="row">
                    <div className="col-12">
                      <h4 className="col__title">VOMO</h4>
                    </div>
                    <div className="col-12 margin-top-15">
                      <a
                        id="footer_blog"
                        href={endpoints.BLOG_URL}
                        target="_blank"
                        className="row1__link"
                      >
                        Blog
                      </a>
                      <a
                        id="footer_contact"
                        href={endpoints.CONTACT_URL}
                        target="_blank"
                        className="row1__link"
                      >
                        Contact Us
                      </a>
                      <a
                        id="footer_tel"
                        href="tel:2149735056"
                        className="row1__link"
                      >
                        214-973-5056
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-sm-3 margin-bottom-35">
                  <div className="row">
                    <div className="col-12">
                      <h4 className="col__title">Using VOMO</h4>
                    </div>
                    <div className="col-12 margin-top-15">
                      <a
                        id="footer_login"
                        href={endpoints.ACCOUNTS_URL}
                        target="_blank"
                        className="row1__link"
                      >
                        Login
                      </a>
                      <a
                        id="footer_faq"
                        href={endpoints.FAQ_URL}
                        target="_blank"
                        className="row1__link"
                      >
                        FAQ
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-sm-3 margin-bottom-35">
                  <div className="row">
                    <div className="col-12">
                      <h4 className="col__title">Who it's for</h4>
                    </div>
                    <div className="col-12 margin-top-15">
                      <a
                        id="footer_church"
                        href={endpoints.CHURCH_URL}
                        target="_blank"
                        className="row1__link"
                      >
                        Church
                      </a>
                      <a
                        id="footer_businesses"
                        href={endpoints.BUSINESS_URL}
                        target="_blank"
                        className="row1__link"
                      >
                        Businesses
                      </a>
                      <a
                        id="footer_schools"
                        href={endpoints.SCHOOL_URL}
                        target="_blank"
                        className="row1__link"
                      >
                        Schools
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-sm-3 margin-bottom-35">
                  <div className="row">
                    <div className="col-12">
                      <h4 className="col__title">Download</h4>
                    </div>
                    <div className="col-12 margin-top-15">
                      <a href={endpoints.APPSTORE_URL} target="_blank">
                        <img
                          id="footer_appstore"
                          src="../../static/app-store.svg"
                          className="app_store_icon"
                        />
                      </a>
                      <a href={endpoints.PLAYSTORE_URL} target="_blank">
                        <img
                          id="footer_playstore"
                          src="../../static/play-store.png"
                          className="play_store_icon"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid bg-light padding-top-15 padding-bottom-15">
          <div className="row align-items-center">
            <div className="col-12 col-md-4 text-xs-center text-md-right col-md-push-4">
              <a href={endpoints.TWITTER_URL} target="_blank">
                <img
                  src="data:image/png;base64,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"
                  alt="Follow us on Twitter"
                  title="Follow us on Twitter"
                  className="social__icon"
                />
              </a>
              <a href={endpoints.INSTAGRAM_URL} target="_blank">
                <img
                  src="data:image/png;base64,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"
                  alt="Follow us on Instagram"
                  title="Follow us on Instagram"
                  className="social__icon"
                />
              </a>
              <a href={endpoints.FB_URL} target="_blank">
                <img
                  src="data:image/png;base64,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"
                  alt="Like us on Facebook"
                  title="Like us on Facebook"
                  className="social__icon"
                />
              </a>
              <a href={endpoints.LINKEDIN_URL} target="_blank">
                <img
                  src="data:image/png;base64,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"
                  alt="LinkedIn"
                  title="LinkedIn"
                  className="social__icon"
                />
              </a>
            </div>

            <div className="col-12 col-md-4 text-xs-center text-md-left col-md-pull-4">
              <a
                href={endpoints.TERMS_URL}
                target="_blank"
                className="row2__link bold"
              >
                Terms of Service
              </a>
              <a className="row2__link light">&amp;</a>
              <a
                href={endpoints.PRIVACY_URL}
                target="_blank"
                className="row2__link bold"
              >
                Privacy Policy
              </a>
            </div>

            <div className="col-12 col-md-4 text-center col-md-pull-4">
              <a className="row2__link light">
                &copy; Volunteer Mobilization, LLC. All rights reserved.
              </a>
            </div>
          </div>
        </div>
        <style jsx>{`
          .col__title {
            margin: 0;
            font-family: "Quicksand", sans-serif;
            font-size: ${fontSizes.m};
            line-height: ${lineHeights.m};
            font-weight: 900;
            color: ${vomo_dkblack};
          }

          .row1__link {
            color: ${vomo_dkblack};
            display: block;
            font: 400 ${fontSizes.s} / ${lineHeights.s} "Quicksand", sans-serif;
            margin-bottom: 4px;
            text-decoration: none;
          }

          .logo__desktop {
            margin-bottom: 50px;
            max-height: 63px;
            width: auto;
          }

          .app_store_icon {
            width: 125px;
            height: 50px;
          }

          .play_store_icon {
            width: 145px;
            height: 60px;
            margin-left: -10px;
            margin-top: -10px;
          }

          .row2__link {
            color: ${vomo_dkblack};
            display: inline-block;
            font: 700 ${fontSizes.xxs} / ${lineHeights.xxs} "Quicksand",
              sans-serif;
            margin-right: 5px;
            text-decoration: none;
          }
          .light {
            font-weight: 400;
          }
          .social__icon {
            width: 30px;
            height: 30px;
            margin-right: 10px;
          }
          @media (max-width: 768px) {
            .col-md-push-4 {
              padding: 15px 0 0;
            }
            .col__title {
              font-size: ${fontSizes.xs};
            }
            .row1__link {
              font-size: ${fontSizes.xxs};
            }
            .logo__desktop {
              margin-bottom: 25px;
            }
            .padding-top-60 {
              padding-top: 30px;
            }
            .margin-bottom-35 {
              margin-bottom: 15px;
            }
            .margin-top-15 {
              margin-top: 5px;
            }
          }
        `}</style>
      </div>
    );
  }
}

export default Footer;
