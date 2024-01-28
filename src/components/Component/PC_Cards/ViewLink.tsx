import React from "react";
import PageLink from "./PageLink";
import { Button } from "react-bootstrap";

const ViewLink = () => {
  // const { commonState } = useContext(CommonContext);
  // const darkMode = commonState.darkMode;
  const darkMode = false;
  return (
    <>
      <PageLink
        className={`flex-grow-1 text-decoration-none text-dark rounded cursor-pointer`}
      >
        <Button
          className={`
                      ${darkMode ? `text-light` : `text-dark`}
                      bg-gradient rounded w-100 h-100 lh-1 d-flex align-items-center justify-content-center
                    `}
          variant={darkMode ? `dark` : `light`}
          size="sm"
        >
          <span className="d-flex align-items-center justify-content-center">
            <small>Customize / Buy</small>
          </span>
        </Button>
      </PageLink>
    </>
  );
};

export default ViewLink;
