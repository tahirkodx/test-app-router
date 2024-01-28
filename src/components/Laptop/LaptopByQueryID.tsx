"use client";
import useMediaQuery from "@/custom/hooks/useMediaQuery";
import { ProductAPI } from "@/custom/utils/actions";
import _ from "lodash";
import { useEffect, useState } from "react";
import LaptopCard from "./LaptopCard";
import { nanoid } from "nanoid";
import NoPageData from "../NoPageData";
import LoadingSpinner from "../Spinner";

const LaptopByQueryID = (props: any) => {
  let cache = props.IsCache;
  let sort = props.Sort;
  const [cacheData, setCacheData] = useState(null);
  const [products, setProducts] = useState([]);
  const [compared, setCompared] = useState([]);
  const [comparedCount, setComparedCount] = useState(0);
  const [initProducts, setInitProduct] = useState(false);
  const isHD = useMediaQuery("(min-width: 1921px)");

  let pageActive = props.pageShow;

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
      const pdatas = await ProductAPI.byQueryId({
        queryId: props.QueryId,
        cache: cache,
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

    if (cache) {
      /* Retrive Data To Cache */
      /* getSingleCacheData(cacheName); */
      setCacheData(null);
      if (cacheData) {
        setProducts((prevProdData) => {
          prevProdData = cacheData;
          return prevProdData;
        });
      } else {
        fetchProducts();
      }
    } else {
      fetchProducts();
    }
  }, [cache, cacheData, props.QueryId]);

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
      {initProducts && products.length === 0 && (
        <>
          <div className="span-full">
            <NoPageData isProduct={true} className="span-full" />
          </div>
        </>
      )}
    </>
  );
};

export default LaptopByQueryID;
