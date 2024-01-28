"use client";
import React from "react";
/* import LaptopHeader from "@/components/Home/LaptopHeader"; */
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Spinner,
  Stack,
} from "react-bootstrap";
import styles from "@/styles/Cart/Cart.module.scss";
import { FaArrowLeft, FaThumbsUp } from "react-icons/fa";
import Summary from "@/components/Cart/Summary";
import { useContext } from "react";
import CartContext from "@/store/ncart-context";
import AuthContext from "@/store/auth-context";
import { useState } from "react";
import { useEffect } from "react";
import ComponentsHeader from "@/components/Home/ComponentsHeader";
import CustomeSpinner from "@/components/CustomeSpinner";
import { useRouter } from "next/router";
import { CartAPI } from "@/custom/utils/actions";

const _ = require("lodash");
const Checkout = () => {
  const [showPageTopMsg, setShowPageTopMsg] = useState(true);
  const cartCtx:any = useContext(CartContext);
  const authCtx:any = useContext(AuthContext);
  const router = useRouter();
  const [initSet, setInitSet] = useState<any>(false);
  const [paymentData, setPaymentData] = useState<any>({});
  const [ozowValues, setOzowValues] = React.useState<any>({
    SiteCode: "",
    CountryCode: "",
    CurrencyCode: "",
    Amount: 0,
    TransactionReference: "",
    BankReference: "",
    CancelUrl: "",
    ErrorUrl: "",
    SuccessUrl: "",
    NotifyUrl: "",
    isTest: "",
    PayHash: "",
  });
  const [formData, setFormData] = useState(null);
  const [isValid,setIsValid] =useState(true);

  const currencyFormat = (num:any) => {
    try {
      return "R " + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    } catch (e) {
      return num;
    }
  };

  const getOzowPayments = (payInfos:any) => {
    return (
      <Form action="https://pay.ozow.com/" method="post">
        <input
          type="hidden"
          name="SiteCode"
          placeholder="SiteCode"
          value={payInfos.paySCode}
        />
        <input
          type="hidden"
          name="CountryCode"
          placeholder="CountryCode"
          value={payInfos.payCnode}
        />
        <input
          type="hidden"
          name="CurrencyCode"
          placeholder="CurrencyCode"
          value={payInfos.payCCode}
        />
        <input
          type="hidden"
          name="Amount"
          placeholder="Amount"
          value={payInfos.PayAmount}
        />
        <input
          type="hidden"
          name="TransactionReference"
          placeholder="TransactionReference"
          value={payInfos.payRef}
        />
        <input
          type="hidden"
          name="BankReference"
          placeholder="BankReference"
          value={payInfos.payRef}
        />
        <input
          type="hidden"
          name="CancelUrl"
          placeholder="CancelUrl"
          value={payInfos.payUrl}
        />
        <input
          type="hidden"
          name="ErrorUrl"
          placeholder="ErrorUrl"
          value={payInfos.payUrl}
        />
        <input
          type="hidden"
          name="SuccessUrl"
          placeholder="SuccessUrl"
          value={payInfos.payUrl}
        />
        <input
          type="hidden"
          name="NotifyUrl"
          placeholder="NotifyUrl"
          value={payInfos.notyUrl}
        />
        <input
          type="hidden"
          name="IsTest"
          placeholder="IsTest"
          value={payInfos.isTest}
        />
        <input
          type="hidden"
          name="HashCheck"
          placeholder="HashCheck"
          value={payInfos.PayHash}
        />

        <Button type="submit" variant="success" size="sm">
          <small>Secure & Fast Instant EFT Ozow Payment</small>
        </Button>
      </Form>
    );
  };

  const getCreditCardPayments = (payInfos:any) => {
    return (
      <Form
        action="https://secure.paygate.co.za/payweb3/process.trans"
        method="post"
      >
        <input
          type="hidden"
          name="PAY_REQUEST_ID"
          placeholder="PAY_REQUEST_ID"
          value={payInfos.PAY_REQUEST_ID}
        />
        <input
          type="hidden"
          name="CHECKSUM"
          placeholder="CHECKSUM"
          value={payInfos.CHECKSUM}
        />
        <Button type="submit" variant="success" size="sm">
          <small>Secure Credit Card Payment</small>
        </Button>
      </Form>
    );
  };

  useEffect(() => {
    if (!initSet) {
      if (cartCtx.items.length === 0) {
        router.push("/cart");
      } else if (_.isEmpty(cartCtx.shippingAddress)){
         router.push("/cart/delivery")
      } else if (cartCtx.paymentMode !==null && cartCtx.paymentMode.length === 0){ 
        router.push("/cart/payment");
      }else if(cartCtx.paymentMode === null ){
        router.push("/cart/payment");
      }else if(!cartCtx.isConfirmed ){
        router.push("/cart/confirmation");
      } else {
        /* generate payment post details according to payment method */
        /*   if (cartCtx.orderno === null || cartCtx.orderno === undefined) { */
        /* insert order details */
        if(cartCtx.isConfirmed ){
          const getPayData = async () => {
            let auth = JSON.parse(localStorage.getItem("user_auth") as string) || null;
            const payDataInfo = await CartAPI.setOrderDetails({
                cart: cartCtx,
              });
            /* const payDataInfo = await fetch(`/api/authcart/setOrderDetails`, {
              method: "POST",
              headers: {
                Authorization:
                  auth !== null && auth.token.length > 0
                    ? "Bearer " + auth.token
                    : "Bearer ",
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                cart: cartCtx,
              }),
            }).then((res) => res.json()); */
            if(payDataInfo !== undefined && payDataInfo !== null && payDataInfo.result !== undefined && payDataInfo.result !== null){
                let payData = payDataInfo.result;
                let payInfos = payData.payInfo;
                let result = payData.status;
    
                if(result === -1 || _.isEmpty(payInfos))
                {
                  cartCtx.setConfirmed(false);
                  setIsValid(false);
                }else{
                  setFormData((prevdata:any) => {
                    if (cartCtx.paymentMode === "Ozow")
                      prevdata = getOzowPayments(payInfos);
                    else if (cartCtx.paymentMode === "Credit Card")
                      prevdata = getCreditCardPayments(payInfos);
                    return prevdata;
                  });
      
                  if (cartCtx.paymentMode === "Eft") {
                    /* REDIRECT TO FINISH */
                    router.push(
                      "/finished.aspx?orderType=deliver&action=finished&on=" +
                        payInfos.PayReference +
                        "&payable=" +
                        payInfos.PayAmount
                    );
                  }
      
                  setPaymentData(payData.payInfo);
                }
            }
            
          };

          getPayData();
        }else{
          router.push("/cart/confirmation");
        }
        /* } else {
          const getPayData = async () => {
            let auth = JSON.parse(localStorage.getItem("user_auth") as string) || null;
            const payDataInfo = await fetch(`/api/authcart/getPaymentDetails`, {
              method: "POST",
              headers: {
                Authorization:
                  auth !== null && auth.token.length > 0
                    ? "Bearer " + auth.token
                    : "Bearer ",
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                cart: cartCtx,
              }),
            }).then((res) => res.json());

            let payData = payDataInfo.result;
            let payInfos = payData.payInfo;
            setFormData((prevdata) => {
              if (cartCtx.paymentMode === "Ozow")
                prevdata = getOzowPayments(payInfos);
              else if (cartCtx.paymentMode === "Credit Card")
                prevdata = getCreditCardPayments(payInfos);

              return prevdata;
            });
            setPaymentData(payData.payInfo);
          };

          getPayData();
        } */
      }
      setInitSet(true);
    }
  }, [cartCtx]);

  return (
    <>
      <ComponentsHeader showpagetopmsg={showPageTopMsg} />
      <div className="my-3 my-xxl-4">
        <Stack className="gap-2 gap-sm-3">
          <section className="px-2">
            <Col md={{ span: 10, offset: 1 }}>
              <main className={`${styles.Main} p-2 p-sm-3`}>
                {initSet && isValid && 
                  <div className="d-grid gap-2 gap-sm-3 cols-xxl-10">
                    {cartCtx.paymentMode === "Ozow" ||
                    cartCtx.paymentMode === "Credit Card" ? (
                      <Card className="p-2 p-sm-3 shadow order-xxl-1 span-xxl-8">
                        {/* If "OZOW" */}
                        {cartCtx.paymentMode === "Ozow" && (
                          <Stack gap={2}>
                            <section>
                              <h1 className="fs-2">
                                Fast & Secure Instant EFT OZOW Payment
                              </h1>
                              <p>
                                Clicking on &quot;Secure & Fast Instant EFT OZOW
                                Payment&quot; below will take you to a Instant EFT OZOW
                                Payment page,enabling you complete online
                                purchases. There is no 48-Hour payment delay, no
                                proof of payment is required.
                              </p>
                            </section>
                            <section>
                              <h2 className="fs-3">Benifits</h2>
                              <ListGroup
                                variant="flush"
                                style={{ maxWidth: "max-content" }}
                              >
                                <ListGroup.Item>
                                  Clears immediately; no two day payment delay.
                                </ListGroup.Item>
                                <ListGroup.Item>
                                  No proof of payment required
                                </ListGroup.Item>
                              </ListGroup>
                            </section>
                            <section className="d-flex flex-wrap gap-2">
                              {formData}
                              <Button
                                size="sm"
                                onClick={() =>
                                  router.push("/cart/payment")
                                }
                              >
                                <small>Change Payment Method</small>
                              </Button>
                            </section>
                          </Stack>
                        )}

                        {/* If "CreditCard" */}
                        {cartCtx.paymentMode === "Credit Card" && (
                          <section>
                            <h1 className="fs-2">
                              Secure Paygate Credit Card Payment
                            </h1>
                            <p>
                              Clicking on &quot;Secure Credit Card Payment&quot; below will
                              take you to a secure payment server. All credit card
                              details are 128 bit SSL encrypted. Evetech does not
                              have access to your credit card details. Once you
                              have completed you credit card payment you order
                              will be completed.
                            </p>
                            <div className="d-flex flex-wrap gap-2">
                              {formData}
                              <Button
                                size="sm"
                                onClick={() =>
                                  router.push("/cart/payment")
                                }
                              >
                                <small>Change Payment Method</small>
                              </Button>
                            </div>
                          </section>
                        )}
                      </Card>
                    ) : null}

                    {cartCtx.paymentMode === "Eft" && (
                      <Card className="p-2 p-sm-3 shadow order-xxl-1 span-full">
                        <section className="w-100 d-flex justify-content-center align-items-center gap-3 p-5 flex-wrap">
                          <div>
                            <Spinner animation="border" variant="primary" />
                          </div>
                          <div>...Confirming Order...</div>
                        </section>
                      </Card>
                      // <section>
                      //   <h1>Order Confirmed. Waiting for payment.</h1>
                      //   <h2 className="fs-2">Thank you.</h2>
                      //   <p>
                      //     Your order has been placed, and is currently set to
                      //     "Pending" status.
                      //   </p>
                      //   <p>
                      //     We will begin processing your order once a sales
                      //     representative approves your payment information.
                      //   </p>
                      //   <p>
                      //     <span>Order Number:</span>
                      //     <span className="fw-2">{cartCtx.orderno}</span>
                      //   </p>
                      //   <p>
                      //     <span>Amount Payable:</span>
                      //     <span className="fw-2">
                      //       {" "}
                      //       {currencyFormat(
                      //         parseFloat(cartCtx.totalIEFTAmount) +
                      //           (cartCtx.shippingCharge !== undefined
                      //             ? parseFloat(cartCtx.shippingCharge)
                      //             : 0) +
                      //           (cartCtx.shippingCharge2 !== undefined
                      //             ? parseFloat(cartCtx.shippingCharge2)
                      //             : 0) +
                      //           (cartCtx.shippingChargesAddOn !== undefined
                      //             ? parseFloat(cartCtx.shippingChargesAddOn)
                      //             : 0) +
                      //           parseFloat(cartCtx.insAmount)
                      //       )}
                      //     </span>
                      //   </p>
                      //   <p>
                      //     <span>Beneficiary Reference:</span>
                      //     <span className="fw-2">{cartCtx.orderno}</span>
                      //   </p>
                      //   <div className="d-flex flex-wrap gap-2 mb-2">
                      //     <h2 className="w-100 fs-5">
                      //       Here are our banking details:
                      //     </h2>
                      //     <div className="bg-secondary bg-opacity-25 rounded flex-grow-1">
                      //       <h3 className="fs-6 p-1 bg-light bg-opacity-50 p-2 p-sm-3 m-0">
                      //         <img
                      //           src="https://www.evetech.co.za/repository/ProductImages/FNB-First-National-Bank-Logo-2022-25w.png"
                      //           alt="FNB Bank"
                      //         />{" "}
                      //         FNB (International)
                      //       </h3>
                      //       <div className="p-2 p-sm-3">
                      //         <p className="m-0">
                      //           <span className="fw-2">Account Name: </span>
                      //           <span>Evetech</span>
                      //         </p>
                      //         <p className="m-0">
                      //           <span className="fw-2">Account No: </span>
                      //           <span>62089323704</span>
                      //         </p>
                      //         <p className="m-0">
                      //           <span className="fw-2">Account Type: </span>
                      //           <span>Cheque</span>
                      //         </p>
                      //         <p className="m-0">
                      //           <span className="fw-2">Branch: </span>
                      //           <span>Centurion</span>
                      //         </p>
                      //         <p className="m-0">
                      //           <span className="fw-2">Branch Code: </span>
                      //           <span>250130</span>
                      //         </p>
                      //         <p className="m-0">
                      //           <span className="fw-2">Swift Code: </span>
                      //           <span>FIRNZAJJ</span>
                      //         </p>
                      //       </div>
                      //     </div>
                      //     <div className="bg-secondary bg-opacity-25 rounded flex-grow-1">
                      //       <h3 className="fs-6 p-1 bg-light bg-opacity-50 p-2 p-sm-3 m-0">
                      //         <img
                      //           src="https://www.evetech.co.za/repository/ProductImages/Nedbank-logo-25w.png"
                      //           alt="Nedbank"
                      //         />{" "}
                      //         NEDBANK
                      //       </h3>
                      //       <div className="p-2 p-sm-3">
                      //         <p className="m-0">
                      //           <span className="fw-2">Account Name: </span>
                      //           <span>Evetech</span>
                      //         </p>
                      //         <p className="m-0">
                      //           <span className="fw-2">Account No: </span>
                      //           <span>1169691226</span>
                      //         </p>
                      //         <p className="m-0">
                      //           <span className="fw-2">Account Type: </span>
                      //           <span>Business</span>
                      //         </p>
                      //         <p className="m-0">
                      //           <span className="fw-2">Branch: </span>
                      //           <span>Centurion</span>
                      //         </p>
                      //         <p className="m-0">
                      //           <span className="fw-2">Branch Code: </span>
                      //           <span>198765</span>
                      //         </p>
                      //       </div>
                      //     </div>
                      //     <div className="bg-secondary bg-opacity-25 rounded flex-grow-1">
                      //       <h3 className="fs-6 p-1 bg-light bg-opacity-50 p-2 p-sm-3 m-0">
                      //         <img
                      //           src="https://www.evetech.co.za/repository/ProductImages/Standard-bank-logo-25h.png"
                      //           alt="Standard Bank"
                      //         />{" "}
                      //         STANDARD BANK
                      //       </h3>
                      //       <div className="p-2 p-sm-3">
                      //         <p className="m-0">
                      //           <span className="fw-2">Account Name: </span>
                      //           <span>Evetech</span>
                      //         </p>
                      //         <p className="m-0">
                      //           <span className="fw-2">Account No: </span>
                      //           <span>032526717</span>
                      //         </p>
                      //         <p className="m-0">
                      //           <span className="fw-2">Account Type: </span>
                      //           <span>Cheque</span>
                      //         </p>
                      //         <p className="m-0">
                      //           <span className="fw-2">Branch: </span>
                      //           <span>Centurion</span>
                      //         </p>
                      //         <p className="m-0">
                      //           <span className="fw-2">Branch Code: </span>
                      //           <span>01-2645</span>
                      //         </p>
                      //       </div>
                      //     </div>
                      //   </div>
                      //   <p>
                      //     To speed up the order process. Please Use Order No:{" "}
                      //     <span className="fw-2">{cartCtx.orderno}</span> as
                      //     referance and send Proof of Payment (POP) to
                      //     pay@evetech.co.za directly out of the bank
                      //   </p>
                      //   <p className="fw-2">Thank you for your business</p>
                      //   <p>We look forward to your next purchase</p>
                      // </section>
                    )}

                    {cartCtx.paymentMode !== "Eft" && (
                      <Card className="shadow order-xxl-1 span-xxl-2 overflow-hidden position-relative">
                        <div className="position-absolute start-0 bottom-0">
                          <Image
                            src="https://www.evetech.co.za/repository/ProductImages/Delivery-Icons-300x300px-v3.png"
                            alt=""
                          />
                        </div>
                        <Stack gap={3} className="position-relative">
                          <div className="bg-light bg-opacity-75">
                            <Summary isShowShipping={true} isCheckout={true} />
                            <div className="px-2 px-sm-3 d-grid gap-3 mt-3 py-3 bg-light bg-opacity-50">
                              <Stack gap={2} className="pb-2 lh-1">
                                <Stack
                                  direction="horizontal"
                                  className="gap-2 gap-sm-3 border-bottom pb-2 justify-content-between"
                                >
                                  <h2 className="text-uppercase text-secondary fs-6 mb-0">
                                    Shipping info
                                  </h2>
                                </Stack>
                                <Stack gap={1}>
                                  <h4 className="fs-6 m-0">
                                    {cartCtx.shippingAddress.personName}
                                  </h4>
                                  <small>
                                    <p className="m-0">
                                      {cartCtx.shippingAddress.Address1},<br />
                                      {cartCtx.shippingAddress.Address2 !==
                                        undefined &&
                                      cartCtx.shippingAddress.Address2 !== null
                                        ? cartCtx.shippingAddress.Address2 + ","
                                        : ""}
                                      <br />
                                      {cartCtx.shippingAddress.Suburb},{" "}
                                      {cartCtx.shippingAddress.City} -{" "}
                                      {cartCtx.shippingAddress.PostCode},{" "}
                                      {cartCtx.shippingAddress.State}
                                      <br />
                                      {cartCtx.shippingAddress.Country}
                                    </p>
                                  </small>
                                </Stack>
                              </Stack>
                            </div>
                          </div>
                        </Stack>
                      </Card>
                    )}
                  </div>
                }
                { initSet && !isValid &&
                  <div className="d-grid gap-2 gap-sm-3 cols-xxl-10">
                     <Card className="p-3 p-sm-3 shadow order-xxl-1 span-xxl-10">
                        <Stack gap={2}>
                            <section>
                              <h1 className="fs-2">
                                Oops, Problem occured.
                              </h1>
                              <p>
                                Try again by clearing your cart or contact our sales team on <b>sales@evetech.co.za</b>
                                <br></br>
                                <Button className="btn btn-primary mt-3" onClick={()=>{
                                    router.push("/cart");                        
                                }}> <FaArrowLeft /> Back To Cart</Button>
                              </p>
                            </section>
                        </Stack>
                     </Card>
                  </div>
                }

                {!initSet && <CustomeSpinner />}
              </main>
            </Col>
          </section>
        </Stack>
      </div>
    </>
  );
};

export default Checkout;
