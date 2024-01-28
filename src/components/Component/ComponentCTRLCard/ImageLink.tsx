import React from "react";
import PageLink from "./PageLink";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ImageLink = ({ Product, placeholderImg, styles }: any) => {
  return (
    <>
      <PageLink
        Product={Product}
        className={`flex-grow-1 text-decoration-none text-dark rounded h-100 w-100 p-3 pb-0`}
      >
        <div
          className={`
              ${styles.LazyPlaceholder}
              h-100 w-100 position-relative rounded overflow-hidden p-2 bg-white rounded overflow-hidden
            `}
        >
          <LazyLoadImage
            src={`https://www.evetech.co.za/` + Product.imageurl}
            alt={Product.ProName}
            className={`
                ${styles.Products__Image} 
                img-cover w-100 h-100 position-absolute start-0 top-0 p-2
              `}
            placeholderSrc={placeholderImg}
            width={600}
            height={400}
            effect="blur"
            style={{ objectPosition: "50% 50%" }}
            defaultValue={`https://www.evetech.co.za/` + Product.imageurl}
            visibleByDefault={true}
          />
          {Product.SoldOut !== undefined && Product.SoldOut === "yes" ? (
            <div className="position-absolute top-0 left-0 w-100 h-100 d-flex align-items-center justify-content-center bg-light bg-opacity-50 z-index-2">
              <LazyLoadImage
                src="https://www.evetech.co.za/repository/product/sold-out-600px-v1.png"
                alt=""
                className="img-contain w-100 h-100"
                width={600}
                height={400}
                placeholderSrc="https://www.evetech.co.za/repository/ProductImages/image-placeholder.png"
              />
            </div>
          ) : null}
        </div>
      </PageLink>
    </>
  );
};

export default ImageLink;
