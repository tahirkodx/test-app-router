import React from "react";
import { useState } from "react";
import { customAlphabet } from "nanoid";
import { useEffect } from "react";
import Swal from "sweetalert2";
import styles from "@/styles/Bundle.module.scss";
import BundleOptions from "@/components/Product/PC/BundleOptions";

const nanoid = customAlphabet("12345ab67890cdef", 10);
var _ = require("lodash");

const PCBundles = (props: any) => {
  let bundles = props.Bundles;
  let optionDetails = props.OptionsDetails;
  let slctBundleItems = props.selecetedItems;
  let bundleOptions = null;
  const [isBundlesSet, setIsBundlesSet] = useState(false);

  const selectBundleItem = (bundleItem: any) => {
    /* Standard PC Case Changed Then Switch Standard  Powersupply */
    try {
      if (bundleItem.CategoryId.includes(70)) {
        let powerSupply = _.first(
          _.filter(bundles, (bundle: any) => {
            if (bundle.CategoryIDs.split(",").includes("73")) return bundle;
          })
        );

        let options = _.filter(optionDetails, (option: any) => {
          return option.OptionId === powerSupply.OptionId;
        });

        let selecetedPowerSupply = _.find(slctBundleItems, (bItems: any) => {
          if (bItems.CategoryId.split(",").includes("73"))
            return _.find(options, (oItem: any) => {
              if (oItem.OptionDetailId === bItems.OptionDetailId) return oItem;
            });
        });

        if (
          _.toLower(bundleItem.Title).includes("standard") &&
          _.toLower(bundleItem.Title).includes("case")
        ) {
          /* check seleceted Power supply is standard or not if not switch it to standard */
          if (selecetedPowerSupply) {
            if (
              !(
                _.toLower(selecetedPowerSupply.Title).includes("standard") &&
                _.toLower(selecetedPowerSupply.Title).includes("400w")
              )
            ) {
              /* switch to standard */
              let standardPSU = _.find(options, (oItem: any) => {
                console.log(
                  _.toLower(oItem.OptionText.trim()),
                  _.toLower(oItem.OptionText.trim()).includes("standard"),
                  " ---- ",
                  _.toLower(oItem.OptionText.trim()).includes("400w")
                );
                if (
                  _.toLower(_.toLower(oItem.OptionText)).includes("standard") &&
                  _.toLower(_.toString(oItem.OptionText)).includes("400w")
                )
                  return oItem;
              });

              if (standardPSU) {
                /* Swal.fire({
                        position: 'top-end',
                        icon: 'warning',
                        title: `Power supply switch to ${standardPSU.OptionText}.`,
                        showConfirmButton: false,
                        timer: 1500
                      }); */
                props.onBundleItemsSeleceted({
                  OptionId: standardPSU.OptionId,
                  BundleTitle: powerSupply.BundleTitle,
                  Title: standardPSU.OptionText,
                  Price: standardPSU.OptionPrice,
                  OptionDetailId: standardPSU.OptionDetailId,
                  CategoryId: powerSupply.CategoryIDs,
                  ProductId: standardPSU.ProductID,
                  Priority: powerSupply.Priority,
                });
              }
            }
          }
        } else {
          /* check for standard powersupply selected or not */
          if (selecetedPowerSupply) {
            if (
              _.toLower(selecetedPowerSupply.Title).includes("standard") &&
              _.toLower(selecetedPowerSupply.Title).includes("400w")
            ) {
              /* switch to next powersupply */
              let nonStandardPSU = _.first(
                _.filter(options, (oItem: any) => {
                  if (oItem.isDefault !== 1) return oItem;
                })
              );

              if (nonStandardPSU) {
                /* Swal.fire({
                        position: 'top-end',
                        icon: 'warning',
                        title: `Power supply switch to ${nonStandardPSU.OptionText}`,
                        showConfirmButton: false,
                        timer: 1500
                      }); */
                props.onBundleItemsSeleceted({
                  OptionId: nonStandardPSU.OptionId,
                  BundleTitle: powerSupply.BundleTitle,
                  Title: nonStandardPSU.OptionText,
                  Price: nonStandardPSU.OptionPrice,
                  OptionDetailId: nonStandardPSU.OptionDetailId,
                  CategoryId: powerSupply.CategoryIDs,
                  ProductId: nonStandardPSU.ProductID,
                  Priority: powerSupply.Priority,
                });
              }
            }
          }
        }
      }
    } catch (ex) {}

    /* Standard Powersupply Changed Then Switch Standard  Powersupply */
    try {
      if (bundleItem.CategoryId.includes(73)) {
        let powerSupply = _.first(
          _.filter(bundles, (bundle: any) => {
            if (bundle.CategoryIDs.split(",").includes("70")) return bundle;
          })
        );

        let options = _.filter(optionDetails, (option: any) => {
          return option.OptionId === powerSupply.OptionId;
        });

        let selecetedPCCase = _.find(slctBundleItems, (bItems: any) => {
          if (bItems.CategoryId.split(",").includes("70"))
            return _.find(options, (oItem: any) => {
              if (oItem.OptionDetailId === bItems.OptionDetailId) return oItem;
            });
        });

        if (
          _.toLower(bundleItem.Title).includes("standard") &&
          _.toLower(bundleItem.Title).includes("400w")
        ) {
          /* check seleceted Power supply is standard or not if not switch it to standard */
          if (selecetedPCCase) {
            if (
              !(
                _.toLower(selecetedPCCase.Title).includes("standard") &&
                _.toLower(selecetedPCCase.Title).includes("case")
              )
            ) {
              /* switch to standard */
              let standardPSU = _.find(options, (oItem: any) => {
                console.log(
                  _.toLower(oItem.OptionText.trim()),
                  _.toLower(oItem.OptionText.trim()).includes("standard"),
                  " ---- ",
                  _.toLower(oItem.OptionText.trim()).includes("case")
                );
                if (
                  _.toLower(_.toLower(oItem.OptionText)).includes("standard") &&
                  _.toLower(_.toString(oItem.OptionText)).includes("case")
                )
                  return oItem;
              });

              if (standardPSU) {
                /* Swal.fire({
                        position: 'top-end',
                        icon: 'warning',
                        title: `PC Case switch to ${standardPSU.OptionText}.`,
                        showConfirmButton: false,
                        timer: 2000
                      }); */
                props.onBundleItemsSeleceted({
                  OptionId: standardPSU.OptionId,
                  BundleTitle: powerSupply.BundleTitle,
                  Title: standardPSU.OptionText,
                  Price: standardPSU.OptionPrice,
                  OptionDetailId: standardPSU.OptionDetailId,
                  CategoryId: powerSupply.CategoryIDs,
                  ProductId: standardPSU.ProductID,
                  Priority: powerSupply.Priority,
                });
              }
            }
          }
        } else {
          /* check for standard powersupply selected or not */
          if (selecetedPCCase) {
            if (
              _.toLower(selecetedPCCase.Title).includes("standard") &&
              _.toLower(selecetedPCCase.Title).includes("case")
            ) {
              /* switch to next powersupply */
              let nonStandardPSU = _.first(
                _.filter(options, (oItem: any) => {
                  if (oItem.isDefault !== 1) return oItem;
                })
              );

              if (nonStandardPSU) {
                /* Swal.fire({
                        position: 'top-end',
                        icon: 'warning',
                        title: `PC Case switch to ${nonStandardPSU.OptionText}.`,
                        showConfirmButton: false,
                        timer: 1500
                      }); */
                props.onBundleItemsSeleceted({
                  OptionId: nonStandardPSU.OptionId,
                  BundleTitle: powerSupply.BundleTitle,
                  Title: nonStandardPSU.OptionText,
                  Price: nonStandardPSU.OptionPrice,
                  OptionDetailId: nonStandardPSU.OptionDetailId,
                  CategoryId: powerSupply.CategoryIDs,
                  ProductId: nonStandardPSU.ProductID,
                  Priority: powerSupply.Priority,
                });
              }
            }
          }
        }
      }
    } catch (ex) {}

    props.onBundleItemsSeleceted(bundleItem);
  };

  useEffect(() => {
    if (isBundlesSet) props.onBundleSet();
  }, [isBundlesSet]);

  if (bundles !== null && bundles !== undefined) {
    bundleOptions = bundles.map((bundle: any) => {
      /* filter options based on optionId */
      let options = _.filter(optionDetails, (option: any) => {
        return option.OptionId === bundle.OptionId;
      });
      return (
        <BundleOptions
          key={nanoid(6)}
          Bundle={bundle}
          isOpen={props.isOpen}
          BundleData={options}
          onBundleSelection={selectBundleItem}
          selectedBundleItems={props.selecetedItems}
        />
      );
    });

    if (!isBundlesSet) setIsBundlesSet(true);
  }

  return (
    <div>
      <div id="bundlesDiv" className={`${styles.BundlesDiv}`}>
        {bundleOptions}
      </div>
    </div>
  );
};

export default PCBundles;
