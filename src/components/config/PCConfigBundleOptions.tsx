"use client";
import React, { useEffect } from "react";
import { customAlphabet } from "nanoid";
import { useState } from "react";
import { FcCollapse, FcExpand } from "react-icons/fc";
import { Card, Col, Row, Image } from "react-bootstrap";
import { FaRegCheckSquare, FaRegSquare } from "react-icons/fa";
import styles from "@/styles/Bundle.module.scss";
import { useTheme } from "@/store/ThemeContext";
import useMediaQuery from "@/custom/hooks/useMediaQuery";

const nanoid = customAlphabet("1234bcd567890aef", 10);
var _ = require("lodash");

const PCConfigBundleOptions = (props: any) => {
  let bundles = props.Bundle;
  let isOpen = props.isOpen;
  const [open, toggleOpen] = useState(isOpen);
  const [icon, toggleIcon] = useState(<FcCollapse />);
  let bundleOptions = props.BundleData;
  let bindBundle = props.configBundle;
  const isSM = useMediaQuery("(min-width: 576px)");

  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  const stripHtml = (str: any) => {
    return str.replace(/(<([^>]+)>)/gi, "");
  };

  const cardClick = (
    title: any,
    price: any,
    optionId: any,
    optionDetailId: any,
    categoryId: any,
    productId: any,
    bundleTitle: any,
    priority: any
  ) => {
    props.onBundleSelection({
      OptionId: optionId,
      BundleTitle: bundleTitle,
      Title: title,
      Price: price,
      OptionDetailId: optionDetailId,
      CategoryId: categoryId,
      ProductId: productId,
      Priority: priority,
    });
  };

  let filteredSelected =
    props.selectedBundleItems != null
      ? _.filter(props.selectedBundleItems, (bundleItem: any) => {
          return bundleItem.OptionId === bundles.OptionId;
        })
      : null;

  const clickToggle = () => {
    if (open) {
      toggleOpen(false);
      toggleIcon(<FcExpand />);
    } else {
      toggleOpen(true);
      toggleIcon(<FcCollapse />);
    }
  };

  const setBundles = (bundleOptions: any, CategoryIDs: any) => {
    return bundleOptions.map((option: any) => {
      let cardClass =
        filteredSelected != null && filteredSelected.length > 0
          ? _.filter(
              filteredSelected,
              (item: any) =>
                item.OptionId === option.OptionId &&
                item.OptionDetailId === option.OptionDetailId &&
                item.Title === stripHtml(option.OptionText)
            ).length > 0
            ? "border-danger"
            : ""
          : option.isDefault === 1
          ? "border-danger"
          : "";
      let cardPriceClass =
        filteredSelected != null && filteredSelected.length > 0
          ? _.filter(
              filteredSelected,
              (item: any) =>
                item.OptionId === option.OptionId &&
                item.OptionDetailId === option.OptionDetailId &&
                item.Title === stripHtml(option.OptionText)
            ).length > 0
            ? "bg-danger text-white"
            : "bg-dark bg-gradient bg-opacity-25"
          : option.isDefault === 1
          ? "bg-danger text-white"
          : "default";
      let cardIcon =
        filteredSelected != null && filteredSelected.length > 0 ? (
          _.filter(
            filteredSelected,
            (item: any) =>
              item.OptionId === option.OptionId &&
              item.OptionDetailId === option.OptionDetailId &&
              item.Title === stripHtml(option.OptionText)
          ).length > 0 ? (
            <FaRegCheckSquare />
          ) : (
            <FaRegSquare />
          )
        ) : option.isDefault === 1 ? (
          <FaRegCheckSquare />
        ) : (
          <FaRegSquare />
        );
      return (
        <div
          className="col-xl-3 col-md-4 col-sm-6 col-6 p-2 position-relative z-index-1"
          key={nanoid(5)}
        >
          <Card
            className={`
              ${cardClass} 
              ${styles.BundleCard} 
              ${darkMode ? `bg-black text-light` : ``}
              h-100 pb-4 overflow-hidden position-relative
            `}
            onClick={() =>
              cardClick(
                stripHtml(option.OptionText),
                option.OptionPrice,
                option.OptionId,
                option.OptionDetailId,
                CategoryIDs,
                option.ProductID,
                bundles.BundleTitle,
                bundles.Priority
              )
            }
          >
            <div className={`${`position-absolute w-100 h-100 z-index-1`}`}>
              <div className={`${styles.ImageBackground} bg-white`}></div>
            </div>
            <div
              className={`${
                darkMode ? `bg-black` : ``
              } position-absolute w-100 z-index-1 bottom-0`}
              style={{ height: "1.8rem" }}
            ></div>
            <Card.Body className={`z-index-2`}>
              <Row className="d-inline-flex">
                <Col
                  md={4}
                  className={`${styles.BundleImage} mb-2 mb-md-0 d-flex align-items-center justiffy-content-center`}
                >
                  <Image
                    src={option.OptionImage}
                    alt={option.OptionText}
                    className="img-fluid"
                  />
                </Col>
                <Col md={8}>
                  <p
                    className={`flex-sm-fill text-break ${styles.BundleOptText}`}
                  >
                    {stripHtml(option.OptionText)}
                  </p>
                  <p
                    className={`${styles.BundlePrice} ${cardPriceClass} m-0 fs-5 fw-2 px-3`}
                  >
                    {stripHtml(option.OptionText).includes("Not Included") ===
                    true ? (
                      <span>
                        <small>
                          <small>Not Included</small>
                        </small>
                      </span>
                    ) : null}

                    {stripHtml(option.OptionText).includes("- Included") ===
                    true ? (
                      <span>
                        <small>Included</small>
                      </span>
                    ) : null}

                    {stripHtml(option.OptionText).includes("- Included") ===
                      false &&
                    stripHtml(option.OptionText).includes("Not Included") ===
                      false ? (
                      <span>+ R {option.OptionPrice}</span>
                    ) : null}

                    <span
                      className={`${styles.BundleIcon} d-flex align-items-center`}
                    >
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

  const setDefaultFirst = () => {
    let defaultOption = _.first(
      _.filter(bundleOptions, (option: any) => {
        return option.isDefault === 1;
      })
    );

    if (defaultOption !== undefined)
      props.onBundleSelection({
        OptionId: bundles.OptionId,
        BundleTitle: bundles.BundleTitle,
        Title: stripHtml(defaultOption.OptionText),
        Price: defaultOption.OptionPrice,
        OptionDetailId: defaultOption.OptionDetailId,
        CategoryId: bundles.CategoryIDs,
        ProductId: defaultOption.ProductID,
        Priority: bundles.Priority,
      });
  };

  useEffect(() => {
    if (
      props.selectedBundleItems !== null &&
      props.selectedBundleItems !== undefined
    ) {
      let chkSelected = _.filter(props.selectedBundleItems, (items: any) => {
        return items.OptionId === bundles.OptionId;
      });

      if (chkSelected !== undefined && chkSelected.length > 0) {
      } else {
        if (bundleOptions.length > 0) {
          if (!_.isEmpty(bindBundle) && bindBundle !== undefined) {
            let filteredSelected = _.filter(
              bundleOptions,
              (bundleItem: any) => {
                return bundleItem.ProductID === bindBundle.ProductId;
              }
            );
            if (filteredSelected !== undefined && filteredSelected.length > 0) {
              let bselected = _.first(filteredSelected);
              props.onBundleSelection({
                OptionId: bselected.OptionId,
                BundleTitle: bundles.BundleTitle,
                Title: stripHtml(bselected.OptionText),
                Price: bselected.OptionPrice,
                OptionDetailId: bselected.OptionDetailId,
                CategoryId: bundles.CategoryIDs,
                ProductId: bselected.ProductID,
                Priority: bundles.Priority,
              });
            } else {
              setDefaultFirst();
              props.setConfigBundleExpire(true);
            }
          } else {
            setDefaultFirst();
          }
        }
      }
    }
  }, []);

  return (
    <details
      key={nanoid(4)}
      open={open}
      className={`mb-3 ${styles.Bundle}`}
      id={_.toLower(bundles.BundleTitle)
        .replace(" ", "-")
        .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")
        .trim()
        .replace(" ", "-")
        .replace(" ", "-")}
    >
      <summary
        className={`
          d-flex row p-2 pt-3 me-2 ms-2 rounded
          ${
            darkMode
              ? `bg-dark bg-gradient border-bottom border-white border-opacity-25`
              : ``
          }
          ${styles.Head}
        `}
        onClick={clickToggle}
      >
        <div className={`${styles.HeadBtn}`}>
          <div>
            <span className={`fw-3`}>{bundles.BundleTitle} </span>
            <span className={`${styles.SelectedTitle}`}>
              {
                (bundles.SelectedOption = _.first(
                  _.filter(
                    bundleOptions.map((option: any) => {
                      return filteredSelected != null &&
                        filteredSelected.length > 0
                        ? _.filter(
                            filteredSelected,
                            (item: any) =>
                              item.OptionId === option.OptionId &&
                              item.OptionDetailId === option.OptionDetailId &&
                              item.Title === stripHtml(option.OptionText)
                          ).length > 0
                          ? stripHtml(option.OptionText)
                          : option.IsDefault === 1 &&
                            _.filter(
                              filteredSelected,
                              (item: any) =>
                                item.OptionId === option.OptionId &&
                                item.OptionDetailId === option.OptionDetailId
                            ).length === 0
                          ? stripHtml(option.OptionText)
                          : ""
                        : option.isDefault === 1
                        ? stripHtml(option.OptionText)
                        : "";
                    })
                  ),
                  (item: any) => item.trim().length > 0
                ))
              }
            </span>
          </div>
          <div className={`${styles.Arrow}`}>{icon}</div>
        </div>
      </summary>
      <div className="d-flex flex-wrap">
        {setBundles(bundleOptions, bundles.CategoryIDs)}
      </div>
    </details>
  );
};

export default PCConfigBundleOptions;
