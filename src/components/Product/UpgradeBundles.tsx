import React, { useEffect, useState } from "react";
import { FormCheck } from "react-bootstrap";
import { customAlphabet } from "nanoid";
import Heading from "../Heading";
import FancyPrice from "../FancyPrice";
import { useTheme } from "@/store/ThemeContext";

const nanoid = customAlphabet("1234567890abcdef", 10);
var _ = require("lodash");
const UpgradeBundles = (props: any) => {
  const prodPrice = props.Price;
  const [chkRadioPrice, setChkRadioPrice] = useState(0);
  const [chkRadioLabel, setChkRadioLabel] = useState("");

  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  const upgrageItems = props.Items;
  const onRadioChecked = (e: any) => {
    let values = e.target.value.split("|");
    let id = e.target.id;
    props.onUpgradeItemSeleceted({
      BundleId: id,
      Title: values[1].trim(),
      Price: parseInt(values[0].trim()),
    });
    setChkRadioLabel((prevLabel) => {
      try {
        prevLabel = values[1].trim();
      } catch (e) {}
      return prevLabel;
    });
    setChkRadioPrice((prevPrice) => {
      try {
        prevPrice = parseInt(values[0].trim());
      } catch (e) {}
      return prevPrice;
    });
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
      {upgrageItems?.length > 0 && (
        <div
          className={`
           p-2 card
          ${
            darkMode
              ? `bg-black bg-opacity-25 text-light mt-3`
              : `bg-light mt-2`
          }
        `}
        >
          <Heading level={3} className="fs-5">
            Bundle Options
          </Heading>
          {upgrageItems.map((item: any, ind: any) => {
            let text = item.des.split("-");
            return (
              <FormCheck
                type="radio"
                style={{ fontSize: "14px" }}
                name="bundleItems"
                id={item.id} /* ind */
                key={nanoid(7)}
                radioGroup="bundleItems"
                label={item.des}
                onChange={onRadioChecked}
                checked={item.price === chkRadioPrice ? true : false}
                value={item.price + "|" + text[text.length - 1]}
              />
            );
          })}
          <div className="card-footer">
            <div className="d-flex gap-1">
              <span className="fw-2">Discounted Price :</span>{" "}
              <span>
                {" "}
                <FancyPrice
                  price={prodPrice + chkRadioPrice}
                  className={`fs-6`}
                />
              </span>{" "}
              Inc. VAT
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpgradeBundles;
