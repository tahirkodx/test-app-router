"use client";
import { nanoid } from "nanoid";
import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

import { Button, Modal, Form, Row, Col, Accordion } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { FcCheckmark } from "react-icons/fc";
import Swal from "sweetalert2";
import RegValLabel from "@/components/RegisterModal/RegValLabel";
import styles from "@/styles/ProductFooter.module.scss";
import { CmsAPI } from "@actions";
import { Image } from "react-bootstrap";
import { useTheme } from "@/store/ThemeContext";
import {
  isBodyDark,
  isDarkHeaderFooter,
  isInputDark,
  isSelectDark,
} from "./LoginModal";
import darkModalStyles from "@/styles/DarkModal.module.scss";
import darkFormStyles from "@/styles/DarkForm.module.scss";
import UserAPI from "@/custom/utils/actions/user";

const _ = require("lodash");
function RegisterModal(props: any) {
  const [states, setStates]: any = useState([]);
  const [cities, setCities]: any = useState([]);
  const [suburbs, setSuburbs]: any = useState([]);
  const [postCode, setPostCode]: any = useState([]);
  const [suburbData, setSuburbData]: any = useState([]);
  const [filterCities, setFilterCities]: any = useState([]);
  const [slctSuburbs, setSlctSuburbs]: any = useState([]);
  const [slctPostCode, setSlctPostCode]: any = useState([]);
  const [isValidAdd, setIsValidAdd]: any = useState(null);
  const [logCredErr, setLogCredErr]: any = useState("");
  const [passValid, setPassValid]: any = useState(false);
  const [confirmPass, setConfirmPass]: any = useState(false);
  const [emailValid, setEmailValid]: any = useState(false);
  const [fNameValid, setFNameValid]: any = useState(false);
  const [lNameValid, setLNameValid]: any = useState(false);
  const [confirmAddress, setConfirmAddress]: any = useState(false);
  const [companyNameValid, setCompanyNameValid]: any = useState(false);
  const [vatNoValid, setVatNoValid]: any = useState(false);
  const [regNoValid, setRegNoValid]: any = useState(false);
  const [contactPersonValid, setContactPersonValid]: any = useState(false);
  const [contactNumberValid, setContactNumberValid]: any = useState(false);

  const renderMenuItemChildren = (option, props, index) => (
    <div className="my-custom-option">
      <span className="my-custom-option-text">{option}</span>
    </div>
  );

  // const [suburbValid, setSuburbValid] = useState(false);
  // const [suburbValText, setSuburbValTxt] = useState("Required");
  const [contactNoValid, setContactNoValid]: any = useState(false);
  const [showLoader, setShowLoader]: any = useState(false);
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  const stateRef: any = useRef();
  const [values, setValues]: any = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    country: "1",
    state: "1",
    city: "0",
    suburb: "",
    postcode: "",
    contactno: "",
    companyName: "",
    vatNo: "",
    registrationNo: "",
    contactPerson: "",
    contactNumber: "",
    isSubscirbe: true,
  });

  const set = (name: any) => {
    try {
      return ({ target: { value } }: any) => {
        setValues((oldValues: any) => ({ ...oldValues, [name]: value }));
      };
    } catch (e) {}
  };

  useEffect(() => {
    const getState = async () => {
      const summary = await CmsAPI.getState();
      let citySumm = summary?.result;
      if (citySumm) {
        setStates(citySumm);
      }
    };

    const getCities = async () => {
      const summary = await CmsAPI.getCities();
      let userSumm = summary?.result;
      if (userSumm) {
        setCities(userSumm);
      }
      setFilterCities((preCity: any) => {
        preCity =
          states.length > 0
            ? _.map(
                _.filter(cities, (city: any) => {
                  if (city.State === _.first(states).State) return city;
                }),
                (city: any) => {
                  return city;
                }
              )
            : userSumm;

        return preCity;
      });
    };

    getState();
    getCities();
  }, []);

  useEffect(() => {
    changeState();
  }, [values.state]);

  useEffect(() => {
    try {
      setValues((prevStat: any) => {
        prevStat.suburb = _.first(slctSuburbs);
        return prevStat;
      });
    } catch (e) {}
  }, [slctSuburbs]);

  useEffect(() => {
    try {
      setValues((prevStat: any) => {
        prevStat.postcode = _.first(slctPostCode);
        return prevStat;
      });
    } catch (e) {}
  }, [slctPostCode]);
  const getSuburbs = async (city: any) => {
    const summary = await CmsAPI.getSuburbs({ city });
    let suburbRes = summary?.result;
    if (suburbRes) {
      setSuburbData(suburbRes);
    }
  };
  useEffect(() => {
    /* get Suburbs */
    if (values.city) {
      getSuburbs(values.city);
    }
  }, [values.city]);

  useEffect(() => {
    if (suburbData?.length > 0) {
      setPostCode(
        _.map(suburbData, (suburb: any) => {
          return suburb.pcode;
        })
      );

      setSuburbs(
        _.uniq(
          _.map(suburbData, (suburb: any) => {
            return suburb.area;
          })
        )
      );
    }
  }, [suburbData]);

  const changeState = () => {
    if (stateRef.current !== undefined) {
      try {
        setFilterCities(
          _.map(
            _.filter(cities, (city: any) => {
              if (city.State === stateRef.current.value) return city;
            }),
            (city: any) => {
              return city;
            }
          )
        );
      } catch (e) {}
    }
  };

  const validateEmail = (email: any) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const checkValidateEmail = (email: any) => {
    if (email.length === 0) {
      setEmailValid(false);
    } else {
      if (validateEmail(email)) {
        setEmailValid(true);
      } else {
        setEmailValid(false);
      }
    }
  };

  const checkContactNo = (contact: any) => {
    if (
      contact.length === 0 ||
      contact.length < 10 ||
      contact.length > 10 ||
      isNaN(contact)
    ) {
      setContactNoValid(false);
    }
    if (contact.length === 10) {
      setContactNoValid(true);
    }
  };

  const isPasswordValid = (password: any) => {
    const passLayout =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!#+?&])[A-Za-z\d@$!#+?&]{8,16}$/;

    if (password.length === 0) {
      setPassValid(false);
    } else {
      if (passLayout.test(password)) {
        setPassValid(true);
      } else {
        setPassValid(false);
      }
    }

    return passLayout.test(password);
  };

  // const validateTextInput = (input: any) => {
  //   const regex = /^[a-zA-Z]{2,25}$/;
  //   return regex.test(input);
  // };

  const validateMultiWord = (input: any) => {
    const regex = /^[a-zA-Z ]{3,25}$/;
    return regex.test(input);
  };

  // const checkSuburb = (suburb) => {
  //   if (suburb.length === 0) {
  //     setSuburbValid(false);
  //     setSuburbValTxt("Required");
  //   } else {
  //     if (validateMultiWord(suburb)) {
  //       setSuburbValid(true);
  //       setSuburbValTxt("Valid");
  //     } else {
  //       setSuburbValid(false);
  //       setSuburbValTxt("Invalid");
  //     }
  //   }
  // };

  const checkFName = (Name: any) => {
    if (Name.length === 0) {
      setFNameValid(false);
    } else {
      if (validateMultiWord(Name)) {
        setFNameValid(true);
      } else {
        setFNameValid(false);
      }
    }
  };

  const checkLName = (Name: any) => {
    if (Name.length === 0) {
      setLNameValid(false);
    } else {
      if (validateMultiWord(Name)) {
        setLNameValid(true);
      } else {
        setLNameValid(false);
      }
    }
  };

  const isConfirmPass = (pass1: any, pass2: any) => {
    if (pass1.length === 0) {
      setConfirmPass(false);
    } else {
      if (pass1 === pass2) {
        setConfirmPass(true);
      } else {
        setConfirmPass(false);
      }
    }
  };

  const checkAddress = (address: any) => {
    if (address.length > 7 && address.length < 255) {
      setConfirmAddress(true);
    } else {
      setConfirmAddress(false);
    }
  };

  const checkCompanyName = (Name: any) => {
    if (Name.length > 0) {
      setCompanyNameValid(true);
    } else {
      setCompanyNameValid(false);
    }
  };

  const checkVatNo = (vatNo: any) => {
    if (vatNo.length > 0) {
      setVatNoValid(true);
    } else {
      setVatNoValid(false);
    }
  };

  const checkRegNo = (regNo: any) => {
    if (regNo.length > 0) {
      setRegNoValid(true);
    } else {
      setRegNoValid(false);
    }
  };

  const checkContactPerson = (Name: any) => {
    if (Name.length === 0) {
      setContactPersonValid(false);
    } else {
      if (validateMultiWord(Name)) {
        setContactPersonValid(true);
      } else {
        setContactPersonValid(false);
      }
    }
  };

  const checkContactNumber = (contact: any) => {
    if (
      contact.length === 0 ||
      contact.length < 10 ||
      contact.length > 10 ||
      isNaN(contact)
    ) {
      console.log("length", contact.length);
      setContactNumberValid(false);
    }
    if (contact.length === 10) {
      setContactNumberValid(true);
    }
  };

  useEffect(() => {
    try {
      if (
        values.address.length > 0 &&
        values.city.length > 0 &&
        values.state.length > 0 &&
        values.suburb.length > 0 &&
        values.postcode.length > 0 &&
        values.contactno.length > 0
      )
        setIsValidAdd(<FcCheckmark />);
      else setIsValidAdd(null);
    } catch (e) {}

    try {
      if (
        values.email.length > 0 &&
        values.password.length > 0 &&
        values.confirmPassword.length > 0
      )
        setLogCredErr(null);
      else setLogCredErr(null);
    } catch (e) {}
  }, [values]);

  const submitForm = async (event: any) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const form = event.currentTarget;

    let validPassword = false;
    if (
      values.password !== undefined &&
      values.confirmPassword !== undefined &&
      values.password === values.confirmPassword &&
      isPasswordValid(values.password) &&
      isPasswordValid(values.confirmPassword)
    ) {
      validPassword = true;
    }

    let passwordFormatRight = false;
    if (
      isPasswordValid(values.password) &&
      isPasswordValid(values.confirmPassword)
    ) {
      passwordFormatRight = true;
    }

    if (
      ![
        values.fname,
        values.lname,
        values.address,
        values.city,
        values.postcode,
        values.suburb,
        values.contactno,
        values.email,
      ].some((str) => str.trim().length === 0) &&
      validPassword &&
      passwordFormatRight &&
      emailValid &&
      fNameValid &&
      lNameValid &&
      contactNoValid &&
      confirmAddress
    ) {
      setShowLoader(true);
      const summary = await UserAPI.registerUser({
        regData: values,
      })

      let regSummary = summary;
      if (regSummary !== undefined && regSummary !==null &&  regSummary.result !== undefined && regSummary.result !==null && regSummary.result.isRegister) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: regSummary.message,
          showConfirmButton: false,
          timer: 1500,
        });
        setValues({
          fname: "",
          lname: "",
          email: "",
          password: "",
          confirmPassword: "",
          address: "",
          country: "1",
          state: "GAUTENG",
          city: "0",
          suburb: "",
          postcode: "",
          contactno: "",
          companyName: "",
          vatNo: "",
          registrationNo: "",
          contactPerson: "",
          contactNumber: "",
          isSubscirbe: true,
        });
        setSlctSuburbs([]);
        setSlctPostCode([]);
        /* Redirect to Login Page */
        props.onHide();
        props.setLoginShow(true);
        /* Hide Regiter Modal */
        /* Show Login Modal */
        /* btnReset.current.dispatchEvent(
          new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: true,
            buttons: 1,
          })
        ); */
      } else {
        Swal.fire("Oops!", regSummary.message, "error");
      }
      
      setShowLoader(false);
    } else {
      Swal.fire({
        icon: "error",
        title: passwordFormatRight ? "Oops..." : "Weak Password",
        text:
          validPassword && passwordFormatRight
            ? "Please fill all required fields!"
            : passwordFormatRight
            ? "Password and Confirm password must be the same."
            : "Please read password requirements.",
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
        <Modal.Title id="contained-modal-title-vcenter">Register</Modal.Title>
      </Modal.Header>
      <Modal.Body className={`${isBodyDark(darkMode)}`}>
        <Form
          onSubmit={(event) => {
            submitForm(event);
          }}
        >
          <Row>
            <Col sm>
              <Form.Group className="mb-3" controlId="firstName">
                <RegValLabel
                  label="First Name"
                  validator={fNameValid}
                  mainValue={values.fname}
                />
                <Form.Control
                  type="text"
                  value={values.fname}
                  onChange={set("fname")}
                  onBlur={() => {
                    checkFName(values.fname);
                  }}
                  className={isInputDark(darkMode)}
                />
                {values.fname.length > 0 && (
                  <Form.Text>
                    {values.fname.length < 2 ? (
                      <span className="text-danger">Name too short</span>
                    ) : null}
                    {values.fname.length > 25 ? (
                      <span className="text-danger">Name too long</span>
                    ) : null}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>

            <Col sm>
              <Form.Group className="mb-3" controlId="lastName">
                <RegValLabel
                  label="Last Name"
                  validator={lNameValid}
                  mainValue={values.lname}
                />
                <Form.Control
                  type="text"
                  value={values.lname}
                  onChange={set("lname")}
                  onBlur={() => {
                    checkLName(values.lname);
                  }}
                  className={isInputDark(darkMode)}
                />
                {values.lname.length > 0 && (
                  <Form.Text>
                    {values.lname.length < 2 ? (
                      <span className="text-danger">Name too short</span>
                    ) : null}
                    {values.lname.length > 25 ? (
                      <span className="text-danger">Name too long</span>
                    ) : null}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
          </Row>

          <Accordion
            className={`${darkMode ? darkModalStyles.Accordion : ``} mb-3`}
            defaultActiveKey={["0"]}
          >
            <Accordion.Item eventKey="0">
              <Accordion.Header>Login Details {}</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Form.Text
                    className={`${
                      darkMode ? `text-light opacity-50` : `text-muted`
                    } mb-3`}
                  >
                    Please enter your e-mail address and password. You will be
                    required to enter this e-mail address anytime you need to
                    login to your Evetech.co.za account.
                  </Form.Text>

                  <Form.Group className="mb-3" controlId="email">
                    <RegValLabel
                      label="Email Address"
                      validator={emailValid}
                      mainValue={values.email}
                    />
                    <Form.Control
                      type="email"
                      value={values.email}
                      onChange={set("email")}
                      onBlur={() => checkValidateEmail(values.email)}
                      className={`${isInputDark(darkMode)}`}
                    />
                  </Form.Group>

                  <Col sm>
                    <Form.Group className="mb-3" controlId="password">
                      <RegValLabel
                        label="Password"
                        validator={passValid}
                        mainValue={values.password}
                      />
                      <Form.Control
                        type="password"
                        value={values.password}
                        onChange={set("password")}
                        onBlur={(e) => {
                          isPasswordValid(e.target.value);
                          isConfirmPass(
                            values.confirmPassword,
                            values.password
                          );
                        }}
                        className={`${isInputDark(darkMode)}`}
                      />
                    </Form.Group>
                  </Col>

                  <Col sm>
                    <Form.Group className="mb-3" controlId="confirmPassword">
                      <RegValLabel
                        label="Confirm Password"
                        validator={confirmPass}
                        mainValue={values.confirmPassword}
                      />
                      <Form.Control
                        type="password"
                        value={values.confirmPassword}
                        onChange={set("confirmPassword")}
                        onBlur={() => {
                          isConfirmPass(
                            values.confirmPassword,
                            values.password
                          );
                        }}
                        className={`${isInputDark(darkMode)}`}
                      />
                    </Form.Group>
                  </Col>

                  <Form.Text
                    className={`${
                      darkMode ? `text-light opacity-50` : `text-muted`
                    } mb-2`}
                  >
                    <small>
                      <span
                        className={`${
                          darkMode ? `text-light opacity-100` : `text-dark`
                        } fw-3`}
                      >
                        Password Requirement:
                      </span>{" "}
                      Minimum 8 and maximum 16 characters, at least one
                      uppercase letter, one lowercase letter, one number and one
                      special character ( allowed special characters are
                      @,$,!,#,+,?,& ).
                    </small>
                  </Form.Text>
                </Row>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>Shipping Details {isValidAdd}</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Form.Group className="mb-3" controlId="address">
                    <RegValLabel
                      label="Address"
                      validator={confirmAddress}
                      mainValue={values.address}
                    />
                    <Form.Control
                      type="text"
                      value={values.address}
                      onChange={set("address")}
                      onBlur={() => checkAddress(values.address)}
                      className={`${isInputDark(darkMode)}`}
                    />
                  </Form.Group>

                  <Col sm={6}>
                    <Form.Group
                      controlId="country"
                      className={`
                        
                        mb-3
                      `}
                    >
                      <Form.Label>Country</Form.Label>
                      <Form.Select
                        aria-label="Select Country"
                        value={values.country}
                        onChange={set("country")}
                        className={`${
                          darkMode
                            ? `bg-secondary text-light border-secondary border-opacity-75`
                            : ``
                        }`}
                      >
                        <option value="South Africa">South Africa</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col sm={6}>
                    <Form.Group
                      controlId="state"
                      className={`
                        ${isSelectDark(darkMode)} 
                        mb-3
                      `}
                    >
                      <Form.Label>State</Form.Label>
                      <Form.Select
                        aria-label="Select State"
                        ref={stateRef}
                        onChange={set("state")}
                        value={values.state}
                        className={`${
                          darkMode
                            ? `bg-secondary text-light border-secondary border-opacity-75`
                            : ``
                        }`}
                      >
                        {_.map(states, (state: any) => {
                          return <option key={nanoid(3)}>{state.State}</option>;
                        })}
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col sm={6}>
                    <Form.Group
                      controlId="city"
                      className={`
                        ${isSelectDark(darkMode)} 
                        mb-3
                      `}
                    >
                      <Form.Label>City</Form.Label>
                      <Form.Select
                        aria-label="Select City"
                        value={values.city}
                        onChange={set("city")}
                        className={`${
                          darkMode
                            ? `bg-secondary text-light border-secondary border-opacity-75`
                            : ``
                        }`}
                      >
                        {_.map(filterCities, (city: any) => {
                          return <option key={nanoid(5)}>{city.City}</option>;
                        })}
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col sm={6}>
                    <Form.Group className="mb-3" controlId="suburb">
                      <Form.Label>Suburb</Form.Label>
                      <Typeahead
                        id="suburb-typeahead-single"
                        labelKey="suburb"
                        onChange={setSlctSuburbs}
                        onBlur={(e) => {
                          if (!(slctSuburbs.length > 0)) {
                            setSlctSuburbs([e.target.value]);
                          }
                        }}
                        options={suburbs}
                        placeholder="Choose a suburb..."
                        selected={slctSuburbs}
                        className={`${
                          darkMode ? darkModalStyles.Typeahead : ``
                        }`}
                        renderMenuItemChildren={renderMenuItemChildren}
                      />
                    </Form.Group>
                  </Col>

                  <Col sm={6}>
                    <Form.Group className="mb-3" controlId="postcode">
                      <Form.Label>Postcode</Form.Label>
                      <Typeahead
                        id="postcode-typeahead-single"
                        labelKey="postcode"
                        onChange={setSlctPostCode}
                        onBlur={(e) => {
                          if (!(slctPostCode.length > 0)) {
                            setSlctPostCode([e.target.value]);
                          }
                        }}
                        options={postCode}
                        placeholder="Choose a postcode..."
                        selected={slctPostCode}
                        className={`${
                          darkMode ? darkModalStyles.Typeahead : ``
                        }`}
                      />
                    </Form.Group>
                  </Col>

                  <Col sm={6}>
                    <Form.Group className="mb-3" controlId="contactNumber">
                      <RegValLabel
                        label="Contact Number"
                        validator={contactNoValid}
                        mainValue={values.contactno}
                      />
                      <Form.Control
                        type="text"
                        value={values.contactno}
                        onChange={set("contactno")}
                        onBlur={() => {
                          checkContactNo(values.contactno);
                        }}
                        className={`${isInputDark(darkMode)}`}
                      />
                    </Form.Group>
                  </Col>

                  <Form.Text
                    className={`${
                      darkMode ? `text-light opacity-50` : `text-muted`
                    } mb-3`}
                  >
                    We use Post Code & Suburb to estimate your Shipping Charges.
                  </Form.Text>
                </Row>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>Company Information</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col sm={6}>
                    <Form.Group className="mb-3" controlId="companyName">
                      <RegValLabel
                        label="Company Name"
                        validator={companyNameValid}
                        mainValue={values.companyName}
                        hideText={true}
                        notImportant={true}
                      />
                      <Form.Control
                        type="text"
                        value={values.companyName}
                        onChange={set("companyName")}
                        onBlur={() => {
                          checkCompanyName(values.companyName);
                        }}
                        className={`${isInputDark(darkMode)}`}
                      />
                    </Form.Group>
                  </Col>

                  <Col sm={6}>
                    <Form.Group className="mb-3" controlId="VATNumber">
                      <RegValLabel
                        label="Vat Number"
                        validator={vatNoValid}
                        mainValue={values.vatNo}
                        hideText={true}
                        notImportant={true}
                      />
                      <Form.Control
                        type="text"
                        value={values.vatNo}
                        onChange={set("vatNo")}
                        onBlur={() => {
                          checkVatNo(values.vatNo);
                        }}
                        className={`${isInputDark(darkMode)}`}
                      />
                    </Form.Group>
                  </Col>

                  <Col sm={6}>
                    <Form.Group className="mb-3" controlId="registrationNumber">
                      <RegValLabel
                        label="Registration Number"
                        validator={regNoValid}
                        mainValue={values.registrationNo}
                        hideText={true}
                        notImportant={true}
                      />
                      <Form.Control
                        type="text"
                        value={values.registrationNo}
                        onChange={set("registrationNo")}
                        onBlur={() => {
                          checkRegNo(values.registrationNo);
                        }}
                        className={`${isInputDark(darkMode)}`}
                      />
                    </Form.Group>
                  </Col>

                  <Col sm={6}>
                    <Form.Group className="mb-3" controlId="contactPerson">
                      <RegValLabel
                        label="Contact Person"
                        validator={contactPersonValid}
                        mainValue={values.contactPerson}
                        notImportant={true}
                      />
                      <Form.Control
                        type="text"
                        value={values.contactPerson}
                        onChange={set("contactPerson")}
                        onBlur={() => {
                          checkContactPerson(values.contactPerson);
                        }}
                        className={`${isInputDark(darkMode)}`}
                      />
                      {values.contactPerson.length > 0 && (
                        <Form.Text>
                          {values.contactPerson.length < 2 ? (
                            <span className="text-danger">Name too short</span>
                          ) : null}
                          {values.contactPerson.length > 25 ? (
                            <span className="text-danger">Name too long</span>
                          ) : null}
                        </Form.Text>
                      )}
                    </Form.Group>
                  </Col>

                  <Col sm={6}>
                    <Form.Group className="mb-3" controlId="contactNumber">
                      <RegValLabel
                        label="Contact Number"
                        validator={contactNumberValid}
                        mainValue={values.contactNumber}
                        notImportant={true}
                      />
                      <Form.Control
                        type="number"
                        value={values.contactNumber}
                        onChange={set("contactNumber")}
                        onBlur={() => {
                          checkContactNumber(values.contactNumber);
                        }}
                        className={`${isInputDark(darkMode)}`}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <div className="mb-3">
            <Form.Check
              type="checkbox"
              id="emailSignUp"
              label="Yes! Sign me up for updates and specials through the Evetech.co.za Newsletter"
              defaultChecked={values.isSubscirbe}
              onChange={set("isSubscribe")}
            />
          </div>

          <Button variant="primary" type="submit" className="mb-3">
            Register
          </Button>

          <Row>
            <Form.Text
              className={`${
                darkMode ? `text-light opacity-50` : `text-muted`
              } mb-3`}
            >
              This newsletter offers information on maintaining your computer.
              We do not sell, lease, give away or exchange your email with
              anyone. See our Privacy Policy.
            </Form.Text>
          </Row>
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
            props.onHide();
            props.setLoginShow(true);
          }}
        >
          Sign In
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
}

export default RegisterModal;
