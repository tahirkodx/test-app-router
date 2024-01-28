"use client";
import React from "react";
import { useState } from "react";
import { customAlphabet } from "nanoid";
import { useEffect } from "react";
import styles from "@/styles/Bundle.module.scss";
import PCConfigBundleOptions from "@/components/config/PCConfigBundleOptions"

const nanoid = customAlphabet("12345ab67890cdef", 10);
var _ = require("lodash");

const PCConfigBundles = (props:any) => {
  let bundles = props.Bundles;
  let optionDetails = props.OptionsDetails;
  let bundleOptions = null;

  const selectBundleItem = (bundleItem:any) => {
    props.onBundleItemsSeleceted(bundleItem);
  };

  const onConfigBundleExpire = (isExpire:any) => {
    props.setConfigExpire(isExpire);
  };

  if (bundles !== null && bundles !== undefined) {
    bundleOptions = bundles.map((bundle:any) => {
      /* filter options based on optionId */
      let options = _.filter(optionDetails, (option:any) => {
        return option.OptionId === bundle.OptionId;
      });

      let bindedBundles = _.first(
        _.filter(props.bindBundles, (bindBundle:any) => {
          return bindBundle.OptionId === bundle.OptionId;
        })
      );

      return (
        <PCConfigBundleOptions
          key={nanoid(6)}
          Bundle={bundle}
          isOpen={props.isOpen}
          BundleData={options}
          onBundleSelection={selectBundleItem}
          selectedBundleItems={props.selecetedItems}
          configBundle={bindedBundles}
          setConfigBundleExpire={onConfigBundleExpire}
        />
      );
    });
  }

  return (
    <div id="bundlesDiv" className={styles.BundlesDiv}>
      {bundleOptions};
    </div>
  );
};

export default PCConfigBundles;