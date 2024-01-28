"use client";
import { nanoid } from "nanoid";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { Alert, Button, Form, Modal, Stack, Table } from "react-bootstrap";
import Swal from "sweetalert2";
import CartContext from "@/store/ncart-context";
import { CartAPI } from "@/custom/utils/actions";
import { useTheme } from "@/store/ThemeContext";
import darkFormStyles from "@/styles/DarkForm.module.scss";
import darkModalStyles from "@/styles/DarkModal.module.scss";
import {
  isBodyDark,
  isDarkHeaderFooter,
  isInputDark,
} from "../Auth/LoginModal";

const _ = require("lodash");
const CalcShipping = (props: any) => {
  const cartCtx = useContext(CartContext);
  const [postCode, setPostCode] = useState("");
  const [weight, setWeight] = useState(props.weight);
  const [freeWeight, setFreeWeight] = useState(props.freeWeight);
  const [calVariant, setCalVariant] = useState("danger");
  const [calMessage, setCalMessage] = useState("");
  const [areaType, setAreaType] = useState("");
  const [city, setCity] = useState("");
  const [shippingCharge, setShippingCharge] = useState(0);
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  const calculateShipping = async () => {
    if (postCode.trim().length > 0) {
      const postalData = await CartAPI.calculateShipping({
        City: "",
        PostCode: postCode,
      });
      if (
        postalData !== null &&
        postalData !== undefined &&
        postalData.result !== null &&
        postalData.result !== undefined
      ) {
        let pCodeData = postalData.result;

        if (pCodeData.status > 0) {
          setAreaType(pCodeData.areaType);
          setCity(pCodeData.city);
          setWeight(pCodeData.weight);
          setShippingCharge(pCodeData.shippingCharge);
          setCalMessage("");
          setCalVariant("");
        } else {
          setAreaType(pCodeData.areaType);
          setCity(pCodeData.city);
          setWeight(pCodeData.weight);
          setShippingCharge(pCodeData.shippingCharge);
          setCalMessage("Error: Post Code Not Found In Our Database.");
          setCalVariant("danger");
        }
      }
    } else {
      Swal.fire(
        "Oops",
        "Please provide valid postalcode to calculate",
        "error"
      );
    }
  };

  const currencyFormat = (num: any) => {
    try {
      return "R " + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    } catch (e) {
      return num;
    }
  };

  return (
    <>
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => {
          props.onHide();
        }}
        className={darkMode ? darkFormStyles.main : ``}
      >
        <Modal.Header
          closeButton
          className={`
            ${darkMode ? darkModalStyles.darkHeader : ``}
            ${isDarkHeaderFooter(darkMode)}
          `}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            Calculate Shipping
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={isBodyDark(darkMode)}>
          <Stack gap={3}>
            <Form>
              <Form.Group className="mb-2" controlId="calcShipForm.postCode">
                <Form.Label>Post Code</Form.Label>
                <Form.Control
                  type="text"
                  value={postCode}
                  onChange={(e) => {
                    setPostCode(e.currentTarget.value);
                  }}
                  className={isInputDark(darkMode)}
                />
              </Form.Group>
              <Form.Group controlId="calcShipForm.Submit">
                <Button variant="success" onClick={() => calculateShipping()}>
                  Calculate
                </Button>
              </Form.Group>
            </Form>
            {calMessage.trim().length > 0 && (
              <Alert
                key={nanoid(3)}
                variant={calVariant}
                show={calMessage.trim().length > 0}
              >
                {calMessage}
              </Alert>
            )}
            <small>
              <Table
                striped
                bordered
                hover
                size="sm"
                className={darkMode ? `table-dark` : ``}
              >
                <thead>
                  <tr>
                    <th className="fw-3">Shipping Cost</th>
                    <th className="fw-3">Post Code</th>
                    <th className="fw-3">City / Town</th>
                    <th className="fw-3">Area Type</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{currencyFormat(shippingCharge)} Inc. VAT</td>
                    <td>{postCode}</td>
                    <td>{city}</td>
                    <td
                      className={`${
                        areaType !== undefined && areaType === "Main Center"
                          ? "text-dark"
                          : "text-danger"
                      }`}
                    >
                      {areaType}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </small>
          </Stack>
        </Modal.Body>
        <Modal.Footer
          className={`
          ${isDarkHeaderFooter(darkMode)}
        `}
        >
          <Button variant="secondary" onClick={() => props.onHide()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CalcShipping;
