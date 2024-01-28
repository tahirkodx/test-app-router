import React, { useContext, useState } from "react";
import HelperContext from "@/store/helper-context";
import SpecialTag from "@/components/Main/Controls/SpecialTag";
import { Badge, Button, Card, Image } from "react-bootstrap";
import Link from "next/link";
import styles from "@/styles/ComponentCard.module.scss";
import { FaHeart, FaQuestionCircle } from "react-icons/fa";
import AskQuestion from "@/components/Modals/AskQuestion";
import { useTheme } from "@/store/ThemeContext";
import FancyPrice from "../FancyPrice";
import AddToWishlist from "../AddToWishList";

var _ = require("lodash");

const ComponentCard = (props: any) => {
  let Product = props.Product;
  const [askQuestionShow, setAskQuestionShow] = useState(false);
  const helperCtx = useContext(HelperContext);
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  return (
    <Card
      className={`
        ${styles.Products__Card} 
        ${styles.HoverGrow}
        ${darkMode ? `bg-black border-info border-opacity-50` : ``} 
        shadow overflow-hidden h-100 gap-2 position-relative pb-2
      `}
    >
      <Link
        className="d-flex align-items-center justify-content-center"
        href={`/${_.join(
          _.filter(
            _.split(
              _.replace(
                _.toLower(Product.title),
                new RegExp(/[^a-zA-Z0-9 ]/g),
                " "
              ),
              " "
            ),
            _.size
          ),
          "-"
        ).trim()}/best-deal/${Product.ProductID}.aspx`}
      >
        <div className="p-3 pb-0 d-flex align-items-center justify-content-center w-100 h-100">
          <Image
            fluid
            src={`https://www.evetech.co.za/` + Product.productImage}
            className={`
              ${styles.Products__Image}
              ${darkMode ? `p-2` : ``} 
              bg-white rounded img-contain h-100 w-100
            `}
            alt=""
          />
        </div>
      </Link>

      <div className="px-2 px-sm-3 text-center">
        <h3
          className={`${
            darkMode ? `text-light` : ``
          } fs-6 fw-2 lh-1 m-0 overflow-hidden h-100`}
        >
          {Product.title}
        </h3>
      </div>
      <div className="px-2 px-sm-3 text-center d-sm-flex gap-2 justify-content-between align-items-center">
        <div className={`${styles.Products__Price} fs-3 flex-shrink-0`}>
          <FancyPrice price={Product.price_vat} />
        </div>
        <div
          className={`
            ${darkMode ? `` : `text-danger`} 
            text-break lh-1
          `}
          style={{ color: `#e7db1d` }}
        >
          <small>
            <small>{Product.productsku}</small>
          </small>
        </div>
      </div>
      <div className="px-2 px-sm-3 text-center">
        <div className={`${styles.Products__Buttons} d-grid gap-1`}>
          <Link
            href={`/${_.join(
              _.filter(
                _.split(
                  _.replace(
                    _.toLower(Product.title),
                    new RegExp(/[^a-zA-Z0-9 ]/g),
                    " "
                  ),
                  " "
                ),
                _.size
              ),
              "-"
            ).trim()}/best-deal/${Product.ProductID}.aspx`}
            className={`${styles.Products__MainButton} text-decoration-none text-dark rounded`}
          >
            <Button
              variant={darkMode ? `dark` : `light`}
              size="sm"
              className={`${
                darkMode ? `text-light` : `text-dark`
              } rounded w-100 h-100 lh-1 bg-gradient`}
            >
              <span className="lh-1">More Info</span>
            </Button>
          </Link>
          <div className={`d-flex h-100 rounded`}>
            <Button
              variant={darkMode ? `dark` : `light`}
              size="sm"
              className={`
                ${darkMode ? `bg-black` : ``} 
                w-100 h-100 d-flex align-items-center fs-6 bg-gradient
              `}
              onClick={() => setAskQuestionShow(true)}
            >
              <FaQuestionCircle style={{ fill: "url(#purpleGradient1)" }} />
            </Button>

            <AskQuestion
              show={askQuestionShow}
              onHide={() => setAskQuestionShow(false)}
              product={{
                pid: Product.ProductID,
                name: Product.Name,
                url: `https://www.evetech.co.za/${_.replace(
                  _.toLower(Product.title),
                  new RegExp(" ", "g"),
                  "-"
                ).trim()}/best-deal/${Product.ProductID}.aspx`,
                price: Product.Price,
                ptype: 2,
                page: "componentCard",
              }}
            />
          </div>
          <div className={`d-flex h-100 rounded`}>
            <AddToWishlist productId={Product.ProductID} ptype={`2`}>
              <Button
                variant={darkMode ? `dark` : `light`}
                size="sm"
                className={`
                  ${darkMode ? `bg-black` : ``} 
                  w-100 h-100 d-flex align-items-center fs-6 bg-gradient
                `}
              >
                <FaHeart style={{ fill: "url(#purpleGradient1)" }} />
              </Button>
            </AddToWishlist>
          </div>
        </div>
      </div>
      <div className="px-2 px-sm-3">
        <Badge
          className={`${
            Product.Availability === "In Stock with Evetech" ||
            Product.Availability === "In Stock"
              ? "bg-success"
              : "bg-danger"
          } w-100 mb-2`}
        >
          <span className="fw-1 fs-6 text-wrap">
            <small>{Product.Availability}</small>
          </span>
        </Badge>
      </div>
      <div className="position-absolute top-0 left-0 w-100 p-2 p-sm-3">
        <div className="position-relative w-100 d-flex gap-2 justify-content-between align-items-start">
          <span className="d-grid gap-1">
            {helperCtx.dealTags !== undefined &&
              helperCtx.dealTags.length > 0 &&
              Product.isavailable === 1 && <SpecialTag type={"On Special"} />}
            {
              /* get deal text from website json */
              (helperCtx.dealTags === undefined ||
                (helperCtx.dealTags !== undefined &&
                  helperCtx.dealTags.length === 0)) &&
                Product.isavailable === 1 && (
                  <Badge
                    className={`bg-danger overflow-hidden position-relative`}
                    style={{ width: "max-content" }}
                  >
                    <span
                      className={`${styles.Products__TagText} fw-2 position-relative`}
                    >
                      {"On Special"}
                    </span>
                  </Badge>
                )
            }

            {helperCtx.dealTags !== undefined &&
              helperCtx.dealTags.length > 0 &&
              Product.clearance !== undefined &&
              Product.clearance === "yes" &&
              helperCtx.showClearance && <SpecialTag type={"Clearance Sale"} />}
            {
              /* get deal text from website json */
              (helperCtx.dealTags === undefined ||
                (helperCtx.dealTags !== undefined &&
                  helperCtx.dealTags.length === 0)) &&
                helperCtx.showClearance &&
                Product.clearance !== undefined &&
                Product.clearance === "yes" && (
                  <Badge
                    className={`bg-warning overflow-hidden position-relative`}
                    style={{ width: "max-content" }}
                  >
                    <span
                      className={`${styles.Products__TagText} fw-2 position-relative`}
                    >
                      Clearance
                    </span>
                  </Badge>
                )
            }
          </span>
          <span className="d-grid gap-1">
            {helperCtx.dealTags !== undefined &&
              helperCtx.dealTags.length > 0 &&
              helperCtx.showDealIcon &&
              Product.IsOnDeal !== undefined &&
              Product.IsOnDeal === 1 && (
                <SpecialTag type={helperCtx.dealText} />
              )}
            {(helperCtx.dealTags === undefined ||
              _.isEmpty(helperCtx.dealTags) ||
              (helperCtx.dealTags !== undefined &&
                helperCtx.dealTags.length === 0)) &&
              helperCtx.showDealIcon &&
              Product.IsOnDeal !== undefined &&
              Product.IsOnDeal === 1 && (
                <Badge
                  className={`bg-dark end-0 overflow-hidden position-relative w-100`}
                  style={{ width: "max-content" }}
                >
                  <span
                    className={`${styles.Products__TagText} fw-2 position-relative`}
                  >
                    {helperCtx.dealText}
                  </span>
                </Badge>
              )}

            {/* {helperCtx.dealTags !== undefined && helperCtx.dealTags.length > 0 && helperCtx.showDealIcon && Product.IsDealNew !== undefined &&
                      Product.IsDealNew === 1 &&  
                    <SpecialTag type={"NEW"} />
                  } */}
            {/* get deal text from website json */
            /* (helperCtx.dealTags === undefined || (helperCtx.dealTags !== undefined && helperCtx.dealTags.length === 0)) &&
                    Product.IsDealNew !== undefined && Product.IsDealNew === 1 && (
                      <Badge
                        className={`bg-dark overflow-hidden position-relative w-100`}
                        style={{ width: "max-content" }}
                      >
                        <svg
                          width="100%"
                          height="100%"
                          className="position-absolute top-0 start-0"
                        >
                          <rect
                            x="0"
                            y="0"
                            width="100%"
                            height="100%"
                            style={{ fill: "url(#New)" }}
                          ></rect>
                        </svg>
                        <span
                          className={`${styles.Products__TagText} fw-2 position-relative`}
                        >
                          {"NEW"}
                        </span>
                      </Badge>
                    ) */}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default ComponentCard;
