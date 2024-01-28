import React from "react";
import PageLink from "./PageLink";
import { Button } from "react-bootstrap";
import { useTheme } from "@/store/ThemeContext";

const ViewLink = ({ Product }: any) => {
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;
  return (
    <>
      <PageLink
        Product={Product}
        className={`flex-grow-1 text-decoration-none text-dark rounded`}
      >
        <Button
          variant={darkMode ? `dark` : `light`}
          size="sm"
          className={`
                  ${darkMode ? `text-light` : `text-dark`}
                  bg-gradient rounded w-100 h-100 lh-1 d-flex align-items-center justify-content-center
                `}
        >
          <span className="d-flex align-items-center justify-content-center">
            View/Buy Now
          </span>
        </Button>
      </PageLink>
    </>
  );
};

export default ViewLink;
