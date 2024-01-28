"use client";
import { ProductAPI } from "@/custom/utils/actions";
import _ from "lodash";
import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import LaptopCard from "./LaptopCard";
import NoPageData from "../NoPageData";
import LoadingSpinner from "../Spinner";

const LaptopByAttributeID = (props: any) => {
  let ctrlId = props.CtrlId;
  let sort = props.Sort;
  let cacheControl = props.CacheControl;
  let cacheName = props.CacheName;
  const [products, setProducts] = useState([]);
  let pageActive = props.pageShow;

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
      const pdatas = await ProductAPI.getLaptopByAttributeId({ ctrlId });

      if (pdatas.result !== undefined && pdatas.result !== null) {
        let data = pdatas?.result[0];
        props.onUpdateCount(data !== undefined ? data.length : 0);

        if (sort === 1) {
          data = _.sortBy(data, ["price"]);
        }

        setProducts((prevProductsData) => {
          prevProductsData = data;
          return prevProductsData;
        });
      }
      setInitProduct(true);
    };

    fetchProducts();
  }, []);

  return (
    <>
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
      {!initProducts && products.length === 0 && (
        <>
          <LoadingSpinner isEve={false} />
        </>
      )}
      {initProducts && products.length === 0 && <NoPageData isProduct={true} />}
    </>
  );
};

export default LaptopByAttributeID;
