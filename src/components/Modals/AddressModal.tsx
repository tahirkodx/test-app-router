"use client";
import { nanoid } from "nanoid";
import React, { useEffect } from "react";
import { useRef } from "react";
import { useContext } from "react";
import { useState } from "react";
import { Button, Form, Modal, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import AuthContext from "@/store/auth-context";
import UserAPI from "@/custom/utils/actions/user";
import { CmsAPI } from "@/custom/utils/actions";
import darkModalStyles from "@/styles/DarkModal.module.scss";
import darkFormStyles from "@/styles/DarkForm.module.scss";
import { sum } from "lodash";
import { useTheme } from "@/store/ThemeContext";
import {
  isBodyDark,
  isDarkHeaderFooter,
  isInputDark,
  isSelectDark,
} from "../Auth/LoginModal";

const _ = require("lodash");

const AddressModal = (props: any) => {
  const authCtx: any = useContext(AuthContext);
  const navigate = useRouter();
  const stateRef = useRef();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [filterCities, setFilterCities] = useState<any>([]);
  const [formState, setFormState] = useState(props.formStateData);
  const btnReset = useRef<any>(null);
  const [primary, setPrimary] = useState(false);
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  const closeAddAddress = () => {
    props.closeAddAddress();
  };

  const submitForm = async (event: any) => {
    event.preventDefault();
    const data: any = new FormData(event.target);
    const form = event.currentTarget;

    let add = data.get("txtAddress");
    let addressId = data.get("txtAddressID");
    let country = data.get("drpCountry");
    let state = data.get("drpStates");
    let city = data.get("drpCity");
    let postcode = data.get("txtPostCode");
    let suburb = data.get("txtSuburb");
    let contact = data.get("txtContactPerson");
    let chkPrimary = data.get("chkIsPrimary");
    let isPrimary = chkPrimary ? true : false;
    if (
      ![add, country, state, city, postcode, suburb, contact].some(
        (str) => str.trim().length === 0
      )
    ) {
      const summary = await UserAPI.manageAddress({
        addressId: addressId,
        address: add,
        country: country,
        state: state,
        city: city,
        postcode: postcode,
        suburb: suburb,
        contact: contact,
        isPrimary: isPrimary,
        userid: authCtx.user.id,
      });

      /*    const summary = await fetch(`/api/user/manageAddress`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + authCtx.token,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          addressId: addressId,
          address: add,
          country: country,
          state: state,
          city: city,
          postcode: postcode,
          suburb: suburb,
          contact: contact,
          isPrimary: isPrimary,
          userid: authCtx.user.id,
        }),
      }).then((res) => res.json()); */
      if (summary !== undefined && summary !== null) {
        try {
          let addAddress = summary.result;
          if (
            addAddress.affectedRows !== undefined &&
            addAddress.affectedRows
          ) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `Address ${
                addressId > 0 ? "Updated" : "Added"
              } successfully..`,
              showConfirmButton: false,
              timer: 1500,
            });
            props.resetFormState();
            props.getAddress();
            btnReset.current.dispatchEvent(
              new MouseEvent("click", {
                view: window,
                bubbles: true,
                cancelable: true,
                buttons: 1,
              })
            );
            closeAddAddress();
          } else {
            Swal.fire("Oops!", "Problem occured try again!", "error");
          }
        } catch (e) {
          if (
            summary.message !== undefined &&
            summary.message === "Not authenticated."
          ) {
            authCtx.onLogout();
          } else {
            Swal.fire("Oops!", "Problem occured try again!", "error");
          }
        }
      } else {
        Swal.fire("Oops!", "Problem occured try again!", "error");
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all required fileds!",
      });
    }
  };

  const changeState = (e: any) => {
    let state = e.currentTarget.value;

    setFilterCities(
      _.map(
        _.filter(cities, (city: any) => {
          if (city.State === state) return city;
        }),
        (city: any) => {
          return city;
        }
      )
    );
    try {
      setFormState((prevFormState: any) => {
        prevFormState.State = state;
        return prevFormState;
      });
    } catch (e) {}
  };

  useEffect(() => {
    const getState = async () => {
      const summary = await CmsAPI.getState();
      if (
        summary !== undefined &&
        summary !== null &&
        summary.result !== undefined &&
        summary.result !== null
      ) {
        let citySumm = summary.result;
        setStates(citySumm);
      }
    };

    const getCities = async () => {
      const summary = await CmsAPI.getCities();
      if (
        summary !== undefined &&
        summary !== null &&
        summary.result !== undefined &&
        summary.result !== null
      ) {
        let userSumm = summary.result;
        setCities(userSumm);
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
      }
    };

    getState();
    getCities();
  }, []);

  useEffect(() => {
    setFormState(props.formStateData);
    if (props.formStateData.IsPrimary !== undefined) {
      setPrimary(props.formStateData.IsPrimary ? true : false);
    }
  }, [props.formStateData]);

  useEffect(() => {
    if (!props.isOpen) {
      setFormState({
        id: 0,
        UserID: 0,
        PersonName: "",
        Address1: "",
        Address2: "",
        Suburb: "",
        PostCode: "",
        City: "",
        State: "",
        Country: "",
        IsPrimary: 0,
        AddedDate: "",
        Status: 0,
        ModifiedDate: "",
      });
      setPrimary(false);
    }
  }, [props.isOpen]);

  return (
    <>
      <Modal
        show={props.isOpen}
        onHide={closeAddAddress}
        className={darkMode ? darkFormStyles.main : ``}
      >
        <Modal.Header
          closeButton
          className={`
          ${darkMode ? darkModalStyles.darkHeader : ``}
          ${isDarkHeaderFooter(darkMode)}
        `}
        >
          <Modal.Title>
            {" "}
            {formState.id > 0 ? "Update" : "Add a new"} Address
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={`${isBodyDark(darkMode)}`}>
          <Form
            onSubmit={(event) => {
              submitForm(event);
            }}
          >
            <Form.Group controlId="addAddress.Address" className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="txtAddress"
                placeholder="Address"
                defaultValue={formState.Address1}
                className={isInputDark(darkMode)}
              />
              <Form.Control
                type="hidden"
                name="txtAddressID"
                defaultValue={formState.id}
              />
            </Form.Group>
            <Row>
              <Form.Group controlId="addAddress.Country" className="mb-3 col">
                <Form.Label>Country</Form.Label>
                <Form.Select
                  aria-label="country"
                  name="drpCountry"
                  defaultValue={formState.Country}
                  className={isSelectDark(darkMode)}
                >
                  <option>South Africa</option>
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="addAddress.State" className="mb-3 col">
                <Form.Label>State</Form.Label>
                <Form.Select
                  aria-label="state"
                  /* ref={stateRef} */
                  /*   onChange={(e) => {
                    changeState(e);
                  }} */
                  name="drpStates"
                  onChange={changeState}
                  value={formState.State}
                  className={isSelectDark(darkMode)}
                >
                  {_.map(states, (state: any) => {
                    return (
                      <option
                        key={nanoid(3)}
                        selected={
                          formState.State !== "" &&
                          formState.State === state.state
                            ? true
                            : false
                        }
                      >
                        {state.State}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group controlId="addAddress.City" className="mb-3 col">
                <Form.Label>City</Form.Label>
                <Form.Select
                  aria-label="city"
                  name="drpCity"
                  className={`
                    ${isSelectDark(darkMode)}
                  `}
                >
                  {_.map(filterCities, (city: any) => {
                    return (
                      <option
                        key={nanoid(5)}
                        selected={
                          formState.City !== "" && formState.City === city.City
                            ? true
                            : false
                        }
                      >
                        {city.City}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="addAddress.Suburb" className="mb-3 col">
                <Form.Label>Suburb</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Suburb"
                  name="txtSuburb"
                  defaultValue={formState.Suburb}
                  required
                  className={isInputDark(darkMode)}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group controlId="addAddress.PostCode" className="mb-3 col">
                <Form.Label>Post Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Post Code"
                  name="txtPostCode"
                  defaultValue={formState.PostCode}
                  required
                  className={isInputDark(darkMode)}
                />
              </Form.Group>
              <Form.Group
                controlId="addAddress.ContactPerson"
                className="mb-3 col"
              >
                <Form.Label>Contact Person</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Contact Person"
                  name="txtContactPerson"
                  defaultValue={formState.PersonName}
                  required
                  className={isInputDark(darkMode)}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className="mb-3" controlId="addAddressChk">
                <Form.Check
                  type="checkbox"
                  name="chkIsPrimary"
                  label="Set as primary address"
                  checked={primary}
                  onChange={(e) => {
                    setPrimary(e.target.checked);
                  }}
                />
              </Form.Group>
            </Row>

            <Row className="d-d-inline-flex gap-3 m-2">
              <Button variant="success" type="submit" className="col">
                {formState.id > 0 ? "Update" : "Add"}
              </Button>
              <Button
                variant="secondary"
                className="col"
                type="button"
                onClick={() => {
                  props.resetFormState();
                }}
                ref={btnReset}
              >
                Reset
              </Button>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddressModal;
