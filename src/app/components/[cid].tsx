import { ComponentsHeader } from "@/components/Home";
import useMediaQuery from "@/custom/hooks/useMediaQuery";
import { ProductAPI } from "@/custom/utils/actions";
import AuthContext from "@/store/auth-context";
import HTMLReactParser from "html-react-parser";
import _ from "lodash";
import { nanoid } from "nanoid";
import Head from "next/head";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { Card, Col, Image, Stack, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import styles from "@/styles/component/Components.module.scss";
import SubCategories from "@/components/Component/Components/SubCategories";
import Heading from "@/components/Heading";
import ComponentCard from "@/components/Product/ComponentCard";
import { useTheme } from "@/store/ThemeContext";
import UserAPI from "@/custom/utils/actions/user";

const Home = () => {
  const params = useParams();
  const router = useRouter();
  const [pageCid, setPageCid] = useState(0);
  const authCtx = useContext(AuthContext);
  const [categoryData, setCategoryData] = useState<any>("");
  const [categories, setCategories] = useState<any>("");
  const [compTopBanners, setCompTopBanners] = useState<any>("");
  const [compBottomBanners, setCompBottomBanners] = useState<any>("");
  const [categoryBriefData, setCategoryBriefData] = useState<any>("");
  const [Products, setProducts] = useState<any[]>([]);
  const [title, setTitle] = useState<any>("");
  const [description, setDescription] = useState<any>("");
  const [showPageTopMsg, setShowPageTopMsg] = useState<any>(true);
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;
  const [subCatCount, setSubCatCount] = useState(0);

  /* WishList */
  const [showWish, setShowWish] = useState(false);
  const [reloadWish, setReloadWish] = useState(false);
  const onWishClose = () => {
    setShowWish(false);
  };
  const AddToWishList = (product) => {
    if (authCtx.isLoggedIn) {
      /* Check First Product Exist or not */

      const chekWishList = async () => {
        const wishList = await UserAPI.checkWishlistItem({
          productId: product.ProductID,
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
              productId: product.ProductID,
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

  useEffect(() => {
    let CID: any = params?.cid;
    if (CID !== undefined && CID.split("-").length > 0) {
      CID.split("-").forEach((str) => {
        try {
          CID = parseInt(str.replace(".", "").replace("aspx", "").trim());
        } catch (e) {}
      });
      setPageCid(CID);
    } else {
      try {
        CID = parseInt(CID.replace(".", "").replace("aspx", "").trim());
        setPageCid(CID);
      } catch (e) {
        CID = 0;
      }
    }
  }, [params]);

  // const setTitle = (title) => {
  //   const el = document.querySelector("title");
  //   if (el !== null) {
  //     el.innerText = `${title}`;
  //   }
  // };

  // const setDescription = (desc) => {
  //   const el = document.querySelector("meta[name='description']");
  //   if (el !== null) {
  //     el.setAttribute("content", desc);
  //   }
  // };

  useEffect(() => {
    const getCategoryDetails = async (catId) => {
      const cdatas = await ProductAPI.getCategoryDetails({ catId });
      if (cdatas && cdatas.result !== null) {
        let data = cdatas?.result[0];
        setCategoryData((prevCategoryData) => {
          prevCategoryData = data;
          return prevCategoryData;
        });
      }
    };

    const getCategoriesByCID = async (catId) => {
      const categories = await ProductAPI.getCategoriesByCID({ catId });
      if (categories && categories.result !== null) {
        let data = categories?.result;
        setCategories(data);
      }
    };

    const getCategoryDetailsBrief = async (catId) => {
      const cdatas = await ProductAPI.getCategoryDetailsBrief({ catId });
      if (cdatas && cdatas.result !== null) {
        let data = cdatas?.result[0];

        setCompTopBanners(data.TopDes);
        setCompBottomBanners(data.BottomDes);
        setTitle(data.Pagetitle);
        setDescription(data.MetaDes);
        setCategoryBriefData((prevCategoryData) => {
          prevCategoryData = data;
          return prevCategoryData;
        });
      }
    };

    const getProductsByCategoryIDS = async (catId) => {
      const cdatas = await ProductAPI.getProductsByCategoryIDS({ catId });

      if (catId && cdatas.result !== null) {
        let data = cdatas.result;

        setProducts((prevProducts) => {
          prevProducts = data;
          return prevProducts;
        });
      }
    };

    if (pageCid) {
      getCategoryDetails(pageCid);
      getCategoriesByCID(pageCid);
      getCategoryDetailsBrief(pageCid);
      getProductsByCategoryIDS(pageCid);
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pageCid]);

  const subCatUpdate = (count) => {
    setSubCatCount(count);
  };

  const catCardsCols = (amount) => {
    switch (amount) {
      case 1:
        return "cols-1";
      case 2:
        return "cols-2";
      case 3:
        return "cols-3";
      case 4:
        return "cols-4";
      case 6:
        return "cols-3";
      case 8:
        return "cols-4";
      default:
        return "cols-2 cols-md-3 cols-lg-4 cols-1700-5";
    }
  };

  const formatHTMLImg = (overview) => {
    try {
      let parser = new DOMParser();
      let doc = parser.parseFromString(overview, "text/html");

      let images = doc.body.getElementsByTagName("img");

      for (let i = 0; i < images.length; i++) {
        images[i].classList.add("img-fluid");
      }
      return doc.documentElement.innerHTML;
    } catch (ex) {
      return overview;
    }
  };

  const isHD = useMediaQuery("(min-width: 1921px)");

  return (
    <>
      {categoryData !== undefined ? (
        <Head>
          <title itemProp="name" lang="en">
            {title}
          </title>
          <meta name="description" content={description} />
          {/* <meta name="keywords" content={categoryData.Keyword} /> */}
        </Head>
      ) : null}

      <ComponentsHeader showpagetopmsg={showPageTopMsg} />

      <div
        className={`
          ${darkMode ? `evetechDark bg-dark` : ``}
          position-relative z-index-1
        `}
      >
        <Stack className="pt-3 pb-4 gap-2 gap-md-3">
          {compTopBanners !== undefined && compTopBanners.length > 0 ? (
            <section>
              <Col xs={12} md={{ span: 10, offset: 1 }} className="p-3 p-md-0">
                <div
                  className={`
                  ${darkMode ? `text-light` : ``} 
                  d-block cols-12 gap-2 gap-sm-3 comp-top-section
                `}
                >
                  {HTMLReactParser(compTopBanners)}
                </div>
              </Col>
            </section>
          ) : null}

          <section>
            <Col xs={12} md={{ span: 10, offset: 1 }} className="px-3 px-md-0">
              {pageCid !== 0 && (
                <div
                  className={`
                    ${catCardsCols(categories.length)} 
                    d-grid gap-2 gap-sm-3 gap-xxl-5
                  `}
                >
                  {_.filter(categories, (category) => {
                    if (category.TotalQty > 0) return category;
                  }).map((category) => {
                    return (
                      <Card
                        className={`
                          ${styles.Categories__Card} 
                          ${styles.HoverGrow} 
                          ${darkMode ? `bg-black bg-gradient` : ``}
                          shadow overflow-hidden text-center h-100 border-info
                        `}
                        key={nanoid(5)}
                      >
                        <div className="d-xl-flex h-100">
                          <div
                            className={`${styles.Categories__ImageParent} p-3 d-flex align-items-center justify-content-center flex-shrink-0 bg-light`}
                          >
                            <Image
                              fluid
                              className={`${styles.Categories__Image}`}
                              src={
                                `https://www.evetech.co.za/repository/components/` +
                                category.ImageFile
                              }
                              width="100"
                              alt={category.name}
                            />
                          </div>
                          <div
                            className={`
                              w-100 h-100
                            `}
                          >
                            <div className="px-3 py-2 bg-info fw-2 lh-1 w-100">
                              {category.name} ({category.TotalQty})
                            </div>
                            <div
                              className={`
                                p-2 p-sm-3 d-flex flex-wrap gap-1 justify-content-center align-content-start
                              `}
                            >
                              <SubCategories
                                cid={category.Categoryid}
                                onSubCatUpdate={subCatUpdate}
                              />
                            </div>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              )}
            </Col>
          </section>

          <section>
            <Col
              xs={12}
              md={{ span: 10, offset: 1 }}
              className="position-relative z-index-1"
            >
              {Products.length > 0 && (
                <div
                  className={`
                    ${styles.StickyHeader}
                    ${darkMode ? `bg-dark` : `bg-light`} 
                    position-sticky z-index-1 bg-light my-2 pt-1 mb-3
                  `}
                >
                  <Heading level={2} className={`fs-6 m-0 px-3 my-2`}>
                    {categoryBriefData.Heading} ({Products.length})
                  </Heading>

                  <hr className="m-0"></hr>
                </div>
              )}
              <div className="px-3 px-md-0">
                <div
                  className={`
                    ${isHD ? `cols-xxl-5` : `cols-xxl-4`}
                    d-grid cols-2 cols-md-3 cols-lg-4 gap-2 gap-sm-3 gap-xxl-5
                  `}
                >
                  <svg width="0" height="0" className="position-absolute">
                    <linearGradient
                      id="purpleGradient1"
                      x1="0"
                      x2="1"
                      y1="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#AF40FF" />
                      <stop offset="50%" stopColor="#5B42F3" />
                      <stop offset="100%" stopColor="#00DDEB" />
                    </linearGradient>
                    {/* Level up  */}
                    <linearGradient
                      id="LevelUp"
                      x1={"0"}
                      x2={"1"}
                      y1={"0"}
                      y2={"1"}
                    >
                      {" "}
                      <stop offset="0%" stopColor={"#5757D9"} />
                      <stop offset="100%" stopColor={"#21D9F7"} />
                    </linearGradient>
                    {/* Clearance  */}
                    <linearGradient
                      id="Clearance"
                      x1={"1"}
                      x2={"0"}
                      y1={"1"}
                      y2={"0"}
                    >
                      <stop offset="0%" stopColor={"#f25025"} />
                      <stop offset="100%" stopColor={"#ff8e41"} />
                    </linearGradient>
                  </svg>
                  {Products.map((product) => {
                    return (
                      <ComponentCard
                        Product={product}
                        key={nanoid(7)}
                        onAddToWishList={AddToWishList}
                      />
                    );
                  })}
                </div>
              </div>
            </Col>
          </section>

          {compBottomBanners !== undefined && compBottomBanners.length > 0 ? (
            <>
              <section
                className={`
              ${darkMode ? `text-light` : ``}
              py-3 py-xxl-4 bg-secondary bg-opacity-25
            `}
              >
                <Col
                  xs={12}
                  md={{ span: 10, offset: 1 }}
                  className="comp-top-section child-d-grid child-gap-2 child-gap-sm-3 child-cols-sm-2 childImages-w-100"
                >
                  <div className="comp-bottom-section">
                    {HTMLReactParser(formatHTMLImg(compBottomBanners))}
                  </div>
                </Col>
              </section>
            </>
          ) : null}
        </Stack>
      </div>
    </>
  );
};

export default Home;
