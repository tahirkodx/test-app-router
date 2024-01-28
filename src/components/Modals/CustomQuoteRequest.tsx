"use client";
import { HelpDesk } from "@/custom/utils/actions";
import { useTheme } from "@/store/ThemeContext";
import React, { useRef } from "react";
import { Col, Form, FormFloating, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import darkFormStyles from "@/styles/DarkForm.module.scss";
import darkModalStyles from "@/styles/DarkModal.module.scss";
import {
  isBodyDark,
  isDarkHeaderFooter,
  isInputDark,
} from "../Auth/LoginModal";

const CustomQuoteRequest = (props: any) => {
  let product = props.product;
  const btnReset = useRef<any>(null);

  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  const submitForm = async (event: any) => {
    event.preventDefault();
    const data: any = new FormData(event.target);
    const form = event.currentTarget;

    let name = data.get("name").trim();
    let companyName = data.get("companyName").trim();
    let email = data.get("email").trim();
    let contactNumber = data.get("contactNumber").trim();
    let deliveryAddress = data.get("deliveryAddress").trim();
    let forGaming = data.get("forGaming");
    let forHomeOffice = data.get("forHomeOffice");
    let forGraphics = data.get("forGraphics");
    let forInternet = data.get("forInternet");
    let targetBudget = data.get("targetBudget").trim();
    let productDetails = data.get("productDetails").trim();
    let otherNotes = data.get("otherNotes").trim();
    let description = `
          <h2>Custom Quote Request</h2> 
          <br />
          <b>Customer Name:</b> ${name}
          <br />
          <b>Company Name:</b> ${companyName}
          <br />
          <b>Email Address:</b> ${email} 
          <br />
          <b>Telephone:</b> ${contactNumber} 
          <br />
          <b>Delivery Address:</b> ${deliveryAddress} 
          <br />
          <b>I am using this Computer for:</b> 
          / ${forGaming !== null ? "Gaming" : ""} 
          / ${forHomeOffice !== null ? "Home and PC" : ""} 
          / ${forGraphics !== null ? "Graphics" : ""} 
          / ${forInternet !== null ? "Internet" : ""}
          <br />
          <b>My Target Budget is:</b> ${targetBudget}
          <br /><br />
          <b>Product Details:</b><br>
          ${productDetails}
          <br /><br />
          <b>Other Notes:</b><br>
          ${otherNotes}
          <br /><br />
          <b>Quote Request sent from: </b><br>
          ${product.name}<br />
          Product URL - ${product.url}
    
          <p>${new Date().toLocaleString()}</p>
        `;

    if (
      ![
        name,
        companyName,
        email,
        contactNumber,
        deliveryAddress,
        targetBudget,
        productDetails,
        otherNotes,
      ].some((str) => str.trim().length === 0)
    ) {
      const ticketResp = await HelpDesk.tellFriend({
        ticketData: {
          name: name,
          companyName: companyName,
          email: email,
          phone: contactNumber,
          deliveryAddress: deliveryAddress,
          targetBudget: targetBudget,
          productDetails: productDetails,
          otherNotes: otherNotes,
          subject: "Custom Quote Request",
          description: description,
          status: 2,
          priority: 1,
          source: 2,
          type: "Sales",
          tags: ["Custom Quote Request"],
        },
      });

      let ticket = ticketResp.result;
      if (ticket.id !== undefined) {
        Swal.fire(
          "Yeh!",
          `Your Request Submited! [Ticket No. ${ticket.id}]`,
          "success"
        );
        btnReset.current.dispatchEvent(
          new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: true,
            buttons: 1,
          })
        );
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Your Request is not Submited",
        });
      }
      /* const ticketResp = await fetch("/api/helpdesk/createTicket", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              ticketData: {
                name: name,
                companyName: companyName,
                email: email,
                phone: contactNumber,
                deliveryAddress: deliveryAddress,
                targetBudget: targetBudget,
                productDetails: productDetails,
                otherNotes: otherNotes,
                subject: "Custom Quote Request",
                description: description,
                status: 2,
                priority: 1,
                source: 2,
                type: "Sales",
                tags: ["Custom Quote Request"],
              },
            }),
          }).then((res) => res.json());
    
          */
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all required fileds!",
      });
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={`${darkMode ? darkFormStyles.main : ``}`}
    >
      <Modal.Header
        closeButton
        className={`
          ${darkMode ? darkModalStyles.darkHeader : ``}
          ${isDarkHeaderFooter(darkMode)}
        `}
      >
        <Modal.Title id="contained-modal-title-vcenter">
          Custom Quote Request
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={`${isBodyDark(darkMode)}`}>
        <p>
          If you want to request a custom desktop pc price quotation, Evetech is
          ready to assist you with both component selection and assembly. Be it
          Desktop PC or Gaming computer, price will present you with the best
          possible options at the moment. Computer system prices vary largely
          depending on the inside components and the looks of the system. We
          would like to know your needs and goals for purchasing a custom
          computer so we can give you the best custom pc price available. Our
          customers have been using the price quote request and found it very
          helpful in deciding on a system they want to purchase. Hassle free and
          very pleasant, our technical sales staff will analyze your custom
          system quote and reply to you with suggestions and price offerings.
        </p>
        <Form
          onSubmit={(event) => {
            submitForm(event);
          }}
        >
          <h6 className="">Contact Information</h6>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Your Name"
                  name="name"
                  required
                  className={`${isInputDark(darkMode)}`}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formCompanyName">
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Your Company Name"
                  name="companyName"
                  required
                  className={`${isInputDark(darkMode)}`}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Your Email"
                  name="email"
                  required
                  className={`${isInputDark(darkMode)}`}
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicContact">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Your Contact No."
                  name="contactNumber"
                  required
                  className={`${isInputDark(darkMode)}`}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Form.Group className="mb-3" controlId="formBasicAddress">
              <Form.Label>Delivery Address.</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Your Delivery Address."
                name="deliveryAddress"
                required
                className={`${isInputDark(darkMode)}`}
              />
            </Form.Group>
          </Row>
          <h6 className="">Request Details</h6>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicUsing">
                <Form.Label>I will be using this Computer for:</Form.Label>
                <Row className="d-flex">
                  <Col>
                    <Form.Check
                      type="checkbox"
                      id="Gaming"
                      label="Gaming"
                      value="Gaming"
                      name="forGaming"
                    />
                    <Form.Check
                      type="checkbox"
                      id="HomeOffice"
                      label="Home & Office"
                      value="Home&Office"
                      name="forHomeOffice"
                    />
                    <Form.Check
                      type="checkbox"
                      id="Grapics"
                      label="Graphics"
                      value="Graphics"
                      name="forGraphics"
                    />
                    <Form.Check
                      type="checkbox"
                      id="Internet"
                      label="Internet"
                      value="Internet"
                      name="forInternet"
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formTargetBudget">
                <Form.Label>Target Budget</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Your Taget Budget"
                  name="targetBudget"
                  required
                  className={`${isInputDark(darkMode)}`}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicProduct">
                <Form.Label>Product Details</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Product Details"
                  name="productDetails"
                  rows={4}
                  required
                  className={`${isInputDark(darkMode)}`}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formOtherNotes">
                <Form.Label>Other Notes</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter Other Notes"
                  name="otherNotes"
                  rows={4}
                  required
                  className={`${isInputDark(darkMode)}`}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="text-center p-3 d-sm-grid gap-2 gap-sm-3 cols-10">
            <Button type="submit" className="btn btn-dark span-7">
              Send Quote Request
            </Button>
            <Button
              variant="warning"
              type="reset"
              className="span-3"
              ref={btnReset}
            >
              Reset
            </Button>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CustomQuoteRequest;
