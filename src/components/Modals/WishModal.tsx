"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { Image } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import Link from "next/link";
import Swal from "sweetalert2";
import useIsOverflow from "@/custom/hooks/useIsOverflow";
import AuthContext from "@/store/auth-context";
import styles from "@/styles/User.module.scss";
import { FaIconDynamic } from "@ui-layouts";
import { nanoid } from "nanoid";
import UserAPI from "@/custom/utils/actions/user";
import { useTheme } from "@/store/ThemeContext";
import darkModalStyles from "@/styles/DarkModal.module.scss";
import {
  isBodyDark,
  isDarkHeaderFooter,
  isTextLinkDark,
} from "../Auth/LoginModal";

const _ = require("lodash");
const WishModal = (props: any) => {
  const [lgShow, setLgShow] = useState(false);
  const [reloadWish, setReloadWish] = useState(false);
  const authCtx = useContext(AuthContext);
  const [wishItems, setWishItems] = useState([]);
  const [totalWish, setTotalWish] = useState(0);

  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  const userSummary = async () => {
    const summary = await UserAPI.getUserWishList({ userid: authCtx.user.id });

    if (summary !== undefined && summary.result !== undefined) {
      try {
        let wishList = summary.result;
        setWishItems(wishList);
        setTotalWish(wishList.length);
        setReloadWish(false);
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

  useEffect(() => {
    if (props.isShow) userSummary();

    setLgShow(props.isShow);
  }, [props.isShow]);

  useEffect(() => {
    if (props.isReload) {
      userSummary();
      setReloadWish(props.isReload);
    }
  }, [props.isReload]);

  useEffect(() => {
    if (!lgShow) props.onClose();
  }, [lgShow]);

  /*  useEffect(() => {
    if (reloadWish) {
      userSummary();
    }
  }, [reloadWish]); */

  useEffect(() => {
    if (authCtx.isLoggedIn) {
      /* get token validate token */
      userSummary();
    }
  }, [authCtx]);

  /* useEffect(() => {
    if (authCtx.isLoggedIn) {
      userSummary();
    }
  }, []); */

  const removeWish = async (wishId: any) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won&apos;t remove it from your wishlist!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const summary = await UserAPI.removeUserWishItem({ wishId: wishId });

        if (summary !== undefined && summary.result !== undefined) {
          let wishList = summary.result;
          /* update wishlist */
          if (wishList.affectedRows !== undefined && wishList.affectedRows) {
            setWishItems((prevWishes) => {
              let wishes = _.filter(prevWishes, (wish: any) => {
                if (wish.id !== wishId) return wish;
              });
              return wishes;
            });
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your wishitem has been deleted.",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "Problem occured try again!",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }
      }
    });
  };

  const RenderName = (props: any) => {
    const [read, setRead] = useState<any>(true);
    const ovDiv: any = useRef();
    const isOverflow = useIsOverflow(ovDiv, () => {});
    const changeRead = () => {
      setRead(!read);
    };

    return (
      <div>
        <Link
          href={props.Link}
          title={props.Title}
          className={`${isTextLinkDark(darkMode)} text-decoration-none d-block`}
        >
          <small>
            <div
              dangerouslySetInnerHTML={{ __html: props.HTML }}
              style={{
                height: `${read ? 2.75 + "rem" : "auto"}`,
                overflow: `${read ? "hidden" : ""}`,
              }}
              ref={ovDiv}
            ></div>
          </small>
        </Link>
        {isOverflow && (
          <Button
            type="button"
            onClick={() => changeRead()}
            className={`${
              darkMode
                ? `btn-dark border-secondary border-opacity-50`
                : `btn-light`
            } rounded-pill btn btn-sm mt-1 shadow border`}
            size="sm"
            variant=""
          >
            <small>{read ? "Read More" : "Read Less"}</small>
          </Button>
        )}
      </div>
    );
  };

  const getLink = (title: any, type: any, productId: any) => {
    if (parseInt(type) === 3)
      return `/${_.join(
        _.filter(
          _.split(
            _.replace(_.toLower(title), new RegExp(/[^a-zA-Z0-9 ]/g), " "),
            " "
          ),
          _.size
        ),
        "-"
      ).trim()}/laptops-for-sale/${productId}.aspx`;
    if (parseInt(type) === 1)
      return `/${_.join(
        _.filter(
          _.split(
            _.replace(_.toLower(title), new RegExp(/[^a-zA-Z0-9 ]/g), " "),
            " "
          ),
          _.size
        ),
        "-"
      ).trim()}/best=pc-deal/${productId}.aspx`;
    if (parseInt(type) === 2)
      return `/${_.join(
        _.filter(
          _.split(
            _.replace(_.toLower(title), new RegExp(/[^a-zA-Z0-9 ]/g), " "),
            " "
          ),
          _.size
        ),
        "-"
      ).trim()}/best-deal/${productId}.aspx`;
  };

  return (
    <Modal
      size="lg"
      show={lgShow}
      onHide={() => setLgShow(false)}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header
        closeButton
        className={`
          ${darkMode ? darkModalStyles.darkHeader : ``}
          ${isDarkHeaderFooter(darkMode)}
        `}
      >
        <Modal.Title id="example-modal-sizes-title-lg">
          <FaIconDynamic type="FaHeart" /> Wishlist
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={`${isBodyDark(darkMode)}`}>
        <Card
          className={`
            ${
              darkMode
                ? `bg-dark bg-opacity-50 border-secondary border-opacity-50`
                : ``
            }
            shadow overflow-hidden
          `}
        >
          {wishItems.map((Product: any, index) => {
            return (
              <div
                key={nanoid(6)}
                className={`
                  ${styles.Wishlist__Product} 
                  ${darkMode ? `text-light` : ``}
                  d-grid border-bottom cols-md-10 lh-1 mb-2 mb-md-0
                `}
              >
                <div className="d-grid cols-10 d-md-block span-md-2 span-xxl-1">
                  <div className="bg-dark text-light p-1 p-md-2 span-3">
                    <small>Image</small>
                  </div>
                  <div className="p-1 p-md-2 span-7">
                    <Image
                      src={`https://www.evetech.co.za/${Product.productimage}`}
                      alt="Product Image"
                      className="w-100"
                    />
                  </div>
                </div>
                <div className="d-grid cols-10 d-md-block span-md-4 span-xxl-5">
                  <div className="bg-dark text-light p-1 p-md-2 span-3">
                    <small>Name</small>
                  </div>
                  <div className="p-1 p-md-2 span-7">
                    <div
                      className={`
                        ${styles.Wishlist__Name} 
                        lh-1
                      `}
                    >
                      <RenderName
                        HTML={Product.productname}
                        Link={getLink(
                          Product.title,
                          Product.type,
                          Product.productid
                        )}
                        Title={Product.title}
                      />
                    </div>
                  </div>
                </div>
                <div className="d-grid cols-10 d-md-block span-md-1 span-xxl-1">
                  <div className="bg-dark text-light p-1 p-md-2 span-3">
                    <small>Price</small>
                  </div>
                  <div className="p-1 p-md-2 span-7 d-flex gap-1 d-md-block">
                    <div className={styles.Wishlist__Price}>
                      R {Product.price_vat}{" "}
                    </div>
                    <div>
                      <small>
                        <small>
                          <span className="text-danger">inc. VAT</span>
                        </small>
                      </small>
                    </div>
                  </div>
                </div>
                <div className="d-grid cols-10 d-md-block span-md-2 span-xxl-2">
                  <div className="bg-dark text-light p-1 p-md-2 span-3">
                    <small>Added Date</small>
                  </div>
                  <div className="p-1 p-md-2 span-7">
                    <small>{new Date(Product.addedate).toUTCString()}</small>
                  </div>
                </div>
                <div className="d-grid cols-10 d-md-block span-md-1 span-xxl-1">
                  <div className="bg-dark text-light p-1 p-md-2 span-3">
                    <br></br>
                  </div>
                  <div className="p-1 p-md-2 span-7 text-md-end">
                    <Button
                      size="sm"
                      className="text-danger shadow"
                      variant=""
                      onClick={() => removeWish(Product.id)}
                    >
                      <FaTrash />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </Card>
      </Modal.Body>
    </Modal>
  );
};

export default WishModal;
