"use client";
import { ProductAPI } from "@/custom/utils/actions";
import { useEffect, useState } from "react";
import LaptopCard from "./LaptopCard";
import { nanoid } from "nanoid";
import LoadingSpinner from "../Spinner";
import NoPageData from "../NoPageData";

const _=require("lodash");
const LaptopByMultipleSearchTerm = (props: any) => {
  let tags = props.Tags;
  let sort = props.Sort;
  const [products, setProducts] = useState([]);
  let pageActive = props.pageShow;
  let search = "";
  let CacheControl = props.CacheControl;
  let CacheName = props.CacheName;

  const [compared, setCompared] = useState([]);
  const [comparedCount, setComparedCount] = useState(0);
  const [initProducts, setInitProduct] = useState(false);

  const selectedCompare = (productId: any) => {
    if (compared.length < 4) {
      products.map((product, ind) => {
        if (product.npid === productId) {
          product.isCompared = true;
          setCompared((prevCompared) => {
            return [...prevCompared, product];
          });
        }
      });
      setProducts(products);
    }

    let comparedStat = products.filter((prod) => {
      if (prod.isCompared) return prod;
    });

    props.onComparedUpdated(comparedStat);
    setComparedCount(comparedStat.length);
  };

  const removedCompare = (productId: any) => {
    products.map((product, ind) => {
      if (product.npid === productId) {
        product.isCompared = false;

        setCompared((prevCompared) => {
          prevCompared = prevCompared.filter((prod, ind) => {
            if (prod.npid !== productId) return prod;
          });
          return prevCompared;
        });
      }
    });
    setProducts(products);
    let comparedStat = products.filter((prod) => {
      if (prod.isCompared) return prod;
    });

    props.onComparedUpdated(comparedStat);
    setComparedCount(comparedStat.length);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const pdatas = await ProductAPI.getLaptopByMultipleSearchTerm({
        query: search,
        cacheControl: CacheControl,
        cacheName: CacheName,
      });
      let data = pdatas?.result;
      props.onUpdateCount(data !== undefined ? data.length : 0);
      if (sort === 1) {
        data = _.sortBy(data, ["price"]);
      }
      setProducts((prevProductsData) => {
        prevProductsData = data;
        return prevProductsData;
      });
      setInitProduct(true);
    };
    fetchProducts();
  }, []);

  return (
    <>
      {!initProducts && (
        <>
          <LoadingSpinner isEve={false} className="h-100" />
        </>
      )}
      {products &&
        products.map(
          (product, ind) =>
            ind >= 28 * pageActive - 28 &&
            ind < 28 * pageActive && (
              <LaptopCard
                product={product}
                key={nanoid(5)}
                onSelectedCompare={selectedCompare}
                onRemovedCompare={removedCompare}
                ComparedCount={comparedCount}
              />
            )
        )}
      {initProducts && products.length === 0 && (
        <div className="span-full">
          {" "}
          <NoPageData isProduct={true} />{" "}
        </div>
      )}
    </>
  );
};

export default LaptopByMultipleSearchTerm;
