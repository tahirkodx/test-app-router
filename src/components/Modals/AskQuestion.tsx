"use client";
import { useTheme } from "@/store/ThemeContext";
import React, { useRef, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import {
  isBodyDark,
  isDarkHeaderFooter,
  isInputDark,
} from "../Auth/LoginModal";
import darkModalStyles from "@/styles/DarkModal.module.scss";
import darkFormStyles from "@/styles/DarkForm.module.scss";

const _ = require("lodash");
function AskQuestion(props: any) {
  let product = props.product;
  const btnReset: any = useRef(null);

  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  const submitForm = async (event: any) => {
    event.preventDefault();
    const data: any = new FormData(event.target);
    // const form = event.currentTarget;

    let fullName = data.get("fullName").trim();
    let email = data.get("email").trim();
    let contactNo = data.get("contactNo").trim();
    let question = data.get("question").trim();
    let isAccept = data.get("accept");
    let saveConfigEmail = data.get("saveConfigEmail");
    let description = `<b>Product Question (${
      product.ptype === 3 ? "Laptop" : product.ptype === 2 ? "Component" : "PC"
    })</b> <br /><br />${fullName}<br /><br />Price: ${
      product.price
    } INC. VAT (Discounted Price)<br /><br /> Product URL: ${
      product.url
    } <br /> <br /> Customer Name: ${fullName} <br /> Email Address: ${email} <br /> Telephone: ${contactNo} <br /> Message: <br />${question}<br /><br /><p>${new Date().toLocaleString()}</p>`;

    if (
      ![fullName, email, contactNo, question].some(
        (str) => str.trim().length === 0
      )
    ) {
      const ticketResp = await fetch("/api/helpdesk/createTicket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ticketData: {
            name: fullName,
            email: email,
            phone: contactNo,
            subject: "Product Questions",
            description: description,
            status: 2,
            priority: 1,
            source: 2,
            type: "Sales",
            tags: ["Product Questions"],
          },
        }),
      }).then((res) => res.json());

      let ticket = ticketResp.result;
      if (ticket.id !== undefined) {
        Swal.fire(
          "Yeh!",
          `Your Question Submited! [Ticket No. ${ticket.id}]`,
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
          text: "Your Question is not Submited",
        });
      }
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
        <Modal.Title id="contained-modal-title-vcenter">
          Got a question? We&apos;re happy to help!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={`${isBodyDark(darkMode)}`}>
        <Form
          onSubmit={(event) => {
            submitForm(event);
          }}
        >
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Your Name"
              name="fullName"
              required
              className={`${isInputDark(darkMode)}`}
            />
          </Form.Group>
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
          <Form.Group className="mb-3" controlId="formBasicContact">
            <Form.Label>Contact No.</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Your Contact No."
              name="contactNo"
              required
              className={`${isInputDark(darkMode)}`}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicQuestion">
            <Form.Label>Question</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter Your Question"
              name="question"
              rows={4}
              required
              className={`${isInputDark(darkMode)}`}
            />
          </Form.Group>

          {/* name="chkSubscribe" */}
          {product.page === "config" ? null : (
            <span className="p-2">
              <Form.Check
                inline
                label="We periodically send out our special promotions by email. Please check this box if you want to receive them."
                name="accept"
                type="checkbox"
                id="inline-check-1"
                className=""
              />
            </span>
          )}

          {product.ptype !== 1 || product.page === "config" ? null : (
            <div className="bg-info bg-opacity-25 rounded p-2 mt-1">
              <Form.Check
                inline
                label="Save the configuration and email me the details"
                name="saveConfigEmail"
                type="checkbox"
                id="inline-check-2"
                className="w-100"
              />
            </div>
          )}

          <Row className="text-center p-3 d-sm-grid gap-2 gap-sm-3 cols-10">
            {/* <Button type='submit' className='btn btn-dark span-7' onClick={() => {props.resetFormState();}}> Send Now </Button> */}
            <Button type="submit" className="btn btn-dark span-7">
              Send Now
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
}

export default AskQuestion;
