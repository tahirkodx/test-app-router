"use client";
import { HelpDesk } from "@/custom/utils/actions";
import { useTheme } from "@/store/ThemeContext";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { FaCheck, FaInfoCircle, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import {
  isBodyDark,
  isDarkHeaderFooter,
  isInputDark,
} from "../Auth/LoginModal";
import darkModalStyles from "@/styles/DarkModal.module.scss";
import darkFormStyles from "@/styles/DarkForm.module.scss";

const ContactForm = (props: any) => {
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [contactComments, setContactComments] = useState("");
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  const clearForm = () => {
    setContactName("");
    setContactEmail("");
    setContactNumber("");
    setContactComments("");
  };

  const submitContactForm = async (event: any) => {
    let description = `
      <p>  
        <b>Customer Name:</b><br>
        ${contactName}
      </p>
      <p>  
        <b>Customer Email:</b><br>
        ${contactEmail}
      </p>
      <p>  
        <b>Customer Number:</b><br>
        ${contactNumber}
      </p>
      <p>  
        <b>Customer Comments:</b><br>
        ${contactComments}
      </p>
      <p>${new Date().toLocaleString()}</p>
    `;

    const ticketResp = await HelpDesk.createTicket({
      ticketData: {
        name: contactName,
        email: contactEmail,
        phone: contactNumber,
        subject: "Contact Us Enquiry",
        description: description,
        status: 2,
        priority: 1,
        source: 2,
        type: "Sales",
        tags: ["Contact Us"],
      },
    });

    let ticket = ticketResp.result;
    if (ticket.id !== undefined) {
      Swal.fire({
        icon: "success",
        title: "Yeh!",
        text: `Your query has been submitted! [Ticket No. ${ticket.id}] , we will get back to you as soon as possible.`,
      });
      clearForm();
      props.onHide();
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Your question is not submitted. Please try again",
      });
    }
  };

  const validateEmail = (email: any) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const contactFormValid = () => {
    if (
      contactName.length > 0 &&
      contactNumber.length === 10 &&
      validateEmail(contactEmail) &&
      contactComments.length > 0
    ) {
      return true;
    } else {
      return false;
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
          <Modal.Title id="contained-modal-title-vcenter">
            Contact Form
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={`${isBodyDark(darkMode)}`}>
          <Form>
            <Form.Group className="mb-3" controlId="contactName">
              <Form.Label>
                Name <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name here"
                required
                value={contactName}
                onChange={(event) => setContactName(event.target.value)}
                className={`${isInputDark(darkMode)}`}
              />
              <Form.Text className={darkMode ? `text-light` : ``}>
                {contactName.length === 0 ? (
                  <>
                    <span>Name is required</span>
                    <span className="text-danger">*</span>
                  </>
                ) : null}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="contactEmail">
              <Form.Label>
                Email address <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email here"
                required
                value={contactEmail}
                onChange={(event) => setContactEmail(event.target.value)}
                className={`${isInputDark(darkMode)}`}
              />
              <Form.Text className={darkMode ? `text-light` : ``}>
                {contactEmail.length === 0 ? (
                  <>
                    <span>Email is required</span>
                    <span className="text-danger">*</span>
                  </>
                ) : null}
                {validateEmail(contactEmail) ? (
                  <span className="text-success">
                    <FaCheck /> Email Address Valid
                  </span>
                ) : null}
                {!validateEmail(contactEmail) && contactEmail.length > 0 ? (
                  <span className="text-danger">
                    <FaTimes /> Email Address Not Valid
                  </span>
                ) : null}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="contactNumber">
              <Form.Label>
                Contact Number <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter contact number here"
                required
                value={contactNumber}
                onChange={(event) => setContactNumber(event.target.value)}
                className={`${isInputDark(darkMode)}`}
              />
              <Form.Text className={darkMode ? `text-light` : ``}>
                {contactNumber.length === 0 ? (
                  <>
                    <span>Contact Number required</span>
                    <span className="text-danger">*</span>
                  </>
                ) : null}
                {contactNumber.length < 10 && contactNumber.length > 0 ? (
                  <span className="text-danger">
                    <FaTimes /> Contact Number too short
                  </span>
                ) : null}
                {contactNumber.length === 10 ? (
                  <span className="text-success">
                    <FaCheck /> Valid Phone Number
                  </span>
                ) : null}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="contactComments">
              <Form.Label>
                How may we help you? <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Write querie here"
                required
                value={contactComments}
                onChange={(event) => setContactComments(event.target.value)}
                className={`${isInputDark(darkMode)}`}
              />
              <Form.Text className={darkMode ? `text-light` : ``}>
                {contactComments.length === 0 ? (
                  <span>
                    Comments are required<span className="text-danger">*</span>
                  </span>
                ) : null}
              </Form.Text>
            </Form.Group>
            {contactFormValid() ? (
              <Button
                variant="primary"
                className="googleBtn"
                onClick={submitContactForm}
              >
                Submit
              </Button>
            ) : (
              <span className="text-primary">
                <FaInfoCircle /> Please fill in all fields with valid
                information
              </span>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer className={`${isDarkHeaderFooter(darkMode)}`}>
          <Button onClick={props.onHide} className="googleBtn">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ContactForm;
