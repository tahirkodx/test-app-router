"use client";
import React, { useContext, useEffect, useState } from "react";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import styles from "@/styles/Cart/Cart.module.scss";
import CartContext from "@/store/ncart-context";
import AuthContext from "@/store/auth-context";
import { useRouter } from "next/router";
import { useTheme } from "@/store/ThemeContext";
import FancyPrice from "../FancyPrice";

const _ = require("lodash");
const Summary = (props: any) => {
  const authCtx: any = useContext(AuthContext);
  const cartCtx: any = useContext(CartContext);
  const [showShipping, setShowShipping] = useState(
    props.isShowShipping !== undefined ? props.isShowShipping : false
  );
  const [isConfirmation, setIsConfirmation] = useState(
    props.isConfirmation !== undefined ? props.isConfirmation : false
  );
  const [isCheckout, setIsCheckout] = useState(
    props.isCheckout !== undefined ? props.isCheckout : false
  );
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  const router = useRouter();

  useEffect(() => {}, [cartCtx]);

  const currencyFormat = (num: any) => {
    try {
      return "R " + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    } catch (e) {
      return num;
    }
  };

  const totalPayable = () => {
    let paymentMethodCharge: any = "";
    let normalCharges =
      Number(cartCtx.shippingCharge) +
      Number(parseFloat(cartCtx.insAmount.toFixed(2)));

    if (cartCtx.paymentMode === "Eft" || cartCtx.paymentMode === "Ozow") {
      paymentMethodCharge = Number(cartCtx.totalIEFTAmount);
    } else {
      paymentMethodCharge = Number(cartCtx.totalCCAmount);
    }

    return currencyFormat(paymentMethodCharge + normalCharges);
  };

  useEffect(() => {}, [cartCtx.shippingCharge]);

  return (
    <div className={`${darkMode ? `text-light` : ``} p-2 p-sm-3 pb-0 pb-sm-0`}>
      <div className="border-bottom border-secondary pb-2 mb-2">
        <h2 className="text-uppercase text-secondary fs-6 mt-2 mb-1">
          Cart Summary
        </h2>
      </div>
      <Stack
        gap={2}
        direction="horizontal"
        className="flex-wrap justify-content-between align-items-start"
      >
        <Stack
          gap={1}
          className={`${styles.Summary__Content} text-end flex-wrap align-items-start ms-auto`}
        >
          <Stack
            gap={2}
            direction="horizontal"
            className="flex-wrap justify-content-between align-items-start w-100"
          >
            {authCtx !== undefined &&
              authCtx.user !== undefined &&
              (authCtx.user.CID === "IS3" ||
                authCtx.user.CID === "DE402835") && (
                <span>
                  <span className="fw-2">Weight:</span>{" "}
                  {cartCtx.items !== undefined && cartCtx.items.length > 0
                    ? _.sum(
                        _.map(cartCtx.items, (product: any) => {
                          try {
                            return parseFloat(product.weight);
                          } catch (e) {
                            return 0;
                          }
                        })
                      ).toFixed(2)
                    : 0}
                  kg
                </span>
              )}
            <span className="fw-2">
              {cartCtx.items !== undefined && cartCtx.items.length > 0
                ? _.sum(
                    _.map(cartCtx.items, (product: any) => {
                      try {
                        return parseInt(product.amount);
                      } catch (e) {
                        return 0;
                      }
                    })
                  )
                : 0}
              {cartCtx.items !== undefined && cartCtx.items.length > 1
                ? " Items"
                : " Item"}
            </span>
          </Stack>
          {showShipping && cartCtx.shippingCharge !== undefined && (
            <div className="d-flex justify-content-between w-100">
              <span>Shipping Charge: </span>
              <span className="fw-2">R {cartCtx.shippingCharge}</span>
            </div>
          )}
          {showShipping && cartCtx.isInsured && (
            <div className="d-flex justify-content-between w-100">
              <span>Shipping Insurance: </span>
              <span className="fw-2">
                R {parseFloat(cartCtx.insAmount.toFixed(2))}
              </span>
            </div>
          )}

          <div className="d-flex justify-content-between w-100">
            <span>Credit Card: </span>
            <span className="fw-2">
              {currencyFormat(cartCtx.totalCCAmount)}
            </span>
          </div>

          <div className="w-100">
            <div className="d-flex justify-content-between w-100 flex-wrap  text-danger">
              <span>EFT: </span>
              <span className="fw-3 fs-4 lh-1">
                <FancyPrice price={cartCtx.totalIEFTAmount} />
              </span>
            </div>
            <div className="lh-1 bg-warning text-dark p-1 rounded mt-1 pb-2 px-2">
              <small className="fw-2">
                <small>
                  * Discount only available when paying by Instant EFT or EFT *
                </small>
              </small>
            </div>
            <div className="mb-1">
              <small>(Discounted Price - INC VAT)</small>
            </div>
          </div>

          {isConfirmation || isCheckout ? (
            <div className="w-100 bg-success bg-opacity-25 p-2 rounded">
              <div className="d-flex justify-content-between w-100 flex-wrap">
                <span className="fw-2">
                  Payable Amount ({cartCtx.paymentMode}):{" "}
                </span>
                <span className="fw-3 fs-4 lh-1">{totalPayable()}</span>
              </div>
            </div>
          ) : null}
        </Stack>
      </Stack>
    </div>
  );
};

export default Summary;
