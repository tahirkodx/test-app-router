import { ComponentsHeader } from "@/components/Home";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import { Col, Stack } from "react-bootstrap";
import { FaCcMastercard, FaCcVisa } from "react-icons/fa";
import styles from "@/styles/PaymentOptions.module.scss";
import { useTheme } from "@/store/ThemeContext";

const Home = () => {
  const [showPageTopMsg, setShowPageTopMsg] = useState(true);
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  return (
    <>
      <Head>
        <title itemProp="name" lang="en">
          Payment Options Available On Evetech.co.za
        </title>
        <link
          rel="canonical"
          href="https://www.evetech.co.za/Payment-Options.aspx"
        />
        <meta
          name="description"
          content="Include EFT, Internet Banking, Bank Deposit, Bank Transfer. Buy Cheap Gaming PC"
        />
        {/* <meta name="keywords" content={category.keyword} /> */}
      </Head>
      <ComponentsHeader showpagetopmsg={showPageTopMsg} />

      <main
        className={`
          px-2 py-5
          ${darkMode ? `evetechDark bg-dark text-light` : ``}
        `}
      >
        <Col
          xs={12}
          md={{ span: 10, offset: 1 }}
          xxl={{ span: 6, offset: 3 }}
          className="p-3 p-md-0"
        >
          <Stack gap={3}>
            <h1 className="text-danger text-center">Payment Options</h1>
            <section className="border-bottom text-center">
              <h2 className="text-secondary">
                1. Ozow - Instant EFT (Preferred payment option)
              </h2>
              <p>
                Ozow is the fastest payment method here at evetech. No proof of
                payment required and no long waiting periods for payment to
                clear. Orders placed are confirmed and processed without delay,
                during business hours.
              </p>
            </section>
            <section className="border-bottom">
              <div className="text-center">
                <h2 className="text-secondary">
                  2. Electronic Funds Transfer (EFT) or Bank Deposit
                </h2>
                <p>
                  Once the deposit or transfer has been made please email the
                  payment confirmation to pay@evetech.co.za or fax payment
                  confirmation to 086 517 7724. Here are our banking details:
                </p>
              </div>
              <div className="d-grid gap-3 cols-lg-3 w-100 pb-4">
                <div
                  className={`${
                    darkMode
                      ? `bg-black bg-opacity-50 border-secondary border-opacity-50`
                      : ``
                  } bg-light border shadow-lg w-100 rounded overflow-hidden`}
                >
                  <div className={`${styles.FNB__Heading} text-light p-3`}>
                    <h3 className="m-0">FNB</h3>
                  </div>
                  <div className="p-3">
                    <p className="m-0">
                      <span className="fw-2">Account Name:</span> Evetech
                    </p>
                    <p className="m-0">
                      <span className="fw-2">Account No:</span> 62089323704
                    </p>
                    <p className="m-0">
                      <span className="fw-2">Account Type:</span> Cheque
                    </p>
                    <p className="m-0">
                      <span className="fw-2">Branch:</span> Centurion
                    </p>
                    <p className="m-0">
                      <span className="fw-2">Branch Code:</span> 250130
                    </p>
                  </div>
                </div>
                <div
                  className={`${
                    darkMode
                      ? `bg-black bg-opacity-50 border-secondary border-opacity-50`
                      : ``
                  } bg-light border shadow-lg w-100 rounded overflow-hidden`}
                >
                  <div
                    className={`${styles.StandardBank__Heading} text-light p-3`}
                  >
                    <h3 className="m-0">Standard Bank</h3>
                  </div>
                  <div className="p-3">
                    <p className="m-0">
                      <span className="fw-2">Account Name:</span> Evetech
                    </p>
                    <p className="m-0">
                      <span className="fw-2">Account No:</span> 032526717
                    </p>
                    <p className="m-0">
                      <span className="fw-2">Account Type:</span> Cheque
                    </p>
                    <p className="m-0">
                      <span className="fw-2">Branch:</span> Centurion
                    </p>
                    <p className="m-0">
                      <span className="fw-2">Branch Code:</span> 01-2645
                    </p>
                  </div>
                </div>
                <div
                  className={`${
                    darkMode
                      ? `bg-black bg-opacity-50 border-secondary border-opacity-50`
                      : ``
                  } bg-light border shadow-lg w-100 rounded overflow-hidden`}
                >
                  <div className={`${styles.Nedbank__Heading} text-light p-3`}>
                    <h3 className="m-0">Nedbank</h3>
                  </div>
                  <div className="p-3">
                    <p className="m-0">
                      <span className="fw-2">Account Name:</span> Evetech
                    </p>
                    <p className="m-0">
                      <span className="fw-2">Account No:</span> 1169691226
                    </p>
                    <p className="m-0">
                      <span className="fw-2">Account Type:</span> Business
                    </p>
                    <p className="m-0">
                      <span className="fw-2">Branch:</span> Centurion
                    </p>
                    <p className="m-0">
                      <span className="fw-2">Branch Code:</span> 11280500
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <section className="border-bottom text-center">
              <h2 className="text-secondary">3. Credit Card</h2>
              <p>
                Payment via Credit Card on Evetech.co.za is 100% safe! All
                credit card transactions are 128 bit Secure Socket Layers (SSL)
                encrypted. Evetech does not keep or have access to any credit
                card details.
              </p>
              <h3>We accept the following cards</h3>
              <div className="d-flex flex-wrap gap-3 mb-3 justify-content-center">
                <div
                  className={`${
                    darkMode
                      ? `bg-black bg-opacity-50 border-secondary border-opacity-50`
                      : ``
                  } rounded-pill border shadow p-3`}
                >
                  <FaCcVisa className="text-primary" /> VISA
                </div>
                <div
                  className={`${
                    darkMode
                      ? `bg-black bg-opacity-50 border-secondary border-opacity-50`
                      : ``
                  } rounded-pill border shadow p-3`}
                >
                  <FaCcMastercard className="text-primary" /> MasterCard
                </div>
              </div>
              <p>
                To find out more about our{" "}
                <Link
                  href="/Credit-Card-Security.aspx"
                  title="credit card security"
                >
                  credit card security
                </Link>
              </p>
            </section>
          </Stack>
        </Col>
      </main>
    </>
  );
};

export default Home;
