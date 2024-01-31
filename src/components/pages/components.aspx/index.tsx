import React from "react";
import Stack from "react-bootstrap/Stack";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useParams } from "next/navigation";
import styles from "@/styles/Components.module.scss";
import { useEffect } from "react";
import { useState, useContext } from "react";
import SubCategories from "@/components/Product/SubCategories";
import ComponentCard from "@/components/Product/ComponentCard";
import { Col } from "react-bootstrap";
import { nanoid } from "nanoid";
import ComponentsHeader from "@/components/Home/ComponentsHeader";
import AuthContext from "@/store/auth-context.js";
import Swal from "sweetalert2";
import AppFooter from "@/components/Footers/AppFooter";
import { Helmet } from "react-helmet";
import Router, { useRouter } from "next/navigation";
import { ProductAPI } from "@/custom/utils/actions";
import { useTheme } from "@/store/ThemeContext";

var _ = require("lodash");

const Components = (props: any) => {
  const params: any = useParams();
  const [categoryData, setCategoryData] = useState<any>({});
  const [categoryBriefData, setCategoryBriefData] = useState<any>({});
  const [compCategories, setCompCategories] = useState<any[]>([]);
  const [compBanners, setCompBanners] = useState<any>({});
  const [compTopBanners, setCompTopBanners] = useState("");
  const [compBottomBanners, setCompBottomBanners] = useState("");
  const [Categories, setCategories] = useState([]);
  const [Products, setProducts] = useState([]);
  const [subCatCount, setSubCatCount] = useState(0);
  const authCtx = useContext(AuthContext);
  const [showPageTopMsg, setShowPageTopMsg] = useState(true);
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  /* WishList */
  const [showWish, setShowWish] = useState(false);
  const [reloadWish, setReloadWish] = useState(false);
  const onWishClose = () => {
    setShowWish(false);
  };
  const AddToWishList = (product: any) => {
    if (authCtx.isLoggedIn) {
      /* Check First Product Exist or not */
      const chekWishList = async () => {
        // const wishList = await fetch
        //   (`/api/user/checkWishlistItem`, {
        //     method: "POST",
        //     headers: {
        //       Authorization: "Bearer " + authCtx.token,
        //       "Content-Type": "application/json",
        //       Accept: "application/json",
        //     },
        //     body: JSON.stringify({
        //       productId: product.ProductID,
        //       ptype: 2,
        //       uid: authCtx.user.id,
        //     }),
        //   })
        //   .then((res: any) => {
        //     res.json().then((chkWish: any) => {
        //       let wishChecked = chkWish.result[0];
        //       if (wishChecked.total > 0) {
        //         Swal.fire({
        //           position: "top-end",
        //           icon: "warning",
        //           title: "Item already exist to your wishlist",
        //           showConfirmButton: false,
        //           timer: 1500,
        //         });
        //         setShowWish(true);
        //       } else {
        //         const wishItemAdd = async () => {
        //           const wishAddResp = await fetch
        //             (`/api/user/addWishlistItem`, {
        //               method: "POST",
        //               headers: {
        //                 Authorization: "Bearer " + authCtx.token,
        //                 "Content-Type": "application/json",
        //                 Accept: "application/json",
        //               },
        //               body: JSON.stringify({
        //                 productId: product.ProductID,
        //                 ptype: 2,
        //                 uid: authCtx.user.id,
        //               }),
        //             })
        //             .then((res: any) => res.json());
        //           let addWish = wishAddResp.result;
        //           if (addWish.affectedRows !== undefined && addWish.affectedRows) {
        //             Swal.fire({
        //               position: "top-end",
        //               icon: "success",
        //               title: "Item Added To Wishlist.",
        //               showConfirmButton: false,
        //               timer: 1500,
        //             });
        //             setReloadWish(true);
        //             setShowWish(true);
        //           } else {
        //             Swal.fire({
        //               position: "top-end",
        //               icon: "error",
        //               title: "Item not able add to Wishlist. Try again!",
        //               showConfirmButton: false,
        //               timer: 1500,
        //             });
        //             setShowWish(true);
        //           }
        //         };
        //         wishItemAdd();
        //       }
        //     });
        //   });
      };

      chekWishList();
    } else {
      authCtx.onShowLogin(true);
    }
  };
  /* WishList */
  let CID: any = 0;
  CID = params?.cid;

  if (CID !== null && CID !== undefined && CID.split("-").length > 0) {
    CID.split("-").forEach((str: any) => {
      try {
        CID = parseInt(str.replace(".", "").replace("aspx", "").trim());
      } catch (e) {}
    });
  } else {
    try {
      CID = parseInt(CID.replace(".", "").replace("aspx", "").trim());
    } catch (e) {
      CID = 0;
    }
  }

  const RenderHeader = (props: any) => (
    <div dangerouslySetInnerHTML={{ __html: props.HTML }}></div>
  );
  const RenderFooter = (props: any) => (
    <span dangerouslySetInnerHTML={{ __html: props.HTML }}></span>
  );

  const setTitle = (title: any) => {
    const el: any = document.querySelector("title");
    if (el !== null) el.innerText = `${title}`;
  };

  const setDescription = (desc: any) => {
    const el: any = document.querySelector("meta[name='description']");
    el.setAttribute("content", desc);
  };

  useEffect(() => {
    const getCategoryDetails = async (catId: any) => {
      const cdatas = await ProductAPI.getCategoryDetails({ catId });
      // const cdatas = await fetch(`/api/getCategoryDetails/${catId}`, {
      //   method: "get",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Accept: "application/json",
      //   },
      // }).then((res: any) => res.json());
      if (
        cdatas !== null &&
        cdatas !== undefined &&
        cdatas.result !== null &&
        cdatas.result !== undefined &&
        cdatas.result.legth > 0
      ) {
        let data = cdatas.result[0];

        setCategoryData((prevCategoryData: any) => {
          prevCategoryData = data;
          return prevCategoryData;
        });
      }
    };

    const getComponentCategories = async () => {
      const compcdatas = await ProductAPI.getComponentCategories();
      // const compcdatas = await fetch(`/api/getComponentCategories`, {
      //   method: "get",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Accept: "application/json",
      //   },
      // }).then((res: any) => res.json());
      let data = compcdatas.result;

      setCompCategories((prevCompCategories) => {
        prevCompCategories = data;
        return prevCompCategories;
      });
    };

    const getComponentTopBanners = async () => {
      const bannerData = await ProductAPI.getComponentTopBanners();
      // const bannerData = await fetch(`/api/getComponentTopBanners`, {
      //   method: "get",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Accept: "application/json",
      //   },
      // }).then((res: any) => res.json());
      if (
        bannerData !== null &&
        bannerData !== undefined &&
        bannerData.result !== null &&
        bannerData.result !== undefined &&
        bannerData.result.length > 0
      ) {
        let data = bannerData.result[0];

        let indx = data.html.indexOf("<!--This is a second-->");
        setCompTopBanners(data.html.substring(0, indx));

        setCompBottomBanners(data.html.substring(indx));

        setCompBanners(data);
      }
    };

    const getCategoriesByCID = async (CID: any) => {
      const categories = await ProductAPI.getCategoriesByCID({ CID });
      // const categories = await fetch(`/api/getCategoriesByCID/${CID}`, {
      //   method: "get",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Accept: "application/json",
      //   },
      // }).then((res: any) => res.json());

      let data = categories.result;

      setCategories(data);
    };

    const getCategoryDetailsBrief = async (catId: any) => {
      const cdatas = await ProductAPI.getCategoryDetailsBrief({ catId });
      // const cdatas = await fetch(`/api/getCategoryDetailsBrief/${catId}`, {
      //   method: "get",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Accept: "application/json",
      //   },
      // }).then((res: any) => res.json());
      let data = cdatas.result[0];

      setCompTopBanners(data.TopDes);
      setCompBottomBanners(data.BottomDes);
      setTitle(data.Pagetitle);
      setDescription(data.MetaDes);
      setCategoryBriefData((prevCategoryData: any) => {
        prevCategoryData = data;
        return prevCategoryData;
      });
    };

    const getProductsByCategoryIDS = async (catId: any) => {
      const cdatas = await ProductAPI.getProductsByCategoryIDS({ catId });
      // const cdatas = await fetch(`/api/getProductsByCategoryIDS/${catId}`, {
      //   method: "get",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Accept: "application/json",
      //   },
      // }).then((res: any) => res.json());

      let data = cdatas.result;

      setProducts((prevProducts) => {
        prevProducts = data;
        return prevProducts;
      });
    };

    // CID > 0 || CID === undefined
    if (CID !== null && CID !== undefined && CID > 0) {
      getCategoryDetails(CID);
      getCategoriesByCID(CID);
      getCategoryDetailsBrief(CID);
      getProductsByCategoryIDS(CID);
    } else {
      getCategoryDetails(0);
      getComponentCategories();
      getComponentTopBanners();
    }
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [CID]);

  const subCatUpdate = (count: any) => {
    setSubCatCount(count);
  };

  const catCardsCols = (amount: any) => {
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

  const formatHTMLImg = (overview: any) => {
    try {
      let parser = new DOMParser();
      let doc: any = parser.parseFromString(overview, "text/html");

      let images = doc.firstChild.getElementsByTagName("img");

      for (let i = 0; i < images.length; i++) {
        images[i].classList.add("img-fluid");
      }
      return doc.documentElement.innerHTML;
    } catch (ex) {
      return overview;
    }
  };
  useEffect(() => {}, [compTopBanners]);

  return (
    <>
      {categoryData !== undefined ? (
        <Helmet>
          <title itemProp="name" lang="en">
            {categoryData.TitleText}
          </title>
          <meta name="description" content={categoryData.MetaDescription} />
          <meta name="keywords" content={categoryData.Keyword} />
        </Helmet>
      ) : null}

      <ComponentsHeader showpagetopmsg={showPageTopMsg} />
      <div
        className={`
          ${darkMode ? `bg-dark evetechDark` : ``}
          position-relative z-index-1
        `}
      >
        <Stack className="pt-3 pb-4 gap-2 gap-md-3">
          <section>
            <Col xs={12} md={{ span: 10, offset: 1 }} className="p-3 p-md-0">
              <div
                className={`
                  ${darkMode ? `text-light` : ``} 
                  d-block cols-12 gap-2 gap-sm-3 comp-top-section
                `}
              >
                <RenderHeader HTML={formatHTMLImg(compTopBanners)} />
              </div>
            </Col>
          </section>
          <section>
            <Col xs={12} md={{ span: 10, offset: 1 }} className="px-3 px-md-0">
              {CID !== 0 && (
                <div
                  className={`${catCardsCols(
                    Categories.length
                  )} d-grid gap-2 gap-sm-3`}
                >
                  {_.filter(Categories, (category: any) => {
                    if (category.TotalQty > 0) return category;
                  }).map((category: any, index: any) => {
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
                            className={`${styles.Categories__ImageParent} p-3 d-flex align-items-center justify-content-center flex-shrink-0`}
                          >
                            <Image
                              fluid
                              className={`${styles.Categories__Image}`}
                              src={
                                `https://www.evetech.co.za/repository/components/` +
                                category.ImageFile
                              }
                              width="100"
                              height={100}
                              alt={category.name}
                            />
                          </div>
                          <div className="w-100 h-100">
                            <div className="px-3 py-2 bg-info fw-2 lh-1 w-100">
                              {category.name} ({category.TotalQty})
                            </div>
                            <div className="p-3 d-flex flex-wrap gap-1 justify-content-center align-content-start">
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
              {CID === 0 && (
                <div
                  className={`${styles.Cards} d-grid cols-2 cols-md-3 cols-lg-4 cols-1700-5 gap-2 gap-sm-3 gap-xxl-5`}
                >
                  {_.filter(compCategories, (category: any) => {
                    if (category.parentid === 0) return category;
                  }).map((category: any, index: any) => {
                    return (
                      <div
                        key={nanoid(5)}
                        className={`${styles.Child} ${styles.HoverGrow} position-relative`}
                      >
                        <Card
                          className={`
                            ${styles.Card}
                            ${
                              darkMode
                                ? `bg-black bg-opacity-50 border-info border-opacity-50 border-opacity-25`
                                : ``
                            } 
                            overflow-hidden d-grid shadow
                          `}
                        >
                          <div className="p-3 d-flex flex-wrap gap-1 justify-content-center align-content-start">
                            {_.orderBy(
                              _.filter(
                                _.sortBy(compCategories, ["parentid", "catid"]),
                                (cat: any) => {
                                  if (
                                    cat.parentid === category.id &&
                                    cat.priority > 0
                                  )
                                    return cat;
                                }
                              ),
                              ["catid"],
                              ["desc"]
                            ).map((subCat: any, index: any) => {
                              return subCat.cat !== "View All" ? (
                                <Button
                                  size="sm"
                                  variant={darkMode ? `dark` : `light`}
                                  className="rounded-pill bg-gradient lh-1 border border-primary"
                                  onClick={() => {
                                    router.push("/" + subCat.url);
                                  }}
                                  key={nanoid(4)}
                                >
                                  <small>
                                    <small>{subCat.cat}</small>
                                  </small>
                                </Button>
                              ) : (
                                <Button
                                  size="sm"
                                  variant="primary"
                                  className="rounded-pill bg-gradient lh-1"
                                  onClick={() => {
                                    router.push("/" + subCat.url);
                                  }}
                                  key={nanoid(4)}
                                >
                                  <small>
                                    <small>View all</small>
                                  </small>
                                </Button>
                              );
                            })}
                          </div>
                          <div
                            className={`${styles.Card__ColorBar} p-1 position-relative overflow-hidden`}
                          ></div>
                        </Card>
                        <div
                          className={`${styles.Card__Image} position-absolute top-0 start-50 translate-middle-x bg-light rounded-circle overflow-hidden border shadow`}
                        >
                          <Image
                            src={`https://www.evetech.co.za/` + category.imgurl}
                            alt={category.cat}
                          />
                        </div>
                      </div>
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
              {Products?.length > 0 && (
                <div
                  className={`
                  ${styles.StickyHeader}
                  ${darkMode ? `bg-dark` : `bg-light`} 
                  position-sticky z-index-1 bg-light my-2 pt-1 mb-3
                `}
                >
                  <h5 className="text-left text-secondary m-0 px-3 my-2">
                    {categoryBriefData.Heading} ({Products.length})
                  </h5>{" "}
                  <hr className="m-0"></hr>
                </div>
              )}
              <div className="px-3 px-md-0">
                <div className="d-grid cols-2 cols-md-3 cols-lg-4 cols-1700-5 gap-2 gap-sm-3">
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
                  {Products?.map((product) => {
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

          {compBottomBanners !== "undefined" && compBottomBanners.length > 0 ? (
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
                <RenderHeader
                  HTML={formatHTMLImg(compBottomBanners)}
                  className="comp-bottom-section"
                />
              </Col>
            </section>
          ) : null}
        </Stack>
      </div>
    </>
  );
};

export default Components;
