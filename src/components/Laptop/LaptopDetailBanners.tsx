"use client";
import { CmsAPI } from "@/custom/utils/actions";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "../Spinner";
import { nanoid } from "nanoid";
import { Carousel, Image } from "react-bootstrap";
import styles from "@/styles/Laptop/LaptopDetail.module.scss";
import Link from "next/link";
import _ from "lodash";

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
          "Failed to fetch React Info [LaptopDetailBanners]:",
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
          <LoadingSpinner isEve={false} />
          <LoadingSpinner isEve={false} />
          <LoadingSpinner isEve={false} />
          <LoadingSpinner isEve={false} />
          <LoadingSpinner isEve={false} />
          <LoadingSpinner isEve={false} />
        </>
      )}
      {SideBanners !== undefined &&
        SideBanners.length > 0 &&
        _.map(SideBanners, (section, index) => {
          return (
            <div key={nanoid(8)}>
              {section.type === "banner" ? (
                <div
                  className={`${styles.LaptopDetailBanner} text-center`}
                  key={nanoid(5)}
                >
                  <Link href={section.link} title={section.link} key={index}>
                    <Image
                      src={section.image}
                      alt={section.title}
                      className={`rounded`}
                    />
                  </Link>
                </div>
              ) : (
                <div
                  className={`${styles.LaptopDetailBanner} text-center rounded overflow-hidden`}
                  key={nanoid(6)}
                >
                  <Carousel slide>
                    {section.slides.map((Slide: any) => {
                      return (
                        <Carousel.Item key={nanoid(7)}>
                          <Link
                            href={Slide.link}
                            title={Slide.title}
                            className={`d-block w-100`}
                          >
                            <Image
                              className="d-block w-100"
                              src={Slide.image}
                              alt={Slide.title}
                            />
                          </Link>
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
