"use client";
import React from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Form,
  Image,
  Row,
  Stack,
} from "react-bootstrap";
import { customAlphabet } from "nanoid";
import LaptopHeighlights from "@/components/LaptopHeighlights";
import classes from "@/styles/LaptopCard.module.scss";
import { useState } from "react";
import SpecialTag from "@/components/Main/Controls/SpecialTag";
import { useContext } from "react";
import HelperContext from "@/store/helper-context";
import { useRouter } from "next/router";
import Link from "next/link";
import { useTheme } from "@/store/ThemeContext";
import FancyPrice from "@/components/FancyPrice";

var _ = require("lodash");
const Swal = require("sweetalert2");

/* props enables/disable show compare supply [ShowCompare :boolean] */
const LaptopCard = (props: any) => {
  const router = useRouter();
  const nanoid = customAlphabet("1234567890abcdef", 10);
  const [showCompare, setShowCompare] = useState(
    props.ShowCompare === undefined ? true : props.ShowCompare
  );
  const helperCtx = useContext(HelperContext);
  const moreInfoClick = (product: any) => {
    router.push(
      `/${_.replace(
        _.toLower(product.url),
        new RegExp(" ", "g"),
        "-"
      ).trim()}/laptops-for-sale/${product.npid}.aspx`
    );
  };

  const updateCompare = (event: any, productId: any) => {
    if (props.ComparedCount === 4 && event.target.checked) {
      event.target.checked = false;
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "Cannot add more than 4 Products for compare.",
        showConfirmButton: false,
        timer: 1500,
      });
    } else if (props.ComparedCount <= 4) {
      if (event.target.checked) props.onSelectedCompare(productId);
      else props.onRemovedCompare(productId);
    }
  };

  const { isDarkMode } = useTheme();

  return (
    <div
      className={`
        ${classes.product_card}
        
      `}
    >
      {/* <a href={`/${_.replace(_.toLower(props.product.url),new RegExp(" ","g"),"-").trim()}/laptops-for-sale/${props.product.npid}.aspx`} target='blank' title={props.product.url}> */}
      <Card
        className={`
          ${!showCompare ? "cursor-pointer" : ""} 
          ${
            isDarkMode
              ? `bg-black text-light border-info border-opacity-50`
              : ``
          } 
          p-0 shadow h-100
        `}
        onClick={!showCompare ? () => moreInfoClick(props.product) : () => {}}
      >
        <Link
          className={`
            ${classes.CardImage} 
            ${isDarkMode ? `bg-black` : `bg-white`} 
            rounded-top d-flex-row align-items-center justify-content-center text-center p-3 cursor-pointer position-relative
          `}
          href={`/${_.replace(
            _.toLower(props.product.url),
            new RegExp(" ", "g"),
            "-"
          ).trim()}/laptops-for-sale/${props.product.npid}.aspx`}
        >
          <div className="position-absolute top-0 start-0 w-100 h-100 p-2 p-sm-3 pb-0">
            <div className="bg-white rounded w-100 h-100"></div>
          </div>
          <Image
            className="brand position-relative mt-1"
            src={"https://www.evetech.co.za/" + props.product.LogoUrlSmall}
            title={props.product.Brand}
            alt={props.product.Brand}
          />
          <Card.Img
            variant=""
            className={`p-3 pb-2 p-sm-4 p-lg-4 pb-lg-3 p-xl-5 pb-xl-4 position-relative w-100 h-100 object-contain position-absolute top-0 start-0 ${classes.CardPic}`}
            src={"https://www.evetech.co.za/" + props.product.imageurl}
          />

          <Stack className={`position-absolute top-0 start-0 p-3`} gap={1}>
            {helperCtx.dealTags !== undefined &&
            helperCtx.dealTags.length > 0 &&
            props.product.IsSpecial ? (
              <SpecialTag type={"On Special"} />
            ) : null}
            {(helperCtx.dealTags === undefined ||
              _.isEmpty(helperCtx.dealTags) ||
              (helperCtx.dealTags !== undefined &&
                helperCtx.dealTags.length === 0)) &&
            props.product.IsSpecial ? (
              <Badge className={"bg-danger text-break"}>
                <span
                  className={`fw-1 w-100 d-flex align-items-center justify-content-center`}
                >
                  <small>
                    On <br></br> Special
                  </small>
                </span>
              </Badge>
            ) : null}
            {helperCtx.dealTags !== undefined &&
            helperCtx.dealTags.length > 0 &&
            props.product.isNew ? (
              <SpecialTag type={"NEW"} />
            ) : null}
            {(helperCtx.dealTags === undefined ||
              _.isEmpty(helperCtx.dealTags) ||
              (helperCtx.dealTags !== undefined &&
                helperCtx.dealTags.length === 0)) &&
            props.product.isNew ? (
              <Badge>
                <span className="fw-2">NEW</span>
              </Badge>
            ) : null}
          </Stack>
          <Stack className="position-absolute top-0 end-0 p-3" gap={1}>
            {helperCtx.dealTags !== undefined &&
            helperCtx.dealTags.length > 0 &&
            helperCtx.showDealIcon &&
            props.product.IsOnDeal ? (
              <SpecialTag type={helperCtx.dealText} />
            ) : null}
            {(helperCtx.dealTags === undefined ||
              _.isEmpty(helperCtx.dealTags) ||
              (helperCtx.dealTags !== undefined &&
                helperCtx.dealTags.length === 0)) &&
            helperCtx.showDealIcon &&
            props.product.IsOnDeal ? (
              <Badge bg="dark">
                <span className="fw-2 d-flex align-items-center justify-content-center">
                  <small>On Deal</small>
                </span>
              </Badge>
            ) : null}
          </Stack>
        </Link>
        <Card.Body className={`${classes.Body} d-grid p-0`}>
          <Card.Title
            className={`
              ${classes.CardTitle} 
              ${isDarkMode ? `text-light` : ``} 
              overflow-hidden text-center text-bg-light p-2 pb-0 mb-0 px-3 rounded-2
            `}
          >
            {props.product.name}
          </Card.Title>
          <Card.Footer className="text-center px-3 border-0">
            <div
              className={`w-100 mt-1 mb-1 d-flex gap-1 justify-content-center justify-content-sm-between flex-column flex-sm-row align-items-center`}
            >
              <div className={classes.price_tag + " lh-1"}>
                <div>
                  <FancyPrice price={props.product.price} />
                </div>
                {/* <small className={`text-dark`}>Inc. VAT</small> */}
              </div>
              <div
                className={`
                  d-flex align-items-center align-items-sm-end justify-content-center gap-1 flex-sm-column 
                  ${isDarkMode ? `text-light` : `text-dark`}
                  ${classes.SmallPrices}
                `}
              >
                <p className={`${classes.Was} p-0 m-0 lh-1 d-flex text-start`}>
                  <s>
                    <small> Was </small> R {props.product.oldprice}
                  </s>
                </p>
                <Badge className={`${classes.Save} p-1 m-0`}>
                  <div className="fw-2">
                    <small> Save </small> R
                    {props.product.oldprice - props.product.price}
                  </div>
                </Badge>
              </div>
            </div>
            <Button
              className="btn btn-primary w-100 hide"
              onClick={() => moreInfoClick(props.product)}
            >
              More Info
            </Button>
          </Card.Footer>
          {props.product.high !== undefined && (
            <div className={`${classes.CardHighlight} pb-3 px-3 lh-1`}>
              {props.product.high && (
                <LaptopHeighlights high={props.product.high} />
              )}
            </div>
          )}
          {props.product.StockStatus !== undefined && (
            <div className={`${classes.StockStatus} w-100 px-3  lh-1`}>
              <div
                className={
                  (props.product.StockStatus === "In Stock With Evetech"
                    ? " bg-success "
                    : " bg-danger") + " mb-0 w-100 rounded p-1 text-light"
                }
              >
                <span className={`fw-1`}>{props.product.StockStatus}</span>
              </div>
            </div>
          )}
          <Row className="m-1">
            {showCompare && (
              <Col sm={6}>
                <Form.Group
                  className="mt-1 mb-1"
                  controlId={"compareCheck" + props.product.npid}
                  style={{ cursor: "pointer" }}
                >
                  <Form.Check
                    type="checkbox"
                    defaultChecked={
                      props.product.isCompared !== undefined &&
                      props.product.isCompared
                        ? true
                        : false
                    }
                    label="Compare"
                    onClick={(event) =>
                      updateCompare(event, props.product.npid)
                    }
                    name={"compare_" + props.product.npid}
                    style={{ cursor: "pointer" }}
                  />
                </Form.Group>
              </Col>
            )}
            <Col sm={showCompare ? 6 : 12} className=" py-1">
              <Button
                variant="info"
                className={`lh-1 w-100 h-100 btn btn-info`}
                onClick={() => moreInfoClick(props.product)}
              >
                <small>More Info</small>
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      {/*   </a> */}
    </div>
  );
};

export default LaptopCard;
