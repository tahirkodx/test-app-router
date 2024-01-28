import React from "react";
import PageLink from "./PageLink";
import { Card } from "react-bootstrap";

const ImageLink = ({ Product, classes }: any) => {
  return (
    <>
      <PageLink
        Product={Product}
        className={`
              ${classes.CardImage} 
              d-flex-row cursor-pointer align-items-center justify-content-center text-center p-3 shadow
            `}
      >
        <div className="bg-white h-100 p-2 rounded">
          <Card.Img
            variant=""
            className={`p-1 ${classes.CardPic}`}
            src={"https://www.evetech.co.za/" + Product.productimage}
            alt={Product.TitleText}
            title={Product.TitleText}
          />
        </div>
      </PageLink>
    </>
  );
};

export default ImageLink;
