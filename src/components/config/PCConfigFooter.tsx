"use client";
import React, { useState } from "react";
import styles from "@/styles/ProductFooter.module.scss";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { FaShoppingBasket, FaCartPlus } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Badge from "react-bootstrap/Badge";
import { Col } from "react-bootstrap";
import { useRouter } from "next/router";
import { useTheme } from "@/store/ThemeContext";
import FancyPrice from "../FancyPrice";

const PCConfigFooter = (props: any) => {
  const [showLoad, setShow] = useState(false);
  const [showSave, setSave] = useState(false);
  let ProductType = props.product;
  let router = useRouter();
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  const currencyFormat = (num: any) => {
    try {
      return "R " + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    } catch (e) {
      return num;
    }
  };

  const addToCart = (event: any) => {
    props.onAddToCart(event);
  };

  return (
    <div
      className={`
        ${styles.Footer} 
        ${props.classes} 
        ${darkMode ? `bg-dark border-secondary` : ``}
        py-2 px-1 border-top lh-1
      `}
    >
      <Col xs={12} xl={{ span: 10, offset: 1 }} className="px-2">
        <div className={`d-grid gap-2 cols-6`}>
          <div
            className={`d-flex flex-wrap align-items-center span-3 span-md-4`}
          >
            <small className={`me-2`}>
              <span className={`fw-2`}>Curent Discounted Price :</span>
            </small>

            <div className={`d-flex align-items-center me-1 gap-1`}>
              <div className={`${styles.Price} fw-2 text-danger me-1 `}>
                <FancyPrice price={props.TotalPrice} />
              </div>
            </div>

            <Button
              href="#Bundles"
              variant={darkMode ? `outline-info` : `outline-primary`}
              className={`text-decoration-none d-flex cursor-pointer p-1 px-2 shadow`}
              onClick={() => props.toggleIsBundleOpen()}
              title={`${props.collapseText} Bundles`}
              size="sm"
            >
              <small>
                <small>{props.collapseText}</small>
              </small>
            </Button>
          </div>

          <div className={`span-3 span-md-2 d-grid gap-2 cols-sm-2 `}>
            <ButtonGroup
              aria-label="Basic example"
              className={`w-100`}
              onClick={addToCart}
              size="sm"
            >
              <Button
                variant="warning"
                className={`${styles.BuyBtn} w-100 text-dark lh-small p-0`}
                size="sm"
                onClick={(e) => {
                  addToCart(e);
                  router.push("/Cart");
                }}
              >
                Buy Now
              </Button>
              <Button variant="success" className={``} size="sm">
                <FaShoppingBasket />
              </Button>
            </ButtonGroup>

            <Button
              variant="warning"
              className={`w-100 ${styles.Button}`}
              onClick={addToCart}
              size="sm"
            >
              <FaCartPlus className={`me-1`} />
              <span className={`d-md-none`}>Add</span>
              <span className={`d-none d-md-inline`}>
                <small>Add to Cart</small>
              </span>
            </Button>
          </div>
        </div>
      </Col>
    </div>
  );
};

export default PCConfigFooter;
