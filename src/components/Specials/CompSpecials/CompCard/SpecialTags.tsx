"use client";
import React from "react";
import { Badge } from "react-bootstrap";
import SpecialTag from "@/components/Specials/SpecialTag";

const _ = require("lodash");

const SpecialTags = ({ component, helperCtx }: any) => {
  return (
    <div className={`position-absolute start-0 top-0 p-3 d-grid gap-1`}>
      {/* {component.SpecialID === 1 && (
      <Badge className={"bg-dark"}>
        <span className={`${styles.LineBreak} fw-1`}>
          On Special
        </span>
      </Badge>
    )} */}

      {helperCtx !== undefined &&
      helperCtx.dealTags !== undefined &&
      helperCtx.dealTags.length > 0 &&
      helperCtx.showDealIcon &&
      component.IsOnDeal === 1 ? (
        <SpecialTag type={helperCtx.dealText} />
      ) : null}

      {((helperCtx !== undefined && helperCtx.dealTags === undefined) ||
        _.isEmpty(helperCtx.dealTags) ||
        (helperCtx.dealTags !== undefined &&
          helperCtx.dealTags.length === 0)) &&
      component.IsOnDeal === 1 &&
      helperCtx.showDealIcon ? (
        <Badge bg="primary">
          <span className="fw-2 text-light">{helperCtx.dealText}</span>
        </Badge>
      ) : null}
    </div>
  );
};

export default SpecialTags;
