import PCByCategory from "@/components/PCCategory";
import { useTheme } from "@/store/ThemeContext";
import React from "react";

const PCByCategoryHome = () => {
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;
  return (
    <div className={darkMode ? `evetechDark` : ``}>
      <PCByCategory cid={11}></PCByCategory>
    </div>
  );
};

export default PCByCategoryHome;
