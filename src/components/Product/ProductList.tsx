import React from "react";
import { Spinner } from "react-bootstrap";
import { ProductCard } from "@/components/Product";
import { customAlphabet } from "nanoid";

const ProductList = (props: any) => {
  let parentClass = "row";
  const nanoid = customAlphabet("1234567890abcdef", 10);
  let prodData = (
    <div className={`d-flex align-items-center justify-content-center`}>
      <Spinner animation="border" variant="warning" />
    </div>
  );
  if (props.data?.length > 0) {
    parentClass = "d-inline-flex gap-3 pe-3";
    prodData = props.data.map((laptop: any) => (
      <ProductCard product={laptop} key={nanoid(5)} />
    ));
  }

  return <div className={parentClass}>{prodData}</div>;
};

export default ProductList;
