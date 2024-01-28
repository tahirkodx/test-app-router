"use client";
import React from "react";
import { customAlphabet } from "nanoid";
import { Row } from "react-bootstrap";
import SimilarProductCard from "@/components/Product/SimilarProductCard";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import { useTheme } from "@/store/ThemeContext";
import Heading from "../Heading";
import useMediaQuery from "@/custom/hooks/useMediaQuery";

const SimilarProductList = (props: any) => {
  const nanoid = customAlphabet("abcdef1234567890", 10);
  let products = props.Products;
  let productsList = null;
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;
  const isHD = useMediaQuery("(min-width: 1921px)");

  if (products !== null && products.length > 0) {
    productsList = products.map((product: any) => {
      return <SimilarProductCard Product={product} key={nanoid(5)} />;
    });
  }

  return (
    <>
      <Row className="p-3">
        <Heading level={3} className={`${`fs-5`}`}>
          Similar Products ({props.Products.length}){" "}
        </Heading>
      </Row>
      <LazyLoadComponent>
        <div
          className={`
            d-grid gap-3 cols-2 cols-md-3 cols-xl-4
            ${isHD ? `cols-xl-5` : ``}
          `}
        >
          {productsList}
        </div>
      </LazyLoadComponent>
    </>
  );
};

export default SimilarProductList;
