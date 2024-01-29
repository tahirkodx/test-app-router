"use client";
import React from "react";
/* import LaptopHeader from "@/components/Home/LaptopHeader"; */
import Stack from "react-bootstrap/Stack";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import styles from "@/styles/Cart/Cart.module.scss";
import { FaMoneyBillWave } from "react-icons/fa";
import Summary from "./Summary";
import { useState } from "react";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useContext } from "react";
import AuthContext from "@/store/auth-context";
import CartContext from "@/store/ncart-context";
import ComponentsHeader from "@/components/Home/ComponentsHeader";
import { Helmet } from "react-helmet";
import { FetchReactInfo } from "@/custom/utils/Helper";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CmsAPI } from "@/custom/utils/actions";
import { useTheme } from "@/store/ThemeContext";
import darkFormStyles from "@/styles/DarkForm.module.scss";

const _ = require("lodash");
const Payment = () => {
  const [showPageTopMsg, setShowPageTopMsg] = useState<any>(true);
  const cartCtx: any = useContext(CartContext);
  const authCtx: any = useContext(AuthContext);
  const router = useRouter();
  const [orderNote, setOrderNote] = useState<any>("");
  const [initSet, setInitSet] = useState<any>(false);
  const [chkPayment, setChkPayment] = useState<any>();
  const [payOptions, setPayOptions] = useState<any[]>([]);
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  /*   useEffect(() => {
    cartCtx.setPaymentMode(chkPayment);
  }, [chkPayment]); */
  useEffect(() => {
    const fetchPayOptions = async () => {
      const data = await CmsAPI.getReactInfo({ id: 18 });
      if (data.result !== undefined) {
        setPayOptions(data.result);
      }

      /* FetchReactInfo(`/api/gutil/getReactInfo`, 18)
        .then((data:any) => {
          // Handle the data here
          if (data.result !== undefined) {
            setPayOptions(data.result);
          }
        })
        .catch((error:any) => {
          console.error("Failed to fetch data:", error);
        }); */

      /* const options = await fetch(`/api/gutil/getReactInfo`, {
        method: "POST",
        body: JSON.stringify({
          id: ,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }).then((res) => {
        return res.json();
      });

      if (options.result !== undefined) {
        setPayOptions(options.result);
      } */
    };

    fetchPayOptions();
  }, []);

  useEffect(() => {}, [payOptions]);

  useEffect(() => {
    if (!initSet && payOptions.length > 0 && cartCtx.sessId.trim().length > 0) {
      setOrderNote(cartCtx.ordernote);
      if (cartCtx.paymentMode !== "" && cartCtx.paymentMode !== null) {
        /*  console.log(
          _.map(payOptions, (payOpt) => {
            if (payOpt.PaymentMethod === cartCtx.paymentMode)
              payOpt.isChecked = true;
            else payOpt.isChecked = false;
            return payOpt;
          })
        ); */

        setPayOptions((pervOption) => {
          pervOption = _.map(pervOption, (payOpt: any) => {
            if (payOpt.PaymentMethod === cartCtx.paymentMode)
              payOpt.isChecked = true;
            else payOpt.isChecked = false;
            return payOpt;
          });
          return pervOption;
        });
      } else {
        let payMode = _.first(
          _.filter(payOptions, (payOpt: any) => {
            if (payOpt.isChecked) return payOpt;
          })
        );

        if (payMode.PaymentMethod !== undefined)
          cartCtx.setPaymentMode(payMode.PaymentMethod);
      }

      if (cartCtx.items.length === 0) router.push("/cart");

      setInitSet(true);
    }
  }, [cartCtx.sessId, payOptions]);

  /*   useEffect(()=>{
    if(chkPayment !=='' || chkPayment !== null)
    {
        if (cartCtx.paymentMode === "" || cartCtx.paymentMode === null || cartCtx.paymentMode === undefined)
        {
          cartCtx.setPaymentMode(chkPayment);
        }
        else{
           if(chkPayment !== cartCtx.paymentMode)
           {
            setChkPayment(cartCtx.paymentMode);
           }
        } 
    }

  },[chkPayment])
 */

  const setPaymentOption = (option: any) => {
    cartCtx.setPaymentMode(option);
    setChkPayment(option);
    setPayOptions((pervOption) => {
      pervOption = _.map(pervOption, (payOpt: any) => {
        if (payOpt.PaymentMethod === option) payOpt.isChecked = true;
        else payOpt.isChecked = false;
        return payOpt;
      });
      return pervOption;
    });
  };

  useEffect(() => {
    if (payOptions !== undefined && payOptions.length > 0) {
      setChkPayment(
        _.filter(payOptions, (option: any) => {
          if (option.isChecked) return option;
        }).PaymentMethod !== undefined
          ? _.first(
              _.filter(payOptions, (option: any) => {
                if (option.isChecked) return option;
              })
            ).PaymentMethod
          : ""
      );
    }
  }, [payOptions]);

  return (
    <>
      <Helmet>
        <title itemProp="name" lang="en">
          Payment
        </title>
      </Helmet>
      <ComponentsHeader showpagetopmsg={showPageTopMsg} />
      <div
        className={`
          py-3 py-xxl-4
          ${darkMode ? `${darkFormStyles.main} bg-dark` : ``}
        `}
      >
        <Stack className="gap-2 gap-sm-3">
          <section className="px-2">
            <Col md={{ span: 10, offset: 1 }}>
              <main
                className={`
                  ${styles.Main}
                  ${darkMode ? `bg-dark` : ``} 
                  p-2 p-sm-3
                `}
              >
                <div className="d-grid gap-2 gap-sm-3 cols-xxl-10">
                  <Stack
                    direction="horizontal"
                    className="gap-2 gap-sm-3 justify-content-between order-xxl-1 span-full"
                  >
                    <div
                      className={`
                        ${styles.Breadcrumbs} 
                        ${darkMode ? `text-light` : ``}
                        d-grid gap-1 text-uppercase w-100 cols-4 cols-sm-7 text-center
                      `}
                    >
                      <Link
                        href="/cart"
                        className="text-primary text-decoration-none"
                        replace={true}
                      >
                        <div>
                          <span>Cart</span>
                        </div>
                      </Link>
                      <div>{" > "}</div>
                      <Link
                        href="/cart/delivery"
                        className="text-primary text-decoration-none"
                        replace={true}
                      >
                        <div>
                          <span>Delivery</span>
                        </div>
                      </Link>
                      <div>{" > "}</div>
                      <div className="fw-2 d-flex align-items-center justify-content-center gap-1">
                        <FaMoneyBillWave />
                        <span>Payment</span>
                      </div>
                      <div>{" > "}</div>
                      <div className="text-secondary">
                        <span>Confirmation</span>
                      </div>
                    </div>
                  </Stack>

                  <Card
                    className={`
                      ${darkMode ? `bg-black bg-opacity-50 text-light` : ``}
                      p-2 p-sm-3 shadow order-xxl-1 span-xxl-8
                    `}
                  >
                    <Form>
                      <Stack gap={4} className="pb-2">
                        <Stack
                          direction="horizontal"
                          className={`
                            gap-2 gap-sm-3 border-bottom pb-2 justify-content-between
                            ${
                              darkMode
                                ? `border-secondary border-opacity-50`
                                : ``
                            }
                          `}
                        >
                          <h2 className="text-uppercase text-secondary fs-6 mb-0">
                            Payment Options
                          </h2>
                        </Stack>

                        <Stack gap={2}>
                          <div
                            className={`${styles.PayCards} d-grid gap-2 gap-sm-3 cols-sm-2`}
                          >
                            {payOptions.map((Payment, index) => {
                              return (
                                <Card
                                  key={index}
                                  className={`
                                    ${
                                      Payment.spanFull === "true"
                                        ? styles.OzowCard + " span-full"
                                        : null
                                    } 
                                    ${styles.HoverGrow}
                                    ${
                                      darkMode
                                        ? `bg-black text-light bg-gradient border-secondary border-opacity-75`
                                        : ``
                                    } 
                                    d-grid p-2 pe-0 p-sm-3 pe-sm-0 shadow position-relative overflow-hidden`}
                                >
                                  <Form.Check
                                    type="radio"
                                    id={`address-${index}`}
                                  >
                                    <Form.Check.Label className="p-0 w-100">
                                      <Form.Check.Input
                                        type="radio"
                                        name="payment"
                                        onChange={(e) => {
                                          if (e.target.value === "on") {
                                            setPaymentOption(
                                              Payment.PaymentMethod
                                            );
                                          }
                                        }}
                                        checked={Payment.isChecked}
                                      />
                                      <div className="d-grid gap-2 w-100 h-100">
                                        <div
                                          className={`${styles.PayCard} d-grid gap-3 w-100`}
                                        >
                                          <div className="fw-2 pe-1 lh-1">
                                            {Payment.Type}
                                          </div>
                                          <div
                                            className="bg-dark rounded-start w-100 h-100 d-flex align-items-center position-relative overflow-hidden"
                                            style={{
                                              filter: `drop-shadow(0px 0px 3px rgba(255, 255, 255, 0.55))`,
                                            }}
                                          >
                                            {Payment.spanFull === "true" ? (
                                              <Image
                                                className={`${styles.Ozow} h-100 position-absolute end-0`}
                                                alt="Ozow"
                                                src="https://www.evetech.co.za/repository/ProductImages/Ozow-Payment-Background-855x78px-v4.png"
                                              />
                                            ) : null}
                                            <Stack
                                              direction="horizontal"
                                              className={`${
                                                Payment.spanFull === "true"
                                                  ? styles.OzowLogos +
                                                    " position-absolute justify-content-start h-100 w-50"
                                                  : "justify-content-end w-100 gap-1"
                                              } flex-wrap px-2`}
                                            >
                                              {Payment.Logos.map(
                                                (Bank: any, index: any) => {
                                                  return (
                                                    <Image
                                                      src={Bank.Logo}
                                                      key={index}
                                                      alt=""
                                                    />
                                                  );
                                                }
                                              )}
                                            </Stack>
                                          </div>
                                        </div>
                                      </div>
                                      <div
                                        className={`${styles.PayCardLink} position-absolute w-100 h-100 top-0 start-0 cursor-pointer`}
                                      ></div>
                                    </Form.Check.Label>
                                  </Form.Check>
                                </Card>
                              );
                            })}
                          </div>

                          <Form.Group className="text-end" controlId="Comment">
                            <Form.Label className="fw-2">
                              Comments About Your Order (Optional)
                            </Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              placeholder="Additional comments here"
                              onChange={(e) => {
                                setOrderNote(e.currentTarget.value);
                              }}
                              readOnly={true}
                              defaultValue={cartCtx.ordernote}
                              className={
                                darkMode
                                  ? `bg-black text-light border-secondary border-opacity-75`
                                  : ``
                              }
                            />
                          </Form.Group>
                        </Stack>
                      </Stack>
                    </Form>
                  </Card>

                  <p className="m-0 lh-1 order-xxl-2 span-full">
                    <small className="fw-2">
                      Please Note: We don&apos;t accept cash or cheque deposits
                    </small>
                  </p>

                  <p className="m-0 lh-1 order-xxl-2 span-full">
                    <small>
                      Placing an item in your shopping cart does not reserve
                      that item or price. We only reserve stock for your order
                      once payment is received.
                    </small>
                  </p>

                  <Card
                    className={`
                      shadow order-xxl-1 span-xxl-2 overflow-hidden position-relative
                      ${darkMode ? `bg-black text-light` : ``}
                    `}
                  >
                    <div className="position-absolute start-0 bottom-0">
                      <Image
                        src="https://www.evetech.co.za/repository/ProductImages/Delivery-Icons-300x300px-v3.png"
                        alt=""
                      />
                    </div>
                    <Stack gap={3} className="position-relative">
                      <div
                        className={`
                          bg-opacity-75 d-grid gap-2 pb-3
                          ${darkMode ? `bg-black` : `bg-light`}
                        `}
                      >
                        <Summary isShowShipping={true} />

                        <div
                          className={`
                            p-2 px-sm-3 bg-opacity-50
                            ${darkMode ? `bg-black` : `bg-light`}
                          `}
                        >
                          <Stack gap={2} className="pb-2 lh-1">
                            <Stack
                              direction="horizontal"
                              className={`
                                gap-2 gap-sm-3 border-bottom pb-2 justify-content-between
                                ${
                                  darkMode
                                    ? `border-secondary border-opacity-50`
                                    : ``
                                }
                              `}
                            >
                              <h2 className="text-uppercase text-secondary fs-6 mb-0">
                                Shipping info
                              </h2>
                            </Stack>
                            {cartCtx.shippingAddress !== null &&
                              !_.isEmpty(cartCtx.shippingAddress) && (
                                <Stack gap={1}>
                                  <h4 className="fs-6 m-0">
                                    {cartCtx.shippingAddress.PersonName}
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
                                      {cartCtx.shippingAddress.Suburb},
                                      {cartCtx.shippingAddress.City} -
                                      {cartCtx.shippingAddress.PostCode},
                                      {cartCtx.shippingAddress.State}
                                      <br />
                                      {cartCtx.shippingAddress.Country}
                                    </p>
                                  </small>
                                </Stack>
                              )}
                          </Stack>
                        </div>
                        <div className="ms-auto mt-2 px-2 px-sm-3">
                          <Link
                            href="/cart/confirmation"
                            title="Proceed to Confirmation"
                            onClick={(e) => {
                              e.preventDefault();
                              if (authCtx.isLoggedIn)
                                router.push("/cart/confirmation");
                              else {
                                authCtx.onShowLogin(true);
                                return false;
                              }
                            }}
                          >
                            <Button
                              variant="success"
                              className={`bg-gradient shadow`}
                            >
                              Proceed to Confirmation
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </Stack>
                  </Card>
                </div>
              </main>
            </Col>
          </section>
        </Stack>
      </div>
    </>
  );
};

export default Payment;
