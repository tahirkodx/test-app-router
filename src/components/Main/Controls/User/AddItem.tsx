"use client";
import { event } from "jquery";
import { nanoid } from "nanoid";
import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";
import Swal from "sweetalert2";

const AddItem = (props: any) => {
  const [item, setItem] = useState<any>("");
  const [serial, setSerial] = useState<any>("");
  const [faultDescription, seFaultDescription] = useState<any>("");
  const [reasonCode, setReasonCode] = useState<any>("");
  const [quantity, setQuantity] = useState<any>(0);
  const [criteria, setCriteria] = useState<any>("");

  const addItem = () => {
    if (
      ![item, serial, faultDescription, reasonCode, quantity].some(
        (str) => str.trim().length === 0
      )
    ) {
      props.onAddItem({
        id: nanoid(6),
        Item: item,
        SerialNo: serial,
        FaultDescription: faultDescription,
        ReasonCode: reasonCode,
        Quantity: quantity,
        criteria: criteria,
      });
      Swal.fire(`Added!`, `Item Added successfully..`, "success");
      reset();
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all required fileds!",
      });
    }
  };

  const reset = () => {
    setItem("");
    setSerial("");
    seFaultDescription("");
    setReasonCode("");
    setQuantity("");
  };

  function changeItem(event: any) {
    const filter = props.filterInvalidJSONChars(event.target.value);
    setItem(filter);
  }

  function changeQty(event: any) {
    const filter = props.filterInvalidJSONChars(event.target.value);
    setQuantity(filter);
  }

  function changeSerial(event: any) {
    const filter = props.filterInvalidJSONChars(event.target.value);
    setSerial(filter);
  }

  function changeFaultDescription(event: any) {
    const filter = props.filterInvalidJSONChars(event.target.value);
    seFaultDescription(filter);
  }

  return (
    <section className="p-2 rounded border span-full d-grid gap-2 gap-md-3 cols-md-2">
      <Form.Label className="span-full m-0">
        <span className="fw-2 fs-5">Item info</span>
      </Form.Label>

      <Form.Group controlId="ViewForm.Item">
        <Form.Label className="w-100">
          Item{" "}
          <small className="f-12 float-end mt-1">(Max. 150 Characters)</small>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Item"
          name="txtItem"
          onChange={changeItem}
          value={item}
          maxLength={150}
          onKeyDown={(e: any) => {
            if (e.target.value.length > 150) {
              e.target.value = e.target.value.substring(0, 150);
            }
          }}
          className={`${props.inputClasses}`}
        ></Form.Control>
      </Form.Group>
      <Form.Group controlId="ViewForm.Item">
        <Form.Label>Quantity</Form.Label>
        <Form.Control
          type="number"
          placeholder="Quantity"
          name="txtQuantity"
          onChange={changeQty}
          value={quantity}
          className={`${props.inputClasses}`}
        ></Form.Control>
      </Form.Group>
      <Form.Group controlId="ViewForm.SerialNo">
        <Form.Label className="w-100">
          Serial Number (If applicable){" "}
          <small className="f-12 float-end mt-1">(Max. 100 Characters)</small>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Serial Number"
          name="txtSerialNumber"
          onChange={changeSerial}
          value={serial}
          maxLength={100}
          onKeyDown={(e: any) => {
            if (e.target.value.length > 100) {
              e.target.value = e.target.value.substring(0, 100);
            }
          }}
          className={`${props.inputClasses}`}
        ></Form.Control>
      </Form.Group>

      <Form.Group controlId="ViewForm.Reason">
        <Form.Label>Reason</Form.Label>
        <Form.Select
          aria-label="Reason-Code"
          name="drpReason"
          onChange={(e) => {
            setReasonCode(e.target.value);
            setCriteria(e.target.options[e.target.selectedIndex].text);
          }}
          value={reasonCode}
          className={`${props.inputClasses}`}
        >
          <option>Select</option>
          <option value="1">Wrong quanity recieved</option>
          <option value="2">Wrong merchandise recieved</option>
          <option value="3">Damaged in shipping</option>
          <option value="4">Duplicate order</option>
          <option value="5">Product defective</option>
          <option value="6">Customer not satisfied</option>
          <option value="7">Incorrect item ordered</option>
          <option value="8">Other</option>
        </Form.Select>
      </Form.Group>

      <Form.Group controlId="ViewForm.Fault">
        <Form.Label className="w-100">
          Fault Description{" "}
          <small className="f-12 float-end mt-1">(Max. 350 Characters)</small>
        </Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Fault Description"
          rows={3}
          /*  length={350} */
          name="txtFaultDescription"
          onChange={changeFaultDescription}
          value={faultDescription}
          onKeyDown={(e: any) => {
            if (e.target.value.length > 350) {
              e.target.value = e.target.value.substring(0, 350);
            }
          }}
          className={`${props.inputClasses}`}
        ></Form.Control>
      </Form.Group>

      <Form.Group className="span-full">
        <Button size="sm" type="button" onClick={() => addItem()}>
          <FaPlusCircle /> Add Item
        </Button>
      </Form.Group>
      <Form.Group>{/* Items */}</Form.Group>
    </section>
  );
};

export default AddItem;
