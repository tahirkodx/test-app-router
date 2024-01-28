import React, { useEffect } from "react";
import { customAlphabet } from "nanoid";
import { useState } from "react";
import { FcCollapse, FcExpand } from "react-icons/fc";
import { Card, Col, Image, Row } from "react-bootstrap";
import {
  FaCheck,
  FaRegCheckSquare,
  FaRegSquare,
  FaSearchPlus,
} from "react-icons/fa";
import styles from "@/styles/Bundle.module.scss";
import ModalGallery from "@/components/Gallery/ModalGallery";
import { ProductAPI } from "@/custom/utils/actions";
import { useTheme } from "@/store/ThemeContext";

const nanoid = customAlphabet("1234bcd567890aef", 10);
var _ = require("lodash");

const BundleOptions = (props: any) => {
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;
  let bundles = props.Bundle;
  let isOpen = props.isOpen;
  const [open, toggleOpen] = useState(isOpen);
  const [icon, toggleIcon] = useState(<FcCollapse />);
  let bundleOptions = props.BundleData;
  const [modalGalleryShow, setModalGalleryShow] = useState(false);
  const [modalData, setModalData] = useState({
    name: "",
    type: 3,
  });

  const [galleryData, setGalleryData] = useState([
    {
      original:
        "https://www.evetech.co.za/repository/ProductImages/evetech-rix-mid-tower-gaming-case-black-1000px-v07.jpg",
      thumbnail:
        "https://www.evetech.co.za/repository/ProductImages/evetech-rix-mid-tower-gaming-case-black-1000px-v07.jpg",
    },
    {
      original:
        "https://www.evetech.co.za/repository/ProductImages/evetech-rix-mid-tower-gaming-case-black-1000px-v06.jpg",
      thumbnail:
        "https://www.evetech.co.za/repository/ProductImages/evetech-rix-mid-tower-gaming-case-black-1000px-v06.jpg",
    },
    {
      original:
        "https://www.evetech.co.za/repository/ProductImages/evetech-rix-mid-tower-gaming-case-black-1000px-v05.jpg",
      thumbnail:
        "https://www.evetech.co.za/repository/ProductImages/evetech-rix-mid-tower-gaming-case-black-1000px-v05.jpg",
    },
    {
      original:
        "https://www.evetech.co.za/repository/ProductImages/evetech-rix-mid-tower-gaming-case-black-1000px-v04.jpg",
      thumbnail:
        "https://www.evetech.co.za/repository/ProductImages/evetech-rix-mid-tower-gaming-case-black-1000px-v04.jpg",
    },
    {
      original:
        "https://www.evetech.co.za/repository/ProductImages/evetech-rix-mid-tower-gaming-case-black-1000px-v03.jpg",
      thumbnail:
        "https://www.evetech.co.za/repository/ProductImages/evetech-rix-mid-tower-gaming-case-black-1000px-v03.jpg",
    },
    {
      original:
        "https://www.evetech.co.za/repository/ProductImages/evetech-rix-mid-tower-gaming-case-black-1000px-v02.jpg",
      thumbnail:
        "https://www.evetech.co.za/repository/ProductImages/evetech-rix-mid-tower-gaming-case-black-1000px-v02.jpg",
    },
    {
      original:
        "https://www.evetech.co.za/repository/ProductImages/evetech-rix-mid-tower-gaming-case-black-1000px-v01.jpg",
      thumbnail:
        "https://www.evetech.co.za/repository/ProductImages/evetech-rix-mid-tower-gaming-case-black-1000px-v01.jpg",
    },
  ]);

  const stripHtml = (str: any) => {
    return str.replace(/(<([^>]+)>)/gi, "");
  };

  const getGalleryData = async (ProductId: any, OptionTitle: any) => {
    const prods = await ProductAPI.getBundleGallery({ ProductId });
    /* const prods = await fetch(`/api/getBundleGallery/${ProductId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((res) => res.json()); */
    if (
      prods !== null &&
      prods !== undefined &&
      prods.result !== undefined &&
      prods.result !== null
    ) {
      let gImages = prods.result;
      let gallery = _.map(gImages, (images: any) => {
        return {
          original: `https://www.evetech.co.za/${images.ImageFile.replace(
            "https://www.evetech.co.za/",
            ""
          )}`,
          thumbnail: `https://www.evetech.co.za/${images.ImageFile.replace(
            "https://www.evetech.co.za/",
            ""
          )}`,
        };
      });
      setGalleryData((prevGallData) => {
        prevGallData = gallery;
        return prevGallData;
      });
      setModalGalleryShow(true);
      setModalData({
        name: OptionTitle,
        type: 3,
      });
    }
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
            ? `border-danger ${styles.Selected}`
            : ""
          : option.isDefault === 1
          ? `border-danger ${styles.Selected}`
          : "";
      let cardPriceClass =
        filteredSelected != null && filteredSelected.length > 0
          ? _.filter(
              filteredSelected,
              (item) =>
                item.OptionId === option.OptionId &&
                item.OptionDetailId === option.OptionDetailId &&
                item.Title === stripHtml(option.OptionText)
            ).length > 0
            ? `text-white ${styles.SelectedPrice}`
            : `${
                darkMode
                  ? `border-top border-secondary border-opacity-75 bg-gradient`
                  : `default`
              }`
          : option.isDefault === 1
          ? `text-white ${styles.SelectedPrice}`
          : `${
              darkMode
                ? `border-top border-secondary border-opacity-75 bg-gradient`
                : `default`
            }`;
      let cardIcon =
        filteredSelected != null && filteredSelected.length > 0 ? (
          _.filter(
            filteredSelected,
            (item: any) =>
              item.OptionId === option.OptionId &&
              item.OptionDetailId === option.OptionDetailId &&
              item.Title === stripHtml(option.OptionText)
          ).length > 0 ? (
            <div className="position-relative">
              <FaCheck
                className={`${styles.BundleCheck} position-absolute w-100 h-100 top-0 start-0 p-1 pt-2`}
              />
              <FaRegSquare />
            </div>
          ) : (
            <FaRegSquare />
          )
        ) : option.isDefault === 1 ? (
          <div className="position-relative">
            <FaCheck
              className={`${styles.BundleCheck} position-absolute w-100 h-100 top-0 start-0 p-1 pt-2`}
            />
            <FaRegSquare />
          </div>
        ) : (
          <FaRegSquare />
        );
      return (
        <div className="position-relative z-index-1" key={nanoid(5)}>
          <Card
            className={`
              ${styles.BundleCard} 
              ${cardClass} 
              ${
                darkMode
                  ? `bg-black bg-opacity-25 border-info border-opacity-50 text-light`
                  : ``
              }
              h-100 pb-4 overflow-hidden position-relative z-index-1
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
            <div
              className={`${styles.CardImage} position-absolute top-0 start-0 w-100 h-100 z-index-1 pe-none`}
            >
              <div className="bg-light"></div>
              <div></div>
            </div>
            <Card.Body className="p-2 pb-3 p-xl-3 z-index-2">
              <Row className="d-flex">
                <Col md={4} className={`${styles.BundleImage} mb-2 mb-md-0`}>
                  <Image
                    src={option.OptionImage}
                    alt={option.OptionText}
                    className="img-fluid"
                  ></Image>
                </Col>
                <Col md={8}>
                  <p
                    className={`
                      flex-sm-fill text-break mb-0 lh-1 
                      ${styles.BundleOptText} 
                      ${darkMode ? `opacity-75 px-md-2` : ``}
                    `}
                  >
                    <small>{stripHtml(option.OptionText)}</small>
                  </p>
                  <div
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
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          {option.ProductID !== 0 && (
            <div
              className={`${styles.GalleryLink} position-absolute top-0 start-0 w-100 h-100 z-index-2 pe-none`}
            >
              <div className="p-2 w-100 h-100 pe-auto">
                <div
                  className="w-100 h-100 bg-light bg-opacity-50 d-flex justify-content-center align-items-center cursor-pointer"
                  onClick={() => {
                    getGalleryData(option.ProductID, option.OptionText);
                  }}
                >
                  <FaSearchPlus className="fs-3" />
                </div>
              </div>
            </div>
          )}
        </div>
      );
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
        .replace(" ", "-")}
    >
      <summary
        className={`
          d-flex row p-2 pt-3 me-2 ms-2 rounded 
          ${styles.Head}
          ${darkMode ? `bg-secondary bg-opacity-50 text-light bg-gradient` : ``}
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
          <div className={`${styles.Arrow} ${darkMode ? styles.darkMode : ``}`}>
            {icon}
          </div>
        </div>
      </summary>
      <ModalGallery
        show={modalGalleryShow}
        onHide={() => {
          setModalGalleryShow(false);
        }}
        product={modalData}
        gallerydata={galleryData}
      />
      <div className="d-grid cols-2 cols-sm-3 cols-lg-4 cols-xl-5 gap-2 gap-xl-3 m-2 mt-xl-3">
        {setBundles(bundleOptions, bundles.CategoryIDs)}
      </div>
    </details>
  );
};

export default BundleOptions;
