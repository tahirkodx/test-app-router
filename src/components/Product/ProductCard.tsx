import React, { useContext, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { customAlphabet } from "nanoid";
import styles from "@/styles/ProductDeals.module.scss";
import { FaEye, FaQuestionCircle } from "react-icons/fa";
import { RiHeartAddLine } from "react-icons/ri";
import useMediaQuery from "@/custom/hooks/useMediaQuery";
import AskQuestion from "@/components/Modals/AskQuestion";
import AuthContext from "@/store/auth-context";
import Swal from "sweetalert2";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useRef } from "react";
import { useTheme } from "@/store/ThemeContext";
import FancyPrice from "../FancyPrice";
import UserAPI from "@/custom/utils/actions/user";
var _ = require("lodash");

const ProductCard = (props: any) => {
  const router = useRouter();
  const nanoid = customAlphabet("1234567890abcdef", 10);
  const isLG: any = useMediaQuery("(min-width: 992px)");
  const [askQuestionShow, setAskQuestionShow] = useState(false);
  const authCtx: any = useContext(AuthContext);
  const { isDarkMode } = useTheme();

  /* WishList */
  const [showWish, setShowWish] = useState(false);
  const [wishItems, setWishItems] = useState([]);
  const imageRef: any = useRef(null);
  const swapImageRef: any = useRef(null);
  const onWishClose = () => {
    setShowWish(false);
  };

  const userWishes = async () => {

    const summary= await UserAPI.getUserWishList({
      userid: authCtx.user.id,
    }); 
    if (summary !== undefined && summary !== null && summary.result !== null && summary.result !== undefined) {
      try {
        let wishList = summary.result;
        setWishItems(wishList);
      } catch (e) {
        setWishItems([]);
        if (
          summary.message !== undefined &&
          summary.message === "Not authenticated."
        ) {
          if (authCtx.token === undefined) authCtx.onLogout();
          /* Show Login */
          /* once extend remove below code */
          authCtx.onLogout();
        } else {
          Swal.fire("Oops!", "Problem occured try again!", "error");
        }
      }
    }
  };

  const AddToWishList = (product: any) => {
    if (authCtx.isLoggedIn) {
      /* Check First Product Exist or not */

      const chekWishList = async () => {
        const wishList = await UserAPI.checkWishlistItem({
          productId: product.product_id,
          ptype: product.product_type,
          uid: authCtx.user.id,
        });

        if (
          wishList !== undefined &&
          wishList.result !== undefined &&
          wishList.result.length > 0
          && wishList.result[0].total !== undefined 
          && wishList.result[0].total > 0
        ) {
          Swal.fire({
            position: "top-end",
            icon: "warning",
            title: "Item already exist to your wishlist",
            showConfirmButton: false,
            timer: 1500,
          });
          setShowWish(true);
        } else {
          const wishItemAdd = async () => {
            const wishAddResp = await UserAPI.addWishlistItem({
              productId: product.product_id,
              ptype: product.product_type,
              uid: authCtx.user.id,
            });

            if (
              wishAddResp !== undefined &&
              wishAddResp !== null &&
              wishAddResp.result !== undefined
            ) {
              let addWish = wishAddResp.result;

              if (addWish.affectedRows !== undefined && addWish.affectedRows) {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Item Added To Wishlist.",
                  showConfirmButton: false,
                  timer: 1500,
                });
                 /* userWishes(); */
                setShowWish(true);
              } else {
                Swal.fire({
                  position: "top-end",
                  icon: "error",
                  title: "Item not able add to Wishlist. Try again!",
                  showConfirmButton: false,
                  timer: 1500,
                });
                setShowWish(true);
              }
            }
          };
          wishItemAdd();
        }
      };

      chekWishList();
    } else {
      /* authCtx.onShowLogin(true); */
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Please login first to add item to your wishlist.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const moreInfoClick = (product: any) => {
    if (parseInt(product.product_type) === 3)
      router.push(
        `/${_.join(
          _.filter(
            _.split(
              _.replace(
                _.toLower(product.product_url),
                new RegExp(/[^a-zA-Z0-9 ]/g),
                " "
              ),
              " "
            ),
            _.size
          ),
          "-"
        ).trim()}/laptops-for-sale/${product.product_id}.aspx`
      );
    if (parseInt(product.product_type) === 1)
      router.push(
        `/${_.join(
          _.filter(
            _.split(
              _.replace(
                _.toLower(product.product_url),
                new RegExp(/[^a-zA-Z0-9 ]/g),
                " "
              ),
              " "
            ),
            _.size
          ),
          "-"
        ).trim()}/best-pc-deal/${product.product_id}.aspx`
      );
    if (parseInt(product.product_type) === 2)
      router.push(
        `/${_.join(
          _.filter(
            _.split(
              _.replace(
                _.toLower(product.product_url),
                new RegExp(/[^a-zA-Z0-9 ]/g),
                " "
              ),
              " "
            ),
            _.size
          ),
          "-"
        ).trim()}/best-deal/${product.product_id}.aspx`
      );
  };

  const swapImageFn = (e: any) => {
    if (
      swapImageRef !== null &&
      swapImageRef.current !== undefined &&
      imageRef !== null &&
      imageRef.current !== undefined &&
      swapImageRef.current !== null
    ) {
      if (imageRef.current.className.includes("show")) {
        swapImageRef.current.className =
          swapImageRef.current.className + "show";
        imageRef.current.className = swapImageRef.current.className.replace(
          "show",
          ""
        );
      } else {
        imageRef.current.className = imageRef.current.className + "show";
        swapImageRef.current.className = swapImageRef.current.className.replace(
          "show",
          ""
        );
      }
    }
  };

  return (
    <Card
      key={nanoid(10)}
      className={`
        ${styles.Card} 
        shadow overflow-hidden position-relative 
        ${isDarkMode ? `bg-dark` : ``}
      `}
      onMouseOver={(e) => {
        swapImageFn(e);
      }}
      onMouseOut={(e) => {
        swapImageFn(e);
      }}
    >
      <div
        className={`
          ${isDarkMode ? `bg-black` : `bg-light`}
          position-relative rounded
        `}
        style={{ margin: `2px` }}
      >
        <div
          className={`
            ${styles.CardImage} 
            p-0 pb-0 p-lg-3 pb-lg-0 d-flex align-items-center justify-content-center position-relative bg-light rounded-top
          `}
        >
          <div className="w-100 h-100 fade show" ref={imageRef}>
            <LazyLoadImage
              className="w-100 h-100 img-contain cursor-pointer"
              src={"https://www.evetech.co.za/" + props.product.product_img_url}
              draggable="false"
              onClick={() => moreInfoClick(props.product)}
              width={300}
              height={225}
              alt={props.product.product_name}
            />
          </div>
          {props.product.ImageGallery !== undefined &&
            props.product.ImageGallery !== "none" &&
            props.product.ImageGallery.split("|").length > 0 && (
              <div
                className="w-100 h-100 p-0 p-lg-3 position-absolute fade"
                ref={swapImageRef}
              >
                <LazyLoadImage
                  className="w-100 h-100 img-contain cursor-pointer "
                  src={
                    "https://www.evetech.co.za/" +
                    props.product.ImageGallery.split("|")[0]
                  }
                  draggable="false"
                  onClick={() => moreInfoClick(props.product)}
                  width={300}
                  height={225}
                  alt={props.product.product_name}
                />
              </div>
            )}
        </div>
        <Card.Body className="p-0">
          <Card.Title
            onClick={() => moreInfoClick(props.product)}
            className={`
              ${styles.CardTitle}
              ${isDarkMode ? `text-light` : `text-dark`} 
              overflow-hidden text-center p-2 rounded-2 fs-6 cursor-pointer
            `}
          >
            {isLG ? (
              <span>{props.product.product_name}</span>
            ) : (
              <small>
                <span>{props.product.product_name}</span>
              </small>
            )}
          </Card.Title>
          {/*  {props.product.high && <ProductHeighlights high={props.product.high}/> } */}
          <Card.Footer
            className={`
              ${
                isDarkMode
                  ? `border-top border-light border-opacity-25 bg-dark bg-opacity-50`
                  : ``
              } 
              px-2 py-0 py-lg-1 
            `}
          >
            <div
              className={`${
                isLG
                  ? `justify-content-between align-items-center`
                  : `justify-content-center p-1`
              }  text-default m-0 d-flex `}
            >
              <FancyPrice
                price={props.product.product_price}
                style={{ fontSize: isLG ? `1.6rem` : `1.3rem` }}
              />

              <div
                className={`
                  ${isLG ? `` : `d-none`} 
                  d-grid gap-2 cols-lg-2
                `}
              >
                <div
                  className={`
                    d-flex justify-content-center bg-primary bg-opacity-25 rounded-circle m-1 
                  `}
                  onClick={() => moreInfoClick(props.product)}
                >
                  <span className="border-primary-before_nb border-primary-after_nb">
                    <Button
                      variant=""
                      title={`View ${props.product.product_name}`}
                      className="p-2 px-2"
                    >
                      <span className="text-primary">
                        <FaEye className="d-flex align-items-center justify-content-center" />
                      </span>
                    </Button>
                  </span>
                </div>
                <div
                  className={`
                    d-flex justify-content-center bg-secondary bg-opacity-25 rounded-circle m-1 
                  `}
                  onClick={() => setAskQuestionShow(true)}
                >
                  <span className="border-secondary-before_nb border-secondary-after_nb">
                    <Button
                      variant=""
                      title="Ask a Question"
                      className="p-2 px-2"
                    >
                      <FaQuestionCircle className="d-flex align-items-center justify-content-center text-secondary" />
                    </Button>
                  </span>
                </div>
              </div>
            </div>
          </Card.Footer>
        </Card.Body>
      </div>
      <div
        className={`
          ${isLG ? `mt-1` : ``}
          text-center px-1 position-absolute top-0 end-0 
        `}
        style={{ marginRight: isLG ? `` : `-0.5rem` }}
      >
        <div
          className={`
            d-grid position-relative z-index-1 rounded-bottom overflow-hidden
          `}
          style={{ width: `auto` }}
        >
          <div
            className={`
              d-flex justify-content-center bg-light bg-opacity-75 rounded-circle m-1 me-2 
            `}
            onClick={() => AddToWishList(props.product)}
          >
            <span>
              <Button variant="" title="Add to Wishlist" className="p-1 px-2">
                <RiHeartAddLine className="text-danger" />
              </Button>
            </span>
          </div>

          <AskQuestion
            show={askQuestionShow}
            onHide={() => setAskQuestionShow(false)}
            product={{
              pid: props.product.product_id,
              name: props.product.product_name,
              url: `https://www.evetech.co.za/${_.replace(
                _.toLower(props.product.product_url),
                new RegExp(" ", "g"),
                "-"
              ).trim()}/best-deal/${props.product.ProductID}.aspx`,
              price: props.product.product_price,
              ptype: props.product.product_type,
              page: "viewProduct",
            }}
          />
          {/* <WishModalGlobal
            isShow={showWish}
            wishItems={wishItems}
            onClose={onWishClose}
          /> */}
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
