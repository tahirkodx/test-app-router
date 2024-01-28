import React from "react";

const useClickScroll = () => {
  const clickScroll = (section: any, offset: any) => {
    const element: any = document.getElementById(section);
    const scrollPosition =
      element.getBoundingClientRect().top -
      document.body.getBoundingClientRect().top;
    if (element) {
      window.scrollTo({
        behavior: "smooth",
        top: scrollPosition - offset,
      });
    }
  };

  return { clickScroll };
};

export default useClickScroll;
