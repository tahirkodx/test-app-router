"use client";
import React from "react";
import { Badge } from "react-bootstrap";
import SpecialTag from "../Main/Controls/SpecialTag";
import useMediaQuery from "@/custom/hooks/useMediaQuery";

const _=require('lodash');
const SpecialTags = ({ helperCtx, Product, styles }: any) => {
  const isSM = useMediaQuery("(min-width: 576px)");
  return (
    <>
      <div className="position-absolute top-0 left-0 w-100 p-2 p-sm-3 pe-none">
        <div className="position-relative w-100 d-flex gap-2 justify-content-between align-items-start">
          <span className="d-grid gap-1">
            {helperCtx.dealTags !== undefined &&
              helperCtx.dealTags.length > 0 &&
              Product.SpecialID !== undefined &&
              (Product.SpecialID === 1 || Product.SpecialID === "1") && (
                <SpecialTag type={"On Special"} />
              )}
            {
              /* get deal text from website json */
              (helperCtx.dealTags === undefined ||
                _.isEmpty(helperCtx.dealTags) ||
                (helperCtx.dealTags !== undefined &&
                  helperCtx.dealTags.length === 0)) &&
                Product.SpecialID !== undefined &&
                (Product.SpecialID === 1 || Product.SpecialID === "1") && (
                  <Badge
                    className={`bg-danger overflow-hidden position-relative`}
                    style={{ width: "max-content" }}
                  >
                    <span
                      className={`${styles.Products__TagText} fw-2 position-relative`}
                    >
                      {!isSM ? <span>Special</span> : "On Special"}
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
                _.isEmpty(helperCtx.dealTags) ||
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
              Product.isOnDeal !== undefined &&
              _.toString(Product.isOnDeal) === "1" && (
                <SpecialTag type={helperCtx.dealText} />
              )}
            {(helperCtx.dealTags === undefined ||
              _.isEmpty(helperCtx.dealTags) ||
              (helperCtx.dealTags !== undefined &&
                helperCtx.dealTags.length === 0)) &&
              helperCtx.showDealIcon &&
              Product.isOnDeal !== undefined &&
              _.toString(Product.isOnDeal) === "1" && (
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

            {helperCtx.dealTags !== undefined &&
              helperCtx.dealTags.length > 0 &&
              helperCtx.showDealIcon &&
              Product.IsDealNew !== undefined &&
              Product.IsDealNew === 1 && <SpecialTag type={"NEW"} />}
            {
              /* get deal text from website json */
              (helperCtx.dealTags === undefined ||
                _.isEmpty(helperCtx.dealTags) ||
                (helperCtx.dealTags !== undefined &&
                  helperCtx.dealTags.length === 0)) &&
                Product.IsDealNew !== undefined &&
                Product.IsDealNew === 1 && (
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
                )
            }
          </span>
        </div>
      </div>
    </>
  );
};

export default SpecialTags;
