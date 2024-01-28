"use client";
import { ProductAPI } from "@/custom/utils/actions";
import { useTheme } from "@/store/ThemeContext";
import _ from "lodash";
import { nanoid } from "nanoid";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

const SubCategories = (props: any) => {
  let cid = props.cid;
  const [subCategories, setSubCategories] = useState([]);
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  useEffect(() => {
    const getSubCategoriesByCID = async () => {
      const categories = await ProductAPI.getCategoriesByCID({ cid });
      let data = categories?.result;

      if (data) {
        console.log("data", data);
        setSubCategories(data);
        props.onSubCatUpdate(
          _.sum(
            data.map((subcat) => {
              return subcat.TotalQty;
            })
          )
        );
      }
    };

    if (cid !== undefined && cid > 0) {
      getSubCategoriesByCID();
    } else {
    }
  }, []);

  useEffect(() => {
    console.log("subCategories", subCategories);
  }, [subCategories]);

  return _.orderBy(
    _.filter(subCategories, (category) => {
      if (category.TotalQty > 0) return category;
    }),
    ["TotalQty"],
    ["desc"]
  ).map((subCat, index) => {
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
              : `${darkMode ? `dark` : `light`}`
          }
          className="rounded-pill bg-gradient lh-1 border border-primary"
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
