import React from "react";
import { useContext } from "react";
import AuthContext from "@/store/auth-context";
import CartContext from "@/store/ncart-context";
import { useState } from "react";
import { useEffect } from "react";
import { Col, Spinner } from "react-bootstrap";
import { FaExclamationTriangle } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { CartAPI } from "@/custom/utils/actions";
import { useTheme } from "@/store/ThemeContext";

const OzowResponse = () => {
  const [ozowStatus, setOzowStatus] = useState<any>("Success");
  const [showPageTopMsg, setShowPageTopMsg] = useState<any>(true);
  const authCtx: any = useContext(AuthContext);
  const cartCtx: any = useContext(CartContext);
  const searchParams: any = useSearchParams();
  const router = useRouter();
  const [resultDiv, setResultDiv] = useState<any>(null);
  const [resultStat, setResultStat] = useState<any>({});
  const [titleStatus, setTitleStatus] = useState<any>("");
  const [respStatus, setRespStatus] = useState<any>(false);
  const [initResult, setInitResult] = useState<any>(false);
  const [isValid, setIsValid] = useState<any>(false);
  const queryParams: any = new URLSearchParams();
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
    let auth = JSON.parse(localStorage.getItem("user_auth") as string) || null;
    const ozowData = await CartAPI.validateOzowResp({
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

    /* const ozowData = await fetch(`/api/authcart/validateOzowResp`, {
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
        Authorization:
          auth !== null && auth.token.length > 0
            ? "Bearer " + auth.token
            : "Bearer ",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((res) => res.json());
 */
    if (
      ozowData !== undefined &&
      ozowData !== null &&
      ozowData.result !== undefined &&
      ozowData.result !== null
    ) {
      const status = ozowData.result.ozowStatus;
      const isValid = ozowData.result.status;
      cartCtx.fetchCart();
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

      setResultStat({
        ozowStatus: ozowData.result.ozowStatus,
        OrderNo: ozowData.result.OrderNo,
        TransId: ozowData.result.TransId,
        Amount: ozowData.result.Amount,
        status: ozowData.result.status,
        message: ozowData.result.message,
      });
    }
    setInitResult(true);
  };

  useEffect(() => {
    if (authCtx.isLoggedIn) {
      if (SiteCode !== undefined && Hash !== undefined) {
        setIsValid(true);
        validate();
      } else {
        setIsValid(false);
      }
    } else {
      setInitResult(true);
    }
  }, [authCtx]);

  useEffect(() => {
    if (initResult && authCtx !== undefined && !authCtx.isLoggedIn) {
      authCtx.onShowLogin(true);
    } else {
      if (initResult) {
        queryParams.append("ozowStatus", resultStat.ozowStatus);
        queryParams.append("OrderNo", resultStat.OrderNo);
        queryParams.append("TransId", resultStat.TransId);
        queryParams.append("Amount", resultStat.Amount);
        queryParams.append("status", resultStat.status);
        queryParams.append("message", resultStat.message);
        router.push(`/ozow-response.aspx?${queryParams.toString()}`);
      }
    }
  }, [initResult]);

  return (
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
      </Col>
      <Col xs={12} md={{ span: 8, offset: 2 }}>
        <div
          className={`${
            darkMode ? `bg-dark` : `bg-light`
          } rounded border shadow overflow-hidden`}
        >
          <div className="bg-danger text-center bg-gradient p-2 px-sm-3">
            <h1 className="text-light m-0 lh-1 fs-3 d-flex flex-wrap gap-2 justify-content-center">
              <span>
                <FaExclamationTriangle />
              </span>
              <span>Please do not close this window</span>
            </h1>
          </div>
          <p className="m-0 p-2 px-sm-3">
            <b className="fw-3">Note : </b> Your payment is being processing.
            <mark className="px-2 mx-1 rounded">
              Please do not close this window or click the Back button on your
              browser.
            </mark>{" "}
            If something went wrong then please contact our sales team at
            sales@evetech.co.za with the reference no [{TransactionReference}
            ].
          </p>
        </div>
      </Col>
    </main>
  );
};

export default OzowResponse;
