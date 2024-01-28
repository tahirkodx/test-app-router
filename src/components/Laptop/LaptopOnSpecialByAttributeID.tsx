"use client";
import { ProductAPI } from "@/custom/utils/actions";
import { useEffect, useState } from "react";
import LoadingSpinner from "../Spinner";
import LaptopCard from "./LaptopCard";
import { nanoid } from "nanoid";
import NoPageData from "../NoPageData";

const LaptopOnSpecialByAttributeID = (props: any) => {
  let ctrlId = props.CtrlId;
  let sort = props.Sort;
  let cacheControl = props.CacheControl;
  let cacheName = props.CacheName;
  let pageActive = props.pageShow;

  const [products, setProducts] = useState<any[]>([]);

  const [compared, setCompared] = useState<any[]>([]);
  const [comparedCount, setComparedCount] = useState<any>(0);
  const [initProducts, setInitProduct] = useState<any>(false);

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
      const pdatas = await ProductAPI.getLaptopSpecialByAttributeId({ ctrlId });
      let data = pdatas?.result;
      props.onUpdateCount(
        data !== undefined && data !== null ? data.length : 0
      );
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
          <LoadingSpinner className="h-100" isEve={false} />
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
      {initProducts && products !== undefined && products === null ? (
        <NoPageData isProduct={true} />
      ) : null}
    </>
  );
};

export default LaptopOnSpecialByAttributeID;
