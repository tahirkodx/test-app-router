import { nanoid } from "nanoid";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Col } from "react-bootstrap";
import useMediaQuery from "@/custom/hooks/useMediaQuery";
import SpecialPCCard from "./SpecialPC/SpecialPCCard";
import { ProductAPI } from "@/custom/utils/actions";
import Heading from "../Heading";

const _ = require("lodash");

const SpecialPC = ({ styles }: any) => {
  const [specialPC, setSpecialPC] = useState([]);
  const [gameData, setGameData] = useState([]);
  const [activeGames, setActiveGames] = useState("");
  const [filterdGame, setFilterdGame] = useState("");

  const isHD = useMediaQuery("(min-width: 1921px)");

  const getSpecialPCs = async () => {
    const pcs = await ProductAPI.getSpecialPCs();

    let specialPCs = pcs.result;
    setSpecialPC(specialPCs);
  };

  useEffect(() => {
    const getGameData = async () => {
      const gameDatas = await ProductAPI.getPcGameData();

      let gamesData = gameDatas.result;

      setGameData(gamesData);
    };

    getGameData();
  }, []);

  useEffect(() => {
    let availableGames = _.filter(gameData, { Status: 1 });
    setActiveGames(availableGames);
  }, [gameData]);

  useEffect(() => {}, [activeGames]);

  useEffect(() => {}, [filterdGame]);

  useEffect(() => {
    getSpecialPCs();
  }, []);

  return (
    <section
      className="bg-secondary bg-opacity-25 bg-gradient p-3 py-xxl-5 border-top border-bottom"
      id="PCs"
    >
      <Col md={{ span: 10, offset: 1 }}>
        <Heading
          level={2}
          className={`
              mb-3 text-center pcSpecialsH2
            `}
        >
          Gaming PCs & Desktop Computer Specials ({specialPC.length})
        </Heading>
        <div
          className={`
            d-grid cols-2 cols-md-3 cols-lg-4 gap-2 gap-sm-3 gap-xxl-5 
            ${isHD ? `cols-xxl-5` : `cols-xxl-4`}
            `}
        >
          {specialPC.map((pc) => {
            return (
              <SpecialPCCard
                pc={pc}
                key={nanoid(5)}
                gameDataFPS={gameData}
                filterdGame={filterdGame}
                styles={styles}
              />
            );
          })}
        </div>
      </Col>
    </section>
  );
};

export default SpecialPC;
