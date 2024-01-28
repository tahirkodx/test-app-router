"use client";
import React, { useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import useIsOverflow from "@/custom/hooks/useIsOverflow";
import styles from "@/styles/PriceMatch.module.scss";
import { CmsAPI } from "@/custom/utils/actions";
import darkModalStyles from "@/styles/DarkModal.module.scss";
import darkFormStyles from "@/styles/DarkForm.module.scss";
import { useTheme } from "@/store/ThemeContext";
import {
  isBodyDark,
  isDarkHeaderFooter,
  isInputDark,
} from "../Auth/LoginModal";
const moment = require("moment");

const PriceMatch = (props: any) => {
  let productTitle = props.producttitle;
  let productPrice = props.productprice;
  let productUrl = props.producturl;
  let productModalNo = props.productmodalno;
  let productType = props.producttype;
  let productId = props.productid;

  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  const ovDiv = useRef(null);
  const isOverflow = useIsOverflow(ovDiv, () => {});

  const submitForm = async (event: any) => {
    event.preventDefault();
    const data: any = new FormData(event.target);
    const form = event.currentTarget;

    let fullName = data.get("name").trim();
    let email = data.get("email").trim();
    let contactNo = data.get("contactNo").trim();
    let foundPrice = data.get("foundPrice").trim();
    let priceSource = data.get("priceSource").trim();
    let comments = data.get("comments").trim();
    let isAccept = data.get("guideLinesCheck");
    let subject = `Price Match Request (${
      productType === "3" ? "Laptop" : productType === "2" ? "Component" : "PC"
    })`;
    let pType = productType;
    let description = ` <div style='font-family:Tahoma, Verdana, Arial; font-size:15px;'>Price Match Request for: <br /><br /><b>${productTitle}</b><br /><br /> <b>Modal No: </b> ${productModalNo} <br /> <b>Our Price: </b> ${productPrice} <br /> <br /> <b>Name: </b> ${fullName} <br /> <b>Email: </b> ${email} <br /> <b>Contact No: </b> ${contactNo} <br /> <b>Request price: </b> ${foundPrice} <br /> <b>Company Info: </b> ${priceSource} <br /> <b>Comments: </b> ${comments} <br /> <b>Date & Time: </b> ${moment(
      new Date()
    ).format(
      "YYYY-MM-DD HH:mm:ss"
    )} <br /> <b>Product URL:</b> ${productUrl.replace(
      "~",
      "http://www.evetech.co.za"
    )} </div> `;

    // <b>IP Address: </b>  /* use getIp Api */
    // ${Helper.GetClientIP(Page)}
    // <br />
    const emailResp = await CmsAPI.pricematch({
      email: email,
      description: description,
      subject: subject,
      productId: productId,
    });
    /* const emailResp = await fetch("/api/util/pricematch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: email,
          description: description,
          subject: subject,
          productId: productId,
        }),
      }).then((res) => res.json()); */

    let emailSent = emailResp.result[0];
    if (emailSent.sent) {
      Swal.fire("Yeh!", `Price Match Request Sent Successfully!`, "success");
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Problem Occured Please Try Again Later !",
      });
    }
  };

  return (
    <Modal
      {...props}
      className={`
        ${darkMode ? darkFormStyles.main : ``}
      `}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header
        closeButton
        className={`
          ${darkMode ? darkModalStyles.darkHeader : ``}
          ${isDarkHeaderFooter(darkMode)}
        `}
      >
        <Modal.Title id="contained-modal-title-vcenter" className="lh-1">
          Price Match Request - Find it Cheaper?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={`${isBodyDark(darkMode)}`}>
        <Stack gap={4}>
          <section>
            <Stack gap={2}>
              <div className="d-grid gap-1">
                <h3 className="fs-6 m-0">Product Description</h3>
                <div
                  className={`${styles.Description} ${
                    isReadMore ? styles.Closed : styles.Open
                  } overflow-hidden`}
                  ref={ovDiv}
                >
                  <p className="m-0 lh-1">
                    <small className={styles.Small}>
                      <span
                        dangerouslySetInnerHTML={{ __html: productTitle }}
                      ></span>
                    </small>
                  </p>
                </div>
                {isOverflow && (
                  <div>
                    <Button
                      variant={darkMode ? `` : `light`}
                      className={`
                        ${
                          darkMode
                            ? `text-info border-secondary border-opacity-50`
                            : `text-primary`
                        } 
                        shadow border py-0 bg-gradient
                      `}
                      onClick={toggleReadMore}
                    >
                      <small>{isReadMore ? "Read More" : "Read Less"}</small>
                    </Button>
                  </div>
                )}
              </div>
              <div className="d-flex gap-2">
                <p className="m-0 d-flex flex-wrap lh-1 gap-1">
                  <span className="fw-2">Modal No: </span>
                  <span className="m-0 lh-1">
                    <small>{productModalNo}</small>
                  </span>
                </p>
                <p className="m-0 d-flex flex-wrap lh-1 gap-1">
                  <span className="fw-2">Price: </span>
                  <span className="m-0 lh-1">
                    <small>R {productPrice}</small>
                  </span>
                </p>
              </div>
              <p className="m-0 lh-1">
                <small>
                  Evetech is dedicated to always offering the best value to the
                  customers.
                </small>
              </p>
            </Stack>
          </section>
          <section>
            <div className="d-grid gap-2">
              <Form
                onSubmit={(event) => {
                  submitForm(event);
                }}
              >
                <div className="d-grid gap-2 cols-sm-2">
                  <div className="d-flex justify-content-between align-items-center gap-1 flex-wrap span-full order-lg-1">
                    <h2 className="fs-5 m-0">
                      Your Price Match Request Information
                    </h2>{" "}
                    <span className="text-danger">
                      *Indicate required fields
                    </span>
                  </div>
                  <Form.Group controlId="formBasicName" className="order-lg-2">
                    <Form.Label>
                      <small>Your Name *</small>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Your Name"
                      name="name"
                      required
                      className={`${isInputDark(darkMode)}`}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail" className="order-lg-3">
                    <Form.Label>
                      <small>Your Email *</small>
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter Your Email"
                      required
                      className={`${isInputDark(darkMode)}`}
                    />
                    <Form.Text className="text-muted"></Form.Text>
                  </Form.Group>
                  <Form.Group
                    controlId="formBasicContact"
                    className="order-lg-4"
                  >
                    <Form.Label>
                      <small>Contact No. *</small>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Your Contact No."
                      name="contactNo"
                      required
                      className={`${isInputDark(darkMode)}`}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicPrice" className="order-lg-6">
                    <Form.Label>
                      <small>Price you found it for *</small>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Found Price"
                      name="foundPrice"
                      required
                      className={`${isInputDark(darkMode)}`}
                    />
                    <Form.Text className="text-danger">
                      <span className="fw-2">Our Price: </span>R {productPrice}
                    </Form.Text>
                  </Form.Group>
                  <Form.Group
                    controlId="formBasicWeb"
                    className="span-full span-lg-1 order-lg-7"
                  >
                    <Form.Label>
                      <small>
                        Web address (or company name) selling for that price: *
                      </small>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Where did you find the selling price?"
                      name="priceSource"
                      required
                      className={`${isInputDark(darkMode)}`}
                    />
                  </Form.Group>
                  <Form.Group
                    controlId="formBasicComments"
                    className="span-full order-lg-5 span-lg-1 spany-lg-2"
                  >
                    <Form.Label>
                      <small>Comments (Optional):</small>
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="Additional Comments"
                      name="comments"
                      rows={4}
                      required
                      className={`
                        ${isInputDark(darkMode)} 
                        ${styles.Comments}
                      `}
                    />
                  </Form.Group>
                  <small className="span-full order-lg-8 span-lg-1">
                    <Form.Check
                      inline
                      label="* I confirm that all the details are true and correct & Accept Price Match Guidelines."
                      name="guideLinesCheck"
                      type="checkbox"
                      id="guideLinesCheck"
                    />
                  </small>
                  <div className="span-full order-lg-9">
                    <Button type="submit" variant="success">
                      Submit Price Match
                    </Button>
                  </div>
                </div>
              </Form>
            </div>
          </section>
          <section>
            <div className="bg-dark rounded p-2 text-light lh-1">
              <Stack gap={2}>
                <h2 className="fs-5 m-0">Price Match Guidelines</h2>
                <small>
                  <p>
                    Evetech makes every effort to offer the best products
                    available at the best prices. We offer a price match feature
                    on our website to easily submit a website you would like us
                    to review for price matching. It is at EVETECH sole
                    discretion on whether to price match another company.
                  </p>
                  <p>
                    <span className="text-decoration-underline">
                      EVETECH MAKES NO GUARANTEES OF PRICE MATCH
                    </span>
                    and reviews many factors on what is being provided by a
                    competitor to our company along with our cost on the item in
                    question.
                  </p>
                  <p>
                    Please fill out the form and we will get right back to you!
                    You may also call our Sales Department at 010 786 0044 if
                    you have any questions. Although we cannot match every price
                    we will do our best and get right back to you.
                  </p>
                  <p>
                    Come to us last with your quote! If we cannot beat it, then
                    you already have the best price and it is a good buy.
                  </p>
                  <p>
                    The item will be &ldquo;like&ldquo; for &ldquo;like&ldquo; ,
                    and we are not able to quote on products we do not supply.
                  </p>
                  <p>
                    Our company will never compromise on quality, and we do not
                    provide quotes on products we know are sub-standard, are an
                    inferior product or are grey imports, but will provide an
                    alternative that does not have known issues, even if it is
                    more expensive.
                  </p>
                  <p>
                    We may change these policies at any time without notice.
                  </p>
                </small>
              </Stack>
            </div>
          </section>
        </Stack>
      </Modal.Body>
    </Modal>
  );
};

export default PriceMatch;
