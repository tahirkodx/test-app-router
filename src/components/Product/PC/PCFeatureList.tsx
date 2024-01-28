"use client";
import FeatureCard from "@/components/Feature/FeatureCard";
import { nanoid } from "nanoid";
import { useEffect } from "react";
import Slider from "react-slick";
import styles from "@/styles/FeatureList.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTheme } from "@/store/ThemeContext";

const PCFeatureList = (props: any) => {
  let features = props.Features;
  let featuresList = null;
  let settingFlag = false;
  let slideNo = 4;

  if (features !== null && features.length > 0) {
    featuresList = features.map((feature) => {
      return <FeatureCard key={nanoid(8)} Feature={feature} />;
    });
  }

  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow:
      features !== null &&
      features !== undefined &&
      features.length < props.slides
        ? features.length
        : props.slides, // 3
    slidesToScroll:
      features !== null &&
      features !== undefined &&
      features.length < props.slides
        ? features.length
        : props.slides, // 3
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 2200,
        settings: {
          slidesToShow:
            features !== null &&
            features !== undefined &&
            features.length < props.slidesBig
              ? features.length
              : props.slidesBig, // 2
          slidesToScroll:
            features !== null &&
            features !== undefined &&
            features.length < props.slidesBig
              ? features.length
              : props.slidesBig, // 2,
          speed: 250,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow:
            features !== null &&
            features !== undefined &&
            features.length < props.slidesXXL
              ? features.length
              : props.slidesXXL, // 3
          slidesToScroll:
            features !== null &&
            features !== undefined &&
            features.length < props.slidesXXL
              ? features.length
              : props.slidesXXL, // 3,
          speed: 250,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow:
            features !== null && features !== undefined && features.length < 1
              ? features.length
              : props.slidesXL, // 3
          slidesToScroll:
            features !== null && features !== undefined && features.length < 1
              ? features.length
              : props.slidesXL, // 3
          speed: 250,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow:
            features !== null && features !== undefined && features.length < 1
              ? features.length
              : props.slidesLG, // 3
          slidesToScroll:
            features !== null && features !== undefined && features.length < 1
              ? features.length
              : props.slidesLG, // 3
          speed: 250,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow:
            features !== null && features !== undefined && features.length < 1
              ? features.length
              : props.slidesMD, // 2
          slidesToScroll:
            features !== null && features !== undefined && features.length < 1
              ? features.length
              : props.slidesMD, // 2
          speed: 250,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow:
            features !== null && features !== undefined && features.length < 1
              ? features.length
              : props.slidesSM, // 1
          slidesToScroll:
            features !== null && features !== undefined && features.length < 1
              ? features.length
              : props.slidesSM, // 1
          speed: 250,
        },
      },
    ],
  };

  useEffect(() => {
    if (
      props.slideNo !== null &&
      props.slideNo !== undefined &&
      !isNaN(props.slideNo) &&
      !settingFlag
    ) {
      slideNo = props.slideNo;
      let diff = props.slideNo - settings.slidesToScroll;
      settings.slidesToScroll = props.slideNo;
      settings.slidesToShow = props.slideNo;

      settings.responsive.map((resp) => {
        if (resp.settings) {
          if (resp.settings.slidesToScroll)
            resp.settings.slidesToScroll =
              diff > 0
                ? resp.settings.slidesToScroll + diff
                : resp.settings.slidesToScroll + diff === 0
                ? 1
                : resp.settings.slidesToScroll + diff;

          if (resp.settings.slidesToShow)
            resp.settings.slidesToShow =
              diff > 0
                ? resp.settings.slidesToShow + diff
                : resp.settings.slidesToShow + diff === 0
                ? 1
                : resp.settings.slidesToShow + diff;
        }
      });
      settingFlag = true;
    }
  }, [props.slideNo]);

  return (
    <>
      <div className={`${styles.Features} mb-4 py-4 rounded`}>
        <Slider {...settings} className={`${styles.FeatureList} lh-1`}>
          {featuresList}
        </Slider>
      </div>
    </>
  );
};

export default PCFeatureList;
