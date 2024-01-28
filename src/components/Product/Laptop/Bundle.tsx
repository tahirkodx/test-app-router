import React, { useState } from "react";
import { Card, Col, Image, Row } from "react-bootstrap";
import { FcCollapse, FcExpand } from "react-icons/fc";
import { customAlphabet } from "nanoid";
import { FaRegCheckSquare, FaRegSquare } from "react-icons/fa";
import styles from "@/styles/Bundle.module.scss";
import { useTheme } from "@/store/ThemeContext";

const nanoid = customAlphabet("1234567890abcdef", 10);
var _ = require("lodash");

const Bundle = (props: any) => {
  let bundle = props.bundle;
  let isOpen = props.isOpen;
  const [open, toggleOpen] = useState(isOpen);
  const [icon, toggleIcon] = useState(<FcCollapse />);
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  const stripHtml = (str: any) => {
    return str.replace(/(<([^>]+)>)/gi, "");
  };
  const cardClick = (
    title: any,
    price: any,
    bundleId: any,
    id: any,
    pid: any
  ) => {
    props.onBundleSelection({
      BundleId: bundleId,
      Title: title,
      Price: price,
      Id: id,
      pid: pid,
    });
  };

  const setBundles = (setBundles: any) => {
    let orderBundles = _.orderBy(setBundles, ["Price"], ["asc"]);

    return orderBundles.map((bundle: any) => {
      let cardClass =
        props.selectedBundleItems != null
          ? _.filter(
              props.selectedBundleItems,
              (item) =>
                item.BundleId === bundle.BundleID &&
                item.Title === stripHtml(bundle.Title)
            ).length > 0
            ? "border-danger"
            : bundle.IsDefault === 1 &&
              _.filter(
                props.selectedBundleItems,
                (item) => item.BundleId === bundle.BundleID
              ).length === 0
            ? "border-danger"
            : `${darkMode ? `border-info border-opacity-50` : ``}`
          : bundle.IsDefault === 1
          ? "border-danger"
          : `${darkMode ? `border-info border-opacity-50` : ``}`;
      let cardPriceClass =
        props.selectedBundleItems != null
          ? _.filter(
              props.selectedBundleItems,
              (item) =>
                item.BundleId === bundle.BundleID &&
                item.Title === stripHtml(bundle.Title)
            ).length > 0
            ? "bg-danger text-white"
            : bundle.IsDefault === 1 &&
              _.filter(
                props.selectedBundleItems,
                (item) => item.BundleId === bundle.BundleID
              ).length === 0
            ? "bg-danger text-white"
            : `${
                darkMode
                  ? `bg-black text-white border-top border-secondary border-opacity-75 bg-gradient`
                  : `default`
              }`
          : bundle.IsDefault === 1
          ? "bg-danger text-white"
          : `${
              darkMode
                ? `bg-black text-white border-top border-secondary border-opacity-75 bg-gradient`
                : `default`
            }`;
      let cardIcon =
        props.selectedBundleItems != null ? (
          _.filter(
            props.selectedBundleItems,
            (item: any) =>
              item.BundleId === bundle.BundleID &&
              item.Title === stripHtml(bundle.Title)
          ).length > 0 ? (
            <FaRegCheckSquare />
          ) : bundle.IsDefault === 1 &&
            _.filter(
              props.selectedBundleItems,
              (item: any) => item.BundleId === bundle.BundleID
            ).length === 0 ? (
            <FaRegCheckSquare />
          ) : (
            <FaRegSquare />
          )
        ) : bundle.IsDefault === 1 ? (
          <FaRegCheckSquare />
        ) : (
          <FaRegSquare />
        );
      return (
        <div className="col-xl-3 col-md-4 col-sm-6 col-6 p-2" key={nanoid(5)}>
          <Card
            className={`
              ${cardClass} 
              ${styles.BundleCard}
              ${darkMode ? `bg-black text-white` : ``} 
              h-100 pb-4 overflow-hidden position-relative
            `}
            onClick={() =>
              cardClick(
                stripHtml(bundle.Title),
                bundle.Price,
                bundle.BundleID,
                bundle.OptionId,
                bundle.ProductId
              )
            }
          >
            <div
              className={`
                position-absolute bg-white z-index-1
                ${styles.BundleImageContainer}
              `}
            ></div>
            <Card.Body className="z-index-2">
              <Row className="d-flex">
                <Col md={4} className={`${styles.BundleImage} mb-2 mb-md-0`}>
                  <Image
                    src={bundle.ImageUrl}
                    className="img-fluid"
                    alt=""
                  ></Image>
                </Col>
                <Col md={8}>
                  <p
                    className={`flex-sm-fill text-break ${styles.BundleOptText}`}
                  >
                    {stripHtml(bundle.Title)}
                  </p>
                  <p
                    className={`${styles.BundlePrice} ${cardPriceClass} ${
                      bundle.Price === 0 ? "py-1" : ""
                    } m-0 fs-5 fw-2 px-3`}
                    style={{ lineHeight: bundle.Price === 0 ? "1rem" : "" }}
                  >
                    <span>
                      {" "}
                      {bundle.Price === 0 ? (
                        <small>
                          <small>Not Included</small>
                        </small>
                      ) : (
                        <span>R {bundle.Price}</span>
                      )}{" "}
                    </span>
                    <span
                      className={`${styles.BundleIcon} d-flex align-items-center`}
                    >
                      {" "}
                      {cardIcon}
                    </span>
                  </p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </div>
      );
    });
  };

  const clickToggle = () => {
    if (open) {
      toggleOpen(false);
      toggleIcon(<FcExpand />);
    } else {
      toggleOpen(true);
      toggleIcon(<FcCollapse />);
    }
  };

  return (
    <details key={nanoid(4)} open={open} className={`mb-3 ${styles.Bundle}`}>
      <summary
        className={`
          d-flex row p-1 pt-2 me-1 ms-1 rounded 
          ${styles.Head}
          ${darkMode ? `text-light bg-secondary bg-opacity-25 bg-gradient` : ``}
        `}
        onClick={clickToggle}
      >
        <div className={`${styles.HeadBtn}`}>
          <div>
            <span className={`fw-3`}>{bundle.BundleTitle} </span>
            <span className={`${styles.SelectedTitle}`}>
              {
                (bundle.SelectedOption = _.first(
                  _.filter(
                    bundle.Bundles.map((bundle: any) => {
                      return props.selectedBundleItems != null
                        ? _.filter(
                            props.selectedBundleItems,
                            (item: any) =>
                              item.BundleId === bundle.BundleID &&
                              item.Title === stripHtml(bundle.Title)
                          ).length > 0
                          ? stripHtml(bundle.Title)
                          : bundle.IsDefault === 1 &&
                            _.filter(
                              props.selectedBundleItems,
                              (item: any) => item.BundleId === bundle.BundleID
                            ).length === 0
                          ? stripHtml(bundle.Title)
                          : ""
                        : bundle.IsDefault === 1
                        ? stripHtml(bundle.Title)
                        : "";
                    })
                  ),
                  (item: any) => item.trim().legth > 0
                ))
              }
            </span>
          </div>
          <div className={`${styles.Arrow}`}>{icon}</div>
        </div>
      </summary>
      <div className="d-flex flex-wrap">{setBundles(bundle.Bundles)}</div>
    </details>
  );
};

export default Bundle;
