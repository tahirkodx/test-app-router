"use client";
import React, { useRef, useState } from "react";
import {
  Card,
  Stack,
  Col,
  Image,
  Badge,
  Button,
  Form,
  Alert,
} from "react-bootstrap";
import { Helmet } from "react-helmet";
/* import LaptopHeader from "@/components/Home/LaptopHeader"; */
import {
  FaArrowAltCircleLeft,
  FaAsterisk,
  FaCheck,
  FaShoppingCart,
  FaTrash,
} from "react-icons/fa";
import styles from "@/styles/Cart/Cart.module.scss";
import Summary from "./Summary";
import { useContext } from "react";
import AuthContext from "@/store/auth-context";
import CartContext from "@/store/ncart-context";
import MakeQuotation from "@/components/Cart/MakeQuotation";
import CalcShipping from "@/components/Cart/CalShipping";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CartAPI } from "@/custom/utils/actions";
import ComponentsHeader from "@/components/Home/ComponentsHeader";
import { useTheme } from "@/store/ThemeContext";

const TVLicence = (props: any) => {
  const Swal = require("sweetalert2");
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);
  const router = useRouter();
  const [makeQuotationShow, setMakeQuotationShow] = useState(false);
  const [calcShippingShow, setCalcShippingShow] = useState(false);
  const [totalWeight, setTotalWeight] = useState(0);
  const [productCode, setProductCode] = useState("07");
  const [licenseType, setLicenseType] = useState("");
  const [id, setID] = useState("");
  const [passport, setPassport] = useState("");
  const [tvLicenseNumber, setTvLicenseNumber] = useState<any>("");
  const [easypayTransactionNumber, setEasypayTransactionNumber] = useState("");
  const [companyRegisterationNumber, setCompanyRegistrationNumber] =
    useState("");
  const [idPassError, setIdPassError] = useState(
    "ID/Passport Number Required*"
  );
  const [tvLicenseError, setTvLicenseError] = useState(
    "TV License Number Required*"
  );
  const [easyPayError, setEasyPayError] = useState("EasyPay Number Required*");
  const [companyNumError, setCompanyNumError] = useState(
    "Company Registration Number Required*"
  );
  const [isVerified, setIsVerified] = useState<any>("");
  const [validateMessage, setValidateMessage] = useState<any>("");

  const hasLetters = /[a-zA-Z]/;
  const hasSpecialChars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  const checkIdPassport = (idPassport: any) => {
    const passportRegex = new RegExp(
      "^(((\\d{2}((0[13578]|1[02])(0[1-9]|[12]\\d|3[01])|(0[13456789]|1[012])(0[1-9]|[12]\\d|30)|02(0[1-9]|1\\d|2[0-8])))|([02468][048]|[13579][26])0229))(( |-)(\\d{4})( |-)(\\d{3})|(\\d{7}))",
      "gm"
    );
    let characterCheck = /^[A-PR-WY][1-9]\d\s?\d{4}[1-9]$/gi;

    if (idPassport.match(passportRegex)) {
      setID(idPassport);
      setPassport("");
      setIdPassError("Valid SAID Number");
    } else {
      if (characterCheck.test(idPassport)) {
        setPassport(idPassport);
        setID("");
        setIdPassError("Valid Passport Number");
      } else {
        setIdPassError("Invalid SAID/Passport Number");
      }
    }
    if (idPassport.trim().length === 0) {
      setPassport("");
      setID("");
    }
  };

  const checkTVLicense = (tvLicenseNumber: any) => {
    if (tvLicenseNumber.length > 0) {
      if (
        hasSpecialChars.test(tvLicenseNumber) ||
        hasLetters.test(tvLicenseNumber)
      ) {
        setTvLicenseError("TV License can only include numbers");
      } else {
        setTvLicenseError("");
      }
    } else {
      setTvLicenseError("TV License Number Required*");
    }
  };

  const checkEasyPayNumber = (easypayTransactionNumber: any) => {
    if (easypayTransactionNumber.length > 0) {
      if (
        hasSpecialChars.test(easypayTransactionNumber) ||
        hasLetters.test(easypayTransactionNumber)
      ) {
        setEasyPayError("EasyPay Number must only have numbers");
      } else {
        setEasyPayError("");
      }
    } else {
      setEasyPayError("EasyPay Number Required*");
    }
  };

  const checkCompanyNumber = (companyRegisterationNumber: any) => {
    if (companyRegisterationNumber.length > 0) {
      if (
        hasSpecialChars.test(companyRegisterationNumber) ||
        hasLetters.test(companyRegisterationNumber)
      ) {
        setCompanyNumError(
          "Company Registration Number must only have numbers"
        );
      } else {
        setCompanyNumError("");
      }
    } else {
      setCompanyNumError("Company Registration Number Required*");
    }
  };

  const checkInputsValid = () => {
    if (licenseType === "Domestic" || licenseType === "Holiday Home") {
      return idPassError.includes("Valid");
    } else {
      return (
        tvLicenseError.length === 0 ||
        easyPayError.length === 0 ||
        companyNumError.length === 0
      );
    }
  };

  const verifyTVLicense = async (e: any) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const form = e.currentTarget;

    let pCode = productCode;
    let accountNumber = tvLicenseNumber;
    let saIdNumber = id;
    let passportNumber = passport;
    let businessRegistrationNumber = companyRegisterationNumber;
    let easyPayNumber = easypayTransactionNumber;

    const licenceData = await CartAPI.validateTVLicence({
      accountNumber: accountNumber,
      saIdNumber: saIdNumber,
      passportNumber: passportNumber,
      businessRegistrationNumber: businessRegistrationNumber,
      easyPayNumber: easyPayNumber,
      productCode: pCode,
    });
   
    if(licenceData!==undefined && licenceData !== null && licenceData.result !== undefined && licenceData.result !== null){
      let licenceValidation = licenceData.result;
      /* 0- Client Not Validate , 1= Client Validate Balance 0 , 2= Client Validate Balance due >0 */
      if (licenceValidation.res === 1) {
        setIsVerified(true);
        setValidateMessage(licenceValidation.message);
        setTimeout(cartCtx.fetchCart, 12000);
        onClickReset();
      } else if (licenceValidation.res === 2) {
        setIsVerified(false);
        setValidateMessage(licenceValidation.message);
      } else {
        setIsVerified(false);
        setValidateMessage(licenceValidation.message);
      }
    }
  };

  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  const preCheckLicence = async () => {
    const summary = await CartAPI.checkClientLicence();
    /* const summary = await fetch(`/api/authcart/checkClientLicence`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + authCtx.token,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((res) => res.json()); */

    if (
      summary !== undefined &&
      summary !== null &&
      summary.result !== undefined &&
      summary.result !== null
    ) {
      let licenceInfo = summary.result;
      if (licenceInfo.result === 1) {
        setTvLicenseNumber(licenceInfo.licenceData.TVLicenceNumber);
        setProductCode(licenceInfo.licenceData.TVLicenceType);
      }
    }
  };

  useEffect(() => {
    if (authCtx.isLoggedIn) {
      preCheckLicence();
    }
  }, []);

  const Ref = useRef<any>(null);

  const [timer, setTimer] = useState("00:00:00");

  const getTimeRemaining = (e: any) => {
    const total = Date.parse(e) - Date.parse(new Date().toString());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e: any) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  };

  const clearTimer = (e: any) => {
    setTimer("00:00:10");

    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();

    deadline.setSeconds(deadline.getSeconds() + 10);
    return deadline;
  };

  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);

  const onClickReset = () => {
    clearTimer(getDeadTime());
  };

  return (
    <>
      <Helmet>
        <title itemProp="name" lang="en">
          Delivery - SABC TV License required
        </title>
      </Helmet>

      <ComponentsHeader />
      <div className="my-3 my-xxl-4">
        <Stack className="gap-2 gap-sm-3">
          <section className="px-2">
            <Col md={{ span: 10, offset: 1 }}>
              <main className={`${styles.Main} p-2 p-sm-3`}>
                <div className="d-grid gap-2 gap-sm-3 cols-xxl-10">
                  <Stack
                    direction="horizontal"
                    className="gap-2 gap-sm-3 justify-content-between order-xxl-1 span-full"
                  >
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
                    <div></div>
                  </Stack>

                  <Card className={`p-2 p-sm-3 shadow order-xxl-1 span-xxl-8`}>
                    <div
                      className={`${styles.Products} ${styles.Scrollbar} d-lg-grid gap-3 h-100`}
                    >
                      {/*TV Licence Validation Card */}
                      <Card.Header>
                        <h2>SABC TV License required</h2>
                      </Card.Header>
                      <Card.Body>
                        {isVerified === "" || !isVerified ? (
                          <>
                            <p>
                              <small>
                                Please enter your details to allow us to link
                                your existing SABC TV license to this TV
                                purhase.
                              </small>
                            </p>
                            <p>
                              <small>
                                <span>Please note:</span> The linking of your TV
                                license is only valid for te next 24 hours.
                              </small>
                            </p>
                            <Form
                              onSubmit={(e) => {
                                verifyTVLicense(e);
                              }}
                            >
                              <Form.Group>
                                <Form.Label className="fw-2">
                                  Please select your TV License Type
                                </Form.Label>
                                <Form.Select
                                  aria-label="TV License Type"
                                  name="txtProductCode"
                                  id="txtProductCode"
                                  onChange={(e) => {
                                    setLicenseType(
                                      e.target.selectedOptions[0].text
                                    );
                                    setProductCode(e.target.value);
                                  }}
                                >
                                  <option>Select License Type</option>
                                  <option value="01">Business</option>
                                  <option value="07">Holiday Home</option>
                                  <option value="06">Dealer</option>
                                  <option value="07">Domestic</option>
                                </Form.Select>
                              </Form.Group>

                              {licenseType !== "Select License Type" ? (
                                <>
                                  <Card
                                    className={`${
                                      licenseType === "" ||
                                      licenseType === "Select License Type"
                                        ? "d-none"
                                        : ""
                                    } shadow p-3 mt-3`}
                                  >
                                    {licenseType === "Domestic" ||
                                    licenseType === "Holiday Home" ? (
                                      <Form.Group>
                                        <Form.Label>
                                          Your SA ID/Passport Number
                                        </Form.Label>

                                        <Form.Control
                                          type="text"
                                          placeholder="Your SA ID/Passport Number"
                                          aria-label="Your SA ID/Passport Number"
                                          defaultValue={
                                            id !== null && id.trim().length > 0
                                              ? id
                                              : passport !== null &&
                                                passport.trim().length > 0
                                              ? passport
                                              : ""
                                          }
                                          id="txtIDPassportNumber"
                                          name="txtIDPassportNumber"
                                          onChange={(e) => {
                                            checkIdPassport(e.target.value);
                                          }}
                                        />

                                        <Form.Text
                                          className={
                                            idPassError.includes("Valid")
                                              ? "text-success"
                                              : "text-danger"
                                          }
                                        >
                                          {idPassError.includes("Valid") ? (
                                            <FaCheck />
                                          ) : (
                                            <FaAsterisk />
                                          )}
                                          {idPassError}
                                        </Form.Text>
                                      </Form.Group>
                                    ) : null}

                                    {licenseType === "Business" ||
                                    licenseType === "Dealer" ? (
                                      <div className="d-grid cols-md-2 cols-xxl-3 gap-2 w-100">
                                        <Form.Group className="w-100">
                                          <Form.Label>
                                            Your TV License Number
                                          </Form.Label>

                                          <Form.Control
                                            type="text"
                                            placeholder="Your TV License Number"
                                            aria-label="Your TV License Number"
                                            name="txtLicenceNumber"
                                            id="txtLicenceNumber"
                                            value={tvLicenseNumber}
                                            onChange={(e) => {
                                              setTvLicenseNumber(
                                                e.target.value
                                              );
                                              checkTVLicense(e.target.value);
                                            }}
                                          />

                                          <Form.Text
                                            className={
                                              tvLicenseError.length === 0
                                                ? "text-success"
                                                : "text-danger"
                                            }
                                          >
                                            {tvLicenseError.length ===
                                            0 ? null : (
                                              <FaAsterisk />
                                            )}
                                            {tvLicenseError}
                                          </Form.Text>
                                        </Form.Group>

                                        <Form.Group className="">
                                          <Form.Label>
                                            Your Easypay Transaction Number
                                          </Form.Label>

                                          <Form.Control
                                            type="text"
                                            placeholder="Your Easypay Transaction Number"
                                            aria-label="Your Easypay Transaction Number"
                                            id="txtEasypayNumber"
                                            name="txtEasypayNumber"
                                            value={easypayTransactionNumber}
                                            onChange={(e) => {
                                              setEasypayTransactionNumber(
                                                e.target.value
                                              );
                                              checkEasyPayNumber(
                                                e.target.value
                                              );
                                            }}
                                          />

                                          <Form.Text
                                            className={
                                              easyPayError.length === 0
                                                ? "text-success"
                                                : "text-danger"
                                            }
                                          >
                                            {easyPayError.length ===
                                            0 ? null : (
                                              <FaAsterisk />
                                            )}
                                            {easyPayError}
                                          </Form.Text>
                                        </Form.Group>

                                        <Form.Group className="span-md-full span-xxl-1">
                                          <Form.Label>
                                            Your Company Registration Number
                                          </Form.Label>

                                          <Form.Control
                                            type="text"
                                            placeholder="Your Company Registration Number"
                                            aria-label="Your Company Registration Number"
                                            id="txtCompanyNumber"
                                            name="txtCompanyNumber"
                                            value={companyRegisterationNumber}
                                            onChange={(e) => {
                                              setCompanyRegistrationNumber(
                                                e.target.value
                                              );
                                              checkCompanyNumber(
                                                e.target.value
                                              );
                                            }}
                                          />

                                          <Form.Text
                                            className={
                                              companyNumError.length === 0
                                                ? "text-success"
                                                : "text-danger"
                                            }
                                          >
                                            {companyNumError.length ===
                                            0 ? null : (
                                              <FaAsterisk />
                                            )}
                                            {companyNumError}
                                          </Form.Text>
                                        </Form.Group>
                                      </div>
                                    ) : null}
                                  </Card>

                                  {checkInputsValid() ? (
                                    <Form.Group className="mt-3">
                                      <Button
                                        type="submit"
                                        id="btnVerify"
                                        name="btnVerify"
                                        variant="success"
                                      >
                                        Verify
                                      </Button>
                                    </Form.Group>
                                  ) : null}
                                </>
                              ) : null}
                            </Form>
                          </>
                        ) : null}

                        {isVerified !== "" ? (
                          isVerified ? (
                            <Alert
                              key="success"
                              variant="success"
                              className="mt-3"
                            >
                              <Alert.Heading>License Verified</Alert.Heading>
                              <p className="m-0">{validateMessage}</p>
                              <p className="m-0">
                                You may continue to Delivery, you will be
                                redirected to Delivery in {timer.slice(-2)}{" "}
                                seconds...
                              </p>
                            </Alert>
                          ) : (
                            <Alert
                              key="danger"
                              variant="danger"
                              className="mt-3"
                            >
                              <Alert.Heading>
                                License Verification Failed
                              </Alert.Heading>
                              <p className="m-0">{validateMessage}</p>
                              <p className="m-0">
                                Please confirm that all details are correct
                              </p>
                            </Alert>
                          )
                        ) : null}
                      </Card.Body>
                    </div>
                  </Card>

                  {/* Card Bottom Information */}
                  <p className="m-0 lh-1 order-xxl-2 span-full">
                    <small>
                      Placing an item in your shopping cart does not reserve
                      that item or price. We only reserve stock for your order
                      once payment is received.
                    </small>
                  </p>

                  {/*Summary Card*/}
                  <Card
                    className={`shadow order-xxl-1 ${
                      cartCtx.items.length > 0 ? "" : "d-none"
                    } span-xxl-2 overflow-hidden`}
                  >
                    <Stack gap={3}>
                      <Summary />

                      <div className="ms-auto px-2 px-sm-3">
                        <Link
                          href={props.ButtonLink}
                          title={props.ButtonTitle}
                          onClick={(e: any) => {
                            e.preventDefault();
                            if (authCtx.isLoggedIn) router.push("/delivery");
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
                          ${darkMode ? `text-light` : ``} 
                          p-2 p-sm-3 pt-0
                        `}
                      >
                        <h2
                          className={`
                            ${darkMode ? `text-light` : ``} 
                            fs-6 m-0
                          `}
                        >
                          I have a voucher or Promotional Code
                        </h2>
                        <Form>
                          <Stack gap={2}>
                            <Form.Control
                              type="text"
                              placeholder="Enter your voucher or promotional code below."
                            />
                            <div>
                              <Button variant="success" type="submit">
                                Redeem Code
                              </Button>
                              <span className="d-none"></span>
                            </div>
                          </Stack>
                        </Form>
                      </Stack>
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
                      authCtx.user.FirstName === "Imran" ? (
                        <Button
                          variant="primary"
                          onClick={() => setMakeQuotationShow(true)}
                        >
                          Make Quotation
                        </Button>
                      ) : null}

                      <MakeQuotation
                        show={makeQuotationShow}
                        onHide={() => setMakeQuotationShow(false)}
                      />
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
                        Evetech Solutions processes all orders daily Monday thru
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
                  />
                  <Image
                    fluid
                    src="https://www.evetech.co.za/repository/ProductImages/Microsoft-Q2-PC-Build-Custom-Banner-v1.jpg"
                    alt="Introducing Microsoft"
                  />
                </div>
              </div>
            </Col>
          </section>
        </Stack>
      </div>

      <div className="container">
        <Card></Card>
      </div>
    </>
  );
};

export default TVLicence;
