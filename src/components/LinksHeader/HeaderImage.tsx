import React, { useContext } from "react";
import { Image } from "react-bootstrap";
// import { CommonContextType } from "../../../type";
// import CommonContext from "@/store/common-context";

const HeaderImage = ({ Section }: any) => {
  // const { commonState } = useContext<CommonContextType>(CommonContext);
  // const darkMode = commonState.darkMode;
  <div style={{ height: `20px` }}>
    <Image
      // src={darkMode ? Section.logoDark : Section.logo}
      src={Section.logo}
      alt={Section.title}
      width={Section.logoWidth}
      height={Section.logoHeight}
      className={`
            w-100 object-contain rounded-0
        `}
      style={{ maxHeight: `20px` }}
    />
  </div>;
};

export default HeaderImage;