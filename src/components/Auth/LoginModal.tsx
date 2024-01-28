"use client";
import React, { useContext } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import AuthContext from "@/store/auth-context";
import { useRef } from "react";
import { useState } from "react";
import { Alert, InputGroup } from "react-bootstrap";
import {
  FaEye,
  FaEyeSlash,
  FaHandPointUp,
  FaMailBulk,
  FaMailchimp,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { nanoid } from "nanoid";
import CartContext from "@/store/ncart-context";
import { useRouter } from "next/navigation";
import axios from "axios";
import { AuthAPI } from "@/custom/utils/actions";
import { useTheme } from "@/store/ThemeContext";
import darkFormStyles from "@/styles/DarkForm.module.scss";
import darkModalStyles from "@/styles/DarkModal.module.scss";

const moment = require("moment");

export const isDarkHeaderFooter = (darkMode) =>
  darkMode
    ? `bg-black bg-gradient text-white border-secondary border-opacity-50`
    : ``;

export const isInputDark = (darkMode) =>
  darkMode
    ? `bg-secondary bg-opacity-25 border-secondary border-opacity-75 text-light`
    : ``;

export const isSelectDark = (darkMode) =>
  darkMode ? `bg-dark border-secondary border-opacity-75 text-light` : ``;

export const isEyeDark = (darkMode) =>
  darkMode
    ? `bg-secondary bg-opacity-50 border-secondary border-opacity-75 text-light`
    : ``;

export const isBodyDark = (darkMode) => (darkMode ? `bg-black text-white` : ``);

export const isTextLinkDark = (darkMode) =>
  darkMode ? `text-info` : `text-primary`;

export const wasTextDark = (darkMode) =>
  darkMode ? `text-light text-opacity-50` : `text-secondary`;

export const wasText = `text-decoration-line-through text-wrap`;
export const highlightText = `rgb(235, 63, 148)`;

function LoginModal(props: any) {
  const router = useRouter();

  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [details, setDetails] = useState(null);
  const [variant, setVariant] = useState("danger");
  const [message, setMessage] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showForgetPassword, setShowForgetPassword] = useState(false);
  const [forgotMessage, setForgotMessage] = useState("");
  const [forgotVariant, setForgotVariant] = useState("danger");
  const [ip, setIP] = useState("");
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  const HideForgetPass = () => setShowForgetPassword(false);
  const ShowForgetPass = () => setShowForgetPassword(true);

  const getUserGeolocationDetails = () => {
    /*  axios
      .get(
        "https://geolocation-db.com/json/0f761a30-fe14-11e9-b59f-e53803842572"
      )
      .then((response) => {
        let res = response?.data;
        if (res !== undefined) setDetails(res);
      }); */
  };

  const getIPData = () => {
    axios.get("https://api.ipify.org/?format=json").then((response) => {
      console.log();
      let res = response.data;
      if (res !== undefined) setIP(res.ip);
    });

    /*  fetch("https://api.ipify.org/?format=json")
      .then((response) => response.json())
      .then((res) => {
        setIP(res.ip);
      }); */
  };

  useEffect(() => {
    getUserGeolocationDetails();
    getIPData();
  }, []);

  const loginClick = async () => {
    if (email.trim().length > 0 && password.trim().length > 0) {
      const users = await AuthAPI.userLogin({
        authData: { email: email, password: password },
      });
      // const usersData = await fetch(`/api/userLogin`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Accept: "application/json",
      //   },
      //   body: JSON.stringify({
      //     authData: { email: email, password: password },
      //   }),
      // }).then((res) => {
      //   res.json().then((users) => {
      if (users?.result) {
        let user = users.result;
        if (user !== null && user !== undefined && user.id !== undefined) {
          setMessage("");
          /*     let token = user.authToken;
            localStorage.setItem("token", token); */
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: users.message,
            showConfirmButton: false,
            timer: 1500,
          });
          authCtx
            .onLogin({
              isLoggedIn: true,
              isAdmin: user.isAdmin,
              token: user.authToken,
              user: user,
              iat: moment().unix(),
              exp: moment(new Date()).add(2, "hours").unix(),
            })
            .then((res) => {
              console.log("Fetch Cart After Login");
              cartCtx.fetchCart();
              // router.refresh();
            });
          /* cartCtx.updateCarId(user.authToken); */
        } else {
          handleMessage(
            "danger",
            users?.message || "Please provide valid email & password."
          );
        }
      } else {
        handleMessage(
          "danger",
          users?.message || "Please provide valid email & password."
        );
      }
      //   });
      // });
    } else {
      handleMessage("warning", "Please provide valid email & password.");
    }
  };
  const handleMessage = (variant: string, message: string) => {
    setVariant(variant);
    setMessage(message);
  };
  const requestPasswordReset = async (e: any) => {
    e.preventDefault();
    const data: any = new FormData(e.target);
    const form = e.currentTarget;
    let email = data.get("forgotEmail").trim();
    if (email.length > 0 && /\S+@\S+\.\S+/.test(email)) {
      setForgotVariant("danger");
      setForgotMessage("");

      const forgotResp = await fetch("/api/util/requestResetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: email,
          ip: ip,
        }),
      }).then((res) => res.json());

      if (forgotResp.result) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: forgotResp.message,
          showConfirmButton: false,
          timer: 1500,
        });
        HideForgetPass();
      } else {
        Swal.fire("Oops!", forgotResp.message, "error");
      }
    } else {
      setForgotVariant("warning");
      setForgotMessage("Please provide valid email.");
    }
  };

  useEffect(() => {
    setShowModal(props.show);
  }, [props.show]);

  useEffect(() => {
    if (authCtx.showLogin) {
      setShowModal(true);
      authCtx.onShowLogin(false);
    }
  }, [authCtx.showLogin]);

  return (
    <>
      <Modal
        /* {...props} */
        show={showModal}
        // size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => {
          setShowModal(false);
          props.onHide();
          setVariant("");
          setMessage("");
        }}
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
          <Modal.Title id="contained-modal-title-vcenter">Login</Modal.Title>
        </Modal.Header>
        <Modal.Body className={isBodyDark(darkMode)}>
          {message.trim().length > 0 && (
            <Alert
              key={nanoid(3)}
              variant={variant}
              show={message.trim().length > 0}
            >
              {message}
            </Alert>
          )}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            {/* <Form.Label>Username</Form.Label> */}
            <Form.Control
              type="email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              placeholder="Email"
              className={isInputDark(darkMode)}
            />
          </Form.Group>

          <InputGroup className="mb-3">
            <Form.Control
              type={showPass ? "text" : "password"}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              placeholder="Password"
              className={isInputDark(darkMode)}
            />
            {showPass ? (
              <InputGroup.Text
                id="basic-addon1"
                onClick={() => {
                  setShowPass(false);
                }}
                className={`${isEyeDark(darkMode)} cursor-pointer`}
              >
                <FaEyeSlash />
              </InputGroup.Text>
            ) : (
              <InputGroup.Text
                id="basic-addon1"
                onClick={() => {
                  setShowPass(true);
                }}
                className={`${isEyeDark(darkMode)} cursor-pointer`}
              >
                <FaEye />
              </InputGroup.Text>
            )}
          </InputGroup>

          <Button variant="primary" onClick={loginClick} type="submit">
            Login
          </Button>
        </Modal.Body>
        <Modal.Footer className={`${isDarkHeaderFooter(darkMode)}`}>
          <Button
            variant="secondary"
            onClick={() => {
              ShowForgetPass();
              setShowModal(false);
              props.onHide();
            }}
          >
            Forgot Password
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setShowModal(false);
              props.onHide();
              props.setRegisterShow(true);
            }}
          >
            Sign Up
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        centered
        show={showForgetPassword}
        onHide={HideForgetPass}
        className={darkMode ? darkFormStyles.main : ``}
      >
        <Modal.Header
          closeButton
          className={`
            ${darkMode ? darkModalStyles.darkHeader : ``}
            ${isDarkHeaderFooter(darkMode)}
          `}
        >
          <Modal.Title>Forgot Password</Modal.Title>
        </Modal.Header>
        <Modal.Body
          className={`
          ${isBodyDark(darkMode)}
        `}
        >
          {forgotMessage.trim().length > 0 && (
            <Alert
              key={nanoid(3)}
              variant={forgotVariant}
              show={forgotMessage.trim().length > 0}
            >
              {forgotMessage}
            </Alert>
          )}
          <Form
            onSubmit={(event) => {
              requestPasswordReset(event);
            }}
          >
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                <small>
                  <small className="fw-2 f-14">
                    Enter your registered email address below and we&apos;ll
                    send you a new password.
                  </small>
                </small>
              </Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text
                  id="email-group"
                  className={isEyeDark(darkMode)}
                >
                  <FaMailBulk />
                </InputGroup.Text>
                <Form.Control
                  type="email"
                  name="forgotEmail"
                  placeholder="Enter Your Registered Email"
                  className={isInputDark(darkMode)}
                />
              </InputGroup>
            </Form.Group>
            <Button variant="primary" type="submit">
              Send Password
            </Button>
          </Form>
        </Modal.Body>

        <Modal.Footer
          className={`
            ${isDarkHeaderFooter(darkMode)}
          `}
        >
          <Button
            variant="secondary"
            onClick={() => {
              HideForgetPass();
              setShowModal(true);
            }}
          >
            Login
          </Button>
          <Button variant="secondary" onClick={() => HideForgetPass()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LoginModal;
