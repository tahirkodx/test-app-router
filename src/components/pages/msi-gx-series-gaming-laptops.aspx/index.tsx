import ByAtt from "@/components/ByAtt";
import { useTheme } from "@/store/ThemeContext";
import React from "react";

const PCByAttHome = () => {
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;
  return (
    <div className={darkMode ? `evetechDark` : ``}>
      <ByAtt attid={7}></ByAtt>
    </div>
  );
};

export default PCByAttHome;
