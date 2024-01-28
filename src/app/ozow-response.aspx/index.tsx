import React, { useEffect } from "react";
import ComponentsHeader from "@/components/Home/ComponentsHeader";
import { Button, Card, Col, Spinner } from "react-bootstrap";
import { useState } from "react";
import styles from "@/styles/Cart/OzowSuccess.module.scss";
import { useContext } from "react";
import AuthContext from "@/store/auth-context";
import CartContext from "@/store/ncart-context";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import { useSearchParams } from "next/navigation";
import { CartAPI } from "@/custom/utils/actions";
import { useRouter } from "next/router";
import Link from "next/link";
import { useTheme } from "@/store/ThemeContext";

const OzowSuccess = () => {
  const [showPageTopMsg, setShowPageTopMsg] = useState<any>(true);
  const authCtx: any = useContext(AuthContext);
  const cartCtx: any = useContext(CartContext);
  const searchParams: any = useSearchParams();
  const router = useRouter();
  const [resultDiv, setResultDiv] = useState<any>(null);
  const [titleStatus, setTitleStatus] = useState<any>("");
  const [respStatus, setRespStatus] = useState<any>(false);
  const [initResult, setInitResult] = useState<any>(false);

  let ozowStatus = searchParams.get("ozowStatus");
  let OrderNo = searchParams.get("OrderNo");
  let TransId = searchParams.get("TransId");
  let Amount = searchParams.get("Amount");
  let validStatus = searchParams.get("status");
  let message = searchParams.get("message");

  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  window.onpopstate = () => {
    router.push("/cart");
  };

  const cancelOrder = async () => {
    let auth = JSON.parse(localStorage.getItem("user_auth") as string) || null;
    const deleteCart = await CartAPI.clearCart();
    /* const deleteCart = await fetch(`/api/authcart/clearCart`, {
      method: "POST",
      body: JSON.stringify({
        OrderNo:OrderNo
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

    if (deleteCart !== undefined && deleteCart !== null && deleteCart.result)
      router.push("/");
    else Swal.fire("Oops!", "Problem occured try again!", "error");
  };

  useEffect(() => {
    if (authCtx.isLoggedIn && ozowStatus !== undefined) {
      const status = ozowStatus;
      let isValid = 0;
      try {
        isValid = parseInt(validStatus);
      } catch (ex) {}
      cartCtx.fetchCart();
      const DetailsTable = () => {
        return (
          <>
            <p className="m-0">Order Number:</p>
            <p className="m-0 fw-3">{OrderNo}</p>
            <p className="m-0">Transaction ID:</p>
            <p className="m-0 fw-3">{TransId}</p>
            <p className="m-0">Details:</p>
          </>
        );
      };

      setTitleStatus(status);
      setRespStatus(isValid === 1 ? true : false);

      if (isValid === 1) {
        if (status === "Cancelled") {
          setResultDiv(
            <div>
              <h1>Ozow Payment Cancelled</h1>
              <section className="mb-3 d-inline-block">
                <div className={`${styles.Details} d-grid gap-sm-2`}>
                  <DetailsTable />
                  <p className="m-0 fw-3"> Transaction was cancelled</p>
                </div>
              </section>
              <section className="d-flex gap-2 flex-wrap">
                <Button size="sm" onClick={() => router.push("/payment")}>
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
                  onClick={() => router.push("/checkout")}
                  size="sm"
                >
                  <small>Try Again</small>
                </Button>
              </section>
            </div>
          );
        }

        if (status === "Complete") {
          setResultDiv(
            <div>
              <h1>Thank you</h1>
              <p>Your payment has been successfully processed.</p>
              <section className="mb-3 d-inline-block">
                <div className={`${styles.Details} d-grid gap-sm-2`}>
                  <DetailsTable />
                  <p className="m-0 fw-3"> Transaction successfull</p>
                </div>
              </section>
              <p className="fw-3">
                Thank you for your business -{" "}
                <Link href="/" className={`${darkMode ? `text-info` : ``}`}>
                  www.evetech.co.za
                </Link>
              </p>
              <Button
                variant="secondary"
                className="d-inline"
                onClick={() => router.push("/")}
              >
                Continue Shopping
              </Button>
            </div>
          );
        }

        if (status === "Pending" || status === "PendingInvestigation") {
          setResultDiv(
            <div>
              <h1>Thank you</h1>
              <p>
                Your order has been placed, and is currently set to
                &apos;Pending&apos; status. We will begin processing your order
                once a sales representative approves your payment information.
              </p>
              <section className="mb-3 d-inline-block">
                <div className={`${styles.Details} d-grid gap-sm-2`}>
                  <DetailsTable />
                  <p className="m-0 fw-3"> Transaction pending</p>
                </div>
              </section>
              <p className="fw-3">
                Thank you for your business -{" "}
                <Link href="/" className={`${darkMode ? `text-info` : ``}`}>
                  www.evetech.co.za
                </Link>
              </p>
              <Button
                variant="secondary"
                className="d-inline"
                onClick={() => router.push("/")}
              >
                Continue Shopping
              </Button>
            </div>
          );
        }

        if (status === "Abandoned") {
          setResultDiv(
            <div>
              <h1>Oops something is wrong!</h1>
              <p>
                Your payment has been failed to processed. We appologize for the
                inconvenience, something prevented your order from being placed,
                please retry placing your order or try again later.
              </p>
              <p>
                If the problem persist contact{" "}
                <Link
                  href={`mailto:sales@evetech.co.za`}
                  title="Sales from Evetech"
                  className={`${darkMode ? `text-info` : ``}`}
                >
                  sales@evetech.co.za
                </Link>{" "}
                for further assistance
              </p>
              <section className="mb-3">
                <div className={`${styles.Details} d-grid gap-sm-2`}>
                  <DetailsTable />
                  <p className="m-0 fw-3"> Transaction Abandoned</p>
                </div>
              </section>

              <div className="d-flex flex-wrap gap-2">
                <Button size="sm" onClick={() => router.push("/payment")}>
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
                  onClick={() => router.push("/checkout")}
                >
                  <small>Try Again</small>
                </Button>
              </div>
            </div>
          );
        }

        if (status === "Error") {
          setResultDiv(
            <div>
              <h1>Oops something is wrong!</h1>
              <p>
                Your payment has been failed to processed. We appologize for the
                inconvenience, something prevented your order from being placed,
                please retry placing your order or try again later.
              </p>
              <p>
                If the problem persists please contact{" "}
                <Link
                  href="mailto:sales@evetech.co.za"
                  className={`${darkMode ? `text-info` : ``}`}
                >
                  sales@evetech.co.za
                </Link>{" "}
                for further assistance.
              </p>
              <section className="mb-3 d-inline-block">
                <div className={`${styles.Details} d-grid gap-sm-2`}>
                  <DetailsTable />
                  <p className="m-0 fw-3"> Transaction failed</p>
                </div>
              </section>
              <section>
                <Button
                  variant="secondary"
                  className="d-inline"
                  onClick={() => router.push("/")}
                  size="sm"
                >
                  <small>Try Again</small>
                </Button>
              </section>
            </div>
          );
        }
      } else {
        setResultDiv(
          <div>
            <h1>Oops something is wrong!</h1>
            <p>
              Invalid Response Received. We are not able to validate your
              payment. Please reach out to us on{" "}
              <Link
                href="mailto:sales@evetech.co.za"
                className={`${darkMode ? `text-info` : ``}`}
              >
                sales@evetech.co.za
              </Link>{" "}
              for further assistance.
            </p>
            <section className="mb-3 d-inline-block">
              <div className={`${styles.Details} d-grid gap-sm-2`}>
                <DetailsTable />
                <p className="m-0 fw-3"> Transaction failed</p>
              </div>
            </section>
            <section>
              <Button
                variant="secondary"
                className="d-inline"
                onClick={() => router.push("/")}
                size="sm"
              >
                <small>Try Again</small>
              </Button>
            </section>
          </div>
        );
      }

      setInitResult(true);
    } else {
      setInitResult(true);
    }
  }, [authCtx]);

  useEffect(() => {}, [resultDiv]);
  useEffect(() => {
    if (initResult && authCtx !== undefined && !authCtx.isLoggedIn) {
      authCtx.onShowLogin(true);
    }
  }, [initResult]);

  return (
    <>
      {authCtx !== undefined &&
      authCtx.isLoggedIn &&
      resultDiv !== undefined ? (
        <Helmet>
          <title itemProp="name" lang="en">
            Ozow - {titleStatus}
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
          {!initResult && (
            <div className="p-5 text-center">
              <div>
                <Spinner animation="border" variant="primary" />
              </div>
              <div>...Proccessing Payment...</div>
            </div>
          )}

          {initResult &&
          authCtx !== undefined &&
          authCtx.isLoggedIn &&
          resultDiv !== undefined ? (
            <Card className="p-3 shadow">{resultDiv}</Card>
          ) : null}
        </Col>
      </main>
    </>
  );
};

export default OzowSuccess;
