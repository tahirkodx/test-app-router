import _ from "lodash";
import Link from "next/link";
import React from "react";

const PageLink = ({ className, children, Product }: any) => {
  return (
    <>
      <Link
        href={
          `/${_.join(
            _.filter(
              _.split(
                _.replace(
                  _.toLower(Product.url),
                  new RegExp(/[^a-zA-Z0-9 ]/g),
                  " "
                ),
                " "
              ),
              _.size
            ),
            "-"
          ).trim()}/` +
          (Product.typeid === "2"
            ? `best-deal`
            : Product.typeid === "3"
            ? `laptops-for-sale`
            : `best-pc-deal`) +
          `/${Product.productid}.aspx`
        }
        className={`${className}`}
      >
        {children}
      </Link>
    </>
  );
};

export default PageLink;
