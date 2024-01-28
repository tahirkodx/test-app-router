import { nanoid } from "nanoid";
import React from "react";
import { Accordion, Form } from "react-bootstrap";
import CheckItem from "@/components/FindLaptop/CheckItem";

const AccordionItem = ({ index, Item, Section, handleChange }: any) => {
  return (
    <Accordion.Item eventKey={index}>
      <Accordion.Header>{Item.header}</Accordion.Header>
      <Accordion.Body>
        {Item.options.map((Option: any) => {
          return (
            <CheckItem
              key={nanoid(5)}
              Item={Item}
              Option={Option}
              Section={Section}
              handleChange={handleChange}
            />
          );
        })}

        <Form.Check
          name={`Any ${Item.name}`}
          type="radio"
          id={`Any-${Item.name}`}
          label={`Any ${Item.name}`}
          title={`Any ${Item.name} (★ Auto Option)`}
          value={Item.anyValue}
          checked={Item.anyValue}
          disabled
        />
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default AccordionItem;
