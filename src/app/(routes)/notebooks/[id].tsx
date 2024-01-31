import ByBrand from "@/components/ByBrand";
import CustomeSpinner from "@/components/CustomeSpinner";
import { useTheme } from "@/store/ThemeContext";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProductsByBrand = (props: any) => {
  const params = useParams();
  const [BrandId, setBrandId] = useState(0);
  const [isInit, setIsInit] = useState(false);
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  useEffect(() => {
    let BranId: any = params?.id;
    if (BranId !== undefined && BranId.split("-").length > 0) {
      BranId.split("-").forEach((str: any) => {
        try {
          BranId = parseInt(str.replace(".", "").replace("aspx", "").trim());
          setBrandId(BranId);
        } catch (e) {}
      });
    } else {
      try {
        BranId = parseInt(BranId.replace(".", "").replace("aspx", "").trim());
        setBrandId(BranId);
      } catch (e) {
        BranId = 0;
        setBrandId(BranId);
      }
    }
  }, [params]);

  useEffect(() => {
    if (!isInit && !isNaN(BrandId) && BrandId > 0) {
      setIsInit(true);
    }
  }, [BrandId]);

  return (
    <>
      {isInit && (
        <div className={darkMode ? `evetechDark` : ``}>
          <ByBrand brandId={BrandId}></ByBrand>
        </div>
      )}
      {!isInit && <CustomeSpinner />}
    </>
  );
};

export default ProductsByBrand;
