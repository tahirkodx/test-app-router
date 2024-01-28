import React, { useContext } from "react";
import { Badge, Button, Card, Image } from "react-bootstrap";
import classes from "@/styles/SimilarProducts.module.scss";
import HelperContext from "@/store/helper-context";
import { customAlphabet } from "nanoid";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Link from "next/link";
import { useTheme } from "@/store/ThemeContext";
import FancyPrice from "../FancyPrice";

const settings = {
  dots: false,
  infinite: true,
  speed: 400,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0,
  autoplay: true,
};

var _ = require("lodash");

const SimilarProductCard = (props: any) => {
  let product = props.Product;
  let carasoulItem = null;
  const nanoid = customAlphabet("1234abc5678def90", 10);
  const helperCtx = useContext(HelperContext);
  const moreInfoClick = (product: any) => {
    /* navigate(
        `/${_.replace(
          _.toLower(product.url),
          new RegExp(" ", "g"),
          "-"
        ).trim()}/best-deal/${product.npid}.aspx`
      ); */
  };
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  if (props.Product) {
    let galleryImage = [props.Product.imageurl].concat(
      props.Product.ImageGallery.split("|")
    );
    if (galleryImage) {
      carasoulItem = galleryImage.map((image) => {
        if (image !== "none" && image !== undefined) {
          return (
            <Image
              className={`${classes.Gallery__IMG} d-block w-100 h-100 img-fluid img-container`}
              key={nanoid(8)}
              src={`https://www.evetech.co.za/` + image}
              alt={props.Product.url}
            />
          );
        }
        return null;
      });
    }
  }

  return (
    <>
      <div className={classes.product_card}>
        <Card
          key={nanoid(10)}
          className={`${
            darkMode
              ? `bg-black bg-opacity-50 text-light border-info border-opacity-50`
              : ``
          } p-0`}
        >
          <div
            className={`${classes.Image} d-flex-row align-items-center justify-content-center text-center`}
          >
            <div
              className={`p-3 h-100 d-flex align-items-center bg-white rounded-top`}
            >
              <Slider {...settings} className={`${classes.Slider}`}>
                {carasoulItem}
              </Slider>
            </div>

            <div className={classes.tags}>
              {props.Product.SpecialID === 1 && (
                <Badge bg="danger">
                  <span className="fw-2">On Special</span>
                </Badge>
              )}

              {helperCtx.showDealIcon &&
                props.Product.isOnDeal !== undefined &&
                props.Product.IsOnDeal === 1 && (
                  <h3 id="div_On_Deal" className={classes.product_on_special}>
                    <span>
                      <p className={classes.product_on_special_text}>
                        {helperCtx.dealText}
                      </p>
                    </span>
                  </h3>
                )}
            </div>
          </div>
          <Card.Body className="p-0">
            <Card.Title
              className={`
                ${classes.Title} 
                ${darkMode ? `text-light` : `text-bg-light`}
                overflow-hidden text-center p-1 px-2 px-sm-3 rounded-2 fw-2
              `}
            >
              {props.Product.ProName}
            </Card.Title>
            <Card.Footer
              className={`
                ${darkMode ? `bg-dark bg-opacity-50` : ``}
                border-top border-secondary border-opacity-50 text-center px-2 px-sm-3 d-grid cols-2 cols-sm-12 gap-2
              `}
            >
              <div
                className={`${classes.price_tag} fw-2 align-self-center span-sm-8 w-100 text-start`}
              >
                <FancyPrice price={props.Product.price} />
              </div>
              {/* <Row className={(_.toLower(props.Product.stock) === "in stock with evetech" ? " bg-success " : " bg-danger") +" text-white  justify-content-center p-2 rounded-3"}>
                                  {props.Product.stock}
                              </Row> */}
              <Button
                className="btn btn-primary w-100 hide span-5"
                onClick={() => moreInfoClick(props.product)}
              >
                More Info
              </Button>
              <Link
                className={`${classes.more_info} span-sm-4`}
                href={`/${_.replace(
                  _.toLower(props.Product.url),
                  new RegExp(" ", "g"),
                  "-"
                ).trim()}/best-deal/${props.Product.productid}.aspx`}
                title={props.Product.url}
              >
                <span
                  className={`
                    ${classes.more_info_span}
                    ${darkMode ? `text-light bg-dark bg-gradient` : ``} 
                    lh-1
                  `}
                >
                  More Info
                </span>
              </Link>
            </Card.Footer>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default SimilarProductCard;
