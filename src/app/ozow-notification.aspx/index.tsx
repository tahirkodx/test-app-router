import React, { useEffect } from "react";
import ComponentsHeader from "@/components/Home/ComponentsHeader";
import { Button, Card, Col } from "react-bootstrap";
import { useState } from "react";
import styles from "@/styles/Cart/OzowSuccess.module.scss";
import { useContext } from "react";
import AuthContext from "@/store/auth-context";
import CartContext from "@/store/ncart-context";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { CartAPI } from "@/custom/utils/actions";
import Link from "next/link";
import { useTheme } from "@/store/ThemeContext";

const OzowNotification = () => {
  const [ozowStatus, setOzowStatus] = useState<any>("Success");
  const [showPageTopMsg, setShowPageTopMsg] = useState<any>(true);
  const authCtx: any = useContext(AuthContext);
  const cartCtx: any = useContext(CartContext);
  const searchParams: any = useSearchParams();
  const navigate = useRouter();
  const [resultDiv, setResultDiv] = useState<any>(null);
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  let SiteCode = searchParams.get("SiteCode");
  let TransactionId = searchParams.get("TransactionId");
  let TransactionReference = searchParams.get("TransactionReference");
  let Amount = searchParams.get("Amount");
  let Status = searchParams.get("Status");
  let Optional1 = searchParams.get("Optional1");
  let Optional2 = searchParams.get("Optional2");
  let Optional3 = searchParams.get("Optional3");
  let Optional4 = searchParams.get("Optional4");
  let Optional5 = searchParams.get("Optional5");
  let CurrencyCode = searchParams.get("CurrencyCode");
  let IsTest = searchParams.get("IsTest");
  let StatusMessage = searchParams.get("StatusMessage");
  let Hash = searchParams.get("Hash");

  const validate = async () => {
    const ozowData = await CartAPI.validateOzowNotifyResp({
      SiteCode: SiteCode,
      TransactionId: TransactionId,
      TransactionReference: TransactionReference,
      Amount: Amount,
      Status: Status,
      Optional1: Optional1,
      Optional2: Optional2,
      Optional3: Optional3,
      Optional4: Optional4,
      Optional5: Optional5,
      CurrencyCode: CurrencyCode,
      IsTest: IsTest,
      StatusMessage: StatusMessage,
      Hash: Hash,
    });
    /* const ozowData = await fetch(`/api/cart/validateOzowNotifyResp`, {
      method: "POST",
      body: JSON.stringify({
        SiteCode: SiteCode,
        TransactionId: TransactionId,
        TransactionReference: TransactionReference,
        Amount: Amount,
        Status: Status,
        Optional1: Optional1,
        Optional2: Optional2,
        Optional3: Optional3,
        Optional4: Optional4,
        Optional5: Optional5,
        CurrencyCode: CurrencyCode,
        IsTest: IsTest,
        StatusMessage: StatusMessage,
        Hash: Hash,
      }),
      headers: {
        Authorization: "Bearer ",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((res) => res.json()); */

    if (
      ozowData !== null &&
      ozowData !== undefined &&
      ozowData.result !== null &&
      ozowData.result !== undefined
    ) {
      const status = ozowData.result.ozowStatus;

      const DetailsTable = () => {
        return (
          <>
            <p className="m-0">Order Number:</p>
            <p className="m-0 fw-3">{ozowData.result.OrderNo}</p>
            <p className="m-0">Transaction ID:</p>
            <p className="m-0 fw-3">{ozowData.result.TransId}</p>
            <p className="m-0">Details:</p>
          </>
        );
      };

      if (status === "Cancelled") {
        setResultDiv(
          <div>
            <h1>Ozow Payment Cancelled</h1>
            <p>
              If you would like to change your order details, you can do so by
              using the back button.
            </p>
            <section className="mb-3 d-inline-block">
              <div className={`${styles.Details} d-grid gap-sm-2`}>
                <DetailsTable />
                <p className="m-0 fw-3"> Transaction was cancelled</p>
              </div>
            </section>
            <section className="d-flex gap-2 flex-wrap">
              <Button variant="danger" className="d-inline">
                Back
              </Button>
              <Button variant="secondary" className="d-inline">
                Try Again
              </Button>
            </section>
          </div>
        );
      }

      if (status === "Success") {
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
              <Link className={`${darkMode ? `text-info` : ``}`} href="/">
                www.evetech.co.za
              </Link>
            </p>
            <Button variant="secondary" className="d-inline">
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
              &quote;Pending&quote; status. We will begin processing your order
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
              <Link className={`${darkMode ? `text-info` : ``}`} href="/">
                www.evetech.co.za
              </Link>
            </p>
            <Button variant="secondary" className="d-inline">
              Continue Shopping
            </Button>
          </div>
        );
      }

      if (status === "Failed") {
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
                className={`
                ${darkMode ? `text-info` : ``}
              `}
                href="mailto:sales@evetech.co.za"
              >
                sales@evetech.co.za
              </Link>
              {` `}
              for further assistance.
            </p>
            <section className="mb-3 d-inline-block">
              <div className={`${styles.Details} d-grid gap-sm-2`}>
                <DetailsTable />
                <p className="m-0 fw-3"> Transaction failed</p>
              </div>
            </section>
            <section>
              <Button variant="secondary" className="d-inline">
                Try Again
              </Button>
            </section>
          </div>
        );
      }
    }
  };

  useEffect(() => {
    if (Hash !== undefined && Hash !== null && Hash.trim().length > 0)
      validate();
  }, [Hash]);

  useEffect(() => {}, [resultDiv]);

  return (
    <>
      <ComponentsHeader showpagetopmsg={showPageTopMsg} />
      <main
        className={`
          pt-3 px-3 pt-lg-5 pb-5
          ${darkMode ? `bg-dark text-light` : `bg-secondary bg-opacity-25`}
        `}
      >
        <Col xs={12} md={{ span: 10, offset: 1 }} className="p-3 p-md-0">
          <Card
            className={`
              p-3 shadow ${darkMode ? `bg-black` : ``}
            `}
          >
            {resultDiv}
          </Card>
        </Col>
      </main>
    </>
  );
};

export default OzowNotification;
