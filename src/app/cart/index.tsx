"use client";
import React, {
  useEffect,
  useContext,
  useState,
  useRef,
  Suspense,
  createRef,
} from "react";
/* import LaptopHeader from "@/components/Laptop/LaptopHeader"; */
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import styles from "@/styles/Cart/Cart.module.scss";
import {
  FaArrowAltCircleLeft,
  FaTrash,
  FaShoppingCart,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import Summary from "@/components/Cart/Summary";
import AuthContext from "@/store/auth-context";
import CartContext from "@/store/ncart-context";
import TV from "@/components/Cart/TV";
import MakeQuotation from "@/components/Cart/MakeQuotation";
import CalcShipping from "@/components/Cart/CalShipping";
import { Helmet } from "react-helmet";
import { Alert, Spinner } from "react-bootstrap";
import OverlayAlert from "@/components/Cart/OverlayAlert";
import ComponentsHeader from "@/components/Home/ComponentsHeader";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import Link from "next/link";
import { useTheme } from "@/store/ThemeContext";
import darkFormStyles from "@/styles/DarkForm.module.scss";
import { ProductAPI } from "@/custom/utils/actions";

const Cart = (props: any) => {
  const Swal: any = require("sweetalert2");
  const cartCtx: any = useContext(CartContext);
  const authCtx: any = useContext(AuthContext);
  const router = useRouter();
  const showLogin: any =
    props.showLogin !== undefined ? props.showLogin : false;
  const [makeQuotationShow, setMakeQuotationShow] = useState<any>(false);
  const [calcShippingShow, setCalcShippingShow] = useState<any>(false);
  const [totalWeight, setTotalWeight] = useState<any>(0);
  const [userChoice, setUserChoice] = useState<any>(1);
  const [hideState, setHideState] = useState<any>("");
  const itemsRef = useRef<any[]>([]);
  const [showPageTopMsg, setShowPageTopMsg] = useState<any>(true);
  const [promoMessage, setPromoMessage] = useState<any>("");
  const [promoStyle, setPromoStyle] = useState<any>("");
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  // const [height, setHeight] = useState("auto");
  const [alertStatus, setAlertStatus] = useState<any>("");
  const [alertCard, setAlertCard] = useState<any>("");
  const [hideIndex, setHideIndex] = useState<any>("");
  const [limitCardText, setLimitCardText] = useState<any>("");
  const [promoCode, setPromoCode] = useState<any>("");

  const showLimitAlert = (number: any) => {
    function createAlert() {
      return new Promise<void>(function (resolve) {
        setAlertCard(
          <OverlayAlert
            position="center"
            type="danger"
            icon="error"
            text={`Cannot add more than ${number}`}
            seconds={1.25}
          />
        );
        resolve();
      });
    }

    function resetAlert() {
      return new Promise<void>(function (resolve) {
        setTimeout(function () {
          setAlertCard("");
          resolve();
        }, 1500);
      });
    }

    async function showHideLimit() {
      await createAlert();
      await resetAlert();
    }

    showHideLimit();
  };

  useEffect(() => {
    if (alertStatus === "productRemoved") {
      setAlertCard(
        <OverlayAlert
          position="topRight"
          type="success"
          icon="success"
          text="Product removed from cart"
          seconds={1.75}
        />
      );
    }
    if (alertStatus === "") {
      setAlertCard("");
    }
  }, [alertStatus]);

  useEffect(() => {
    if (cartCtx.items.length > 0) {
      itemsRef.current = cartCtx.items.map(
        (i: any) => itemsRef.current[i] ?? createRef()
      );
    }
  }, [cartCtx.items]);

  useEffect(() => {
    if (showLogin) authCtx.onShowLogin(true);
  }, []);

  const amountOptions: any = [];
  for (let i = 1; i < 21; i++) {
    amountOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  const removeItemCartHandler = (id: any, index: any) => {
    function hideState() {
      return new Promise<void>(function (resolve) {
        setHideState(id);
        resolve();
      });
    }

    function removeProduct() {
      return new Promise<void>(function (resolve) {
        setTimeout(function () {
          cartCtx.removeItem(id);
          setAlertStatus("productRemoved");
          resolve();
        }, 250);
      });
    }

    function resetAlert() {
      return new Promise<void>(function (resolve) {
        setTimeout(function () {
          setAlertStatus("");
          resolve();
        }, 2000);
      });
    }

    async function hideProduct() {
      await hideState();
      await removeProduct();
      await resetAlert();
    }

    hideProduct();
  };

  const emptyCartHandler = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to empty your cart!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result: any) => {
      if (result.isConfirmed) {
        cartCtx.emptyCart();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "All Products removed from the cart successfully.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const updateQtyItem = (Qty: any, Product: any) => {
    Product.amount = Qty;
    cartCtx.updateItem(Product);
  };

  const RenderTitle = (props: any) => (
    <span dangerouslySetInnerHTML={{ __html: props.HTML }}></span>
  );

  const RenderDescription = (props: any) => (
    <span dangerouslySetInnerHTML={{ __html: props.HTML }}></span>
  );

  useEffect(() => {
    let sumWeight = 0;
    if (cartCtx.items.length > 0) {
      cartCtx.items.map((Product: any, index: any) => {
        try {
          sumWeight += parseFloat(Product.weight);
        } catch (e) {}
      });
      setTotalWeight(sumWeight);
    }
  }, [cartCtx.items]);

  useEffect(() => {
    if (
      cartCtx.orderno !== null &&
      cartCtx.orderno.length > 0 &&
      cartCtx.isConfirmed
    ) {
      router.push("/checkout");
    }
  }, [cartCtx]);

  const applyPromoCode = async (e: any) => {
    e.preventDefault();

    let auth = JSON.parse(localStorage.getItem("user_auth") as string) || null;
    // if (!isNaN(promoCode)) setPromoCode(Number(promoCode));

    const apply = await ProductAPI.applyPromoCode({
      code: !isNaN(promoCode) ? Number(promoCode) : promoCode,
    });

    if(apply !== undefined && apply !== null){ 
      let promoRes = apply.result;

      if (promoRes !== undefined && promoRes !== null && (promoRes.isApplied || promoRes.isAlreadyApplied)) {
        cartCtx.fetchCart();
      }
  
      if (promoRes !== undefined && promoRes !== null && promoRes.message !== undefined && promoRes.message.length > 0) {
        setPromoMessage(promoRes.message);
      }
  
      if (
        promoRes !== undefined && promoRes !== null && (
        promoRes.message ===
          "Your order does not qualify for that promotional code. Please see the rules of the promotion for more information." ||
        promoRes.message === "Oops! Promotional code is expired" ||
        promoRes.message === "Oops! Promotional code could not be found")
      ) {
        setPromoStyle("bg-danger text-light");
      }
  
      if (promoRes.message === "Promotional code already redeemed :)") {
        setPromoStyle("bg-warning text-dark");
      }
  
      if (promoRes.message === "Promotional code redeemed successfully.") {
        setPromoStyle("bg-success text-light");
      }
    }
   
  };

  const currencyFormat = (num: any) => {
    try {
      return "R " + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    } catch (e) {
      return num;
    }
  };

  useEffect(() => {}, [alertCard]);
  useEffect(() => {}, [hideState]);
  useEffect(() => {}, [itemsRef.current]);

  useEffect(() => {}, [limitCardText]);
  useEffect(() => {}, [promoMessage]);
  useEffect(() => {}, [promoStyle]);

  return (
    <>
      <Helmet>
        <title itemProp="name" lang="en">
          Cart
        </title>
      </Helmet>

      <ComponentsHeader showpagetopmsg={showPageTopMsg} />

      <div
        className={`
          ${darkMode ? `bg-dark text-light` : ``}
          py-3 py-xxl-4
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
                    {cartCtx.items.length > 0 ? (
                      <div
                        className={`${styles.Breadcrumbs} d-grid gap-1 text-uppercase cols-4 cols-sm-7 text-center w-100`}
                      >
                        <div className="d-flex align-items-center justify-content-center gap-1 fw-2">
                          <FaShoppingCart />
                          <span>Cart</span>
                        </div>
                        <div> &gt; </div>
                        <div className="text-secondary">
                          <span>Delivery</span>
                        </div>
                        <div> &gt; </div>
                        <div className="text-secondary">
                          <span>Payment</span>
                        </div>
                        <div> &gt; </div>
                        <div className="text-secondary">
                          <span>Confirmation</span>
                        </div>
                      </div>
                    ) : null}
                    <div>
                      {cartCtx.items.length > 0 ? (
                        <Button
                          size="sm"
                          variant="danger"
                          className={`${styles.EmptyCart} lh-1`}
                          onClick={() => {
                            emptyCartHandler();
                          }}
                        >
                          <FaTrash /> Empty Cart
                        </Button>
                      ) : null}
                    </div>
                  </Stack>

                  <Card
                    className={`
                      p-2 p-sm-3 shadow order-xxl-1 
                      ${cartCtx.items.length > 0 ? "span-xxl-8" : "span-full"}
                      ${darkMode ? `bg-black bg-opacity-50` : ``}
                    `}
                  >
                    <div
                      className={`${styles.Products} ${styles.Scrollbar} d-lg-grid gap-3 h-100`}
                    >
                      {cartCtx.items.length > 0 ? (
                        <div className="d-grid cols-10 text-secondary text-uppercase fw-2 gap-2 gap-sm-3">
                          <div
                            className={`${
                              darkMode
                                ? `border-secondary border-opacity-50`
                                : ``
                            } border-bottom pb-1 span-6 d-none d-lg-block`}
                          >
                            Product Details
                          </div>
                          <div className="span-4 cols-12 d-grid gap-3">
                            <div
                              className={`${
                                darkMode
                                  ? `border-secondary border-opacity-50`
                                  : ``
                              } border-bottom pb-1 span-3 d-none d-lg-block`}
                            >
                              QTY.
                            </div>
                            <div
                              className={`${
                                darkMode
                                  ? `border-secondary border-opacity-50`
                                  : ``
                              } border-bottom pb-1 span-4 d-none d-lg-block`}
                            >
                              Price
                            </div>
                            <div
                              className={`${
                                darkMode
                                  ? `border-secondary border-opacity-50`
                                  : ``
                              } border-bottom pb-1 span-5 d-none d-lg-block`}
                            >
                              Total
                            </div>
                          </div>
                        </div>
                      ) : null}

                      <div className="position-xxl-relative h-100">
                        <div
                          className={`${
                            cartCtx.items.length > 0
                              ? "position-xxl-absolute"
                              : ""
                          } ${
                            styles.ProductsCard
                          } h-100 w-100 overflow-xxl-auto`}
                        >
                          <Stack gap={4}>
                            <Suspense fallback={<Spinner animation="border" />}>
                              {cartCtx.items.length > 0 &&
                                itemsRef.current !== undefined &&
                                itemsRef.current.length > 0 &&
                                cartCtx.items.map(
                                  (Product: any, index: any) => {
                                    return (
                                      <div
                                        key={`${Product.id}-${index}`}
                                        className={`${
                                          hideState === Product.id
                                            ? styles.ShowHideFade
                                            : `${styles.ShowHideFade} show`
                                        } overflow-hidden`}
                                        ref={(el) =>
                                          (itemsRef.current[index] = el)
                                        }
                                        style={{
                                          maxHeight:
                                            hideState === Product.id
                                              ? 0
                                              : itemsRef.current[index]
                                                  ?.offsetHeight,
                                        }}
                                      >
                                        <div
                                          className={`d-grid gap-2 gap-sm-3 cols-10`}
                                        >
                                          <section className="span-full span-lg-6">
                                            <Stack gap={1}>
                                              <div className="d-grid cols-sm-10 gap-3">
                                                <div className="span-sm-3 text-center">
                                                  <Image
                                                    className={`
                                                      ${styles.Product__Image} 
                                                      ${
                                                        darkMode
                                                          ? `p-2 bg-white rounded`
                                                          : ``
                                                      }
                                                    `}
                                                    fluid
                                                    src={Product.imageUrl}
                                                    alt={Product.alt}
                                                  />
                                                </div>
                                                <div className="span-sm-7 lh-1">
                                                  <div className="gap-2 d-flex flex-wrap justify-content-between align-items-center">
                                                    <Link
                                                      href={
                                                        Product.url !==
                                                        undefined
                                                          ? Product.url
                                                          : "#"
                                                      }
                                                      title={Product.alt}
                                                      className="text-dark w-100 text-decoration-none"
                                                    >
                                                      <Button
                                                        variant={
                                                          darkMode
                                                            ? `dark`
                                                            : `outline-secondary`
                                                        }
                                                        size="sm"
                                                        className={`
                                                          ${styles.LinkHeading}
                                                          ${
                                                            darkMode
                                                              ? `border-0`
                                                              : ``
                                                          } 
                                                          w-100 d-block
                                                        `}
                                                      >
                                                        <h2 className="fs-6 m-0 lh-1 w-100 text-start">
                                                          {Product.alt}
                                                        </h2>
                                                      </Button>
                                                    </Link>
                                                    {Product.desc !==
                                                      undefined &&
                                                    Product.desc !== null ? (
                                                      <div
                                                        className={`
                                                          ${
                                                            styles.Product__Description
                                                          } 
                                                          ${
                                                            darkMode
                                                              ? `text-light`
                                                              : ``
                                                          }
                                                          overflow-hidden w-100
                                                        `}
                                                      >
                                                        <small>
                                                          <small>
                                                            {/* <RenderTitle
                                                        HTML={Product.name}
                                                      /> */}
                                                            <RenderDescription
                                                              HTML={
                                                                Product.desc
                                                              }
                                                            />
                                                          </small>
                                                        </small>
                                                      </div>
                                                    ) : null}

                                                    {Product.isRequiredLicence && (
                                                      <small>
                                                        <small className="text-danger">
                                                          {" "}
                                                          This item require a
                                                          valid TV licence.{" "}
                                                        </small>
                                                      </small>
                                                    )}

                                                    {authCtx !== undefined &&
                                                      authCtx.user.FirstName ===
                                                        "Imran" && (
                                                        <span className="text-primary">
                                                          <span className="fw-2 pe-1">
                                                            Weight:
                                                          </span>
                                                          <span>
                                                            {Product.weight} Kg
                                                          </span>
                                                        </span>
                                                      )}

                                                    <span className="pb-1">
                                                      <Button
                                                        size="sm"
                                                        className={`
                                                          shadow border border-opacity-50
                                                          ${
                                                            darkMode
                                                              ? `border-danger text-danger text-opacity-75`
                                                              : ``
                                                          }
                                                        `}
                                                        variant=""
                                                        onClick={() =>
                                                          removeItemCartHandler(
                                                            Product.id,
                                                            index
                                                          )
                                                        }
                                                      >
                                                        <FaTrash /> Delete
                                                      </Button>
                                                    </span>
                                                  </div>
                                                </div>
                                              </div>
                                            </Stack>
                                          </section>
                                          <section className="span-full span-lg-4 d-flex d-lg-grid gap-2 align-items-lg-start justify-content-end cols-12">
                                            <div className="span-sm-3">
                                              <div>
                                                <Form className="d-inline-block">
                                                  <Form.Select
                                                    defaultValue={
                                                      Product.amount
                                                    }
                                                    className={
                                                      darkMode
                                                        ? `bg-dark text-light border-secondary`
                                                        : ``
                                                    }
                                                    onChange={(e) => {
                                                      if (
                                                        Product.qtyPerCust !==
                                                          0 &&
                                                        e.currentTarget.value >
                                                          Product.qtyPerCust
                                                      ) {
                                                        /* Show message not able update qty Qty  > qtyLimitSo */
                                                        e.currentTarget.value =
                                                          Product.qtyPerCust;
                                                        showLimitAlert(
                                                          e.currentTarget.value
                                                        );
                                                      } else {
                                                        updateQtyItem(
                                                          e.currentTarget.value,
                                                          Product
                                                        );
                                                      }
                                                    }}
                                                  >
                                                    {amountOptions}
                                                  </Form.Select>
                                                </Form>
                                              </div>
                                            </div>
                                            <div className="span-sm-4 d-none d-lg-block">
                                              <div
                                                className={`${
                                                  darkMode ? `text-light` : ``
                                                } fs-6`}
                                              >
                                                {currencyFormat(
                                                  parseFloat(Product.ccPrice)
                                                )}
                                              </div>
                                            </div>
                                            <div
                                              className={`${
                                                darkMode ? `text-light` : ``
                                              } span-sm-5`}
                                            >
                                              <div className="fs-6">
                                                <div className="fw-2 lh-1">
                                                  <small>Credit Card:</small>
                                                </div>
                                                <div>
                                                  {currencyFormat(
                                                    parseFloat(
                                                      (
                                                        Product.ccPrice *
                                                          Product.amount -
                                                        Product.PromocodePrice *
                                                          1.05
                                                      ).toString()
                                                    )
                                                  )}
                                                </div>
                                              </div>
                                              <div>
                                                <div className="text-danger">
                                                  <div className="fw-2 lh-1">
                                                    <small>Eft:</small>
                                                  </div>
                                                  <span>
                                                    {currencyFormat(
                                                      parseFloat(
                                                        (
                                                          Product.ieftPrice *
                                                            Product.amount -
                                                          Product.PromocodePrice
                                                        ).toString()
                                                      )
                                                    )}
                                                  </span>
                                                </div>
                                              </div>
                                            </div>
                                          </section>
                                        </div>
                                      </div>
                                    );
                                  }
                                )}
                              {cartCtx.items.length === 0 && (
                                <div className="text-center justify-content-center align-self-center h-100 mt-3">
                                  <Image
                                    src="https://cdn3.iconfinder.com/data/icons/shopping-and-ecommerce-29/90/empty_cart-512.png"
                                    className={styles.CartImg}
                                    alt="Empty cart"
                                  ></Image>
                                  <h5 className={darkMode ? `text-white` : ``}>
                                    Your Cart is Empty.
                                  </h5>
                                </div>
                              )}
                            </Suspense>
                          </Stack>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <p className="m-0 lh-1 order-xxl-2 span-full">
                    <small>
                      Placing an item in your shopping cart does not reserve
                      that item or price. We only reserve stock for your order
                      once payment is received.
                    </small>
                  </p>

                  <Card
                    className={`
                      shadow order-xxl-1 span-xxl-2 overflow-hidden
                      ${cartCtx.items.length > 0 ? "" : "d-none"}
                      ${darkMode ? `bg-black` : ``}
                    `}
                  >
                    <Stack gap={3} className={styles.CartSummaryStack}>
                      <Summary />

                      <div className="ms-auto px-2 px-sm-3 mb-3">
                        <Link
                          href={
                            props.ButtonLink !== undefined
                              ? props.ButtonLink
                              : "#"
                          }
                          title={props.ButtonTitle}
                          onClick={(e) => {
                            e.preventDefault();
                            if (authCtx.isLoggedIn)
                              router.push("/cart/delivery");
                            else {
                              authCtx.onShowLogin(true);
                              return false;
                            }
                          }}
                        >
                          <Button
                            variant="success"
                            className={`${
                              props.hideButton === "true" ? "d-none" : ""
                            } bg-gradient shadow`}
                          >
                            Proceed to Delivery
                          </Button>
                        </Link>
                      </div>
                      <Stack
                        gap={1}
                        className={`
                          ${styles.PromoCode}
                          ${
                            darkMode
                              ? `text-light bg-primary bg-opacity-25`
                              : ``
                          } 
                          p-2 p-sm-3
                        `}
                      >
                        <h2 className="fs-6 m-0">
                          I have a voucher or Promotional Code
                        </h2>
                        <Form className={darkMode ? darkFormStyles.main : ``}>
                          <Stack gap={2}>
                            <Form.Control
                              type="text"
                              placeholder="Enter your voucher or promotional code below."
                              onChange={(e) => {
                                setPromoCode(e.target.value.trim());
                              }}
                              className={`${
                                darkMode
                                  ? `bg-black text-light border-secondary`
                                  : ``
                              }`}
                            />
                            <div>
                              {promoCode.length > 3 ? (
                                <Button
                                  variant="success"
                                  type="submit"
                                  onClick={(e) => {
                                    /* Apply Promocode */
                                    e.preventDefault();
                                    if (authCtx.isLoggedIn) applyPromoCode(e);
                                    else {
                                      authCtx.onShowLogin(true);
                                      return false;
                                    }
                                  }}
                                >
                                  Redeem Code
                                </Button>
                              ) : null}

                              <span className="d-none">
                                <TV />
                              </span>
                            </div>
                          </Stack>
                        </Form>
                      </Stack>
                      {promoCode.length > 0 && promoMessage.length > 0 ? (
                        <div className={`${promoStyle} lh-1 p-3`}>
                          <span className="fw-3">
                            {promoStyle.includes("success") ? (
                              <>
                                <FaCheckCircle /> Success:{" "}
                              </>
                            ) : (
                              <>
                                <FaExclamationTriangle /> Error:{" "}
                              </>
                            )}
                          </span>
                          <span>{promoMessage}</span>
                        </div>
                      ) : null}
                    </Stack>
                  </Card>

                  <p className="m-0 order-xxl-2 span-full">
                    <small>
                      <span className="fw-2">Please Note:</span>
                      <span className="text-danger">FREE DELIVERY</span> only
                      available to main centers. (Calculated based on your post
                      code.)
                    </small>
                  </p>

                  <Stack
                    direction="horizontal"
                    gap={1}
                    className="flex-wrap justify-content-between order-xxl-2 span-full"
                  >
                    <Stack
                      direction="horizontal"
                      gap={1}
                      className="flex-wrap justify-content-between"
                    >
                      <Link href="/" title="Back to Shopping">
                        <Button variant="secondary">
                          <FaArrowAltCircleLeft /> Back To Shopping
                        </Button>
                      </Link>

                      {authCtx !== undefined &&
                      authCtx.user !== undefined &&
                      (authCtx.user.CID === "IS3" ||
                        authCtx.user.CID === "DE402835") ? (
                        <Button
                          variant="primary"
                          onClick={() => setMakeQuotationShow(true)}
                        >
                          Make Quotation
                        </Button>
                      ) : null}
                      {authCtx !== undefined &&
                        authCtx.user !== undefined &&
                        (authCtx.user.CID === "IS3" ||
                          authCtx.user.CID === "DE402835") && (
                          <MakeQuotation
                            show={makeQuotationShow}
                            eftprice={cartCtx.totalIEFTAmount}
                            ccprice={cartCtx.totalCCAmount}
                            items={cartCtx.items}
                            onHide={() => setMakeQuotationShow(false)}
                          />
                        )}
                    </Stack>

                    {cartCtx.items.length > 0 ? (
                      <Button
                        variant="primary"
                        onClick={() => setCalcShippingShow(true)}
                      >
                        Calculate Shipping
                      </Button>
                    ) : null}

                    <CalcShipping
                      show={calcShippingShow}
                      onHide={() => setCalcShippingShow(false)}
                      weight={totalWeight}
                      freeWeight={0}
                    />
                  </Stack>

                  <section className="lh-1 order-xxl-2 span-full">
                    <p>
                      <small>
                        Item prices listed above do not include shipping charges
                        and are subject to change based on your requested method
                        of shipment and your destination. Please note that
                        inventory status may change before your order is
                        finalized.
                      </small>
                    </p>
                    <p>
                      <small>
                        Evetech Solutions processes all orders daily Monday to
                        Friday until 5:00 p.m. Please note that no orders are
                        processed on weekends or holidays. Any order placed on a
                        weekend or holiday will be processed the next business
                        day.
                      </small>
                    </p>
                    <p className="mb-0">
                      <small>
                        Computer systems generally ship within the time listed.
                        If you require a computer system sooner than the time
                        periods listed, please notify us and we will make our
                        best effort to accommodate your request. However, we
                        cannot accept orders based on a condition of early
                        shipment. For more information about the availability of
                        a specific part number or computer configuration, please
                        call us at 010 786 0044 / 012 653 0033 or Email us
                      </small>
                    </p>
                  </section>
                </div>
              </main>
            </Col>
          </section>
          <section className="px-2 px-sm-3">
            <Col md={{ span: 10, offset: 1 }}>
              <div className="child-d-grid child-cols-sm-2 child-gap-2 child-gap-sm-3 childImages-w-100">
                {/* InnerHTML Banners */}
                <div>
                  <Image
                    fluid
                    src="https://www.evetech.co.za/repository/ProductImages/Microsoft-Q2-PC-Build-Custom-Banner-v1.jpg"
                    alt="Introducing Microsoft"
                    className="rounded"
                  />
                  <Image
                    fluid
                    src="https://www.evetech.co.za/repository/ProductImages/evetech-microsoft-windows-promo-730px-v1.jpg"
                    alt="Introducing Microsoft"
                    className="rounded"
                  />
                </div>
              </div>
            </Col>
          </section>
        </Stack>
      </div>

      {alertCard}
    </>
  );
};

export default Cart;
