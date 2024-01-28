import _ from "lodash";
import Link from "next/link";
import React from "react";

const PageLink = ({ children, Product, className }: any) => {
  return (
    <>
      <Link
        href={`/${_.replace(
          _.toLower(Product.title),
          new RegExp(" ", "g"),
          "-"
        ).trim()}/best-pc-deal/${Product.ProductID}.aspx`}
        title={Product.TitleText}
        className={`${className}`}
      >
        {children}
      </Link>
    </>
  );
};

export default PageLink;
