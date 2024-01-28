import React from "react";
import ComponentsHeader from "@/components/Home/ComponentsHeader";
import { useEffect } from "react";
import { useState } from "react";
import { Image, Stack } from "react-bootstrap";
// import FindGameNav from "./Controls/FindGameNav";
import Games from "@/components/FPS/Games";
import styles from "@/styles/FindGaming.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
// import AppFooter from "../../Layouts/CompFooter";
import { Helmet } from "react-helmet";
import { ProductAPI } from "@/custom/utils/actions";
import { useTheme } from "@/store/ThemeContext";

const FindGamingPCs = () => {
  const [showPageTopMsg, setShowPageTopMsg] = useState(true);
  const router = useRouter();
  const [gameData, setGameData] = useState([]);
  const [selectData, setSelectedData] = useState({
    gameTitle: "",
    gameImage: "",
    gameFPS: "",
  });
  const [activeTab, setActiveTab] = useState("");
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  useEffect(() => {
    const getPcGameData = async () => {
      const gameDatas = await ProductAPI.getPcGameData();

      let gamesData = gameDatas.result;
      setGameData(gamesData);
    };

    const fetchData = async () => {
      getPcGameData();
    };

    fetchData();
  }, []);

  const onActiveTabSet = (tabStr: any) => {
    setActiveTab(tabStr);
  };

  const onGameSelected = (game: any) => {
    setSelectedData((prevData) => {
      prevData.gameTitle = game.gameTitle;
      prevData.gameImage = game.gameImage;
      return prevData;
    });
    setActiveTab("resolutions");
  };

  useEffect(() => {
    if (
      activeTab.trim().length === 0 &&
      selectData.gameTitle.trim().length === 0
    ) {
      setActiveTab("games");
    }
  }, []);

  useEffect(() => {}, [activeTab]);

  return (
    <>
      <Helmet>
        <title itemProp="name" lang="en">
          Find your Gaming PC - FPS PC Gaming
        </title>
        <meta
          name="description"
          content="Find the perfect gaming computer, choose your game and FPS and get the gaming pc of your dreams"
        ></meta>
      </Helmet>

      <ComponentsHeader showpagetopmsg={showPageTopMsg} />

      <main className={`${styles.Main} pt-5 px-2`}>
        {darkMode ? (
          <div className="position-absolute w-100 h-100 bg-black bg-opacity-50 z-index-1 top-0 start-0"></div>
        ) : null}
        {activeTab === "games" && (
          <Stack gap={2} className="pb-5 position-relative z-index-1">
            <h1 className="fs-2 text-white text-center">Choose your game</h1>

            <div
              className={`${styles.Games} d-flex flex-wrap justify-content-center mx-auto px-2 px-sm-3 gap-2 gap-sm-3 mb-2`}
            >
              {gameData !== null && gameData !== undefined && (
                <Games
                  GameData={gameData}
                  onGameSelected={onGameSelected}
                  selectData={selectData}
                />
              )}
            </div>
          </Stack>
        )}

        {activeTab === "resolutions" && (
          <Stack gap={2} className="mb-5 position-relative z-index-1">
            <div className="text-center">
              <Image
                src={selectData.gameImage}
                alt={selectData.gameTitle}
                className={`${styles.Game} rounded border`}
              />
            </div>

            <h1 className="fs-2 text-white text-center mt-2">
              Choose your Resolution
            </h1>

            <Stack
              gap={2}
              direction="horizontal"
              className={`flex-wrap justify-content-center`}
            >
              <div className="w-100">
                <Link
                  href={`/find-gaming-pcs-by-fps/${selectData.gameTitle}/1080p`}
                  className={`${styles.BigFPS} ${styles.FPS} p-1 rounded-circle bg-light text-decoration-none d-block mx-auto hover-grow-3`}
                  onClick={() => {
                    setSelectedData((prevData) => {
                      prevData.gameFPS = "1080p";
                      return prevData;
                    });
                    router.push(
                      `/find-gaming-pcs-by-fps/${selectData.gameTitle}/1080p`
                    );
                  }}
                >
                  <div className="d-flex flex-column justify-content-center align-items-center rounded-circle bg-dark text-light text-center w-100 h-100 gap-1">
                    <p className="fs-3 m-0">1080p</p>
                    <small>Full HD</small>
                  </div>
                </Link>
              </div>
              <Link
                href={`/find-gaming-pcs-by-fps/${selectData.gameTitle}/1440p`}
                className={`${styles.SmallFPS} ${styles.FPS} p-1 rounded-circle bg-light text-decoration-none d-inline-block hover-grow-3`}
                onClick={() => {
                  setSelectedData((prevData) => {
                    prevData.gameFPS = "1440p";
                    return prevData;
                  });
                  router.push(
                    `/find-gaming-pcs-by-fps/${selectData.gameTitle}/1440p`
                  );
                }}
              >
                <div className="d-flex flex-column justify-content-center align-items-center rounded-circle bg-dark text-light text-center w-100 h-100 gap-1">
                  <p className="fs-3 m-0">1440p</p>
                  <small>Quad HD</small>
                </div>
              </Link>
              <Link
                href={`/find-gaming-pcs-by-fps/${selectData.gameTitle}/4k`}
                className={`${styles.SmallFPS} ${styles.FPS} p-1 rounded-circle bg-light text-decoration-none d-inline-block hover-grow-3`}
                onClick={() => {
                  setSelectedData((prevData) => {
                    prevData.gameFPS = "4k";
                    return prevData;
                  });
                  router.push(
                    `/find-gaming-pcs-by-fps/${selectData.gameTitle}/4k`
                  );
                }}
              >
                <div className="d-flex flex-column justify-content-center align-items-center rounded-circle bg-dark text-light text-center w-100 h-100 gap-1">
                  <p className="fs-3 m-0">4K</p>
                  <small>Medium 4K</small>
                </div>
              </Link>
            </Stack>
          </Stack>
        )}
      </main>
    </>
  );
};

export default FindGamingPCs;
