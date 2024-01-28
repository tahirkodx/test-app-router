"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/LaptopDetail.module.scss"
import Carousel from "react-bootstrap/Carousel";
import { customAlphabet } from "nanoid";
import Spinner from "@/components/Spinner";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Link from "next/link";
import { CmsAPI } from "@/custom/utils/actions";

const nanoid = customAlphabet("123abc456ewds7890def", 10);
function PCBanners() {
  const [SideBanners, setSideBanners] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchSlider = async () => {
        const data = await CmsAPI.getReactInfo({ id: 10 });  
        if (data.result !== undefined) {
            setSideBanners(data.result);
            setLoader(false);
        }
      /* const sliders = await fetch(`/api/gutil/getReactInfo`, {
        method: "POST",
        body: JSON.stringify({
          id: 19,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }).then((res) => {
        return res.json();
      });

      if (sliders.result !== undefined) {
        setSideBanners(sliders.result);
        setLoader(false);
      } */
    };

    fetchSlider();
  }, []);

  useEffect(() => {}, [SideBanners]);

  return (
    <div
      className={`${styles.LaptopDetailBanners} d-grid gap-2 mt-3 cols-2 cols-md-3 cols-lg-1`}
    >
      {loader && <Spinner isEve={false} />}
      {SideBanners !== undefined &&
        SideBanners.length > 0 &&
        SideBanners.map((Section:any, index:any) => {
          return (
            <div key={nanoid(9) + index}>
              {Section.type === "banner" ? (
                <div
                  className={`${styles.LaptopDetailBanner} text-center`}
                  key={nanoid(7) + index}
                >
                  <Link href={Section.link} title={Section.link}>
                    <LazyLoadImage
                      src={Section.image}
                      alt={Section.title}
                      className={`rounded w-100 img-fluid`}
                      width={Section.width}
                      height={Section.height}
                    />
                    {/* <img
                      src={Section.image}
                      alt={Section.title}
                      className={`rounded`}
                    /> */}
                  </Link>
                </div>
              ) : (
                <div
                  className={`${styles.LaptopDetailBanner} text-center rounded overflow-hidden`}
                  key={nanoid(6) + index}
                >
                  <Carousel slide>
                    {Section.slides.map((Slide:any, index:any) => {
                      return (
                        <Carousel.Item key={nanoid(8) + index}>
                          <Link
                            href={Slide.link}
                            title={Slide.title}
                            className={`d-block w-100`}
                          >
                            {/* <img
                              className="d-block w-100"
                              src={Slide.image}
                              alt={Slide.title}
                            /> */}
                            <LazyLoadImage
                              className="d-block w-100 img-fluid"
                              src={Slide.image}
                              alt={Slide.title}
                              width={Slide.width}
                              height={Slide.height}
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

export default PCBanners;