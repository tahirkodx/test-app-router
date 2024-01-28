"use client";
import { nanoid } from "nanoid";
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import styles from "@/styles/FeatureGallery.module.scss";
import useMediaQuery from "@/custom/hooks/useMediaQuery";
import NextBtn from "@/components/Gallery/Controls/NextBtn";
import PrevBtn from "@/components/Gallery/Controls/PrevBtn";
import NextArrow from "@/components/Gallery/Controls/NextArrow";
import PrevArrow from "@/components/Gallery/Controls/PrevArrow";
import { Image } from "react-bootstrap";
import { useTheme } from "@/store/ThemeContext";

const _ = require("lodash");
const FeatureGallery2 = (props: any) => {
  const [galleryData, setGalleryData] = useState(props.GalleryData);
  const [selectedImage, setSelectedImage] = useState(
    "https://www.evetech.co.za/repository/ProductImages/evetech-gaming-pc.jpg"
  );
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleAfterChange = (index = 0) => {
    setCurrentSlide(index);
  };

  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  const sliderRef = useRef<any>(null);
  const gotToSlide = (slideIndex: any) => {
    if (sliderRef.current) {
      console.log("current", sliderRef.current);
      sliderRef.current.slickGoTo(slideIndex);
    }
  };

  useEffect(() => {
    setGalleryData(props.GalleryData);
    try {
      setSelectedImage(_.first(galleryData).original);
    } catch (e) {}
  }, [props]);

  const isSM = useMediaQuery("(min-width: 576px)");
  const isMD = useMediaQuery("(min-width: 768px)");
  // const isXL = useMediaQuery("(min-width: 1200px)");

  const arrowStyles = `
    ${isSM ? `top-50 transform-middle-x` : `bottom-0`}
    slick-arrow 
    text-center 
    rounded-circle 
    position-absolute 
    cursor-pointer 
    z-index-2
    p-2
    d-flex
    align-items-center
    fs-5
  `;

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: () => {
      setIsDragging(true);
    },
    afterChange: () => {
      handleAfterChange();
      setIsDragging(false);
    },
    nextArrow: isSM && <NextBtn arrowStyles={arrowStyles} />,
    prevArrow: isSM && <PrevBtn arrowStyles={arrowStyles} />,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 576,
        settings: {
          dots: true,
        },
      },
    ],
  };

  const thumbSettings = {
    infinite: true,
    slidesToShow:
      galleryData !== undefined && galleryData.length < 5
        ? galleryData.length
        : 5,
    slidesToScroll:
      galleryData !== undefined && galleryData.length < 5
        ? galleryData.length
        : 5,
    vertical: true,
    verticalSwiping: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow:
            galleryData !== undefined && galleryData.length < 3
              ? galleryData.length
              : 3,
          slidesToScroll:
            galleryData !== undefined && galleryData.length < 3
              ? galleryData.length
              : 3,
        },
      },
    ],
  };

  const zoomProduct = (product: any) => {
    if (!isDragging) {
      props.showGalleryModal(product);
    }
  };

  useEffect(() => {}, [props.GalleryData]);

  return (
    <div className={`d-sm-grid cols-sm-12 gap-3 gap-xl-4`}>
      {galleryData !== undefined && galleryData.length > 1 ? (
        <>
          {isSM ? (
            <div className={`span-sm-2`}>
              <Slider
                {...thumbSettings}
                className={`${styles.Thumbnails} px-3 px-sm-0 py-sm-4 w-100`}
              >
                {galleryData.map((gallery: any, index: any) => {
                  return (
                    <div key={nanoid(5)}>
                      <div
                        className={`
                          ${
                            currentSlide === index
                              ? `border-danger`
                              : `border-secondary border-opacity-50`
                          } 
                          d-flex justify-content-center border p-1  cursor-pointer bg-white
                        `}
                        onClick={() => gotToSlide(index)}
                      >
                        <Image
                          src={gallery.thumbnail}
                          alt=""
                          style={{
                            height: "60px",
                            width: "100%",
                            objectFit: "contain",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </Slider>
            </div>
          ) : null}
          <div className="span-sm-10">
            <Slider
              {...settings}
              className={`${
                darkMode
                  ? `rounded border border-2 border-secondary border-opacity-50`
                  : ``
              } bg-white`}
              ref={sliderRef}
            >
              {galleryData.map((gallery: any) => {
                return (
                  <div
                    key={nanoid(5)}
                    onClick={() => zoomProduct(gallery.original)}
                  >
                    <div
                      style={{ height: isMD ? `413px` : `250px` }}
                      className="d-flex align-items-center justify-content-center position-relative z-index-1"
                    >
                      <Image
                        src={gallery.original}
                        alt=""
                        className={`
                        ${isDragging ? `cursor-grabbing` : `cursor-grab`}
                        img-contain cursor-grab w-100 h-100
                      `}
                      />
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </>
      ) : null}
      {galleryData !== undefined &&
      galleryData.length > 0 &&
      galleryData.length < 2 ? (
        <div
          className="span-full"
          onClick={() => zoomProduct(galleryData[0].original)}
        >
          <div
            style={{ height: isMD ? `375px` : `250px` }}
            className="d-flex align-items-center justify-content-center position-relative z-index-1"
          >
            <Image
              src={galleryData[0].original}
              alt=""
              className="cursor-pointer img-contain w-100 h-100"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default FeatureGallery2;
