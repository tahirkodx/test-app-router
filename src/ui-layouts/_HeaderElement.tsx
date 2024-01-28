import React, { useContext } from "react";

import styles from "@/styles/Header.module.scss";
// import useMediaQuery from "@/custom/hooks/useMediaQuery";
import LoginModal from "@/components/Auth/LoginModal";
import RegisterModal from "@/components/Auth/RegisterModal";
import CartModal from "@/components/Cart/CartModal";

import { Stack, Badge, Button } from "react-bootstrap";
import AuthContext from "@/store/auth-context";
import CartContext from "@/store/ncart-context";
// import { useNavigate } from "react-router-dom";
import { useRouter, usePathname } from "next/navigation";
import Searchbar from "@/components/Searchbar";
import { FaShoppingCart } from "react-icons/fa";
import { AuthAPI, CartAPI } from "@actions";
import { Image } from "react-bootstrap";
import useMediaQuery from "@/custom/hooks/useMediaQuery";
import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "@/store/ThemeContext";

const _ = require("lodash");
const HeaderElements: React.FC = () => {
  const isLG = useMediaQuery("(min-width: 992px)");
  const { isDarkMode, toggleDarkMode } = useTheme();
  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);

  const router = useRouter();
  const pathname = usePathname();

  const [loginShow, setLoginShow] = React.useState(false);
  const [registerShow, setRegisterShow] = React.useState(false);
  const [cartShow, setCartShow] = React.useState(false);

  const logoClick = () => {
    router.push("/");
  };

  const logoutHandler = async () => {
    try {
      const loggedOut = await AuthAPI.logout();
      const fetchSession = await CartAPI.getClientSessionId();
      authCtx.onLogout(fetchSession.result);
      return loggedOut;
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const isXL = useMediaQuery("(min-width: 1200px)");

  return (
    <>
      <div style={{ width: "100%" }}>
        <Stack direction="horizontal" gap={1}>
          <picture className="pe-auto" onClick={logoClick}>
            <source
              media="(min-width: 1200px)"
              srcSet="https://www.evetech.co.za/repository/productImages/logo.png"
              sizes="100vw"
            />
            <Image
              title="Evetech"
              height={40}
              width={isXL ? 162 : 40}
              src="https://www.evetech.co.za/repository/productImages/Evetech-Logo-Icon.png"
              alt="Evetech Logo"
            />
          </picture>

          <div className={`${styles.TopSearch} position-relative`}>
            <Searchbar />
          </div>

          <Stack direction="horizontal" gap={2} className={`${styles.TopLog}`}>
            <div
              className={`
                  ${isLG ? `` : `position-fixed bottom-0 start-0 ms-2`}
                  pe-auto me-lg-2 cursor-pointer
                `}
              style={{ marginBottom: isLG ? `` : `0.65rem` }}
              onClick={toggleDarkMode}
            >
              <div className="position-relative">
                <div
                  className={`rounded-pill border border-light border-opacity-25 bg-light`}
                >
                  <div className="d-grid cols-2 gap-2 text-dark">
                    <div className={`p-1 pe-0`}>
                      <FiSun className="d-flex" />
                    </div>
                    <div className={`p-1 ps-0`}>
                      <FiMoon className="d-flex" />
                    </div>
                  </div>
                </div>
                <div
                  className={`
                    position-absolute h-100 w-50 rounded-circle bg-secondary bg-gradient border-secondary top-0 
                    ${isDarkMode ? `start-50` : `start-0`}
                  `}
                ></div>
              </div>
            </div>
            {/* Trash code */}
            <div style={{ maxWidth: "400px" }} className="d-none">
              <small className="text-white">
                <b>Active SessionID : </b>
                <br></br>

                <p className="text-break m-0">
                  <small>{authCtx.sessId}</small>
                </p>
              </small>
            </div>
            {/* Trash code */}
            <Stack direction="horizontal" gap={2}>
              {authCtx.isLoggedIn === false && (
                <Stack direction="horizontal" gap={2}>
                  <div onClick={() => setLoginShow(true)}>
                    <div className={`${styles.LoginLink} pe-auto`}>
                      <small>Login</small>
                    </div>
                  </div>
                  <LoginModal
                    show={loginShow}
                    onHide={() => setLoginShow(false)}
                    setRegisterShow={setRegisterShow}
                    className="pe-auto"
                  />
                  <div>
                    <small>|</small>
                  </div>
                  <div onClick={() => setRegisterShow(true)}>
                    <div className={`${styles.RegisterLink} pe-auto`}>
                      <small>Register</small>
                    </div>
                  </div>

                  <RegisterModal
                    show={registerShow}
                    onHide={() => setRegisterShow(false)}
                    setLoginShow={setLoginShow}
                    className="pe-auto"
                  />
                  <div>
                    <small>|</small>
                  </div>
                </Stack>
              )}

              {authCtx.isLoggedIn === true && (
                <>
                  <div
                    onClick={() => router.push("/user/myaccount")}
                    className="cursor-pointer pe-auto"
                  >
                    <small>{authCtx.user.FirstName}</small>
                  </div>
                  <div>
                    <small>|</small>
                  </div>
                  <div
                    onClick={() => router.push("/user/myaccount")}
                    className="cursor-pointer pe-auto"
                  >
                    <small>Account</small>
                  </div>
                  <div>
                    <small>|</small>
                  </div>
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      logoutHandler().then(() => {
                        router.refresh();
                      });
                    }}
                    className="cursor-pointer pe-auto"
                  >
                    <small>Logout</small>
                  </div>
                  <div>
                    <small>|</small>
                  </div>
                </>
              )}
            </Stack>

            {pathname?.includes("paygate-order-response.aspx") === false &&
            pathname?.includes("ozow-success.aspx") === false &&
            pathname?.includes("checkout") === false ? (
              <div onClick={() => setCartShow(true)}>
                <Stack
                  direction="horizontal"
                  gap={1}
                  className={`${styles.CartLink} pe-auto`}
                >
                  <Badge bg="light" className="rounded-pill">
                    <span className="fw-2 text-dark">
                      <small>{cartCtx.items.length}</small>
                    </span>
                  </Badge>
                  <FaShoppingCart />
                  <div>
                    <small>Cart</small>
                  </div>
                </Stack>
              </div>
            ) : null}

            <CartModal show={cartShow} onHide={() => setCartShow(false)} />
          </Stack>
        </Stack>
      </div>
    </>
  );
};

export default HeaderElements;
