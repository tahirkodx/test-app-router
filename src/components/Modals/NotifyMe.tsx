import { CmsAPI } from "@/custom/utils/actions";
import React from "react";
import { Button, Form, Modal, Row } from "react-bootstrap";
import Swal from "sweetalert2";


const NotifyMe = (props:any) => {
    let productId = props.productid;
    let productTitle = props.producttitle;
    let productUrl = props.producturl;
  
    const submitForm = async (event:any) => {
      event.preventDefault();
      const data:any = new FormData(event.target);
      const form = event.currentTarget;
  
      let fullName = data.get("name").trim();
      let email = data.get("email").trim();
      let contactNumber = data.get("contactNumber").trim();
  
      let description = `<div style='font-family:Tahoma, Verdana, Arial; font-size:13px;'><h1>Notify me</h1> <br><br> <b>Name:</b> ${fullName} <br><br> <b>Product:</b> ${productTitle} <br><br> <b>Product ID:</b> ${productId} <br><br> <b>Product URL:</b> ${productUrl} </div>`;
  
      /* const emailResp = await fetch("/api/util/notifyMe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: fullName,
          email: email,
          number: contactNumber,
          description: description,
        }),
      }).then((res) => res.json()); */

      const emailResp= await CmsAPI.notifyMe({
        name: fullName,
        email: email,
        number: contactNumber,
        description: description,
      });
  
      let emailSent = emailResp.result;
      if (emailSent.sent) {
        Swal.fire(
          "Yeh!",
          `Product Shared With Your Friend Successfully!`,
          "success"
        );
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Problem Occured Please Try Again Later !",
        });
      }
    };
  
    return (
      <>
        <Modal {...props} aria-labelledby="notify-me-modal" centered>
          <Modal.Header closeButton>
            <Modal.Title id="notify-me-title">Notify Me</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              onSubmit={(event) => {
                submitForm(event);
              }}
            >
              <Form.Group className="mb-3" controlId="formNotifyProduct">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  value={productTitle}
                  name="product"
                  readOnly
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formNotifyName">
                <Form.Label>Your Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Your Name"
                  name="name"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formNotifyEmail">
                <Form.Label>Your Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                  required
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formNotifyNumber">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="text"
                  name="contactNumber"
                  placeholder="Add Contact Number"
                  required
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>
  
              <Row className="text-center">
                <Form.Group controlId="formNotifyNumber">
                  <Button type="submit" className="btn btn-dark">
                    Notify Request
                  </Button>
                </Form.Group>
              </Row>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  };
  
  export default NotifyMe;
