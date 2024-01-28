import React from "react";
import Link from "next/link";
const _ = require("lodash");

const PageLink = ({ pc, className, ...props }: any) => {
  return (
    <Link
      href={`/${_.replace(
        _.toLower(pc.url),
        new RegExp(" ", "g"),
        "-"
      ).trim()}/best-pc-deal/${pc.productid}.aspx`}
      title={pc.ProName}
      className={className}
    >
      {props.children}
    </Link>
  );
};

export default PageLink;
