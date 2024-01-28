import React from "react";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import styles from "@/styles/User.module.scss";
import { FaTrash } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaIconDynamic } from "@ui-layouts";
import { useContext } from "react";
import AuthContext from "@/store/auth-context";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useRef } from "react";
import useIsOverflow from "@/custom/hooks/useIsOverflow";
import UserAPI from "@/custom/utils/actions/user";
import { useTheme } from "@/store/ThemeContext";
import Heading from "@/components/Heading";
const _ = require("lodash");

const MyWishList = () => {
  const authCtx = useContext<any>(AuthContext);
  const router = useRouter();
  const [wishItems, setWishItems] = useState<any>([]);
  const [totalWish, setTotalWish] = useState(0);
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  useEffect(() => {
    if (authCtx.isLoggedIn) {
      /* get token validate token */

      const userSummary = async () => {
        const summary = await UserAPI.getUserWishList({
          userid: authCtx.user.id,
        });
        if (summary !== undefined && summary.result !== undefined) {
          try {
            let wishList = summary.result;
            setWishItems(wishList);
            setTotalWish(wishList.length);
          } catch (e) {
            if (
              summary.message !== undefined &&
              summary.message === "Not authenticated."
            ) {
              if (authCtx.token === undefined) authCtx.onLogout();
              /* Show Login */
              /* once extend remove below code */
              authCtx.onLogout();
            }
          }
        }
      };

      userSummary();
    } else {
      router.push("/");
    }
  }, []);

  const removeWish = async (wishId: any) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't remove it from your wishlist!",
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
            setWishItems((prevWishes: any) => {
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
              timer: 2000,
            });
          } else {
            Swal.fire("Oops!", "Problem occured try again!", "error");
          }
        } else {
          Swal.fire("Oops!", "Problem occured try again!", "error");
        }
      }
    });
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

  const RenderName = (props: any) => {
    const [read, setRead] = useState(true);
    const ovDiv = useRef<any>();
    const isOverflow = useIsOverflow(ovDiv, () => {});
    const changeRead = () => {
      setRead(!read);
    };

    return (
      <div>
        <Link
          href={props.Link}
          title={props.Title}
          className={`${
            darkMode ? `text-info` : ``
          } text-decoration-none d-block`}
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
              darkMode ? `text-light btn btn-dark border-secondary` : ``
            } rounded-pill btn-sm mt-1 shadow border`}
            size="sm"
            variant=""
          >
            <small>{read ? "Read More" : "Read Less"}</small>
          </Button>
        )}
      </div>
    );
  };

  return (
    <>
      <div
        className={`
          d-flex justify-content-between align-items-center flex-wrap gap-1 border-bottom pb-3
          ${darkMode ? `border-secondary border-opacity-50` : `border-dark`}
        `}
      >
        <Heading level={2} className="m-0">
          <FaIconDynamic type="FaHeart" /> My Wishlist
        </Heading>
      </div>
      <Card
        className={`
          shadow overflow-hidden
          ${
            darkMode
              ? `border-secondary border-opacity-50 bg-black bg-opacity-25`
              : ``
          }
        `}
      >
        {wishItems.map((Product: any, index: any) => {
          return (
            <div
              key={index}
              className={`
                ${styles.Wishlist__Product} 
                d-grid border-bottom cols-md-10 lh-1 mb-2 mb-md-0
                ${darkMode ? `border-secondary border-opacity-50` : ``}
              `}
            >
              <div className="d-grid cols-10 d-md-block span-md-2 span-xxl-1">
                <div className="bg-dark text-light p-1 p-md-2 span-3">
                  <small>Image</small>
                </div>
                <div className="p-1 p-md-2 span-7">
                  <Image
                    src={`https://www.evetech.co.za/${Product.productimage}`}
                    fluid
                    alt={""}
                    className={darkMode ? `p-1 rounded bg-white` : ``}
                  />
                </div>
              </div>
              <div className="d-grid cols-10 d-md-block span-md-4 span-xxl-5">
                <div className="bg-dark text-light p-1 p-md-2 span-3">
                  <small>Name</small>
                </div>
                <div className="p-1 p-md-2 span-7">
                  <div className={`${styles.Wishlist__Name} lh-1`}>
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
                <div
                  className={`${
                    darkMode ? `text-light` : ``
                  } p-1 p-md-2 span-7 d-flex gap-1 d-md-block`}
                >
                  <div
                    className={`${styles.Wishlist__Price} ${
                      darkMode ? `text-light` : ``
                    }`}
                  >
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
                <div
                  className={`${
                    darkMode ? `text-light` : ``
                  } p-1 p-md-2 span-7`}
                >
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
    </>
  );
};

export default MyWishList;
