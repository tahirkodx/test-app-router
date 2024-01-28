import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const LinkImage = ({ Component, placeholderImg, isLG }: any) => {
  return (
    <LazyLoadImage
      placeholderSrc={placeholderImg}
      src={Component.image}
      visibleByDefault={Component.image}
      alt={Component.description}
      className={`
          ${isLG ? `` : `position-absolute`} 
          d-grid align-self-end pe-none img-fluid img-contain w-100 h-100
        `}
      style={{ transform: isLG ? `translateY(0px)` : `translateY(2px)` }}
      width={312}
      height={296}
    />
  );
};

export default LinkImage;
