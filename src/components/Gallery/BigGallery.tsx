"use client";
import { nanoid } from "nanoid";
import React, { useEffect, useRef, useState } from "react";
import {
  FaAngleDown,
  FaAngleLeft,
  FaAngleRight,
  FaAngleUp,
} from "react-icons/fa";
import Slider from "react-slick";
import styles from "@/styles/BigGallery.module.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { SideBySideMagnifier } from "react-image-magnifiers";
import YoutubeEmbed from "@/components/Gallery/YoutubeEmbed";

const placeholderImg =
  "https://www.evetech.co.za/repository/ProductImages/image-placeholder.png";

function MobiNext(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={
        "slick-arrow text-center rounded-end h-100 position-absolute bottom-0 end-0 d-flex align-items-center"
      }
      style={{
        ...style,
        background: "rgba(211, 211, 211,0.3)",
        top: "unset",
      }}
      onClick={onClick}
    >
      <FaAngleRight />
    </div>
  );
}

function MobiPrev(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={
        "slick-arrow text-center rounded-start h-100 position-absolute top-0 start-0 d-flex align-items-center"
      }
      style={{
        ...style,
        background: "rgba(211, 211, 211,0.3)",
        bottom: "unset",
      }}
      onClick={onClick}
    >
      <FaAngleLeft />
    </div>
  );
}

const _ = require("lodash");
const BigGallery = (props: any) => {
  const [galleryData, setGalleryData] = useState(props.gallerydata);
  const [videoUrls, setVideoUrls] = useState(props.videourls);

  const ref = useRef();

  const [selectedImage, setSelectedImage] = useState(
    "https://www.evetech.co.za/repository/ProductImages/evetech-gaming-pc.jpg"
  );

  useEffect(() => {
    const element = ref.current;
    try {
      setSelectedImage(
        galleryData ? _.first(galleryData).original : _.first(videoUrls).videoID
      );
    } catch (e) {}
  }, []);

  function handleThumbnailClick(image: any) {
    setSelectedImage(image);
  }

  const settings = {
    infinite: true,
    slidesToShow:
      galleryData !== undefined && galleryData.length < 5
        ? galleryData.length
        : 5,
    slidesToScroll:
      galleryData !== undefined && galleryData.length < 5
        ? galleryData.length
        : 5,
    beforeChange: function (currentSlide: any, nextSlide: any) {},
    afterChange: function (currentSlide: any) {},
    nextArrow: <MobiNext />,
    prevArrow: <MobiPrev />,
    responsive: [
      {
        breakpoint: 576,
        settings: {
          slidesToShow:
            galleryData !== undefined && galleryData.length < 4
              ? galleryData.length
              : 4,
          slidesToScroll:
            galleryData !== undefined && galleryData.length < 4
              ? galleryData.length
              : 4,
        },
      },
    ],
  };

  return (
    <div className={`${styles.Grid} d-grid gap-2 cols-12`}>
      <div className="span-12 position-relative order-2">
        <Slider {...settings} className={`${styles.Thumbnails} px-3 w-100`}>
          {galleryData && galleryData.length > 1
            ? galleryData.map((gallery: any) => {
                return (
                  <div key={nanoid(5)}>
                    <div
                      className="d-flex justify-content-center border p-1 bg-white"
                      onClick={() => handleThumbnailClick(gallery.original)}
                    >
                      <LazyLoadImage
                        src={gallery.thumbnail}
                        alt=""
                        style={{
                          height: "100%",
                          width: "100%",
                          objectFit: "contain",
                        }}
                        width={40}
                        height={40}
                        placeholderSrc={placeholderImg}
                      />
                    </div>
                  </div>
                );
              })
            : null}
          {videoUrls && videoUrls.length > 1
            ? videoUrls.map((video: any) => {
                return (
                  <div key={nanoid(7)}>
                    <div
                      className="d-flex justify-content-center border p-1"
                      onClick={() => handleThumbnailClick(video.videoID)}
                    >
                      <LazyLoadImage
                        src={`https://img.youtube.com/vi/${video.videoID}/0.jpg`}
                        alt=""
                        style={{
                          height: "100%",
                          width: "100%",
                          objectFit: "contain",
                        }}
                        width={40}
                        height={40}
                        placeholderSrc={placeholderImg}
                      />
                    </div>
                  </div>
                );
              })
            : null}
        </Slider>
      </div>
      <div className="span-12 position-relative order-1">
        <div className="position-absolute w-100 h-100">
          <div
            className={`${styles.MainCanvas} position-absolute h-100 w-100 bg-white rounded`}
          >
            {galleryData ? (
              <SideBySideMagnifier
                imageSrc={selectedImage}
                imageAlt=""
                alwaysInPlace={true}
                className={styles.MainImage}
              />
            ) : null}
            {videoUrls !== undefined && videoUrls.length > 0 ? (
              <span className={styles.MainImage}>
                <YoutubeEmbed embedId={selectedImage} />
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BigGallery;
