"use client";
import AuthContext from "@/store/auth-context";
import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { RiHeartAddLine } from "react-icons/ri";
import Swal from "sweetalert2";
import WishModal from "./Modals/WishModal";
import UserAPI from "@/custom/utils/actions/user";

const WishlistButton = ({ component }: any) => {
  const authCtx = useContext(AuthContext);

  /* WishList */
  const [showWish, setShowWish] = useState(false);
  const [reloadWish, setReloadWish] = useState(false);

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function hideWish() {
    return new Promise<void>((resolve, reject) => {
      setShowWish(false);
      resolve();
    });
  }

  function removeStyleBody() {
    return delay(350).then(() => {
      document.body.style.paddingRight = "0";
    });
  }

  const onWishClose = () => {
    hideWish().then(removeStyleBody);
  };

  const AddToWishList = (product) => {
    if (authCtx.isLoggedIn) {
      /* Check First Product Exist or not */
      const chekWishList = async () => {
        const wishList = await UserAPI.checkWishlistItem({
          productId: product.productid,
          ptype: 2,
          uid: authCtx.user.id,
        });

        if (
          wishList !== undefined &&
          wishList.result !== undefined &&
          wishList.result.length > 0 &&
          wishList.result[0].total !== undefined &&
          wishList.result[0].total > 0
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
              productId: product.productid,
              ptype: 2,
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
                setReloadWish(true);
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
      authCtx.onShowLogin(true);
    }
  };
  /* WishList */

  return (
    <>
      <Button
        className="rounded-circle bg-light bg-opacity-75 border-danger border-opacity-50 p-2"
        size="sm"
        onClick={() => AddToWishList(component)}
      >
        <RiHeartAddLine className="text-danger d-flex" />
      </Button>

      <WishModal
        isShow={showWish}
        isReload={reloadWish}
        onClose={onWishClose}
      />
    </>
  );
};

export default WishlistButton;
