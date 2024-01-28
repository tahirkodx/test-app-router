"use client";
import React from "react";
import styles from "@/styles/LaptopDetail.module.scss";
import Carousel from "react-bootstrap/Carousel";
import { customAlphabet } from "nanoid";
import { useEffect } from "react";
import { useState } from "react";
import Spinner from "@/components/Spinner";
import { CmsAPI } from "@/custom/utils/actions";
import { Image } from "react-bootstrap";

const nanoid = customAlphabet("1234567890abcdef", 10);
var _ = require("lodash");

function LaptopDetailBanners() {
  const [SideBanners, setSideBanners] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchSideBanners = async () => {
        try {
            const data = await CmsAPI.getReactInfo({ id: 17 });

            if (data.result !== undefined) {
                setSideBanners(data.result);
                setLoader(false);
            }
        } catch (error: any) {
            console.error(
                "Failed to fetch React Info [FooterLinks]:",
                error.message
            );
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
          <Spinner isEve={false} />
          <Spinner isEve={false} />
          <Spinner isEve={false} />
          <Spinner isEve={false} />
          <Spinner isEve={false} />
          <Spinner isEve={false} />
        </>
      )}
      {SideBanners !== undefined &&
        SideBanners.length > 0 &&
        SideBanners.map((Section:any, index:any) => {
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
                    {Section.slides.map((Slide:any, index:any) => {
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
