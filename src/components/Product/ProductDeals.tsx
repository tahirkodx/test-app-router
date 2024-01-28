import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { ProductList, Banners } from "@/components/Product";
import styles from "@/styles/ProductDeals.module.scss";
import { useRouter } from "next/navigation";
import { nanoid } from "nanoid";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useMediaQuery from "@/custom/hooks/useMediaQuery";
import HorizontalScrollView from "@/components/Main/Controls/HorizontalScrollView";
import { ProductAPI } from "@actions";
import { useTheme } from "@/store/ThemeContext";

const placeholderImg =
  "https://www.evetech.co.za/repository/ProductImages/image-placeholder.png";

const ProductDeals = (props: any) => {
  const [laptops, setLaptops] = useState(
    props.DealsProds !== undefined ? props.DealsProds : []
  );
  const [initData, setInitData] = useState(false);
  const banners = props.BannerData;
  const isSM = useMediaQuery("(min-width: 576px)");
  const isMD = useMediaQuery("(min-width: 768px)");
  const isLG = useMediaQuery("(min-width: 992px)");
  const router = useRouter();
  const { isDarkMode } = useTheme();

  useEffect(() => {}, [laptops]);

  return (
    <>
      {isMD ? (
        <div className="px-3 px-md-0">
          <Banners bannerSections={banners} placeholderImg={placeholderImg} />
        </div>
      ) : (
        <section>
          {banners.length === 1 ? (
            <div className="px-3 px-md-0">
              <Banners
                bannerSections={banners}
                placeholderImg={placeholderImg}
              />
            </div>
          ) : null}
          {banners.length > 0 && banners.length > 1 ? (
            <HorizontalScrollView
              className="hide-scrollbar px-3 d-grid gap-3"
              hideHeading={true}
              hideButtons={true}
              style={{
                gridTemplateColumns: `repeat(${banners.length}, ${
                  !isSM ? `275px` : `400px`
                })`,
              }}
            >
              {banners.map((Slide: any) => {
                return (
                  <div
                    onClick={() => router.push(Slide.bannerLink)}
                    title={Slide.bannerTitle}
                    className={`
                      ${styles.MobiSlide} 
                      overflow-hidden bg-dark d-block position-relative w-100 rounded cursor-pointer
                    `}
                    key={nanoid(8)}
                  >
                    <div
                      className={`${styles.RainbowBG01} position-absolute w-100 h-100 opacity-75`}
                    ></div>
                    <LazyLoadImage
                      src={
                        Slide.mobileImg !== undefined &&
                        Slide.mobileImg.length > 0
                          ? Slide.mobileImg
                          : Slide.bannerImg
                      }
                      visibleByDefault={Slide.bannerImg}
                      className={`${styles.BannerImage} img-fluid hover-grow-2 hover-hide-50 position-relative pe-none`}
                      alt={Slide.bannerTitle}
                      width={Slide.width}
                      height={Slide.height}
                      placeholderSrc={placeholderImg}
                    />
                  </div>
                );
              })}
            </HorizontalScrollView>
          ) : null}
        </section>
      )}

      <Card key={nanoid(10)} className={`${styles.ParentCard} p-0`}>
        <HorizontalScrollView
          className="hide-scrollbar p-3"
          key={nanoid(10)}
          DealTitle={props.DealTitle}
          PageLink={props.PageLink}
          btnStyle={`${isDarkMode ? `bg-black bg-gradient border-0` : ``}`}
        >
          <ProductList data={laptops} key={nanoid(10)}></ProductList>
        </HorizontalScrollView>
      </Card>
    </>
  );
};

export default ProductDeals;
