import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { customAlphabet } from "nanoid";
import { useTheme } from "@/store/ThemeContext";

const LaptopHeighlights = (props: any) => {
  let high = props.high;
  const nanoid = customAlphabet("1234567890abcdef", 10);
  const { isDarkMode } = useTheme();

  return (
    <div className="overflow-hidden" style={{ maxHeight: "222px" }}>
      <ListGroup variant="primary" className="p-0 m-0">
        {high.split("|").map((highlight: any) => (
          <ListGroupItem
            className={`${
              isDarkMode ? `text-light` : ``
            } m-0 border-secondary border-opacity-75 cardListText`}
            style={{ padding: "5px" }}
            key={nanoid(10)}
          >
            {highlight
              .replace(`<span style="font-bold:bold; font-size: 17px;">`, ``)
              .replace(`<span style="font-size: 17px;">`, ``)
              .replace(`<span style="font-size:17px;">`, ``)
              .replace(`<span style="font-bold:bold; font-size: 16px;">`, ``)
              .replace(`<span style="font-size: 16px;font-weight:bold; ">`, ``)
              .replace(`<span style="font-size: 16px; font-weight:bold; ">`, ``)
              .replace(`<span style="font-size:16px;font-weight:bold;">`, ``)
              .replace(`<span style="font-size: 15px;">`, ``)
              .replace(`</span>`, ``)}
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
};

export default LaptopHeighlights;
