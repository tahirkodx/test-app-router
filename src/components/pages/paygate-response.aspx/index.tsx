import React, { useContext, useEffect } from "react";
import { useState } from "react";
import ComponentsHeader from "@/components/Home/ComponentsHeader";
import { Button, Card, Col, Spinner, Stack } from "react-bootstrap";
import styles from "@/styles/Cart/PaygateOrderResponse.module.scss";
import AuthContext from "@/store/auth-context";
import CartContext from "@/store/ncart-context";
import { Helmet } from "react-helmet";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CartAPI } from "@/custom/utils/actions";
import { useTheme } from "@/store/ThemeContext";

const PaygateOrderResponse = () => {
  const [cardStatus, setCardStatus] = useState<any>("InvalidAccess");
  const [showPageTopMsg, setShowPageTopMsg] = useState<any>(true);
  const authCtx: any = useContext(AuthContext);
  const cartCtx: any = useContext(CartContext);
  const searchParams: any = useSearchParams();
  const router = useRouter();
  const [resultDiv, setResultDiv] = useState<any>(null);
  const [titleStatus, setTitleStatus] = useState<any>("");
  const [initResults, setInitResults] = useState<any>(true);

  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  let PAY_REQUEST_ID = searchParams.get("PAY_REQUEST_ID");
  let TRANSACTION_STATUS = searchParams.get("TRANSACTION_STATUS");
  let CHECKSUM = searchParams.get("CHECKSUM");

  const validatePaygateResp = async () => {
    const payGateData = await CartAPI.validatePayGateResp({
      PAY_REQUEST_ID: PAY_REQUEST_ID,
      TRANSACTION_STATUS: TRANSACTION_STATUS,
      CHECKSUM: CHECKSUM,
    });
    /*  const payGateData = await fetch(`/api/authcart/validatePayGateResp`, {
      method: "POST",
      body: JSON.stringify({
        PAY_REQUEST_ID: PAY_REQUEST_ID,
        TRANSACTION_STATUS: TRANSACTION_STATUS,
        CHECKSUM: CHECKSUM,
      }),
      headers: {
        Authorization: "Bearer " + authCtx.token,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((res) => res.json()); */

    if (
      payGateData !== null &&
      payGateData !== undefined &&
      payGateData.result !== null &&
      payGateData.result !== undefined
    ) {
      const status = payGateData.result.payStatus;

      setTitleStatus(status);

      /* accroding status received in response set result div [Status :  (Payment Received, Canceled, Payment Declined) ] */
      if (status === "Payment Recieved") {
        setResultDiv(
          <>
            <h1 className="pb-2">Thank you</h1>
            <Card
              className={`
                ${darkMode ? `bg-black` : ``}
                p-3 shadow mb-3
              `}
            >
              <p>Your payment has been successfully processed.</p>
              <div className={`${styles.Details} d-grid gap-sm-2`}>
                <p className="m-0">Order Number:</p>
                <p className="m-0 fw-3">{payGateData.result.OrderNo}</p>
                <p className="m-0">Status:</p>
                <p className="m-0 fw-3">{status}</p>
              </div>
              <p>
                Thank you for your business -{" "}
                <Link href="/" className={`${darkMode ? `text-info` : ``}`}>
                  https://www.evetech.co.za
                </Link>
              </p>
            </Card>
            <p>We look forward to your next purchase</p>
          </>
        );
      }
      if (status === "Canceled") {
        setResultDiv(
          <>
            <h1 className="pb-2">Sorry</h1>
            <Card
              className={`
                ${darkMode ? `bg-black` : ``}
                p-3 shadow mb-3
              `}
            >
              <h2>Sorry!</h2>
              <p>Your transaction was not successful, payment is canceled</p>
              <div className={`${styles.Details} d-grid gap-sm-2`}>
                <p className="m-0">Order Number:</p>
                <p className="m-0 fw-3">{payGateData.result.OrderNo}</p>
                <p className="m-0">Status:</p>
                <p className="m-0 fw-3">{status}</p>
              </div>
              <p>
                Thank you for your business -{" "}
                <Link href="/" className={`${darkMode ? `text-info` : ``}`}>
                  https://www.evetech.co.za
                </Link>
              </p>
              <Button size="sm" onClick={() => router.push("/cart/payment")}>
                <small>Change Payment Method</small>
              </Button>

              <Button
                variant="danger"
                size="sm"
                onClick={() => router.push("/")}
              >
                <small>Cancel</small>
              </Button>

              <Button
                variant="secondary"
                className="d-inline"
                onClick={() => router.push("/cart/checkout")}
              >
                Try Again
              </Button>
            </Card>
            <p>We look forward to your next purchase</p>
          </>
        );
      }
      if (status === "Payment Declined") {
        setResultDiv(
          <>
            <h1 className="pb-2">Sorry</h1>
            <Card
              className={`
                ${darkMode ? `bg-black` : ``}
                p-3 shadow mb-3
              `}
            >
              <p>
                Unfortunately your payment was declined. Details of the
                declination are as follows:
              </p>
              <section className="mb-3 d-inline-block">
                <div className={`${styles.Details} d-grid gap-sm-2`}>
                  <p className="m-0">Order Number:</p>
                  <p className="m-0 fw-3">{payGateData.result.OrderNo}</p>
                  {cardStatus !== "Invalidate" ? (
                    <>
                      <p className="m-0">Status:</p>
                      <p className="m-0 fw-3">{status}</p>
                    </>
                  ) : null}
                </div>
              </section>
              <p>
                <span className="text-danger">
                  Please Contact Our Sales Team at
                </span>{" "}
                <Link href="mailto:sales@evetech.co.za" target="_blank">
                  {" "}
                  sales@evetech.co.za
                </Link>{" "}
                <span className="text-danger">Regarding More Information.</span>
              </p>
              <p>
                Thank you for your business -{" "}
                <Link href="/" className={`${darkMode ? `text-info` : ``}`}>
                  https://www.evetech.co.za
                </Link>
              </p>
            </Card>
            <p>We look forward to your next purchase</p>
          </>
        );
      }
    }

    setInitResults(true);
  };

  useEffect(() => {
    if (authCtx.isLoggedIn) {
      validatePaygateResp();
    } else {
      setInitResults(true);
    }
  }, [authCtx]);

  window.onpopstate = () => {
    router.push("/cart");
  };

  useEffect(() => {}, [resultDiv]);
  useEffect(() => {
    if (initResults && authCtx !== undefined && !authCtx.isLoggedIn) {
      authCtx.onShowLogin(true);
    }
  }, [initResults]);

  return (
    <>
      {authCtx !== undefined &&
      authCtx.isLoggedIn &&
      resultDiv !== undefined ? (
        <Helmet>
          <title itemProp="name" lang="en">
            Paygate - {titleStatus}
          </title>
        </Helmet>
      ) : (
        <Helmet>
          <title itemProp="name" lang="en">
            Please Login
          </title>
        </Helmet>
      )}
      <ComponentsHeader showpagetopmsg={showPageTopMsg} />
      <main
        className={`
          pt-3 px-3 pt-lg-5 pb-5
          ${darkMode ? `bg-dark text-light` : `bg-secondary bg-opacity-25`} 
        `}
      >
        <Col xs={12} md={{ span: 10, offset: 1 }} className="p-3 p-md-0">
          {!initResults && (
            <Card
              className={`
              p-5 text-shadow shadow
              ${darkMode ? `bg-black` : ``}
            `}
            >
              <div>
                <Spinner animation="border" variant="primary" />
              </div>
              <div>...Proccessing Payment...</div>
            </Card>
          )}

          {initResults &&
          authCtx !== undefined &&
          authCtx.isLoggedIn &&
          resultDiv !== undefined ? (
            <Card
              className={`
                p-3 shadow
                ${darkMode ? `bg-black bg-opacity-50` : ``}
              `}
            >
              {resultDiv}
            </Card>
          ) : null}
        </Col>
      </main>
    </>
  );
};

export default PaygateOrderResponse;
