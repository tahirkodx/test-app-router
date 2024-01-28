import React from "react";
import { customAlphabet } from "nanoid";
import { useEffect } from "react";
import Bundle from "@/components/Product/Laptop/Bundle";

const nanoid = customAlphabet("1234567890abcdef", 10);
var _ = require("lodash");

const LaptopBundles = (props:any) => {
  const bundles = props.Bundles;
  let allSet = false;

  let baseBundle:any = null;
  let prodsBundle = null;
  let bundlesSet = [
    {
      BundleID: 1,
      BundleTitle: "Micosoft Office::",
      Bundles: null,
      SelectedOption: null,
      OptionPrice: 0,
      DefaultImage:
        "https://www.evetech.co.za/repository/config/microsoft-2022-v1.jpg",
    },
    {
      BundleID: 2,
      BundleTitle: "Antivirus::",
      Bundles: null,
      SelectedOption: null,
      OptionPrice: 0,
      DefaultImage: "",
    },
    {
      BundleID: 5,
      BundleTitle: "Carry BAG:: ",
      Bundles: null,
      SelectedOption: null,
      OptionPrice: 0,
      DefaultImage: "",
    },
    {
      BundleID: 3,
      BundleTitle: "External HDD:: ",
      Bundles: null,
      SelectedOption: null,
      OptionPrice: 0,
      DefaultImage:
        "https://www.evetech.co.za/repository/config/External-hdd-01.jpg",
    },
    {
      BundleID: 4,
      BundleTitle: "Mouse:: ",
      Bundles: null,
      SelectedOption: null,
      OptionPrice: 0,
      DefaultImage:
        "https://www.evetech.co.za/repository/config/Mouse1.jpg",
    },
    {
      BundleID: 6,
      BundleTitle: "Headphones:: ",
      Bundles: null,
      SelectedOption: null,
      OptionPrice: 0,
      DefaultImage:
        "https://www.evetech.co.za/repository/config/Headset.jpg",
    },
    {
      BundleID: 7,
      BundleTitle: "Speakers:: ",
      Bundles: null,
      SelectedOption: null,
      OptionPrice: 0,
      DefaultImage:
        "https://www.evetech.co.za/repository/ProductImages/speakers-generic-300px-v01.jpg",
    },
    {
      BundleID: 8,
      BundleTitle: "Monitors:: ",
      Bundles: null,
      SelectedOption: null,
      OptionPrice: 0,
      DefaultImage:
        "https://www.evetech.co.za/repository/ProductImages/Monitor-300px-v01.jpg",
    },
  ];
  let finalBundles = null;
  let officeBundle:any = null;

  const selectBundleItem = (bundleItem:any) => {
    props.onBundleItemsSeleceted(bundleItem);
  };

  if (bundles && !allSet) {
    baseBundle = bundles[0];
    if (bundles.length === 2) {
      prodsBundle = bundles[1];
    }

    _.map(
      _.filter(
        _.map(_.uniq(_.map(baseBundle, "BundleID")), (n) => {
          return _.filter(
            baseBundle,
            (bundle:any) => bundle.BundleID === n && (n === 1 || n === 2 || n === 5)
          );
        }),
        (filter:any) => filter.length > 0
      ),
      (fbundles:any) => {
        let bundleID = 0;
        let maxPrice = 0;
        const ffBundles = fbundles.map((fbundle:any) => {
          let bundle:any = {};
          bundle["BundleID"] = fbundle.BundleID;
          bundleID = fbundle.BundleID;
          bundle["Title"] = fbundle.Title;
          let price =
            fbundle.Price.split("=").length > 0
              ? parseFloat(fbundle.Price.split("=")[1])
              : 0;
          bundle["Price"] = price;
          bundle["ImageUrl"] =
            fbundle.Price.split("~")[0].split("!").length > 0
              ? "https://www.evetech.co.za/" +
                fbundle.Price.split("~")[0].split("!")[1]
              : "";
          bundle["GalleryId"] = fbundle.Price.split("!")[0];
          bundle["ImageId"] = fbundle.ImageID;
          bundle["ProductId"] = fbundle.nPid;
          bundle["IsDefault"] = price > 0 ? 0 : 1;
          bundle["IsSelected"] = parseInt(bundle["IsDefault"]) ? 1 : 0;
          maxPrice = maxPrice < price ? price : maxPrice;
          bundle["Status"] = fbundle.Status;
          bundle["OptionId"] = fbundle.id;
          return bundle;
        });

        _.map(bundlesSet, (bundle:any) => {
          if (
            bundle.BundleID === bundleID &&
            !(maxPrice === 0 && ffBundles.length === 1)
          )
            bundle.Bundles = ffBundles;
          return bundle;
        });

        return ffBundles;
      }
    );

    if (prodsBundle) {
      _.map(
        _.filter(
          [
            _.filter(
              prodsBundle,
              (bundle:any) => bundle.parentiid === 107 || bundle.parentiid === 108
            ),
            _.map(
              _.filter(prodsBundle, (bundle:any) => bundle.parentiid === 124),
              (item:any) => {
                item["BundleID"] = 3;
                return item;
              }
            ),
            _.map(
              _.filter(prodsBundle, (bundle:any) => bundle.parentiid === 117),
              (item:any) => {
                item["BundleID"] = 4;
                return item;
              }
            ),
            _.map(
              _.filter(
                prodsBundle,
                (bundle:any) => bundle.parentiid === 100 || bundle.parentiid === 318
              ),
              (item:any) => {
                item["BundleID"] = 6;
                return item;
              }
            ),
            _.map(
              _.filter(prodsBundle, (bundle:any) => bundle.parentiid === 87),
              (item:any) => {
                item["BundleID"] = 8;
                return item;
              }
            ),
          ],
          (item:any) => item.length > 0
        ),
        (fbundles:any) => {
          let bundleID = 0;
          const ffBundles = fbundles.map((fbundle:any, ind:any) => {
            let bundle:any = {};
            bundle["BundleID"] = fbundle.BundleID;
            bundleID = fbundle.BundleID;
            bundle["Title"] =
              fbundle.ConfigText.trim().length > 0
                ? fbundle.ConfigText.trim()
                : fbundle.partname;
            bundle["Price"] =
              parseFloat(fbundle.price) > 0
                ? parseFloat(fbundle.price)
                : fbundle.Price_Vat;
            bundle["ImageUrl"] =
              "https://www.evetech.co.za/" +
              (fbundle.configImage.trim().length > 0
                ? fbundle.configImage.trim()
                : fbundle.ProductImage);
            bundle["GalleryId"] = 0;
            bundle["ImageId"] = fbundle.ImageID;
            bundle["ProductId"] = fbundle.productid;
            bundle["IsDefault"] = 0;
            bundle["IsSelected"] = 0;
            bundle["Status"] = 1;
            bundle["OptionId"] = 0;
            return bundle;
          });

          _.map(bundlesSet, (bundle:any) => {
            if (bundle.BundleID === bundleID) bundle.Bundles = ffBundles;
            return bundle;
          });
          return ffBundles;
        }
      );
    }

    bundlesSet = _.filter(bundlesSet, (set:any) => set.Bundles !== null);

    bundlesSet = _.map(bundlesSet, (bundleSet:any) => {
      /* filter bundle for default */
      let defaultItem = _.filter(
        bundleSet.Bundles,
        (item:any) => item.IsDefault === 1
      );
      if (defaultItem.length === 0) {
        bundleSet.Bundles = [
          {
            BundleID: bundleSet.BundleID,
            Title: "Not Included",
            Price: bundleSet.OptionPrice,
            ImageUrl: bundleSet.DefaultImage,
            GalleryId: 0,
            ImageId: 0,
            ProductId: 0,
            IsDefault: 1,
            IsSelected: 1,
            Status: 1,
            OptionId: 0,
          },
          ...bundleSet.Bundles,
        ];
      }

      return bundleSet;
    });

    finalBundles = bundlesSet.map((bundle, ind) => {
      return (
        <Bundle
          bundle={bundle}
          key={nanoid(4)}
          isOpen={true}
          onBundleSelection={selectBundleItem}
          selectedBundleItems={props.selecetedItems}
        />
      );
    });

    officeBundle = _.find(bundlesSet, (bundle:any) => {
      return bundle.BundleID === 1;
    });

    allSet = true;
  }

  useEffect(() => {
    if (officeBundle) props.onOfficeBundleSet(officeBundle);
  }, [officeBundle]);

  return <div id="bundlesDiv">{finalBundles}</div>;
};

export default LaptopBundles;
