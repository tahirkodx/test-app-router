import React, { useState } from "react";
import styles from "@/styles/ProductFooter.module.scss";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import {
  FaShoppingBasket,
  FaCartPlus,
  FaExclamationCircle,
} from "react-icons/fa";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Badge from "react-bootstrap/Badge";
import Swal from "sweetalert2";

import { useRouter } from "next/navigation";
import { CmsAPI, ProductAPI } from "@/custom/utils/actions";
import { useTheme } from "@/store/ThemeContext";
import FancyPrice from "../FancyPrice";
import { Image } from "react-bootstrap";
import darkFormStyles from "@/styles/DarkForm.module.scss";
import darkModalStyles from "@/styles/DarkModal.module.scss";
import {
  isBodyDark,
  isDarkHeaderFooter,
  isInputDark,
} from "../Auth/LoginModal";

const ProductFooter = (props: any) => {
  const [showLoad, setLoad] = useState(false);
  const [showSave, setShowSave] = useState(false);
  const [showConfig, setConfig] = useState(false);
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  const closeLoad = () => setLoad(false);
  const closeConfig = () => setConfig(false);
  const closeSave = () => setShowSave(false);

  const handleLoad = () => setLoad(true);
  const handleConfig = () => setConfig(true);
  const handleSave = () => setShowSave(true);
  const [loader, setLoader] = useState(false);
  const [lvalues, setLvalues] = useState({
    name: "",
    email: "",
    contactNumber: "",
    isSubscribe: true,
  });
  const router = useRouter();

  let ProductData = props.product;

  const Ptype = props.Ptype !== undefined ? props.Ptype : 2;
  const currencyFormat = (num: any) => {
    try {
      return "R " + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    } catch (e) {
      return num;
    }
  };

  const set = (name: any) => {
    try {
      return ({ target: { value } }) => {
        setLvalues((oldValues) => ({ ...oldValues, [name]: value }));
      };
    } catch (e) {}
  };

  const addToCart = (event: any) => {
    props.onAddToCart(event);
  };

  const loadConfig = (e: any) => {
    e.preventDefault();
    const data: any = new FormData(e.target);
    const form = e.currentTarget;
    let ConfigNo = data !== null ? data.get("ConfigNo").trim() : "";
    if (ConfigNo.length > 0 && !isNaN(ConfigNo)) {
      router.push(`/config/${ConfigNo}`);
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Enter Valid Config Number.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const saveConfig = async (e: any) => {
    e.preventDefault();
    let bundles = props.selecetedItems;
    let totalPrice = props.TotalPrice;
    let pc = props.product;

    if (
      ![lvalues.email, lvalues.name, lvalues.contactNumber].some(
        (str) => str.trim().length === 0
      )
    ) {
      const summary = await ProductAPI.saveConfig({
        configData: lvalues,
        pcData: pc,
        bundlesInfo: bundles,
        totalPrice: totalPrice,
      });

      /* await fetch(`/api/saveConfig`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            configData: lvalues,
            pcData: pc,
            bundlesInfo: bundles,
            totalPrice: totalPrice,
          }),
        }).then((res) => res.json()); */

      let configSummary = summary;
      if (configSummary !== null && configSummary.result.configNo > 0) {
        setLoader(false);
        Swal.fire({
          position: "center",
          icon: "success",
          title: configSummary.message,
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          setShowSave(false);
        }, 2000);
      } else {
        setLoader(false);
        Swal.fire({
          position: "center",
          icon: "error",
          title: configSummary.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      setLoader(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: darkMode ? `rgb(23, 23, 23)` : ``,
      }}
      className={`
        ${styles.Footer} 
        ${props.classes} 
        ${darkMode ? `` : `bg-light`} 
        py-2 px-1
      `}
    >
      <Container>
        <div
          className={`d-grid gap-2 ${
            Ptype === 1 ? "cols-6 cols-md-5" : "cols-2 justify-content-center"
          }`}
        >
          <div
            className={`d-flex flex-wrap align-items-center ${
              Ptype === 1 ? "span-3 span-md-2" : null
            }`}
          >
            {Ptype !== 1 ? (
              <Badge
                pill
                bg={
                  props.stockstatus !== undefined &&
                  props.stockstatus.toLowerCase() !== "in stock with evetech"
                    ? "danger"
                    : "success"
                }
                className={`me-2`}
              >
                <span className={`fw-2`}>{props.stockstatus}</span>
              </Badge>
            ) : null}

            {props.showdiscountedprice !== undefined &&
            props.showdiscountedprice ? (
              <>
                <div
                  className={`d-flex align-items-center me-1 ${
                    Ptype === 1 ? "gap-2" : "flex-wrap"
                  }`}
                >
                  <div
                    className={`${styles.Price} fw-2 text-danger ${
                      Ptype !== 1 ? "me-1" : null
                    } `}
                  >
                    <FancyPrice price={props.TotalPrice} />
                  </div>
                  {/* <small>Inc. VAT</small> */}
                </div>
              </>
            ) : null}

            {Ptype === 1 ? (
              <Button
                variant={darkMode ? `outline-info` : `outline-primary`}
                className={`text-grey text-decoration-none d-flex cursor-pointer p-1 px-2 shadow`}
                onClick={() => props.toggleIsBundleOpen()}
                title={`${props.collapseText} Bundles`}
                size="sm"
              >
                <small>
                  <small>{props.collapseText}</small>
                </small>
              </Button>
            ) : null}
          </div>

          <div
            className={`${Ptype === 1 ? "span-3 span-md-1" : "d-flex gap-2"}`}
          >
            {Ptype !== 1 &&
            props.stockstatus !== undefined &&
            props.stockstatus.toLowerCase() !== "out of stock" &&
            props.showaddcart !== undefined &&
            props.showaddcart ? (
              <Button
                variant="warning"
                className={`w-100 ${styles.Button}`}
                onClick={addToCart}
              >
                <FaCartPlus className={`me-1`} />
                <span className={`d-md-none`}>Add</span>
                <span className={`d-none d-md-inline`}>Add to Cart</span>
              </Button>
            ) : null}

            {Ptype === 1 &&
            props.showaddcart &&
            props.selecetedItems !== undefined &&
            props.selecetedItems.length > 0 ? (
              <Button
                variant="warning"
                className={`w-100 ${styles.Button} ${styles.PcAdd}`}
                onClick={addToCart}
              >
                <FaCartPlus className={`me-1`} />
                <span className={`d-md-none`}>Add</span>
                <span className={`d-none d-md-inline`}>Add to Cart</span>
              </Button>
            ) : null}

            {props.showbuynow !== undefined &&
              props.showbuynow &&
              props.stockstatus !== undefined &&
              props.stockstatus.toLowerCase() !== "out of stock" && (
                <ButtonGroup aria-label="Basic example" className={`w-100`}>
                  <Button
                    variant="warning"
                    className={`${styles.BuyBtn} w-100 text-dark lh-small ${
                      Ptype === 1 ? "p-0" : styles.Button
                    }`}
                    onClick={(e) => {
                      addToCart(e);
                      router.push("/Cart");
                    }}
                  >
                    Buy Now
                  </Button>
                  <Button variant="success" className={``}>
                    <FaShoppingBasket />
                  </Button>
                </ButtonGroup>
              )}

            {props.stockstatus !== undefined &&
            props.stockstatus.toLowerCase() === "out of stock" &&
            props.showNotify !== undefined &&
            props.showNotify ? (
              <Button
                variant="light"
                className="p-0 fs-6 w-100 border-danger shadow-sm overflow-hidden d-flex"
                onClick={props.onOpenNotify}
              >
                <div className="p-1 fw-2 text-light bg-danger w-100 d-flex align-items-center justify-content-center">
                  <small>
                    <div className="d-flex flex-wrap gap-1 align-items-center justify-content-center">
                      <FaExclamationCircle /> <span>Notify Me</span>
                    </div>
                  </small>
                </div>
                <div className="bg-danger bg-opacity-25 text-dark p-1 w-100 lh-1 d-flex align-items-center justify-content-center">
                  <small>
                    <small>When product is available</small>
                  </small>
                </div>
              </Button>
            ) : null}
          </div>

          {Ptype === 1 &&
          ProductData.Status !== undefined &&
          ProductData.Status === 1 &&
          props.showaddcart &&
          props.selecetedItems !== undefined &&
          props.selecetedItems.length > 0 ? (
            <>
              {props.showloadconfiglink ? (
                <div className={`span-3 span-md-1`}>
                  <Button
                    variant={darkMode ? `outline-light` : `dark`}
                    className={`w-100`}
                    onClick={handleLoad}
                  >
                    Load Config
                  </Button>
                </div>
              ) : null}
              {props.showsaveconfiglink ? (
                <div className={`span-3 span-md-1`}>
                  <Button
                    variant="info"
                    className={`w-100`}
                    onClick={handleSave}
                  >
                    Save Config
                  </Button>
                </div>
              ) : null}
            </>
          ) : null}
        </div>
      </Container>

      {Ptype === 1 &&
      ProductData.Status !== undefined &&
      ProductData.Status === 1 &&
      props.showaddcart &&
      props.selecetedItems !== undefined &&
      props.selecetedItems.length > 0 ? (
        <>
          <Modal
            className={`
              ${darkMode ? darkFormStyles.main : ``}
            `}
            show={showLoad}
            onHide={closeLoad}
            centered
          >
            <Modal.Header
              closeButton
              className={`
                ${darkMode ? darkModalStyles.darkHeader : ``}
                ${isDarkHeaderFooter(darkMode)}
              `}
            >
              <Modal.Title>Load my configuration</Modal.Title>
            </Modal.Header>
            <Modal.Body className={`${isBodyDark(darkMode)}`}>
              <Form
                onSubmit={(event) => {
                  loadConfig(event);
                }}
              >
                <Row>
                  <Form.Text
                    className={`${
                      darkMode ? `text-light opacity-50` : `text-muted`
                    }  mb-3`}
                  >
                    Please enter your Unique Customisation ID in order to
                    retrieve your personalised Custom PC configuration.
                  </Form.Text>
                  <Form.Group className="mb-3" controlId="LoadConfig.ID">
                    <Form.Label>Configuration ID: </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Enter ConfigId Here"
                      name="ConfigNo"
                      autoFocus
                      className={isInputDark(darkMode)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Button variant="primary" type="submit">
                      Load Config
                    </Button>
                  </Form.Group>
                </Row>
              </Form>
            </Modal.Body>
          </Modal>

          <Modal
            className={`
              ${darkMode ? darkFormStyles.main : ``}
            `}
            show={showSave}
            onHide={closeSave}
            centered
            size="lg"
          >
            <Modal.Header
              closeButton
              className={`
                ${darkMode ? darkModalStyles.darkHeader : ``}
                ${isDarkHeaderFooter(darkMode)}
              `}
            >
              <Modal.Title>Save Configuration</Modal.Title>
            </Modal.Header>
            <Modal.Body className={`${isBodyDark(darkMode)}`}>
              <Form
                onSubmit={(e) => {
                  setLoader(true);
                  saveConfig(e);
                }}
              >
                <Row>
                  <Form.Text
                    className={`${
                      darkMode ? `text-light opacity-50` : `text-muted`
                    }  mb-3`}
                  >
                    Please enter the details below to generate a Unique
                    Customisation ID to save your specification and send it to
                    your email account. You will be able to then use your
                    Customisation ID in order to retrieve/update your
                    personalised configuration at a later time.
                  </Form.Text>
                  <Form.Group className="mb-3" controlId="saveConfig.Name">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Your Name"
                      name="name"
                      value={lvalues.name}
                      onChange={set("name")}
                      autoFocus
                      className={isInputDark(darkMode)}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="saveConfig.EmailAddress"
                  >
                    <Form.Label>Your Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Your Email"
                      name="emailAddress"
                      value={lvalues.email}
                      onChange={set("email")}
                      className={isInputDark(darkMode)}
                    />
                  </Form.Group>
                  <Form.Group controlId="saveConfig.ContactNumber">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Your Number"
                      name="contactNumber"
                      value={lvalues.contactNumber}
                      onChange={set("contactNumber")}
                      className={isInputDark(darkMode)}
                    />
                  </Form.Group>
                  <Form.Text className="mb-3">
                    We periodically sends out our special promotions by email.
                    Please check this box if you want to receive them.
                  </Form.Text>
                  <div className="mb-3">
                    <Form.Check
                      type="checkbox"
                      id="emailSignUp"
                      name="emailSignUp"
                      label="We periodically sends out our special promotions by email. Please check this box if you want to receive them."
                      defaultChecked={lvalues.isSubscribe}
                      onChange={set("isSubscribe")}
                    />
                  </div>
                </Row>
                <Button variant="primary" type="submit">
                  Save & Email
                </Button>
              </Form>
            </Modal.Body>
            {loader && (
              <div
                className={`${styles.Loader} position-absolute w-100 h-100 left-0 bottom-0 d-flex align-items-center justify-content-center flex-column rounded bg-black bg-opacity-75`}
              >
                <Image
                  src="https://www.evetech.co.za/repository/ProductImages/loading.gif"
                  alt="loader"
                  className={`${styles.Loader__image} rounded-circle img-fluid`}
                />
                <div className={`text-light mt-2 fs-5`}>...SENDING...</div>
              </div>
            )}
          </Modal>
        </>
      ) : null}
    </div>
  );
};

export default ProductFooter;
