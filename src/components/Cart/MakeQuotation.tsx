"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Form, Image, ListGroup, Modal } from "react-bootstrap";
import AuthContext from "@/store/auth-context";
import CopyToClipboard from "react-copy-to-clipboard";
import Swal from "sweetalert2";
import parse from "html-react-parser";
import styles from "@/styles/Cart/MakeQuotation.module.scss";
import useIsOverflow from "@/custom/hooks/useIsOverflow";
import { CartAPI } from "@/custom/utils/actions";
import { useTheme } from "@/store/ThemeContext";
import {
  isBodyDark,
  isDarkHeaderFooter,
  isInputDark,
} from "../Auth/LoginModal";
import darkFormStyles from "@/styles/DarkForm.module.scss";
import darkModalStyles from "@/styles/DarkModal.module.scss";
const _ = require("lodash");

const MakeQuotation = (props: any) => {
  const authCtx: any = useContext(AuthContext);
  const [showLoader, setShowLoader] = useState<any>(false);

  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  const currencyFormat = (num: any) => {
    try {
      return "R " + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    } catch (e) {
      return num;
    }
  };

  let eftPrice = currencyFormat(props.eftprice);
  let ccPrice = currencyFormat(Math.ceil(props.ccprice));
  let cartItems = props.items;

  const RenderName = (props: any) => {
    const [read, setRead] = useState(true);
    const ovDiv = useRef<any>();
    const isOverflow = useIsOverflow(ovDiv, () => {});
    const changeRead = () => {
      setRead(!read);
    };

    return (
      <span className="span-8">
        <div className="d-grid gap-1">
          <div
            className="overflow-hidden"
            style={{
              height: `${read ? `3.4rem` : `auto`}`,
            }}
            ref={ovDiv}
          >
            {parse(props.description.split("[+]")[0])}
          </div>
          {isOverflow ? (
            <div>
              <Button
                type="button"
                onClick={() => changeRead()}
                className={`
                  ${darkMode ? `text-light` : ``}
                  bg-gradient rounded-pill btn-sm shadow border-primary border-opacity-50 d-flex
                `}
                size="sm"
                variant=""
              >
                <small className="fw-2">
                  {read ? "Read More" : "Read Less"}
                </small>
              </Button>
            </div>
          ) : null}
        </div>
      </span>
    );
  };

  const setCartToQuotation = async () => {
    setShowLoader(true);
    let auth = JSON.parse(localStorage.getItem("user_auth") as string) || null;
    const cart2Quote = await CartAPI.setQuotation();
    /*  const cart2Quote = await fetch(`/api/authcart/setQuotation`, {
      method: "POST",
      headers: {
        Authorization:
          auth !== null && auth.token.length > 0
            ? "Bearer " + auth.token
            : "Bearer " + authCtx.token,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((res) => res.json()); */
    setShowLoader(false);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={() => {
        props.onHide();
      }}
    >
      <Modal.Header
        closeButton
        className={`
            ${darkMode ? darkModalStyles.darkHeader : ``}
            ${isDarkHeaderFooter(darkMode)}
          `}
      >
        <Modal.Title id="contained-modal-title-vcenter">
          Make a Quotation
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={isBodyDark(darkMode)}>
        <Form className="d-grid cols-2 gap-2">
          <Form.Group className="" controlId="quoteForm.currentDiscountPrice">
            <Form.Label>EFT Price</Form.Label>
            <Form.Control
              type="text"
              value={eftPrice}
              className={isInputDark(darkMode)}
            />
          </Form.Group>
          <Form.Group className="" controlId="quoteForm.creditCardPrice">
            <Form.Label>Credit Card Price</Form.Label>
            <Form.Control
              type="text"
              value={ccPrice}
              className={isInputDark(darkMode)}
            />
          </Form.Group>
          <Form.Group className="span-full" controlId="quoteForm.ID">
            <Form.Label>ID</Form.Label>
            <Form.Control
              type="text"
              value={authCtx.sessId}
              //   onChange={set("lname")}
              className={isInputDark(darkMode)}
            />
          </Form.Group>

          <h2 className="fs-5 m-0">Items</h2>
          <Form.Group className={`${styles.Items} span-full Scrollbar-01`}>
            <ListGroup>
              {_.map(cartItems, (item: any) => (
                <ListGroup.Item
                  className={
                    darkMode
                      ? `bg-dark text-light border-light border-opacity-50`
                      : ``
                  }
                >
                  <small>
                    <small>
                      <div className="cols-10 d-grid gap-3">
                        <span className="span-2">
                          <Image
                            src={item.imageUrl}
                            alt={item.alt}
                            className="w-100"
                          />
                        </span>
                        <RenderName description={item.desc} />
                        {/* <span className="span-8">{parse((item.desc).split("[+]")[0])}</span> */}
                      </div>

                      {item.freeStuff !== undefined &&
                      item.freeStuff.length > 0 ? (
                        <div className="pt-2 pb-1">
                          <div className="bg-secondary bg-opacity-10 p-2 rounded">
                            <small>
                              <div className="fw-3 text-danger">
                                FREE STUFF:
                              </div>
                              <ListGroup>
                                {_.map(item.freeStuff, (freeItem: any) => (
                                  <ListGroup.Item className={styles.FreeItem}>
                                    {parse(freeItem.des)}
                                  </ListGroup.Item>
                                ))}
                              </ListGroup>
                            </small>
                          </div>
                        </div>
                      ) : null}
                    </small>
                  </small>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Form.Group>

          <Form.Group className="span-full pt-1" controlId="quoteForm.Submit">
            <CopyToClipboard
              text={authCtx.sessId}
              onCopy={async () => {
                await setCartToQuotation().then((res) => {
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Session ID Copied Successfully",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                });
              }}
            >
              <Button variant="success">Copy ID</Button>
            </CopyToClipboard>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer
        className={`
          ${isDarkHeaderFooter(darkMode)}
        `}
      >
        <Button variant="secondary" onClick={() => props.onHide()}>
          Close
        </Button>
      </Modal.Footer>
      {showLoader && (
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
  );
};

export default MakeQuotation;
