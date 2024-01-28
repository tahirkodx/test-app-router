"use client";
import AuthContext from "@/store/auth-context";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import WishModal from "./Modals/WishModal";
import UserAPI from "@/custom/utils/actions/user";

const AddToWishlist = ({
  children,
  productId,
  ptype,
  className,
  style,
}: any) => {
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

  const AddToWishList = () => {
    if (authCtx.isLoggedIn) {
      /* Check First Product Exist or not */
      const chekWishList = async () => {
        const wishList = await UserAPI.checkWishlistItem({
          productId: productId,
          ptype: ptype,
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
              productId: productId,
              ptype: ptype,
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
      <span onClick={() => AddToWishList()} className={className} style={style}>
        {children}
      </span>

      <WishModal
        isShow={showWish}
        isReload={reloadWish}
        onClose={onWishClose}
      />
    </>
  );
};

export default AddToWishlist;
