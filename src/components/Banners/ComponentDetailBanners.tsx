"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/LaptopDetail.module.scss";
import Carousel from "react-bootstrap/Carousel";
import Spinner from "@/components/Spinner";
/* import { FetchReactInfo } from "@/custom/utils/Helper";  */
import { customAlphabet } from "nanoid";
import { CmsAPI } from "@/custom/utils/actions";
import Link from "next/link";
import { Image } from "react-bootstrap";

const nanoid = customAlphabet("123abc456ewds7890def", 10);
const ComponentDetailBanners = () => {
  const [SideBanners, setSideBanners] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchSlider = async () => {
      try {
        const data = await CmsAPI.getReactInfo({ id: 10 });

        if (data.result !== undefined) {
          setSideBanners(data.result);
          setLoader(false);
        }
      } catch (error: any) {
        console.error(
          "Failed to fetch React Info [LaptopFooterLinks]:",
          error.message
        );
      }
      /* FetchReactInfo(`/api/gutil/getReactInfo`,10)
        .then(data => {
          // Handle the data here
          if (data.result !== undefined) {
            setSideBanners(data.result);
            setLoader(false);
          }
        })
        .catch(error => {
          console.error('Failed to fetch data:', error);
        }); */
    };

    fetchSlider();
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
        SideBanners.map((Section: any, index: any) => {
          return (
            <div key={nanoid(8)}>
              {Section?.type === "banner" ? (
                <div
                  className={`${styles.LaptopDetailBanner} text-center`}
                  key={nanoid(7) + index}
                >
                  <Link href={Section?.link} title={Section?.link} key={index}>
                    <Image
                      src={Section?.image}
                      alt={Section?.title}
                      className={`rounded`}
                    />
                  </Link>
                </div>
              ) : (
                <div
                  className={`${styles.LaptopDetailBanner} text-center rounded overflow-hidden`}
                  key={nanoid(6) + index}
                >
                  <Carousel slide>
                    {Section?.slides.map((Slide: any, index: any) => {
                      return (
                        <Carousel.Item key={nanoid(8) + index}>
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
};

export default ComponentDetailBanners;
