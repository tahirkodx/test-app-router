"use client";
import React, { useEffect, useState } from "react";
import { Carousel, Image } from "react-bootstrap";
import styles from "@/styles/laptopHome.module.scss";
import useMediaQuery from "@/custom/hooks/useMediaQuery";
import { nanoid } from "nanoid";
import { CmsAPI } from "@actions";
import Spinner from "@/components/Spinner";
import Link from "next/link";

function MainSlideshow() {
  const [TopSliders, setTopSliders] = useState([]);
  const [loader, setLoader] = useState(true);

  const isBiggerSlides = useMediaQuery("(min-width: 550px)");

  useEffect(() => {
    const fetchSlider = async () => {
      try {
        const data = await CmsAPI.getReactInfo({ id: 11 });

        // Handle the data here
        if (data.result !== undefined) {
          setTopSliders(data.result);
          setLoader(false);
        }
      } catch (error: any) {
        console.error(
          "Failed to fetch React Info [Laptop Home SlideShow]:",
          error.message
        );
      }
    };
    fetchSlider();
  }, []);

  useEffect(() => {}, [TopSliders]);

  return (
    <>
      <Carousel className={`${styles.MainSlideshow}`}>
        {loader && <Spinner isEve={false} />}
        {TopSliders !== undefined &&
          TopSliders.length > 0 &&
          TopSliders.map((Slide: any) => {
            return (
              <Carousel.Item
                className={`${styles.MainSlideshow__Item} bg-dark`}
                key={nanoid(8)}
              >
                <Link
                  href={Slide.url}
                  title={Slide.title}
                  className="overflow-hidden"
                >
                  {isBiggerSlides ? (
                    <Image
                      src={`${Slide.desktop}`}
                      className={`hover-grow-1 d-block img-fluid w-100`}
                      alt={`${Slide.alt}`}
                      width={1600}
                      height={403}
                    />
                  ) : (
                    <Image
                      src={`${Slide.mobile}`}
                      alt={`${Slide.alt}`}
                      className="d-block w-100 img-fluid"
                    />
                  )}
                </Link>
              </Carousel.Item>
            );
          })}
      </Carousel>
    </>
  );
}

export default MainSlideshow;
