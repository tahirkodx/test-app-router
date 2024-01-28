import React from "react";
import Link from "next/link";

const _ = require("lodash");

const CompLink = ({ component, className, ...props }: any) => {
  return (
    <Link
      href={`/${_.join(
        _.filter(
          _.split(
            _.replace(
              _.toLower(component.url),
              new RegExp(/[^a-zA-Z0-9 ]/g),
              " "
            ),
            " "
          ),
          _.size
        ),
        "-"
      ).trim()}/best-deal/${component.productid}.aspx`}
      className={`${className}`}
    >
      {props.children}
    </Link>
  );
};

export default CompLink;
