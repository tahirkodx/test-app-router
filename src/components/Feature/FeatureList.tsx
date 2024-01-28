"use client";
import React from "react";
import styles from "@/styles/FeatureList.module.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import { useEffect } from "react";
import { customAlphabet } from "nanoid";
import FeatureCard from "@/components/Feature/FeatureCard";

const nanoid = customAlphabet("1234bcd567890aef", 10);
var _ = require("lodash");

const FeatureList = (props: any) => {
  let features = props.Features;
  let featuresList = null;
  let settingFlag = false;
  let slideNo = 4;

  if (features !== null && features?.length > 0) {
    featuresList = features.map((feature: any) => {
      return <FeatureCard key={nanoid(8)} Feature={feature} />;
    });
  }

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow:
      features !== null && features !== undefined && features.length < 2
        ? features.length
        : 5,
    slidesToScroll:
      features !== null && features !== undefined && features.length < 2
        ? features.length
        : 5,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow:
            features !== null && features !== undefined && features.length < 1
              ? features.length
              : 4,
          slidesToScroll:
            features !== null && features !== undefined && features.length < 1
              ? features.length
              : 4,
          speed: 250,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow:
            features !== null && features !== undefined && features.length < 1
              ? features.length
              : 3,
          slidesToScroll:
            features !== null && features !== undefined && features.length < 1
              ? features.length
              : 3,
          speed: 250,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow:
            features !== null && features !== undefined && features.length < 1
              ? features.length
              : 2,
          slidesToScroll:
            features !== null && features !== undefined && features.length < 1
              ? features.length
              : 2,
          speed: 250,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow:
            features !== null && features !== undefined && features.length < 1
              ? features.length
              : 1,
          slidesToScroll:
            features !== null && features !== undefined && features.length < 1
              ? features.length
              : 1,
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

export default FeatureList;
