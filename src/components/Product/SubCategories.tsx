"use client";
import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Link from "next/link";
import { ProductAPI } from "@actions";

var _ = require("lodash");

const SubCategories = (props: any) => {
  let cid: any = props.cid;
  const [subCategories, setSubCategories] = useState([]);

  const getSubCategoriesByCID = async (cid) => {
    const categories = await ProductAPI.getCategoriesByCID({ cid });

      if(categories !== undefined && categories !== null && categories.result !== undefined && categories.result !== null)
      {
        let data = categories.result;
        setSubCategories(data);
        props.onSubCatUpdate(
          _.sum(
            data.map((subcat:any) => {
              return subcat.TotalQty;
            })
          )
        );
      }
    };

  useEffect(() => {
    if (cid > 0) {
      getSubCategoriesByCID(cid);
    } 
  }, []);

  return _.orderBy(
    _.filter(subCategories, (category: any) => {
      if (category.TotalQty > 0) return category;
    }),
    ["TotalQty"],
    ["desc"]
  ).map((subCat: any, index:any) => {
    return (
      <Link
        key={nanoid(4)}
        href={
          "/PC-Components/" +
          _.join(
            _.filter(
              _.split(
                _.replace(
                  _.toLower(subCat.UrlText),
                  new RegExp(/[^a-zA-Z0-9 ]/g),
                  " "
                ),
                " "
              ),
              _.size
            ),
            "-"
          ).trim() +
          "-" +
          subCat.Categoryid +
          ".aspx"
        }
        title={subCat.name}
        className={`${
          subCat.name === "View All" ? "w-100 text-center" : null
        } text-decoration-none`}
      >
        <Button
          size="sm"
          variant={
            subCat.name === "View All"
              ? "primary"
              : "light border border-primary"
          }
          className="rounded-pill bg-gradient lh-1"
        >
          <small>
            <small>{subCat.name}</small>({subCat.TotalQty})
          </small>
        </Button>
      </Link>
    );
  });
};

export default SubCategories;
