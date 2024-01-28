import React from "react";
import LinkImage from "./LinkImage";

const SmallLinks = ({
  Component,
  styles,
  isHD,
  isSM,
  isLG,
  placeholderImg,
}: any) => {
  const imgContainSize = () => {
    let size = `75px`;
    if (isSM) {
      size = `100px`;
    }
    if (isHD) {
      size = `175px`;
    }

    return size;
  };

  return (
    <>
      <div
        className={`${styles.ImageContainer} position-relative rounded-circle mx-auto`}
        style={{ height: imgContainSize(), width: imgContainSize() }}
      >
        <div
          className="position-absolute rounded-circle top-0 start-0 w-100 h-100 overflow-hidden"
          style={{ padding: "3px" }}
        >
          <div className="rounded-circle overflow-hidden bg-white w-100 h-100"></div>
        </div>
        <LinkImage
          Component={Component}
          placeholderImg={placeholderImg}
          isLG={isLG}
        />
      </div>

      <div className={`${styles.Text} fw-2 lh-1`}>{Component.heading}</div>
    </>
  );
};

export default SmallLinks;
