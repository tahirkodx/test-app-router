import React, { useEffect, useState } from "react";
import ComponentsHeader from "@/components/Home/ComponentsHeader";
import { Col, Container, Image, Row } from "react-bootstrap";
// import AppFooter from "../../../Layouts/CompFooter";
import ComponentDetailBanners from "@/components/Banners/ComponentDetailBanners";
import styles from "@/styles/PCByCategory.module.scss";
import PCCards from "@/components/Main/Controls/PCCards";
import { nanoid } from "nanoid";
import Paginator from "@/components/Paginator/Paginator";
import { Helmet } from "react-helmet";
import { ProductAPI } from "@/custom/utils/actions";
import { useTheme } from "@/store/ThemeContext";
import Heading from "@/components/Heading";

const Workstations = () => {
  const [showPageTopMsg, setShowPageTopMsg] = useState(true);
  const [pcount, setPcount] = useState(0);
  const [productData, setProductData] = useState([]);
  const [category, setCategory] = useState<any>({});
  const [initInfo, setInitInfo] = useState<any>(false);

  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  useEffect(() => {
    const PCByCategoryID = async () => {
      const prods = await ProductAPI.PCByCategoryID({
        categoryParams: {
          categoryID: 62,
          ProductCount: null,
          CategoryName: "",
          CategoryDes: "",
          Keywords: "",
          Title: "",
          MetaDes: "",
          SortOrder: 2,
          StartValue: 0,
          EndValue: 9999999,
        },
      });
      // const prods = await fetch(`/api/PCByCategoryID`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Accept: "application/json",
      //   },
      //   body: JSON.stringify({
      //     categoryParams: {
      //       categoryID: 62,
      //       ProductCount: null,
      //       CategoryName: "",
      //       CategoryDes: "",
      //       Keywords: "",
      //       Title: "",
      //       MetaDes: "",
      //       SortOrder: 2,
      //       StartValue: 0,
      //       EndValue: 9999999,
      //     },
      //   }),
      // }).then((res) => res.json());
      if (prods !== undefined && prods.result !== undefined) {
        let categoryData = prods.result;
        categoryData.map((prod: any) => {
          prod.product_type = 1;
        });
        setPcount(categoryData !== undefined ? categoryData.length : 0);
        setProductData(categoryData);
      }
    };

    const getCategoryInfo = async () => {
      const categoryData = await ProductAPI.GetCategoryById({ id: 62 });
      // const categoryData = await fetch(`/api/GetCategoryById/62`, {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Accept: "application/json",
      //   },
      // }).then((res) => res.json());

      if (categoryData != undefined && categoryData.result !== undefined) {
        let categoryInfo = categoryData.result[0];
        setCategory(categoryInfo);
      }
    };

    PCByCategoryID();
    getCategoryInfo();
    setInitInfo(true);
  }, []);

  return (
    <>
      <Helmet>
        <title itemProp="name" lang="en">
          {category.TitleText}
        </title>
        <link
          rel="canonical"
          href="https://www.evetech.co.za/workstations.aspx"
        />
        <meta name="description" content={category.MetaDescription} />
        <meta name="keywords" content={category.keyword} />
      </Helmet>
      <ComponentsHeader showpagetopmsg={showPageTopMsg} />
      <header className="bg-dark text-light p-3">
        <Col md={{ span: 10, offset: 1 }}>
          <div className="d-grid cols-12 gap-2 gap-sm-3">
            <div className="span-12 span-xl-6 bg-black align-items-center d-grid">
              <Image
                src="https://www.evetech.co.za/repository/ProductImages/nvidia-Workstations-980px-v01.jpg"
                alt="Workstations Desktop PCs"
                className="w-100"
              />
            </div>
            <div className="span-12 span-xl-6 d-grid align-content-center">
              <h1>
                <span style={{ color: "#76b900" }}>Workstations </span>
                <span>Desktop PCs</span>
              </h1>
              <p className="m-0">
                High performance, silence and GPU optimised is that our Custom
                built Workstation Desktop PCs are all about. Designed to handle
                a wide range of technical, professional and scientific
                applications. Whether you&apos;re a designer, artist, editor or
                a developer you can have the confidence that your custom-built
                workstation Desktop from Evetech will crush any application or
                task that you throw at it. Designed to handle a wide range of
                technical, professional and scientific applications.
              </p>
            </div>
            <div
              className="span-12 span-md-6 span-xl-4 d-grid gap-2"
              style={{ gridAutoRows: "min-content" }}
            >
              <div className="position-relative bg-black w-100">
                <Image
                  src="https://www.evetech.co.za/repository/ProductImages/Quatro-PC-Builds-layout_031.jpg"
                  alt="Video Editing Workstations"
                  className="w-100"
                />
                <div className="position-absolute top-0 left-0 w-100 h-100 d-grid align-content-center p-2 p-sm-3">
                  <h2 className="w-75 fs-4 lh-1" style={{ color: "#76b900" }}>
                    Photo / Video Editing Workstations
                  </h2>
                </div>
              </div>
              <p className="m-0">
                In this day and age, most people own a smartphone that has a
                high definition camera. Remarkable technology allows people to
                capture moments throughout their day with ease. Whether you are
                looking for a desktop to store your photos, videos, and other
                content to create shareable albums, or you are looking for a
                desktop with a little more horsepower to create digital art,
                edit your photographs and videos. Our desktop workstationa PCs
                are one of a kind and will ensure that every adventure will be a
                beautiful memory.
              </p>
            </div>
            <div
              className="span-12 span-md-6 span-xl-4 d-grid gap-2"
              style={{ gridAutoRows: "min-content" }}
            >
              <div className="position-relative bg-black">
                <Image
                  src="https://www.evetech.co.za/repository/ProductImages/Quatro-PC-Builds-layout_041.jpg"
                  alt="CAD Workstations "
                  className="w-100"
                />
                <div className="position-absolute top-0 left-0 w-100 h-100 d-grid align-content-center p-2 p-sm-3">
                  <h2 className="w-75 fs-4 lh-1" style={{ color: "#76b900" }}>
                    CAD Workstations
                  </h2>
                </div>
              </div>
              <p className="m-0">
                There is undoubtedly a unique distinction between an average
                office PC to a hardware packed workstation. An office PC is
                capable of handling the essentials like; Microsoft Office and
                programs similar. Whereas workstations have been specifically
                designed to handle some of the toughest workloads to meet the
                performance needed, compatibility, reliability, and that it
                meets the requirements for extremely demanding 3D CAD and
                visualisation applications that may be too taxing on other PCs.
                Our CAD Workstations will rise up to any challenge and will
                ensure that you get more out of your workload
              </p>
            </div>
            <div
              className="span-12 span-xl-4 d-grid gap-2"
              style={{ gridAutoRows: "min-content" }}
            >
              <div className="position-relative bg-black">
                <Image
                  src="https://www.evetech.co.za/repository/ProductImages/Quatro-PC-Builds-layout_051.jpg"
                  alt="Quatro PC Builds"
                  className="w-100"
                />
                <div className="position-absolute top-0 left-0 w-100 h-100 d-grid align-content-center p-2 p-sm-3">
                  <h2 className="w-75 fs-4 lh-1" style={{ color: "#76b900" }}>
                    Rendering Workstations
                  </h2>
                </div>
              </div>
              <p className="m-0">
                We design our Graphics Workstations, Rendering, Scientific and
                Visualisation Workstations around the varying needs of our
                customers. We have a complete range that will suit high-end
                graphics applications, Animation CAD/CAM, 3D Modelling, DTP,
                Image Processing and Digital Content Creation and many more
                applications.
              </p>
            </div>
          </div>
        </Col>
      </header>
      <Container
        fluid
        className={`${darkMode ? `evetechDark bg-dark text-light` : ``} py-4`}
      >
        <Row>
          <Col lg={10}>
            <div
              className={`
                ${styles.Pagination} 
                ${darkMode ? `bg-dark` : ``}
                d-flex justify-content-between flex-wrap align-items-center bg-light rounded-bottom p-2 border-bottom gap-2
              `}
            >
              <Heading level={2} className={`fs-6 m-0`}>
                {category.name} ({pcount})
              </Heading>
              {pcount === 0 ? null : <Paginator />}
            </div>
            <Row>
              <Container fluid className={`py-3`}>
                <div
                  className={`d-grid cols-2 cols-md-3 cols-lg-3 cols-xxl-4 cols-2000-5 gap-2 gap-md-3 gap-xxl-5 mb-3`}
                >
                  {productData &&
                    productData.map((product, ind) => (
                      <PCCards product={product} key={nanoid(5)} />
                    ))}
                </div>
              </Container>
            </Row>
          </Col>
          <Col lg={2}>
            {/* Temporary */}
            <ComponentDetailBanners />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Workstations;
