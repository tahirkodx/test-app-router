"use client";
import { ProductAPI } from "@/custom/utils/actions";
import _ from "lodash";
import { useEffect, useState } from "react";
import NoPageData from "../NoPageData";
import LoadingSpinner from "../Spinner";
import { nanoid } from "nanoid";
import FPSLaptopCard from "./FPSLaptopCard";

const LaptopFPSByQueryID = (props: any) => {
  let sort = props.Sort;
  let cache = props.IsCache;
  const [cacheData, setCacheData] = useState(null);
  const [products, setProducts] = useState([]);
  const [initProducts, setInitProduct] = useState(false);
  let pageActive = props.pageShow;
  let filterRange = props.filterRange;
  let filterSort = props.filterSort;
  let isFilter = props.isFilter;
  let filterText = props.filterText;

  useEffect(() => {
    props.onSetShowCompare(false);

    const fetchProducts = async () => {
      const pdatas = await ProductAPI.byQueryId({
        queryId: props.QueryId,
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

      /* Range Filter Update */
      if (data.length > 0) {
        let FPSValue = _.map(data, (prod) => {
          return parseInt(prod.FPSScore);
        });

        let min = _.min(FPSValue);
        let max = _.max(FPSValue);

        if (min !== undefined && max !== undefined) {
          props.onRangeFilterUpdate(min, max, "FPS");
          props.onShowFitlerUpdate(true);
        }
      }
      /*  props.onRangeFilterUpdate = */

      /* props.textFilters */
      let textFilters = _.map(_.uniq(_.map(data, "Brand")), (brand) => {
        return {
          field: "Brand",
          slug: brand,
          cnt: _.filter(data, (prod) => {
            return prod.Brand === brand;
          }).length,
        };
      });
      props.onTextFilterUpdate(_.orderBy(textFilters, ["cnt"], ["desc"]));

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
      {initProducts && products.length === 0 && (
        <NoPageData isProduct={true} className="span-full" />
      )}
      {!initProducts && (
        <>
          <LoadingSpinner isEve={false} />
        </>
      )}
      {isFilter &&
        products &&
        _.orderBy(
          _.filter(
            _.filter(products, (product) => {
              return (
                product.FPSScore >= filterRange.min &&
                product.FPSScore <= filterRange.max
              );
            }),
            (prod) => {
              if (
                !_.isEmpty(filterText.filterBy) &&
                filterText.filterBy.slug !== "All"
              ) {
                let sKey = filterText.filterBy.field;
                if (_.get(prod, sKey) === filterText.filterBy.slug) return prod;
              } else {
                return prod;
              }
            }
          ),
          ["PriceIncVat"],
          [filterSort.sortBy === "1" ? "desc" : "asc"]
        ).map((product, ind) => {
          return (
            ind >= 28 * pageActive - 28 &&
            ind < 28 * pageActive && (
              <FPSLaptopCard Product={product} key={nanoid(7)} />
            )
          );
        })}

      {!isFilter &&
        products &&
        products.map(
          (product, ind) =>
            ind >= 28 * pageActive - 28 &&
            ind < 28 * pageActive && (
              <FPSLaptopCard Product={product} key={nanoid(7)} />
            )
        )}
    </>
  );
};

export default LaptopFPSByQueryID;
