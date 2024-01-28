import FPS from "@/components/FPS";
import React from "react";
import { Button } from "react-bootstrap";
import { useTheme } from "@/store/ThemeContext";

const FpsElements = ({
  styles,
  Product,
  filteredGame,
  gameDataFPS,
  setPerformCard,
  placeholderImg,
}: any) => {
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;
  return (
    <>
      <div
        className={`${styles.Products__FPSButton} text-decoration-none text-dark rounded h-100`}
      >
        <FPS
          Product={Product}
          filteredGame={filteredGame}
          gameDataFPS={gameDataFPS}
          button={
            <Button
              variant={darkMode ? `dark` : `light`}
              size="sm"
              className={`
                          ${darkMode ? `text-light` : `text-dark`}
                          bg-gradient rounded w-100 h-100 lh-1 d-flex align-items-center justify-content-center
                        `}
              onClick={() => setPerformCard(true)}
            >
              <span className="d-flex align-items-center justify-content-center h-100">
                FPS
              </span>
            </Button>
          }
          productName={Product.ProName}
          placeholderImg={placeholderImg}
          gameBar={true}
        />
      </div>
    </>
  );
};

export default FpsElements;
