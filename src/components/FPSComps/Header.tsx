import React from "react";
import useMediaQuery from "@/custom/hooks/useMediaQuery";
import { useTheme } from "@/store/ThemeContext";

const Header = ({ gameTitle }: any) => {
  const isXL = useMediaQuery("(min-width: 1200px)");
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;
  return (
    <h3
      className={`
        fs-6 text-center m-0 lh-1 w-100 py-1
        ${darkMode ? `bg-dark text-light` : `bg-light`}
      `}
    >
      <small>
        {isXL ? <span>Performance for </span> : null}
        <span className="text-danger">{gameTitle}</span>
      </small>
    </h3>
  );
};

export default Header;
