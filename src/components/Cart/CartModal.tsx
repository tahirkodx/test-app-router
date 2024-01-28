import React, { Fragment, useContext } from "react";
import { Button, Form, Modal, Badge, Stack, Row, Col } from "react-bootstrap";
// import Image from 'next/image'
import Image from "react-bootstrap/Image";
import {
  FaShoppingCart,
  FaCheckCircle,
  FaTrashAlt,
  FaAngleDown,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import styles from "@/styles/Header.module.scss";
import CartContext from "@/store/ncart-context";
import { nanoid } from "nanoid";
import { useTheme } from "@/store/ThemeContext";
import { isBodyDark, isDarkHeaderFooter } from "../Auth/LoginModal";
import darkModalStyles from "@/styles/DarkModal.module.scss";
import Text from "../Text";

const _ = require("lodash");
function CartModal(props: any) {
  const Swal = require("sweetalert2");
  const router = useRouter();
  const cartCtx = useContext(CartContext);
  const hasItems = cartCtx.items.length > 0;

  const removeItemCartHandler = async (id: any) => {
    cartCtx.removeItem(id);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Product removed from the cart.",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const RenderTitle = (props: any) => (
    <span dangerouslySetInnerHTML={{ __html: props.HTML }}></span>
  );

  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        closeButton
        className={`
          ${darkMode ? darkModalStyles.darkHeader : ``}
          ${isDarkHeaderFooter(darkMode)}
        `}
      >
        <Modal.Title id="contained-modal-title-vcenter">
          Cart Summary
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={`${isBodyDark(darkMode)} pt-0`}>
        <div
          className={`${styles.CartBasket} ${
            darkMode ? `bg-black bg-gradient` : ``
          } hide-scrollbar px-3 pt-3 pb-5`}
        >
          {cartCtx.items.length > 0 &&
            cartCtx.items.map((Product: any, index: number) => {
              return (
                <div key={nanoid(4)}>
                  <div
                    className={`
                      ${styles.CartProduct} 
                      ${darkMode ? `bg-black` : ``}
                      d-flex gap-2 p-2 rounded mb-2
                    `}
                  >
                    <div className="d-flex gap-2 w-100 align-items-start">
                      <Image
                        src={Product.imageUrl}
                        alt={`` + Product.alt}
                        className={styles.CartIMG}
                      />
                      <div className="flex-grow-1">
                        <div className="d-flex gap-2">
                          <p
                            className={`${styles.CartSmallText} mb-1 w-100 lh-1`}
                          >
                            <RenderTitle HTML={Product.name} />
                          </p>

                          <div className={`${styles.CartDelete}`}>
                            <FaTrashAlt
                              className="text-danger"
                              onClick={() => {
                                let cartItems = cartCtx.items.length;
                                removeItemCartHandler(Product.id).then(
                                  (res) => {
                                    if ((cartItems -= 1) <= 0) {
                                      router.push("/cart");
                                    }
                                  }
                                );
                              }}
                            />
                          </div>
                        </div>

                        <div>
                          <div className="d-sm-flex justify-content-between flex-wrap">
                            <p className="m-0 d-inline-block">
                              <small>
                                <span className="fw-2">Qty:</span>{" "}
                                {Product.amount}
                              </small>
                            </p>

                            <div
                              className={`${styles.CartPrice} fs-6 gap-2 col-7 d-sm-flex flex-wrap flex-grow-1 align-items-center justify-content-end mb-0 lh-1`}
                            >
                              <p className="m-0">
                                <small>
                                  <label className="fw-2 text-primary pe-1">
                                    Credit Card:
                                  </label>
                                  R{parseFloat(Product.ccPrice).toFixed(2)}
                                </small>
                              </p>
                              <p className="m-0">
                                <small>
                                  <label className="fw-2 text-primary pe-1">
                                    Eft:
                                  </label>
                                  R{parseFloat(Product.ieftPrice).toFixed(2)}
                                </small>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

          {cartCtx.items.length === 0 && (
            <div className="row text-center justify-content-center">
              <Image
                src="https://cdn3.iconfinder.com/data/icons/shopping-and-ecommerce-29/90/empty_cart-512.png"
                alt="Empty cart"
                className="CartIMG"
                style={{ maxHeight: "150px", width: "auto" }}
              />
              <Text className={`fw-3`}>Your Cart is Empty.</Text>
            </div>
          )}
        </div>

        <div
          className={`${styles.CartScroll} ${
            darkMode ? styles.darkMode : ``
          } d-flex align-items-end justify-content-center pb-2`}
        >
          <FaAngleDown />
        </div>

        <Stack
          gap={3}
          className={`${styles.CartBottom} ${
            darkMode ? styles.darkMode : ``
          } border-top`}
        >
          <div className="py-2">
            <div className={`${styles.CartTotal} ms-auto`}>
              <div className="fw-3">Order Subtotal</div>
              <div>R {cartCtx.totalCCAmount.toFixed(2)}</div>
              <div className="fw-3">Discounted Price</div>
              <div>R {cartCtx.totalIEFTAmount.toFixed(2)} </div>
            </div>
          </div>
          <Form.Text
            className={`${styles.CartTerms} ${
              darkMode ? `text-light opacity-75` : `text-muted`
            } pt-sm-1`}
          >
            <Badge pill bg="warning" text="dark">
              <span className="fw-3">Please Note</span>
            </Badge>
            <span className="text-danger"> FREE Delivery </span>
            <span>
              only available to main centers. (Calculated based on your post
              code.)
            </span>
          </Form.Text>
        </Stack>
      </Modal.Body>
      <Modal.Footer
        className={`
        ${isDarkHeaderFooter(darkMode)}
      `}
      >
        {hasItems && (
          <Fragment>
            <Button
              variant="secondary"
              className="d-flex align-items-center gap-1"
              onClick={() => {
                props.onHide();
                router.push("/cart");
              }}
            >
              <FaShoppingCart />
              View Cart
            </Button>
            <Button
              variant="success"
              className="d-flex align-items-center gap-1"
              onClick={() => {
                props.onHide();
                router.push("/delivery");
              }}
            >
              <FaCheckCircle />
              Checkout
            </Button>
          </Fragment>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default CartModal;
