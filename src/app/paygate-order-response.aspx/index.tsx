import React, { useContext, useEffect } from "react";
import { useState } from "react";
import ComponentsHeader from "@/components/Home/ComponentsHeader";
import { Button, Card, Col, Spinner, Stack } from "react-bootstrap";
import styles from "@/styles/Cart/PaygateOrderResponse.module.scss";
import AuthContext from "@/store/auth-context";
import CartContext from "@/store/ncart-context";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import Link from "next/link";
import { CartAPI } from "@/custom/utils/actions";
import { useTheme } from "@/store/ThemeContext";

const PaygateOrderResponses = () => {
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

  let PAY_STATUS = searchParams.get("payStatus");
  let ORDER_NO = searchParams.get("OrderNo");
  let STATUS_RES = searchParams.get("status");

  useEffect(() => {
    if (PAY_STATUS !== undefined) {
      setTitleStatus(PAY_STATUS);
    }
  }, []);

  const cancelOrder = async () => {
    let auth = JSON.parse(localStorage.getItem("user_auth") as string) || null;
    const deleteCart = await CartAPI.clearCart();
    /* const deleteCart = await fetch(`/api/authcart/clearCart`, {
     method: "POST",
     body: JSON.stringify({
       OrderNo:ORDER_NO
     }),
     headers: {
       Authorization:
         auth !== null && auth.token.length > 0
           ? "Bearer " + auth.token
           : "Bearer ",
       "Content-Type": "application/json",
       Accept: "application/json",
     },
   }).then((res) => res.json()); */

    if (deleteCart !== null && deleteCart !== undefined && deleteCart.result)
      router.push("/");
    else Swal.fire("Oops!", "Problem occured try again!", "error");
  };

  useEffect(() => {
    if (titleStatus !== "") {
      if (titleStatus === "Payment Received") {
        setResultDiv(
          <>
            <h1 className="pb-2">Thank you</h1>
            <Card
              className={`
                ${darkMode ? `bg-black` : ``}
                p-3 shadow mb-3
              `}
            >
              <p>
                Your payment has been successfully processed. Details of the
                transactions are as follows:
              </p>
              <section className="mb-3 d-inline-block">
                <div className={`${styles.Details} d-grid gap-sm-2`}>
                  <p className="m-0">Order Number:</p>
                  <p className="m-0 fw-3">{ORDER_NO}</p>
                  {cardStatus !== "Invalidate" ? (
                    <>
                      <p className="m-0">Status:</p>
                      <p className="m-0 fw-3">{titleStatus}</p>
                    </>
                  ) : null}
                </div>
              </section>
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
      if (titleStatus === "Canceled") {
        setResultDiv(
          <>
            <h1 className="pb-2">Payment Cancelled</h1>
            <Card
              className={`
                p-3 shadow mb-3
                ${darkMode ? `bg-black` : ``}
              `}
            >
              <h2>Sorry!</h2>
              <p>Your transaction was not successful, payment is canceled:</p>
              <section className="mb-3 d-inline-block">
                <div className={`${styles.Details} d-grid gap-sm-2`}>
                  <p className="m-0">Order Number:</p>
                  <p className="m-0 fw-3">{ORDER_NO}</p>
                  {cardStatus !== "Invalidate" ? (
                    <>
                      <p className="m-0">Status:</p>
                      <p className="m-0 fw-3">{titleStatus}</p>
                    </>
                  ) : null}
                </div>
              </section>
              <p>
                Thank you for your business -{" "}
                <Link href="/" className={`${darkMode ? `text-info` : ``}`}>
                  https://www.evetech.co.za
                </Link>
              </p>
              <div className="d-flex gap-2 flex-wrap">
                <Button size="sm" onClick={() => router.push("/cart/payment")}>
                  <small>Change Payment Method</small>
                </Button>

                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    cancelOrder();
                  }}
                >
                  <small>Cancel</small>
                </Button>

                <Button
                  variant="secondary"
                  className="d-inline"
                  size="sm"
                  onClick={() => router.push("/cart/checkout")}
                >
                  <small>Try Again</small>
                </Button>
              </div>
            </Card>
            <p>We look forward to your next purchase</p>
          </>
        );
      }
      if (titleStatus === "Payment Declined") {
        setResultDiv(
          <>
            <h1 className="pb-2">Payment Not Verified</h1>
            <Card
              className={`
                p-3 shadow mb-3
                ${darkMode ? `bg-black` : ``}
              `}
            >
              <h2>Sorry!</h2>
              <p>
                Unfortunately your payment was not verified. Details of the
                transactions are as follows:
              </p>
              <section className="mb-3 d-inline-block">
                <div className={`${styles.Details} d-grid gap-sm-2`}>
                  <p className="m-0">Order Number:</p>
                  <p className="m-0 fw-3">{ORDER_NO}</p>
                  {cardStatus !== "Invalidate" ? (
                    <>
                      <p className="m-0">Status:</p>
                      <p className="m-0 fw-3">{titleStatus}</p>
                    </>
                  ) : null}
                </div>
              </section>
              <p>
                <span className="text-danger">
                  Please Contact Our Sales Team at
                </span>{" "}
                <Link
                  href="mailto:sales@evetech.co.za"
                  target="_blank"
                  className={`${darkMode ? `text-info` : ``}`}
                >
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
      setInitResults(true);
    }
  }, [titleStatus]);

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

export default PaygateOrderResponses;
