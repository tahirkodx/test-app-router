import LaptopSpec from "@/components/Laptop/Compare/LaptopSpec";
import LaptopHeader from "@/components/Laptop/LaptopHeader";
import { ProductAPI } from "@/custom/utils/actions";
import _ from "lodash";
import Head from "next/head";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Col, Image, Row, Spinner, Stack } from "react-bootstrap";
import { FaHome } from "react-icons/fa";
import Swal from "sweetalert2";
import styles from "@/styles/laptop/ComparePage.module.scss";
import LaptopCompareCard from "@/components/Laptop/Compare/LaptopCompareCard";
import { nanoid } from "nanoid";
import { useTheme } from "@/store/ThemeContext";

const Home = () => {
  const params = useParams();
  const router = useRouter();
  const [pageIds, setPageIds] = useState("");
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;
  let ProductsIds = pageIds.split(",");
  let ProductsIdsJoin = ProductsIds.join(",");
  let ProductIDs = ProductsIdsJoin;
  const [laptops, setLaptops] = useState([]);
  const [specifications, setSpecifications] = useState([]);
  const [initSet, setInitSet] = useState(false);
  const [specSet, setSpecSet] = useState(false);

  let ProductId = 0;
  ProductId = Number(ProductsIds[0]);

  useEffect(() => {
    let PIDs: any = params?.ids;
    if (PIDs !== undefined && PIDs.length > 0) {
      if (isNaN(PIDs)) {
        try {
          PIDs = PIDs.replace(".", "").replace("aspx", "").trim();
        } catch (e) {
          router.push("/");
        }
      }
      setPageIds(PIDs);
    }
  }, [params]);

  useEffect(() => {
    if (pageIds !== undefined && pageIds.length > 0) {
      console.log("pageIds", pageIds);
      if (ProductId !== 0 && isNaN(ProductId)) {
        router.push("/");
      } else {
        const fetchData = async () => {
          const prods = await ProductAPI.getLaptopByIds({ pageIds });
          let products = prods?.result;

          if (products) {
            setLaptops(products);
          }
          setInitSet(true);
        };

        const getSpecification = async () => {
          const specs = await ProductAPI.getLaptopSpecifications({ pageIds });
          let specsAll = specs?.result;

          if (specsAll) {
            setSpecifications((prevSpec) => {
              prevSpec = specsAll;
              return specsAll;
            });
          }
          setSpecSet(true);
        };

        fetchData();
        getSpecification();
      }
    }
  }, [pageIds]);

  const removeCompare = (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't to delete item from compare!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setLaptops((prevLaptops) => {
          return _.filter(prevLaptops, (laptop) => {
            return laptop.NPID !== productId;
          });
        });
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your item has been deleted",
          showConfirmButton: false,
          timer: 1500,
        });
        ProductsIds = _.filter(ProductsIds, (ids) => {
          return ids !== productId;
        });
      }
    });
  };

  return (
    <>
      <Head>
        <title itemProp="name" lang="en">
          Compare
        </title>
      </Head>
      <LaptopHeader />

      <div
        className={`
          ${darkMode ? `bg-dark` : ``} 
          py-3 py-xxl-4 position-relative z-index-1
        `}
      >
        <Col md={{ span: 10, offset: 1 }}>
          <div className="p-2 p-sm-3">
            <div className="d-flex gap-2 gap-sm-3 justify-content-center flex-wrap">
              {!initSet && (
                <Row className="w-100 p-5 text-center justify-content-center">
                  <Spinner animation="border" role="status" variant="secondary">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </Row>
              )}
              {laptops !== undefined &&
                laptops.length > 0 &&
                _.map(laptops, (laptop) => {
                  return (
                    <section className={styles.CompareSection} key={nanoid(6)}>
                      <Stack className="gap-2 gap-sm-3">
                        <LaptopCompareCard
                          BrandImage={laptop.BrandImage}
                          Brand={laptop.Brand}
                          ProductImage={
                            `https://www.evetech.co.za/` + laptop.ImageUrl
                          }
                          ProductName={laptop.Name}
                          Price={laptop.Price}
                          OldPrice={laptop.OldPrice}
                          ShippingCost={laptop.ShipCost}
                          StockStatus={laptop.StockStatus}
                          ReviewCount={laptop.ReviewCount}
                          ProductId={laptop.NPID}
                          onRemoveCompare={removeCompare}
                        />
                        <div className={`${styles.ProductDetails} text-start`}>
                          {!specSet && (
                            <Row className="w-100 p-5 text-center justify-content-center">
                              <Spinner
                                animation="border"
                                role="status"
                                variant="warning"
                                className="text-center"
                              >
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </Spinner>
                            </Row>
                          )}
                          {laptops !== undefined &&
                            laptops.length > 0 &&
                            specSet && (
                              <LaptopSpec
                                Specs={_.filter(
                                  specifications,
                                  (specification) => {
                                    return specification.pid === laptop.NPID;
                                  }
                                )}
                              />
                            )}
                        </div>
                      </Stack>
                    </section>
                  );
                })}
            </div>
            {initSet && laptops.length === 0 && (
              <Row>
                <div
                  className={`
                    ${
                      darkMode
                        ? `bg-black text-light border-secondary border-opacity-75`
                        : `bg-light`
                    }
                    d-flex flex-column gap-2 gap-sm-3 justify-content-center align-items-center w-100 py-5 text-center shadow rounded overflow-hidden mb-2 border bg-gradient
                  `}
                >
                  <Image
                    fluid
                    src="https://www.evetech.co.za/repository/ProductImages/no-data-01.png"
                    alt=""
                  />
                  <h1>No Data to compare</h1> <br></br>{" "}
                  <Link href="/mobile" className="btn btn-dark text-white">
                    {" "}
                    <FaHome /> Home{" "}
                  </Link>
                </div>
              </Row>
            )}
          </div>
        </Col>
      </div>
    </>
  );
};

export default Home;
