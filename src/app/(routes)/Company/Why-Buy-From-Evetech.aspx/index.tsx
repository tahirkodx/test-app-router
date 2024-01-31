import React from "react";
import { ComponentsHeader } from "@/components/Home";
import { Col, Image, Stack } from "react-bootstrap";
import styles from "@/styles/WhyBuyFromUs.module.scss";
import { FaCheckCircle } from "react-icons/fa";
import { useState } from "react";
import { useContext } from "react";
import Head from "next/head";
import { useTheme } from "@/store/ThemeContext";

const Home = () => {
  const [showPageTopMsg, setShowPageTopMsg] = useState(true);
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  return (
    <>
      <Head>
        <title itemProp="name" lang="en">
          Why Buy From Us - Evetech South Africa
        </title>
        <link
          rel="canonical"
          href="https://www.evetech.co.za/Company/Terms-and-Conditions.aspx"
        />
        <meta
          name="description"
          content="Here are the top 10 reasons that we get from our customers when they tell us why they buy from us and advise their friends to do the same."
        />
        {/* <meta name="keywords" content={category.keyword} /> */}
      </Head>
      <ComponentsHeader showpagetopmsg={showPageTopMsg} />

      <main
        className={`
          ${darkMode ? `evetechDark bg-dark text-light` : ``}
          px-2 py-5
        `}
      >
        <Col xs={12} md={{ span: 10, offset: 1 }} className="p-3 p-md-0">
          <Stack gap={4}>
            <section className="d-grid gap-3 cols-sm-2">
              <div
                className={`${styles.TopSection__ImageParent} position-relative overflow-hidden rounded w-100`}
              >
                <Image
                  src="https://www.evetech.co.za/repository/ProductImages/customer-buy-computer-from-evetech.jpg"
                  alt="Why Buy From Evetech"
                  className={`${styles.TopSection__Image} position-absolute start-0 top-50 w-100 h-100 translate-middle-y`}
                />
                <div
                  className={`${styles.TopSection__ImageOverlay} position-absolute w-100 h-100 top-0 start-0`}
                ></div>
              </div>
              <div>
                <h1 className={`${styles.TopSection__Heading}`}>
                  Why buy From Evetech?
                </h1>
                <p>
                  Whether you know what kind of desktop computer or laptop you
                  want or are simply researching for the best deal on the latest
                  computer, Evetech is the only place to find the best deals to
                  buy Computer Parts and laptops online.
                </p>
                <p>
                  We stock the latest in technology and keep a huge range of
                  computer parts and laptops in stock.
                </p>
                <p className="m-0">
                  We&apos;re always looking for ways to give you the best price
                  on your new laptop or desktop computer, and make your buying
                  experience as easy as possible.
                </p>
              </div>
            </section>
            <section>
              <Stack gap={1}>
                <div className="text-center">
                  <h2 className="text-danger">
                    10 Reasons why you should buy from Evetech
                  </h2>
                  <p>
                    Here are the top 10 reasons that we get from our customers
                    when they tell us why they buy from us and advise their
                    friends to do the same.
                  </p>
                </div>
                <div className="d-grid cols-xxl-2 gap-4 align-items-center">
                  {/* 1 */}
                  <div className="span-full">
                    <div className="w-100 d-grid cols-md-2 gap-3 align-items-center">
                      <div className="overflow-hidden d-flex align-items-center d-sm-block">
                        <Image
                          src="https://www.evetech.co.za/repository/ProductImages/easy-and-helpful-website.png"
                          alt="easy and helpful website"
                          className={`${styles.Why__Image} w-100 mw-max`}
                        />
                      </div>
                      <div>
                        <Stack gap={3}>
                          <div className="d-flex gap-2 align-items-baseline">
                            <span className="bg-dark bg-gradient fw-3 border text-light rounded-circle fs-6 px-2 d-flex align-items-center">
                              1
                            </span>
                            <h3 className="text-primary">
                              Easy, helpful website
                            </h3>
                          </div>
                          <p className="m-0">
                            Advice on selection, detailed product
                            specifications, high resolution product images,
                            links to manufacturer’s websites; all the
                            information you need to decide what you really want
                            in your computer.
                          </p>

                          <div
                            className={`
                              p-2 border rounded w-100 shadow-lg
                              ${
                                darkMode
                                  ? `bg-black bg-opacity-50 border-secondary border-opacity-50`
                                  : `bg-light`
                              }
                            `}
                          >
                            <p className="m-0">
                              <FaCheckCircle className="text-success" /> You can
                              be confident that buying on our website will give
                              you honest and easy to access information to make
                              sure that you are buying the right components for
                              your PC.
                            </p>
                          </div>
                        </Stack>
                      </div>
                    </div>
                  </div>
                  {/* 2 */}
                  <div>
                    <div className="w-100 d-grid cols-md-2 gap-3 align-items-center">
                      <div className="overflow-hidden d-flex align-items-center justify-content-center rounded">
                        <Image
                          src="https://www.evetech.co.za/repository/ProductImages/affordable-price.jpg"
                          alt="Affordable Price"
                          className={`${styles.Why__Image} w-100 mw-max`}
                        />
                      </div>
                      <div>
                        <Stack gap={3}>
                          <div className="d-flex gap-2 align-items-baseline">
                            <span className="bg-dark bg-gradient fw-3 border text-light rounded-circle fs-6 px-2 d-flex align-items-center">
                              2
                            </span>
                            <h3 className="text-primary">Price</h3>
                          </div>
                          <p className="m-0">
                            Low overheads, low cost. We don’t run with a vast
                            administrative set up and an enormous advertising
                            budget; and we pass on the benefit to you in our
                            low, low prices.
                          </p>

                          <div
                            className={`
                            p-2 border rounded w-100 shadow-lg
                            ${
                              darkMode
                                ? `bg-black bg-opacity-50 border-secondary border-opacity-50`
                                : `bg-light`
                            }
                          `}
                          >
                            <p className="m-0">
                              <FaCheckCircle className="text-success" /> You get
                              an amazing product at an ultra low price!
                            </p>
                          </div>
                        </Stack>
                      </div>
                    </div>
                  </div>
                  {/* 3 */}
                  <div>
                    <div className="w-100 d-grid cols-md-2 gap-3 align-items-center">
                      <div className="overflow-hidden d-flex align-items-center justify-content-center rounded">
                        <Image
                          src="https://www.evetech.co.za/repository/ProductImages/original-cds-and%20-dvds-supplied.jpg"
                          alt="original cds and dvds supplied"
                          className={`${styles.Why__Image} w-100 mw-max`}
                        />
                      </div>
                      <div>
                        <Stack gap={3}>
                          <div className="d-flex gap-2 align-items-baseline">
                            <span className="bg-dark bg-gradient fw-3 border text-light rounded-circle fs-6 px-2 d-flex align-items-center">
                              3
                            </span>
                            <h3 className="text-primary">
                              Original CDs and DVDs supplied
                            </h3>
                          </div>
                          <p className="m-0">
                            Your system comes with all the original
                            manufacturer’s media so you can reconfigure and
                            rebuild your system to your own taste.
                          </p>

                          <div
                            className={`
                              p-2 border rounded w-100 shadow-lg
                              ${
                                darkMode
                                  ? `bg-black bg-opacity-50 border-secondary border-opacity-50`
                                  : `bg-light`
                              }
                            `}
                          >
                            <p className="m-0">
                              <FaCheckCircle className="text-success" /> You get
                              the ORIGINAL CD/DVD for each component and
                              Windows. So you can reinstall the PC from scratch
                              if needed.
                            </p>
                          </div>
                        </Stack>
                      </div>
                    </div>
                  </div>
                  {/* 4 */}
                  <div>
                    <div className="w-100 d-grid cols-md-2 gap-3 align-items-center">
                      <div className="overflow-hidden d-flex align-items-center justify-content-center rounded">
                        <Image
                          src="https://www.evetech.co.za/repository/ProductImages/quality-of-components.jpg"
                          alt="Quality of components"
                          className={`${styles.Why__Image} w-100 mw-max`}
                        />
                      </div>
                      <div>
                        <Stack gap={3}>
                          <div className="d-flex gap-2 align-items-baseline">
                            <span className="bg-dark bg-gradient fw-3 border text-light rounded-circle fs-6 px-2 d-flex align-items-center">
                              4
                            </span>
                            <h3 className="text-primary">
                              Quality of components
                            </h3>
                          </div>
                          <p className="m-0">
                            Range of options for top quality branded to good
                            quality intermediate. Quality is at the top of our
                            selection criteria list, rather than lowest price.
                          </p>

                          <div
                            className={`
                              p-2 border rounded w-100 shadow-lg
                              ${
                                darkMode
                                  ? `bg-black bg-opacity-50 border-secondary border-opacity-50`
                                  : `bg-light`
                              }
                            `}
                          >
                            <p className="m-0">
                              <FaCheckCircle className="text-success" /> You can
                              sleep easy knowing that every component is from a
                              major manufactuer and of high quality.
                            </p>
                          </div>
                        </Stack>
                      </div>
                    </div>
                  </div>
                  {/* 5 */}
                  <div>
                    <div className="w-100 d-grid cols-md-2 gap-3 align-items-center">
                      <div className="overflow-hidden d-flex align-items-center d-sm-block">
                        <Image
                          src="https://www.evetech.co.za/repository/ProductImages/latest-drivers-bios-updates-preinstalled.png"
                          alt="latest drivers bios updates preinstalled"
                          className={`${styles.Why__Image} w-100 mw-max`}
                        />
                      </div>
                      <div>
                        <Stack gap={3}>
                          <div className="d-flex gap-2 align-items-baseline">
                            <span className="bg-dark bg-gradient fw-3 border text-light rounded-circle fs-6 px-2 d-flex align-items-center">
                              5
                            </span>
                            <h3 className="text-primary">
                              Latest drivers and BIOS updates preinstalled
                            </h3>
                          </div>
                          <p className="m-0">
                            We add to the reliability and quality by
                            pre-installing all the latest support from the
                            product manufacturer before shipping it to you.
                          </p>
                        </Stack>
                      </div>
                    </div>
                  </div>
                  {/* 6 */}
                  <div className="span-full">
                    <div className="w-100 d-grid cols-md-2 gap-3 align-items-center">
                      <div className="overflow-hidden d-flex align-items-center d-sm-block">
                        <Image
                          src="https://www.evetech.co.za/repository/ProductImages/quality-computer-build-testing.png"
                          alt="quality computer build testing"
                          className={`${styles.Why__Image} w-100 mw-max`}
                        />
                      </div>
                      <div>
                        <Stack gap={3}>
                          <div className="d-flex gap-2 align-items-baseline">
                            <span className="bg-dark bg-gradient fw-3 border text-light rounded-circle fs-6 px-2 d-flex align-items-center">
                              6
                            </span>
                            <h3 className="text-primary">
                              Quality of built and testing
                            </h3>
                          </div>
                          <p className="m-0">
                            All our systems are hand built by small teams.
                            Function and burn in testing is done by another
                            small team. Small team working rather than big team
                            production line working is well accepted as giving
                            the best quality for individual build items.
                          </p>

                          <div
                            className={`
                              p-2 border rounded w-100 shadow-lg
                              ${
                                darkMode
                                  ? `bg-black bg-opacity-50 border-secondary border-opacity-50`
                                  : `bg-light`
                              }
                            `}
                          >
                            <p className="m-0">
                              <FaCheckCircle className="text-success" /> Your
                              computer will arrive fully working and ready to
                              go!
                            </p>
                          </div>
                        </Stack>
                      </div>
                    </div>
                  </div>
                  {/* 7 */}
                  <div className="span-full">
                    <div className="w-100 d-grid cols-md-2 gap-3 align-items-center">
                      <div className="overflow-hidden d-flex align-items-center justify-content-center rounded">
                        <Image
                          src="https://www.evetech.co.za/repository/ProductImages/range-of-options.jpg"
                          alt="Range of Options"
                          className={`${styles.Why__Image} w-100 mw-max`}
                        />
                      </div>
                      <div>
                        <Stack gap={3}>
                          <div className="d-flex gap-2 align-items-baseline">
                            <span className="bg-dark bg-gradient fw-3 border text-light rounded-circle fs-6 px-2 d-flex align-items-center">
                              7
                            </span>
                            <h3 className="text-primary">Range of Options</h3>
                          </div>
                          <p className="m-0">
                            We offer the widest range of options available in
                            the SA. We don’t just offer a limited range for you
                            to choose from. Our range is enormous, so you can
                            fine tune your specification to just what you want.
                          </p>

                          <div
                            className={`
                              p-2 border rounded w-100 shadow-lg
                              ${
                                darkMode
                                  ? `bg-black bg-opacity-50 border-secondary border-opacity-50`
                                  : `bg-light`
                              }
                            `}
                          >
                            <p className="m-0">
                              <FaCheckCircle className="text-success" /> You
                              only pay for the components you want and need so
                              you wont be paying for extras you will never use.
                            </p>
                          </div>
                        </Stack>
                      </div>
                    </div>
                  </div>
                  {/* 8 */}
                  <div>
                    <div className="w-100 d-grid cols-md-2 gap-3 align-items-center">
                      <div className="overflow-hidden d-flex align-items-center justify-content-center rounded">
                        <Image
                          src="https://www.evetech.co.za/repository/ProductImages/delivery-to-your-door.jpg"
                          alt="delivery to your door"
                          className={`${styles.Why__Image} w-100 mw-max`}
                        />
                      </div>
                      <div>
                        <Stack gap={3}>
                          <div className="d-flex gap-2 align-items-baseline">
                            <span className="bg-dark bg-gradient fw-3 border text-light rounded-circle fs-6 px-2 d-flex align-items-center">
                              8
                            </span>
                            <h3 className="text-primary">
                              Delivery to your door
                            </h3>
                          </div>
                          <p className="m-0">
                            No need to struggle to the shops and back.
                          </p>

                          <div
                            className={`
                              p-2 border rounded w-100 shadow-lg
                              ${
                                darkMode
                                  ? `bg-black bg-opacity-50 border-secondary border-opacity-50`
                                  : `bg-light`
                              }
                            `}
                          >
                            <p className="m-0">
                              <FaCheckCircle className="text-success" /> Safely
                              delivered direct to your door using the most
                              reliable company in the SA.
                            </p>
                          </div>
                        </Stack>
                      </div>
                    </div>
                  </div>
                  {/* 9 */}
                  <div>
                    <div className="w-100 d-grid cols-md-2 gap-3 align-items-center">
                      <div className="overflow-hidden d-flex align-items-center d-sm-block">
                        <Image
                          src="https://www.evetech.co.za/repository/ProductImages/safe-online-shopping.jpg"
                          alt="Safe Online Shopping"
                          className={`${styles.Why__Image} w-100 mw-max`}
                        />
                      </div>
                      <div>
                        <Stack gap={3}>
                          <div className="d-flex gap-2 align-items-baseline">
                            <span className="bg-dark bg-gradient fw-3 border text-light rounded-circle fs-6 px-2 d-flex align-items-center">
                              9
                            </span>
                            <h3 className="text-primary">Safe Shopping</h3>
                          </div>
                          <p className="m-0">
                            Buy online securely using our secure server.
                          </p>

                          <div
                            className={`
                              p-2 border rounded w-100 shadow-lg
                              ${
                                darkMode
                                  ? `bg-black bg-opacity-50 border-secondary border-opacity-50`
                                  : `bg-light`
                              }
                            `}
                          >
                            <p className="m-0">
                              <FaCheckCircle className="text-success" /> You
                              won&apos;t need to worry about using a credit or
                              debit card on our website. It&apos;s secure and
                              protected.
                            </p>
                          </div>
                        </Stack>
                      </div>
                    </div>
                  </div>
                  {/* 10 */}
                  <div className="span-full">
                    <div className="w-100 d-grid cols-md-2 gap-3 align-items-center">
                      <div className="overflow-hidden d-flex align-items-center justify-content-center rounded">
                        <Image
                          src="https://www.evetech.co.za/repository/ProductImages/after-sales-service-support.jpg"
                          alt="After sales service support"
                          className={`${styles.Why__Image} w-100 mw-max`}
                        />
                      </div>
                      <div>
                        <Stack gap={3}>
                          <div className="d-flex gap-2 align-items-baseline">
                            <span className="bg-dark bg-gradient fw-3 border text-light rounded-circle fs-6 px-2 d-flex align-items-center">
                              10
                            </span>
                            <h3 className="text-primary">
                              After sales service and support
                            </h3>
                          </div>
                          <p className="m-0">
                            Got a minor problem; no hanging on the phone to ask
                            the niggling technical question. Send an email to
                            our support team and they always reply within 24
                            hours. You can buy with confidence with our
                            excellent warranty arrangements. Our systems all
                            come with a basic 12 months warranty with 7 day free
                            collect and return, and some of the components have
                            up to 3 to 5 years of individual component warranty.{" "}
                          </p>

                          <div
                            className={`
                              p-2 border rounded w-100 shadow-lg
                              ${
                                darkMode
                                  ? `bg-black bg-opacity-50 border-secondary border-opacity-50`
                                  : `bg-light`
                              }
                            `}
                          >
                            <p className="m-0">
                              <FaCheckCircle className="text-success" /> Service
                              is the most important part and we are here to help
                              you can feel confident that in the unlikely event
                              you have a problem with your order that we will
                              sort it out for you.
                            </p>
                          </div>
                        </Stack>
                      </div>
                    </div>
                  </div>
                </div>
              </Stack>
            </section>
            <section className="text-center">
              <p className="m-0 fs-3 fw-2">
                Quite Simply. You can&apos;t go wrong with Evetech!
              </p>
            </section>
          </Stack>
        </Col>
      </main>
    </>
  );
};

export default Home;
