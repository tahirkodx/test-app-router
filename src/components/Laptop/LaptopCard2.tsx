"use client";
import useMediaQuery from "@/custom/hooks/useMediaQuery";
import HelperContext from "@/store/helper-context";
import _ from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { Badge, Card, Form, Image, Stack, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import classes from "@/styles/laptop/LaptopCard.module.scss";
import SpecialTag from "../Main/Controls/SpecialTag";
import FancyPrice from "../FancyPrice";
import { FaCartPlus, FaHeart } from "react-icons/fa";
import { RiHeartAddLine } from "react-icons/ri";
import LaptopHeighlights from "./Controls/LaptopHeighlights";
import backgrounds from "@/styles/Background.module.scss";

const LaptopCard = (props: any) => {
  //   const { commonState } = useContext(CommonContext);
  //   const darkMode = commonState.darkMode;
  const darkMode = false;
  const router = useRouter();
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

  const updateCompare = (event, productId) => {
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

  const isSM = useMediaQuery("(min-width: 576px)");

  return (
    <div className={classes.product_card}>
      {/* <a href={`/${_.replace(_.toLower(props.product.url),new RegExp(" ","g"),"-").trim()}/laptops-for-sale/${props.product.npid}.aspx`} target='blank' title={props.product.url}> */}
      <Card
        className={`
          ${darkMode ? `bg-black border-info border-opacity-50` : ``}
          ${!showCompare ? "cursor-pointer" : ""} 
          ${classes.LaptopCard}
          p-0 shadow h-100
        `}
        onClick={!showCompare ? () => moreInfoClick(props.product) : null}
      >
        <Link
          className={`
            ${classes.CardImage} 
            ${darkMode ? `bg-black` : `bg-white`} 
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
          <Card.Img
            className={`p-3 pb-2 p-sm-4 p-lg-4 pb-lg-3 p-xl-5 pb-xl-4 position-relative w-100 h-100 object-contain position-absolute top-0 start-0 ${classes.CardPic}`}
            src={"https://www.evetech.co.za/" + props.product.imageurl}
          />
          <Image
            className="brand position-relative mt-1"
            src={"https://www.evetech.co.za/" + props.product.LogoUrlSmall}
            title={props.product.Brand}
            alt={props.product.Brand}
          />
          <Stack
            className={`position-absolute top-0 start-0 p-2 p-sm-3 pe-none`}
            gap={1}
          >
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
          <Stack className="position-absolute top-0 end-0 p-2 p-sm-3" gap={1}>
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
              ${darkMode ? `text-light` : `text-dark`} 
              overflow-hidden text-center text-bg-light p-2 py-0 pb-0 mb-0 px-2 px-sm-3 rounded-2
            `}
          >
            {props.product.name !== undefined && props.product.name.length > 0
              ? props.product.name
              : ``}
            {props.product.NAME !== undefined && props.product.NAME.length > 0
              ? props.product.NAME
              : ``}
            {props.product.ProName !== undefined &&
            props.product.ProName.length > 0
              ? props.product.ProName
              : ``}
          </Card.Title>
          <Card.Footer className="text-center px-2 px-sm-3 border-0">
            <div
              className={`w-100 mt-1 mb-1 d-flex gap-1 justify-content-center justify-content-sm-between align-items-center flex-wrap`}
            >
              <FancyPrice price={props.product.price} />

              <div
                className="d-grid gap-1 gap-sm-2"
                style={{ gridTemplateColumns: `1fr 31px` }}
              >
                <div
                  className={`${backgrounds.rainbowGradient_4} rounded-pill`}
                  style={{ padding: "2px 2px 3px 2px" }}
                >
                  <Button
                    size="sm"
                    variant={darkMode ? `dark` : `light`}
                    className={`lh-1 flex-grow-1 bg-gradient rounded-pill py-1 w-100 h-100`}
                    onClick={() => moreInfoClick(props.product)}
                  >
                    <span className="d-flex align-items-center justify-content-center gap-1 fw-2">
                      <FaCartPlus /> Add to Cart
                    </span>
                  </Button>
                </div>

                <div className="position-relative overflow-hidden">
                  <span>
                    <Button
                      className={`
                        ${classes.LoveButton}
                        text-white border-danger rounded-circle border-opacity-50 d-flex align-items-center justify-content-center px-0 pb-0 position-absolute top-0 start-0 h-100 w-100
                      `}
                      style={{
                        backgroundColor: `rgba(191, 2, 143,0.5)`,
                        paddingTop: "1.5px",
                      }}
                    >
                      <FaHeart />
                    </Button>
                  </span>
                  <span>
                    <Button
                      className={`
                      ${classes.LoveButton}
                      text-white border-danger rounded-circle border-opacity-50 d-flex align-items-center justify-content-center px-0 pb-0 position-absolute top-0 start-0 h-100 w-100
                    `}
                      style={{
                        backgroundColor: `rgba(191, 2, 143,0.5)`,
                        paddingTop: "1.5px",
                      }}
                    >
                      <RiHeartAddLine />
                    </Button>
                  </span>
                </div>
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
            <div className={`${classes.CardHighlight} pb-2 px-2 px-sm-3 lh-1`}>
              {props.product.high && (
                <LaptopHeighlights high={props.product.high} />
              )}
            </div>
          )}

          <div className="px-2 px-sm-3 h-100 d-flex gap-2">
            <div
              className={`
                d-grid w-100 h-100 flex-grow-1
              `}
            >
              {showCompare && (
                <Form.Group
                  className="py-2 pb-sm-3 w-100 h-100 span-7 span-sm-1"
                  controlId={"compareCheck" + props.product.npid}
                >
                  <Form.Check
                    type="checkbox"
                    defaultChecked={
                      props.product.isCompared !== undefined &&
                      props.product.isCompared
                        ? true
                        : false
                    }
                    label={
                      <div
                        className="position-absolute top-0 start-0 w-100 h-100 pt-1 cursor-pointer"
                        style={{ paddingLeft: "1.75rem" }}
                      >
                        <small>Compare</small>
                      </div>
                    }
                    onClick={(event) =>
                      updateCompare(event, props.product.npid)
                    }
                    name={"compare_" + props.product.npid}
                    className={`
                      ${
                        darkMode
                          ? `text-light border-info border-opacity-50`
                          : `text-dark border-secondary`
                      }
                      border h-100 py-1 rounded gap-1 cursor-pointer position-relative
                    `}
                    style={{ paddingLeft: isSM ? "2rem" : "1.75rem" }}
                  />
                </Form.Group>
              )}
            </div>
            {props.product.StockStatus !== undefined && (
              <div
                className={`${classes.StockStatus} w-100 d-flex align-items-center py-2 pb-sm-3`}
              >
                <div
                  className={
                    (props.product.StockStatus === "In Stock With Evetech"
                      ? " bg-success text-success"
                      : " bg-danger text-danger") +
                    " mb-0 w-100 h-100 d-flex align-items-center justify-content-center rounded bg-opacity-25"
                  }
                >
                  <span className={`fw-1`}>
                    <small className="d-flex align-items-center justify-content-center">
                      {props.product.StockStatus}
                    </small>
                  </span>
                </div>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LaptopCard;
