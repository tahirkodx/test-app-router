import { ComponentsHeader } from "@/components/Home";
import { useTheme } from "@/store/ThemeContext";
import Head from "next/head";
import React, { useState } from "react";
import { Col, Image, Stack } from "react-bootstrap";

const Home = () => {
  const [showPageTopMsg, setShowPageTopMsg] = useState(true);
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  return (
    <>
      <Head>
        <title itemProp="name" lang="en">
          Secure online credit shopping at Evetech
        </title>

        {/* <meta
            name="description"
            content={`All candidates must: ${
              jobApplyData.requirements !== undefined &&
              parse(jobApplyData.requirements)
            }`}
          /> */}
        {/* <meta name="keywords" content={category.keyword} /> */}
      </Head>

      <ComponentsHeader showpagetopmsg={showPageTopMsg} />

      <main
        className={`
          ${darkMode ? `evetechDark bg-dark text-light` : ``}
          px-2 pt-3 pt-lg-5 pb-5
        `}
      >
        <Col
          xs={12}
          md={{ span: 10, offset: 1 }}
          xxl={{ span: 6, offset: 3 }}
          className="p-3 p-md-0"
        >
          <Stack gap={3}>
            <h1 className="text-danger">
              Secure Online Shopping with your Credit Card
            </h1>
            <section>
              <h2 className="text-secondary">
                Shopping on Evetech.co.za with your credit card is 100% Safe!
              </h2>
              <p>
                Shopping with us is secure and safe and is exactly the same as
                shopping with your credit card in a shopping centre, paying for
                meal when you eat out or doing your monthly groceries. Our
                credit card payment facility works the same way a speed-point
                does and all funds are transferred by the bank and not
                Evetech.co.za. All credit card transactions are encrypted using
                128 bit Secure Socket Layer (SSL) encryption. This means that
                all details you enter on Evetech.co.za are encrypted as a secret
                code before these details are sent between Evetech and the bank.
              </p>
              <p className="m-0">
                Our registration documents and domain are verified by Thawte,
                giving all parties concerned protection against identity theft
                in pursuit of confidential information. All security measures
                implemented on Evetech by MyGate comply with leading standards
                and MyGate is continually reviewing and adjusting our security
                profile to keep aligned with these standards. MyGate provides
                safe secure credit card transactions.
              </p>
            </section>
            <section className="text-center">
              <Stack gap={2}>
                <h2 className="text-secondary">Secure Credit Card Services</h2>
                <div className="d-grid cols-lg-2 gap-3">
                  <div
                    className={`${
                      darkMode
                        ? `bg-black bg-opacity-50 border-secondary border-opacity-50`
                        : ``
                    } p-3 border rounded shadow`}
                  >
                    <Image
                      src="https://www.evetech.co.za/repository/ProductImages/MasterCard-secureCode_logo.jpg"
                      alt="MasterCard SecureCode"
                      className="mb-3 p-2 bg-white rounded"
                    />
                    <p>
                      MasterCard® SecureCode™ is a new service from MasterCard
                      and your card issuer that provides added protection when
                      you buy online.
                    </p>
                    <p>
                      There is no need to get a new MasterCard or Maestro® card.
                      You choose your own personal MasterCard SecureCode and it
                      is never shared with any merchant. A private code means
                      added protection against unauthorized use of your credit
                      or debit card when you shop online.
                    </p>
                    <p className="m-0">
                      Every time you pay online with your MasterCard or Maestro
                      card, a box pops up from your card issuer asking you for
                      your personal SecureCode, just like the bank does at the
                      ATM. In seconds, your card issuer confirms it&apos;s you
                      and allows your purchase to be completed.
                    </p>
                  </div>

                  <div
                    className={`${
                      darkMode
                        ? `bg-black bg-opacity-50 border-secondary border-opacity-50`
                        : ``
                    } p-3 border rounded shadow`}
                  >
                    <Image
                      src="https://www.evetech.co.za/repository/ProductImages/Visa-service_desc_img_head.jpg"
                      alt="Verified by Visa"
                      className="rounded mb-3"
                    />
                    <p>
                      Verified by Visa is free to Visa cardholders and was
                      developed to help prevent unauthorized use of Visa cards
                      online.
                    </p>
                    <p>
                      Verified by Visa protects Visa cards with personal
                      passwords, giving cardholders reassurance that only they
                      can use their Visa cards online.
                    </p>
                    <p>
                      Once your card is activated, your card number will be
                      recognized whenever it&apos;s used at participating online
                      stores. A Verified by Visa window will automatically
                      appear and your Visa card issuer will ask for your
                      password. You&apos;ll enter your password to verify your
                      identity and complete your purchase.
                    </p>
                    <p className="m-0">
                      At stores that aren&apos;t participating in Verified by
                      Visa yet, your Visa card will continue to work as usual.
                    </p>
                  </div>
                </div>
              </Stack>
            </section>
          </Stack>
        </Col>
      </main>
    </>
  );
};

export default Home;
