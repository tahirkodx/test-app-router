import { nanoid } from "nanoid";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Link from "next/link";
import styles from "@/styles/ProductDeals.module.scss";

const Banners = (props: any) => {
  return (
    <span className="d-grid cols-12 gap-3">
      {props.bannerSections?.length > 0 &&
        props.bannerSections.map((banner: any) => {
          return (
            <div
              className={
                typeof banner.bannerClass == "undefined"
                  ? ""
                  : banner.bannerClass
              }
              key={nanoid(4)}
            >
              <Link
                href={banner.bannerLink ? banner.bannerLink : ""}
                title={banner.bannerTitle}
                className={`${styles.MobiSlide} overflow-hidden bg-dark d-block position-relative rounded`}
              >
                <div
                  className={`${styles.RainbowBG01} position-absolute w-100 h-100 opacity-75`}
                ></div>
                <LazyLoadImage
                  src={banner.bannerImg}
                  visibleByDefault={banner.bannerImg}
                  className={`${styles.BannerImage} img-fluid hover-grow-2 hover-hide-50 position-relative w-100`}
                  alt={banner.bannerTitle}
                  width={banner.width}
                  height={banner.height}
                  placeholderSrc={props.placeholderImg}
                />
              </Link>
            </div>
          );
        })}
    </span>
  );
};

export default Banners;
