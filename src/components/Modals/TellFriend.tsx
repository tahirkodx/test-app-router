import { CmsAPI } from "@/custom/utils/actions";
import { useTheme } from "@/store/ThemeContext";
import React from "react";
import { Button, Form, Modal, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import {
  isBodyDark,
  isDarkHeaderFooter,
  isInputDark,
} from "../Auth/LoginModal";
import darkModalStyles from "@/styles/DarkModal.module.scss";
import darkFormStyles from "@/styles/DarkForm.module.scss";
import Heading from "../Heading";

const TellFriend = (props: any) => {
  let productId = props.productid;
  let productTitle = props.producttitle;
  let productPrice = props.productprice;
  let productUrl = props.producturl;

  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  const submitForm = async (event: any) => {
    event.preventDefault();
    const data: any = new FormData(event.target);
    const form = event.currentTarget;

    let fullName = data.get("name").trim();
    let email = data.get("email").trim();
    let recipientEmail = data.get("rcptEmail").trim();
    let isAccept = data.get("chkAccept");
    let description = `<div style='font-family:Tahoma, Verdana, Arial; font-size:13px;'> Hi!<br /><br /> Your friend,<b> ${fullName} </b>, thought that you would be interested in<b> ${productTitle} </b> from Evetech.co.za.<br /><br /> <b>Standard Configuration</b><br /> <b>Discounted Price: ${productPrice} </b> <strong><span style='font-size: 8pt; color: #000000'> (Discounted Price - INC VAT)<br /> <span style='color: #ff0000'>Discount only available when pay by EFT or Cash</span><br /></span></strong> <br />To view the product click on the link below or copy and paste the link into your web browser: <br /><br /> ${productUrl} <br /><br /><b>Kind Regards</b> <br /> <b>The Evetech Sales Team</b> <br /> <br /> Evetech Customized System – Best Laptop Deals In South Africa. <br /> <b>Web: </b> <a  href='http://www.evetech.co.za'>www.evetech.co.za</a> <br /> <b>Email: </b> <a  href='mailto:sales@evetech.co.za'>sales@evetech.co.za</a> <br /> <b>Contact No: </b> 010 786 0044 - 012 653 2329 <br /> <b>Opening Hours: </b> Monday - Friday 9am - 4pm (Saturdays 9am - 12pm) <br /> <b>Facebook: </b> <a  href='facebook.com/evetech'>Facebook.com/evetech</a> <br /> <a href='http://www.evetech.co.za'><img src='https://www.evetech.co.za/repository/ProductImages/evetech-logo-v11.jpg' alt='Evetech.co.za' /></a> </div>`;

    const emailResp = await CmsAPI.tellFriend({
      name: fullName,
      email: email,
      recipientEmail: recipientEmail,
      description: description,
    });
    /*  const emailResp = await fetch("/api/util/tellFriend", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: fullName,
            email: email,
            recipientEmail: recipientEmail,
            description: description,
          }),
        }).then((res) => res.json()); */

    let emailSent = emailResp.result;
    if (emailSent.sent) {
      Swal.fire({
        icon: "success",
        title: "Yeh!",
        text: "Product Shared With Your Friend Successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(props.onHide(), 2000);
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
          Tell A Friend
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={`${isBodyDark(darkMode)}`}>
        <Heading level={3} className="fs-6">
          Please provide your name and email address. Your telephone number is
          optional.
        </Heading>
        <Form
          onSubmit={(event) => {
            submitForm(event);
          }}
        >
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Your Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Your Name"
              name="name"
              required
              className={`${isInputDark(darkMode)}`}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Your Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter Your Email"
              required
              className={`${isInputDark(darkMode)}`}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Recipients Email</Form.Label>
            <Form.Control
              type="email"
              name="rcptEmail"
              placeholder="Enter Recipients Email"
              required
              className={`${isInputDark(darkMode)}`}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formSubScribe">
            <Form.Check
              inline
              type="checkbox"
              name="chkAccept"
              id="inline-check-1"
              label="We periodically sends out our special promotions by email. Please check this box if you want to receive them."
            />
          </Form.Group>

          <Row className="text-center p-3">
            <Button
              type="submit"
              className={`btn ${
                darkMode ? `btn-primary text-light` : `btn-dark`
              }`}
            >
              Send Now
            </Button>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default TellFriend;
