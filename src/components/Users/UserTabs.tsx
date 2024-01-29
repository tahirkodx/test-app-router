import React, { useRef } from "react";
// import LaptopHeader from "../../Layouts/LaptopHeader";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import TabContainer from "react-bootstrap/TabContainer";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FaIconDynamic as Icon } from "@ui-layouts";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import AuthContext from "@/store/auth-context";
import { useEffect } from "react";
import MyAccount from "@/components/Users/MyAccount";
import AccountInfo from "@/components/Users/AccountInfo";
import AddressBook from "@/components/Users/AddressBook";
import ChangePassword from "@/components/Users/ChangePassword";
import OrderHistory from "@/components/Users/OrderHistory";
import MyWishList from "@/components/Users/MyWishList";
import Warranty from "@/components/Users/Warranty";
import RMAForm from "@/components/Users/RMAForm";
import { useState } from "react";
import useMediaQuery from "@/custom/hooks/useMediaQuery";
import styles from "@/styles/User.module.scss";
import ComponentsHeader from "@/components/Home/ComponentsHeader";
import ViewRMAForm from "@/components/Main/Controls/User/ViewRMAForm";
// import AppFooter from "../../Layouts/CompFooter";
import { Helmet } from "react-helmet";
import RecentActivity from "@/components/Users/RecentActivity";
import { FaClock, FaUserClock, FaWpforms } from "react-icons/fa";
import { useTheme } from "@/store/ThemeContext";

const UserTabs = (props: any) => {
  const requestsTabLink = useRef<any>(null);
  const requestsTabLinkMobi = useRef<any>(null);
  const orderHistoryLink = useRef<any>(null);
  const orderHistoryLinkMobi = useRef<any>(null);
  const myWishListLink = useRef<any>(null);
  const myWishListLinkMobi = useRef<any>(null);
  const isLG = useMediaQuery("(min-width: 992px)");
  const router = useRouter();
  const [defaultKey, setDefaultKey] = useState(props.TabKey);
  const [showPageTopMsg, setShowPageTopMsg] = useState(true);

  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  useEffect(() => {
    setDefaultKey(props.TabKey);
  }, [props]);

  const clickRequests = () => {
    requestsTabLink.current?.click();
  };

  const clickOrders = () => {
    orderHistoryLink.current?.click();
  };

  const clickWish = () => {
    myWishListLink.current?.click();
  };

  const getSection = (key: any) => {
    switch (key) {
      case "AddressBook":
        return <AddressBook />;
      case "AccountInfo":
        return <AccountInfo />;
      case "OrderHistory":
        return <OrderHistory />;
      case "MyWishlist":
        return <MyWishList />;
      case "ChangePassword":
        return <ChangePassword />;
      case "WarrantyReturns":
        return <Warranty />;
      case "RMAForm":
        return <RMAForm clickRequests={clickRequests} />;
      case "MyAccount":
        return (
          <MyAccount
            clickOrders={clickOrders}
            clickRequests={clickRequests}
            clickWish={clickWish}
          />
        );
      case "ViewRMAForm":
        return <ViewRMAForm />;
      case "Activities":
        return <RecentActivity />;
      default:
        return (
          <MyAccount
            clickOrders={clickOrders}
            clickRequests={clickRequests}
            clickWish={clickWish}
          />
        );
    }
  };

  const getPageTitle = (key: any) => {
    switch (key) {
      case "AddressBook":
        return "Address Book";
      case "AccountInfo":
        return "Account Info";
      case "OrderHistory":
        return "Order History";
      case "MyWishlist":
        return "My Wishlist";
      case "ChangePassword":
        return "Change Password";
      case "WarrantyReturns":
        return "Warranty & Returns";
      case "RMAForm":
        return "RMA Form";
      case "MyAccount":
        return "My Account";
      case "ViewRMAForm":
        return "View RMA Form";
      case "Activities":
        return "Activities";
      default:
        return "Account Section";
    }
  };

  return (
    <>
      <Helmet>
        <title itemProp="name" lang="en">
          {getPageTitle(props.TabKey)}
        </title>
      </Helmet>
      {/* <LaptopHeader /> */}
      <ComponentsHeader showpagetopmsg={showPageTopMsg} />
      <div
        className={`
          py-3 py-xxl-4 position-relative z-index-1
          ${darkMode ? `bg-dark text-light` : ``}
        `}
      >
        <section className="px-2">
          <Col md={{ span: 10, offset: 1 }}>
            <Card
              className={`
                ${darkMode ? `bg-black bg-opacity-50` : ``}
                bg-gradient shadow d-grid gap-2 gap-sm-3 cols-10 p-2 p-sm-3
              `}
            >
              <TabContainer>
                <Tab.Container
                  id="left-tabs-example"
                  defaultActiveKey={props.TabKey}
                >
                  <Nav
                    variant="pills"
                    className={`
                      ${styles.Nav}
                      ${darkMode ? styles.darkMode : ``} 
                      flex-column span-12 span-lg-2 position-sticky
                    `}
                  >
                    {!isLG ? (
                      <>
                        <NavDropdown title="My Account Pages" id="nav-dropdown">
                          <NavDropdown.Item
                            eventKey="MyAccount"
                            onClick={() => {
                              router.push("/user/myaccount");
                            }}
                          >
                            <Icon type="FaUserCircle" /> My Account
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            eventKey="AccountInfo"
                            onClick={() => {
                              router.push("/user/profile");
                            }}
                          >
                            <Icon type="FaUserAlt" /> Account Info
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            eventKey="AddressBook"
                            onClick={() => {
                              router.push("/user/addressbook");
                            }}
                          >
                            <Icon type="FaBook" /> Address Book
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            eventKey="OrderHistory"
                            ref={orderHistoryLinkMobi}
                            onClick={() => {
                              router.push("/user/orders");
                            }}
                          >
                            <Icon type="FaShoppingCart" /> Order History
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            eventKey="MyWishlist"
                            ref={myWishListLinkMobi}
                            onClick={() => {
                              router.push("/user/wishlist");
                            }}
                          >
                            <Icon type="FaHeart" /> My Wishlist
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            eventKey="ChangePassword"
                            onClick={() => {
                              router.push("/user/security");
                            }}
                          >
                            <Icon type="FaUserLock" /> Change Password
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            eventKey="WarrantyReturns"
                            ref={requestsTabLinkMobi}
                            onClick={() => {
                              router.push("/user/warranty");
                            }}
                          >
                            <Icon type="FaUndoAlt" /> Warranty and Return
                            Requests
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            eventKey="RMAForm"
                            onClick={() => {
                              router.push("/user/RMAForm");
                            }}
                          >
                            RMA Form
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            eventKey="Activities"
                            onClick={() => {
                              router.push("/user/activities");
                            }}
                          >
                            My Activities
                          </NavDropdown.Item>
                        </NavDropdown>
                        <div className="d-none">
                          <Nav.Item>
                            <Nav.Link
                              eventKey="OrderHistory"
                              ref={orderHistoryLink}
                              onClick={() => {
                                router.push("/user/orders");
                              }}
                            >
                              <Icon type="FaShoppingCart" /> Order History
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link
                              eventKey="WarrantyReturns"
                              ref={requestsTabLink}
                              onClick={() => {
                                router.push("/user/warranty");
                              }}
                            >
                              <Icon type="FaUndoAlt" /> Warranty and Return
                              Requests
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link
                              eventKey="MyWishlist"
                              ref={myWishListLink}
                              onClick={() => {
                                router.push("/user/wishlist");
                              }}
                            >
                              <Icon type="FaHeart" /> My Wishlist
                            </Nav.Link>
                          </Nav.Item>
                        </div>
                      </>
                    ) : (
                      <>
                        <Nav.Item>
                          <Nav.Link
                            eventKey="MyAccount"
                            onClick={() => {
                              router.push("/user/myaccount");
                            }}
                          >
                            <Icon type="FaUserCircle" /> My Account
                          </Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                          <Nav.Link
                            eventKey="AccountInfo"
                            onClick={() => {
                              router.push("/user/profile");
                            }}
                          >
                            <Icon type="FaUserAlt" /> Account Info
                          </Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                          <Nav.Link
                            eventKey="AddressBook"
                            onClick={() => {
                              router.push("/user/addressbook");
                            }}
                          >
                            <Icon type="FaBook" /> Address Book
                          </Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                          <Nav.Link
                            eventKey="OrderHistory"
                            ref={orderHistoryLink}
                            onClick={() => {
                              router.push("/user/orders");
                            }}
                          >
                            <Icon type="FaShoppingCart" /> Order History
                          </Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                          <Nav.Link
                            eventKey="MyWishlist"
                            ref={myWishListLink}
                            onClick={() => {
                              router.push("/user/wishlist");
                            }}
                          >
                            <Icon type="FaHeart" /> My Wishlist
                          </Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                          <Nav.Link
                            eventKey="ChangePassword"
                            onClick={() => {
                              router.push("/user/security");
                            }}
                          >
                            <Icon type="FaUserLock" /> Change Password
                          </Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                          <Nav.Link
                            eventKey="WarrantyReturns"
                            ref={requestsTabLink}
                            onClick={() => {
                              router.push("/user/warranty");
                            }}
                          >
                            <Icon type="FaUndoAlt" /> Warranty and Return
                            Requests
                          </Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                          <Nav.Link
                            eventKey="RMAForm"
                            onClick={() => {
                              router.push("/user/RMAForm");
                            }}
                          >
                            <FaWpforms /> RMA Form
                          </Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                          <Nav.Link
                            eventKey="Activities"
                            onClick={() => {
                              router.push("/user/activities");
                            }}
                          >
                            <FaClock /> My Activities
                          </Nav.Link>
                        </Nav.Item>
                      </>
                    )}
                  </Nav>
                  <Tab.Content
                    className="span-12 span-lg-8"
                    style={{ minHeight: "36vh" }}
                  >
                    <Tab.Pane eventKey={props.TabKey}>
                      <Stack gap={3}>{getSection(props.TabKey)}</Stack>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </TabContainer>
            </Card>
          </Col>
        </section>
      </div>
    </>
  );
};

export default UserTabs;
