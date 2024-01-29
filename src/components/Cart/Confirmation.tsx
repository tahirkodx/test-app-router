"use client";
import React, { useContext, useEffect, useState } from "react";
/* import LaptopHeader from "@/components/Home/LaptopHeader"; */
import Stack from "react-bootstrap/Stack";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import styles from "@/styles/Cart/Cart.module.scss";
import { FaThumbsUp } from "react-icons/fa";
import Summary from "@/components/Cart/Summary";
import CartContext from "@/store/ncart-context";
import AuthContext from "@/store/auth-context";
import { Helmet } from "react-helmet";
import ComponentsHeader from "@/components/Home/ComponentsHeader";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTheme } from "@/store/ThemeContext";

const _ = require("lodash");
const Confirmation = () => {
  const Swal = require("sweetalert2");

  function toggle(value: any) {
    return !value;
  }

  const cartCtx: any = useContext(CartContext);
  const authCtx: any = useContext(AuthContext);
  const router = useRouter();
  const [checked, setChecked] = useState<any>(false);
  const [initSet, setInitSet] = useState<any>(false);
  const [showPageTopMsg, setShowPageTopMsg] = useState<any>(true);

  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  useEffect(() => {
    cartCtx.setConfirmed(checked);
  }, [checked]);

  useEffect(() => {
    if (!initSet && cartCtx.sessId.trim().length > 0) {
      setChecked(cartCtx.isConfirmed);

      if (cartCtx.items.length === 0) router.push("/cart");

      if (_.isEmpty(cartCtx.shippingAddress)) router.push("/cart/delivery");

      if (cartCtx.paymentMode !== null && cartCtx.paymentMode.length === 0) {
        router.push("/cart/payment");
      } else if (cartCtx.paymentMode === null) {
        router.push("/cart/payment");
      }

      setInitSet(true);
    }
  }, [cartCtx.sessId]);

  useEffect(() => {
    if (
      cartCtx.orderno !== null &&
      cartCtx.orderno.length > 0 &&
      cartCtx.isConfirmed
    ) {
      router.push("/cart/checkout");
    }
  }, [cartCtx]);

  /*   useEffect(() => {
    localStorage.setItem("eve_cart", JSON.stringify(cartCtx));
  }, [cartCtx.isConfirmed]); */

  const currencyFormat = (num: any) => {
    try {
      return "R " + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    } catch (e) {
      return num;
    }
  };

  const amountOptions = [];
  for (let i = 1; i < 21; i++) {
    amountOptions.push(<option value={i}>{i}</option>);
  }

  const RenderDescription = (props: any) => (
    <span dangerouslySetInnerHTML={{ __html: props.HTML }}></span>
  );

  const confirmTerms = () => {
    if (checked) {
      if (authCtx.isLoggedIn) router.push("/cart/checkout");
      else {
        authCtx.onShowLogin(true);
        return false;
      }
    } else {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Please Confirm Terms and Conditions",
        showConfirmButton: false,
        timer: 2500,
      });
    }
  };

  return (
    <>
      <Helmet>
        <title itemProp="name" lang="en">
          Confirmation
        </title>
      </Helmet>
      <ComponentsHeader showpagetopmsg={showPageTopMsg} />
      <div
        className={`
          py-3 py-xxl-4
          ${darkMode ? `bg-dark text-light` : ``}
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
                      className={`${styles.Breadcrumbs} d-grid gap-1 text-uppercase w-100 cols-4 cols-sm-7 text-center`}
                    >
                      <Link
                        href="/cart"
                        className="text-primary text-decoration-none"
                      >
                        <div>
                          {" "}
                          <span>Cart</span>{" "}
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
                      <Link
                        href="/cart/payment"
                        className="text-primary text-decoration-none"
                      >
                        <div>
                          <span>Payment</span>
                        </div>
                      </Link>
                      <div>{" > "}</div>
                      <div className="fw-2 d-flex align-items-center justify-content-center gap-1">
                        <FaThumbsUp />
                        <span>Confirmation</span>
                      </div>
                    </div>
                  </Stack>

                  <Card
                    className={`
                      p-2 p-sm-3 shadow order-xxl-1 span-xxl-8
                      ${darkMode ? `bg-black bg-opacity-50` : ``}
                    `}
                  >
                    <Stack gap={5}>
                      <Stack gap={4}>
                        <div className="d-grid cols-10 text-secondary text-uppercase fw-2 gap-2 gap-sm-3">
                          <div
                            className={`
                              ${
                                darkMode
                                  ? `border-secondary border-opacity-50`
                                  : ``
                              }
                              border-bottom pb-1 span-6 d-none d-lg-block
                            `}
                          >
                            Order Summary
                          </div>
                          <div className="span-4 cols-12 d-grid gap-3">
                            <div
                              className={`
                                ${
                                  darkMode
                                    ? `border-secondary border-opacity-50`
                                    : ``
                                }
                                border-bottom pb-1 span-3 d-none d-lg-block
                              `}
                            >
                              QTY.
                            </div>
                            <div
                              className={`
                                ${
                                  darkMode
                                    ? `border-secondary border-opacity-50`
                                    : ``
                                }
                                border-bottom pb-1 span-4 d-none d-lg-block
                              `}
                            >
                              Price
                            </div>
                            <div
                              className={`
                                ${
                                  darkMode
                                    ? `border-secondary border-opacity-50`
                                    : ``
                                }
                                border-bottom pb-1 span-5 d-none d-lg-block
                              `}
                            >
                              Total
                            </div>
                          </div>
                        </div>
                        {cartCtx.items !== undefined &&
                          cartCtx.items.length > 0 &&
                          cartCtx.items.map((Product: any, index: any) => {
                            return (
                              <div
                                key={index}
                                className="d-grid gap-2 gap-sm-3 cols-10"
                              >
                                <section className="span-full span-lg-6">
                                  <Stack gap={1}>
                                    <div className="d-grid cols-sm-10 gap-3">
                                      <div className="span-sm-3 text-center">
                                        <Image
                                          className={
                                            styles.Product__Image + darkMode
                                              ? ` bg-white p-2 rounded`
                                              : ``
                                          }
                                          fluid
                                          src={Product.imageUrl}
                                          alt={Product.alt}
                                        />
                                      </div>
                                      <div className="span-sm-7 lh-1">
                                        <div className="gap-2 d-flex flex-wrap justify-content-between align-items-center">
                                          <h2
                                            className={`
                                              fs-6 m-0 lh-1
                                              ${darkMode ? `text-light` : ``}
                                            `}
                                          >
                                            {Product.alt}
                                          </h2>
                                          <div
                                            className={`
                                              ${styles.Product__Description}
                                              ${darkMode ? `text-light` : ``} 
                                              overflow-hidden
                                            `}
                                          >
                                            <small>
                                              <small>
                                                <RenderDescription
                                                  HTML={Product.desc}
                                                />
                                              </small>
                                            </small>
                                          </div>
                                          {authCtx !== undefined &&
                                            authCtx.user !== undefined &&
                                            (authCtx.user.CID === "IS3" ||
                                              authCtx.user.CID ===
                                                "DE402835") && (
                                              <span className="text-primary">
                                                <span className="fw-2">
                                                  Weight:
                                                </span>{" "}
                                                <span>{Product.weight} Kg</span>
                                              </span>
                                            )}
                                        </div>
                                      </div>
                                    </div>
                                  </Stack>
                                </section>
                                <section
                                  className={`
                                    ${darkMode ? `text-light` : ``}
                                    span-full span-lg-4 d-flex d-lg-grid gap-2 align-items-center align-items-lg-start justify-content-end cols-12`}
                                >
                                  <div className="span-sm-3">
                                    <div>{Product.amount}</div>
                                  </div>
                                  <div className="span-sm-4 d-none d-lg-block">
                                    <div className="fs-6">
                                      {currencyFormat(
                                        parseFloat(Product.price)
                                      )}
                                    </div>
                                  </div>
                                  <div className="span-sm-5">
                                    <div className="fs-6">
                                      <div className="fw-2 lh-1">
                                        <small>Credit Card:</small>
                                      </div>
                                      <div>
                                        {currencyFormat(
                                          parseFloat(
                                            (
                                              Product.ccPrice * Product.amount
                                            ).toString()
                                          )
                                        )}
                                      </div>
                                    </div>
                                    <div>
                                      <div className="gap-1 text-danger">
                                        <div className="fw-2 lh-1">
                                          <small>Eft:</small>
                                        </div>
                                        <div>
                                          {currencyFormat(
                                            parseFloat(
                                              (
                                                Product.ieftPrice *
                                                Product.amount
                                              ).toString()
                                            )
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </section>
                              </div>
                            );
                          })}
                      </Stack>
                    </Stack>
                  </Card>

                  <div className="order-xxl-2 span-full"></div>

                  <Card
                    className={`
                      shadow order-xxl-1 span-xxl-2 overflow-hidden position-relative
                      ${darkMode ? `bg-black` : ``}
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
                          bg-opacity-75 d-grid gap-3 pb-3
                          ${darkMode ? `bg-black` : `bg-light`}
                        `}
                      >
                        <Summary isShowShipping={true} isConfirmation={true} />

                        <div
                          className={`
                            ${darkMode ? `bg-black` : `bg-light`}
                            p-2 px-sm-3 bg-opacity-50
                          `}
                        >
                          <Stack gap={2} className="pb-2 lh-1">
                            <Stack
                              direction="horizontal"
                              className={`
                                ${
                                  darkMode
                                    ? `border-secondary border-opacity-50`
                                    : ``
                                }
                                gap-2 gap-sm-3 border-bottom pb-2 justify-content-between
                              `}
                            >
                              <h2 className="text-uppercase text-secondary fs-6 mb-0">
                                Shipping info
                              </h2>
                            </Stack>
                            {cartCtx.shippingAddress !== null &&
                              !_.isEmpty(cartCtx.shippingAddress) && (
                                <Stack
                                  gap={1}
                                  className={darkMode ? `text-light` : ``}
                                >
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
                                      {cartCtx.shippingAddress.Suburb},{" "}
                                      {cartCtx.shippingAddress.City} -{" "}
                                      {cartCtx.shippingAddress.PostCode},{" "}
                                      {cartCtx.shippingAddress.State}
                                      <br />
                                      {cartCtx.shippingAddress.Country}
                                    </p>
                                  </small>
                                </Stack>
                              )}
                          </Stack>
                        </div>

                        <small>
                          <Form
                            className={`
                              bg-danger bg-opacity-25 p-2 px-sm-3 lh-1
                              ${darkMode ? `text-light` : ``}
                            `}
                          >
                            <Form.Check
                              label="I acknowledge that I have read and understand the Terms & Conditions on this website."
                              name="aknowledge"
                              type="checkbox"
                              id="aknowledge"
                              onChange={() => setChecked(toggle)}
                              defaultChecked={
                                cartCtx.isConfirmed !== undefined &&
                                cartCtx.isConfirmed
                              }
                            />
                          </Form>
                        </small>

                        <div className="ms-auto px-2 px-sm-3">
                          <Link
                            href="/cart/checkout"
                            title="Confirm Order"
                            onClick={(e: any) => {
                              e.preventDefault();
                              confirmTerms();
                            }}
                          >
                            <Button
                              variant="success"
                              className={`bg-gradient shadow`}
                            >
                              Confirm Order
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

export default Confirmation;
