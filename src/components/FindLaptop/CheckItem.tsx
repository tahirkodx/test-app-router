import React from "react";
import { Form } from "react-bootstrap";

const CheckItem = ({ Item, Option, Section, handleChange }: any) => {
  return (
    <Form.Check
      name={Item.name}
      type="checkbox"
      id={Option.replaceAll(" ", "-")}
      label={Option}
      title={Option + ` / ` + Section.title}
      onChange={handleChange}
      value={Item.value}
    />
  );
};

export default CheckItem;
