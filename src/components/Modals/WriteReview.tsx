"use client";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "@/styles/PriceMatch.module.scss";
import Swal from "sweetalert2";
import ListGroup from "react-bootstrap/ListGroup";
import { useTheme } from "@/store/ThemeContext";
import darkModalStyles from "@/styles/DarkModal.module.scss";
import darkFormStyles from "@/styles/DarkForm.module.scss";
import {
  isBodyDark,
  isDarkHeaderFooter,
  isInputDark,
  isSelectDark,
} from "../Auth/LoginModal";
const moment = require("moment");

const WriteReview = (props: any) => {
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

  const submitForm = async (event: any) => {
    event.preventDefault();
    const data: any = new FormData(event.target);
    const form = event.currentTarget;

    let fullName = data.get("name").trim();
    let reviewTitle = data.get("reviewTitle").trim();
    let stars = data.get("stars").trim();
    let ownership = data.get("ownership").trim();
    let techKnowledge = data.get("techKnowledge").trim();
    let pros = data.get("pros").trim();
    let cons = data.get("cons").trim();
    let otherThoughts = data.get("otherThoughts").trim();
    let isAccept = data.get("guideLinesCheck");

    if (isAccept !== null) {
      const reviewResp = await fetch("/api/util/writeReview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          pid: productId,
          ptype: productType,
          ptitle: productTitle,
          pmodal: productModalNo,
          pprice: productPrice,
          purl: productUrl,
          name: fullName,
          heading: reviewTitle,
          rStar: stars,
          tecLevel: techKnowledge,
          ownership: ownership,
          pros: pros,
          cons: cons,
          otherThoughts: otherThoughts,
          points: 0,
          aBy: "",
          added: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        }),
      }).then((res) => res.json());

      let reviewSubmited = reviewResp.status;
      let reviewEmailId = reviewResp.emailResp;
      if (reviewSubmited) {
        Swal.fire(
          "Yeh!",
          `Your rating has been successfully submitted!`,
          "success"
        );
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Problem Occured Please Try Again Later !",
        });
      }
    } else {
      Swal.fire(
        "Oops!",
        `Please read & accept Product Review Guidlines!`,
        "warning"
      );
    }
  };

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className={`
        ${darkMode ? darkFormStyles.main : ``}
      `}
      >
        <Modal.Header
          closeButton
          className={`
          ${darkMode ? darkModalStyles.darkHeader : ``}
          ${isDarkHeaderFooter(darkMode)}
        `}
        >
          <Modal.Title id="contained-modal-title-vcenter" className="lh-1">
            Write a review
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
                  >
                    <p className="m-0 lh-1">
                      <small className={styles.Small}>
                        <span
                          dangerouslySetInnerHTML={{ __html: productTitle }}
                        ></span>
                      </small>
                    </p>
                  </div>
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
                    Evetech.co.za&apos;s Product Ratings and Reviews feature
                    enables Evetech customers to help each other make informed
                    buying decisions.
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
                    <div className="d-flex justify-content-between align-items-center gap-1 flex-wrap span-full">
                      <h2 className="fs-5 m-0">Your Review Information</h2>
                      <span className="text-danger">
                        *Indicate required fields
                      </span>
                    </div>
                    <Form.Group controlId="formBasicName">
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
                    <Form.Group controlId="formBasicName">
                      <Form.Label>
                        <small>Review Title *</small>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Review Title"
                        name="reviewTitle"
                        required
                        className={`${isInputDark(darkMode)}`}
                      />
                    </Form.Group>
                    <div className="d-grid gap-2">
                      <Form.Select
                        aria-label="Overall Rating: *"
                        size="sm"
                        name="stars"
                        id="stars"
                        className={isSelectDark(darkMode)}
                      >
                        <option>Overall Rating</option>
                        <option value="1">1 star</option>
                        <option value="2">2 star</option>
                        <option value="3">3 star</option>
                        <option value="4">4 star</option>
                        <option value="5">5 star</option>
                      </Form.Select>
                      <Form.Select
                        aria-label="Ownership: *"
                        size="sm"
                        name="ownership"
                        id="ownership"
                        className={isSelectDark(darkMode)}
                      >
                        <option>Length of Ownership</option>
                        <option value="1">1 day</option>
                        <option value="2">1 day - 1 week</option>
                        <option value="3">1 week - 1 month</option>
                        <option value="4">1 month - 1 year</option>
                        <option value="5">more than 1 year</option>
                      </Form.Select>
                      <Form.Select
                        aria-label="Tech Knowledge: *"
                        size="sm"
                        name="techKnowledge"
                        id="techKnowledge"
                        className={isSelectDark(darkMode)}
                      >
                        <option>Level of knowledge</option>
                        <option value="1">1 - Low</option>
                        <option value="2">2 - Somewhat Low</option>
                        <option value="3">3 - Average</option>
                        <option value="4">4 - Somewhat High</option>
                        <option value="5">5 - High</option>
                      </Form.Select>
                    </div>
                    <Form.Group controlId="Pros">
                      <Form.Label>
                        <small>Pros:</small>
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        placeholder="Pros (max 300 char.)"
                        name="pros"
                        rows={4}
                        className={`
                          ${isInputDark(darkMode)} 
                          ${styles.Comments}
                        `}
                      />
                    </Form.Group>
                    <Form.Group controlId="Cons">
                      <Form.Label>
                        <small>Cons:</small>
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        placeholder="Cons (max 300 char.)"
                        name="cons"
                        rows={4}
                        className={`${isInputDark(darkMode)}`}
                      />
                    </Form.Group>
                    <Form.Group controlId="OtherThoughts">
                      <Form.Label>
                        <small>Other Thoughts:</small>
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        placeholder="Other Thoughts (max 300 char.)"
                        name="otherThoughts"
                        rows={4}
                        className={`${isInputDark(darkMode)}`}
                      />
                    </Form.Group>
                    <small className="span-full">
                      <Form.Check
                        inline
                        label="* I confirm that all the details are true and correct & Accept Product Review Guidelines."
                        name="guideLinesCheck"
                        type="checkbox"
                        id="guideLinesCheck"
                      />
                    </small>
                    <div className="span-full">
                      <Button type="submit" variant="success">
                        Submit Review
                      </Button>
                    </div>
                  </div>
                </Form>
              </div>
            </section>
            <section>
              <div className="bg-dark rounded p-2 text-light lh-1">
                <Stack gap={2}>
                  <h2 className="fs-5 m-0">Product Review Guidelines</h2>
                  <small>
                    <p>
                      Evetech.co.za reads all reviews before posting them and
                      reserves the right to deny any review. Here are some of
                      the things that can cause a review to be denied:
                    </p>
                    <ListGroup
                      variant="flush"
                      as="ol"
                      numbered
                      className="mb-3"
                    >
                      <ListGroup.Item className="bg-dark text-light border-bottom border-secondary">
                        Offensive or abusive language.
                      </ListGroup.Item>
                      <ListGroup.Item className="bg-dark text-light border-bottom border-secondary">
                        Prices and availability can change very quickly on the
                        Evetech.co.za website, so please leave such information
                        out of your review.
                      </ListGroup.Item>
                      <ListGroup.Item className="bg-dark text-light border-bottom border-secondary">
                        Hyperlinks / URLs.
                      </ListGroup.Item>
                      <ListGroup.Item className="bg-dark text-light border-bottom border-secondary">
                        References to other stores / resellers.
                      </ListGroup.Item>
                      <ListGroup.Item className="bg-dark text-light border-bottom border-secondary">
                        Replies to existing customer reviews; please do not
                        attempt to initiate discussions here.
                      </ListGroup.Item>
                      <ListGroup.Item className="bg-dark text-light border-bottom border-secondary">
                        Comparisons to competing brands / products of competing
                        brands.
                      </ListGroup.Item>
                      <ListGroup.Item className="bg-dark text-light border-bottom border-secondary">
                        References to aftermarket procedures or installation
                        techniques not mentioned specifically in the original
                        product documentation (overclocking, hacked drivers,
                        tweaking/modding, etc.)
                      </ListGroup.Item>
                      <ListGroup.Item className="bg-dark text-light border-bottom border-secondary">
                        Illegal content
                      </ListGroup.Item>
                      <ListGroup.Item className="bg-dark text-light border-bottom border-secondary">
                        Invasions of personal privacy
                      </ListGroup.Item>
                    </ListGroup>
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
    </>
  );
};

export default WriteReview;
