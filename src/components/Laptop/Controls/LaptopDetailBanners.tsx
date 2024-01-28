"use client";
import React from "react";
import styles from "@/styles/Laptop/LaptopDetail.module.scss";
import Carousel from "react-bootstrap/Carousel";
import { customAlphabet } from "nanoid";
import { useEffect } from "react";
import { useState } from "react";
import LoaderSpinner from "@/components/LoaderSpinner/LoaderSpinner";
import { CmsAPI } from "@/custom/utils/actions";
import { Image } from "react-bootstrap";

const nanoid = customAlphabet("1234567890abcdef", 10);
var _ = require("lodash");

function LaptopDetailBanners() {
  const [SideBanners, setSideBanners] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchSideBanners = async () => {
      const banners = await CmsAPI.getReactInfo({ id: 17 });

      //   FetchReactInfo(`/api/gutil/getReactInfo`,17)
      //   .then(data => {
      //     // Handle the data here
      //     if (data.result !== undefined) {
      //       setSideBanners(data.result);
      //       setLoader(false);
      //     }
      //   })
      //   .catch(error => {
      //     console.error('Failed to fetch data:', error);
      //   });

      //   const banners = await fetch(`/api/gutil/getReactInfo`, {
      //   method: "POST",
      //   body: JSON.stringify({
      //     id: 17,
      //   }),
      //   headers: {
      //     "Content-Type": "application/json",
      //     Accept: "application/json",
      //   },
      // }).then((res) => {
      //   return res.json();
      // });

      if (banners.result !== undefined) {
        setSideBanners(banners.result);
        setLoader(false);
      }
    };

    fetchSideBanners();
  }, []);

  useEffect(() => {}, [SideBanners]);

  return (
    <div
      className={`${styles.LaptopDetailBanners} d-grid gap-2 mt-3 cols-2 cols-md-3 cols-lg-1`}
    >
      {loader && (
        <>
          <LoaderSpinner />
          <LoaderSpinner />
          <LoaderSpinner />
          <LoaderSpinner />
          <LoaderSpinner />
          <LoaderSpinner />
        </>
      )}
      {SideBanners !== undefined &&
        SideBanners.length > 0 &&
        SideBanners.map((Section: any, index) => {
          return (
            <div key={nanoid(8)}>
              {Section.type === "banner" ? (
                <div
                  className={`${styles.LaptopDetailBanner} text-center`}
                  key={nanoid(5)}
                >
                  <a href={Section.link} title={Section.link} key={index}>
                    <Image
                      src={Section.image}
                      alt={Section.title}
                      className={`rounded`}
                    />
                  </a>
                </div>
              ) : (
                <div
                  className={`${styles.LaptopDetailBanner} text-center rounded overflow-hidden`}
                  key={nanoid(6)}
                >
                  <Carousel slide>
                    {Section.slides.map((Slide: any, index: any) => {
                      return (
                        <Carousel.Item key={nanoid(7)}>
                          <a
                            href={Slide.link}
                            title={Slide.title}
                            className={`d-block w-100`}
                          >
                            <Image
                              className="d-block w-100"
                              src={Slide.image}
                              alt={Slide.title}
                            />
                          </a>
                        </Carousel.Item>
                      );
                    })}
                  </Carousel>
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
}

export default LaptopDetailBanners;
