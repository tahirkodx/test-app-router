"use client";
import styles from "@/styles/AppFooter.module.scss";

import React, { useState } from "react";
import { Stack, Button, Form, InputGroup, Alert } from "react-bootstrap";
import Swal from "sweetalert2";
import { CmsAPI } from "@actions";

function EmailSignUp() {
  const [joinMessage, setJoinMessage] = useState("");
  const [joinVariant, setJoinVariant] = useState("danger");

  const subscribe = async (e: any) => {
    try {
      e.preventDefault();
      const data: any = new FormData(e.target);
      let email = data.get("joinemail").trim();
      if (email.length > 0 && /\S+@\S+\.\S+/.test(email)) {
        setJoinVariant("danger");
        setJoinMessage("");

        const joinResp = await CmsAPI.joinUs({
          email: email,
        });

        if (joinResp.result === 1) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: joinResp.message,
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire("Oops!", joinResp.message, "warning");
        }
      } else {
        setJoinVariant("warning");
        setJoinMessage("Please provide valid email.");
      }
    } catch (error: any) {
      console.error("Failed to Signup Email [EmailSignUp]:", error.message);
    }
  };

  return (
    <>
      <div className={`${styles.EmailSignUp}`}>
        <Form
          onSubmit={(e) => {
            subscribe(e);
          }}
        >
          <Stack gap={1}>
            {/* <h2 className={`${styles.Heading}`}>
              Be The First To Hear Our Exciting News
            </h2> */}
            {joinMessage.trim().length > 0 && (
              <Alert variant={joinVariant} show={joinMessage.trim().length > 0}>
                {joinMessage}
              </Alert>
            )}
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Your Email Address"
                aria-label="Your Email Address"
                aria-describedby="basic-addon2"
                type="email"
                name="joinemail"
              />
              <Button variant="success" type="submit" id="button-addon2">
                Join Us
              </Button>
            </InputGroup>
            {/* <hr className={`${styles.HR} rounded-pill`}></hr> */}
          </Stack>
        </Form>
      </div>
    </>
  );
}

export default EmailSignUp;
