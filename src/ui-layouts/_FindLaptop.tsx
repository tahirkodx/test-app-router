"use client";
import { nanoid } from "nanoid";
import styles from "@/styles/Header.module.scss";
import useMediaQuery from "@/custom/hooks/useMediaQuery";

import React, { useEffect, useState } from "react";
import { Stack, Tabs, Tab, Form, Button, Accordion } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FaLaptop, FaSearch } from "react-icons/fa";
// import { Link } from "react-router-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AccordionItem from "../components/FindLaptop/AccordionItem";
import { useTheme } from "@/store/ThemeContext";

function FindLaptop() {
  const router = useRouter();

  const isBig = useMediaQuery("(min-width: 576px)");

  const [show, setShow] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [isChecked_CPU_Game, setIsChecked_CPU_Game] = useState(false);
  const [isChecked_GPU_Game, setIsChecked_GPU_Game] = useState(false);
  const [isChecked_RAM_Game, setIsChecked_RAM_Game] = useState(false);
  const [isChecked_SSD_Game, setIsChecked_SSD_Game] = useState(false);
  const [isChecked_HDD_Game, setIsChecked_HDD_Game] = useState(false);
  const [isChecked_Screen_Game, setIsChecked_Screen_Game] = useState(false);
  const [isChecked_Brand_Game, setIsChecked_Brand_Game] = useState(false);
  const [isChecked_OS_Game, setIsChecked_OS_Game] = useState(false);

  const [isChecked_CPU_Day, setIsChecked_CPU_Day] = useState(false);
  const [isChecked_GPU_Day, setIsChecked_GPU_Day] = useState(false);
  const [isChecked_RAM_Day, setIsChecked_RAM_Day] = useState(false);
  const [isChecked_SSD_Day, setIsChecked_SSD_Day] = useState(false);
  const [isChecked_HDD_Day, setIsChecked_HDD_Day] = useState(false);
  const [isChecked_Screen_Day, setIsChecked_Screen_Day] = useState(false);
  const [isChecked_Brand_Day, setIsChecked_Brand_Day] = useState(false);
  const [isChecked_OS_Day, setIsChecked_OS_Day] = useState(false);

  const [isAny, setIsAny] = useState(false);

  const [isAny_CPU_Game, setIsAny_CPU_Game] = useState(false);
  const [isAny_GPU_Game, setIsAny_GPU_Game] = useState(false);
  const [isAny_RAM_Game, setIsAny_RAM_Game] = useState(false);
  const [isAny_SSD_Game, setIsAny_SSD_Game] = useState(false);
  const [isAny_HDD_Game, setIsAny_HDD_Game] = useState(false);
  const [isAny_Screen_Game, setIsAny_Screen_Game] = useState(false);
  const [isAny_Brand_Game, setIsAny_Brand_Game] = useState(false);
  const [isAny_OS_Game, setIsAny_OS_Game] = useState(false);

  const [isAny_CPU_Day, setIsAny_CPU_Day] = useState(false);
  const [isAny_GPU_Day, setIsAny_GPU_Day] = useState(false);
  const [isAny_RAM_Day, setIsAny_RAM_Day] = useState(false);
  const [isAny_SSD_Day, setIsAny_SSD_Day] = useState(false);
  const [isAny_HDD_Day, setIsAny_HDD_Day] = useState(false);
  const [isAny_Screen_Day, setIsAny_Screen_Day] = useState(false);
  const [isAny_Brand_Day, setIsAny_Brand_Day] = useState(false);
  const [isAny_OS_Day, setIsAny_OS_Day] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const tabs = [
    {
      eventKey: "gaming",
      title: "Gaming",
      tabTitle: "Gaming",
      accordion: [
        {
          header: "Processor",
          name: "CPU",
          options: [
            "Intel Core i9",
            "Intel Core i7",
            "Intel Core i5",
            "AMD Ryzen 9",
            "AMD Ryzen 7",
            "AMD Ryzen 5",
            "AMD Ryzen 3",
          ],
          value: isChecked_CPU_Game,
          anyValue: isAny_CPU_Game,
        },
        {
          header: "Graphics Card",
          name: "GPU",
          options: [
            "GTX 1650",
            "RTX 3050 Series",
            "RTX 3060 Series",
            "RTX 3070 Series",
            "RTX 3080 Series",
            "RTX 4070 Series",
            "RTX 4080 Series",
            "RTX 4090 Series",
          ],
          value: isChecked_GPU_Game,
          anyValue: isAny_GPU_Game,
        },
        {
          header: "Memory (RAM)",
          name: "MemorySize",
          options: ["8GB", "12GB", "16GB", "20GB", "24GB", "32GB"],
          value: isChecked_RAM_Game,
          anyValue: isAny_RAM_Game,
        },
        {
          header: "SSD Capacity",
          name: "SSD",
          options: [
            "256GB SSD",
            "512GB SSD",
            "1TB SSD",
            "2TB SSD",
            "4TB SSD",
            "8TB SSD",
          ],
          value: isChecked_SSD_Game,
          anyValue: isAny_SSD_Game,
        },
        {
          header: "HDD Capacity",
          name: "HDD",
          options: ["1TB", "2TB", "500GB"],
          value: isChecked_HDD_Game,
          anyValue: isAny_HDD_Game,
        },
        {
          header: "Screen Size",
          name: "ScreenSize",
          options: ['17.3"', '15.6"', '14.0"'],
          value: isChecked_Screen_Game,
          anyValue: isAny_Screen_Game,
        },
        {
          header: "Brand (Manufacturer)",
          name: "Brand",
          options: ["HP", "Lenovo", "Dell", "Alienware", "MSI", "Asus"],
          value: isChecked_Brand_Game,
          anyValue: isAny_Brand_Game,
        },
        {
          header: "Operator System",
          name: "OS",
          options: ["Windows Pro", "Windows Home"],
          value: isChecked_OS_Game,
          anyValue: isAny_OS_Game,
        },
      ],
    },
    {
      eventKey: "everyday",
      title: "EveryDay",
      tabTitle: "Everyday/Mainstream",
      accordion: [
        {
          header: "Processor",
          name: "CPU",
          options: [
            "Intel Dual Core",
            "Intel Core i3",
            "Intel Core i5",
            "Intel Core i7",
            "Intel Core i9",
            "AMD Ryzen",
          ],
          value: isChecked_CPU_Day,
          anyValue: isAny_CPU_Day,
        },
        {
          header: "Graphics Card",
          name: "GPU",
          options: ["Integrated Graphics"],
          value: isChecked_GPU_Day,
          anyValue: isAny_GPU_Day,
        },
        {
          header: "Memory (RAM)",
          name: "MemorySize",
          options: ["4GB", "8GB", "12GB", "16GB"],
          value: isChecked_RAM_Day,
          anyValue: isAny_RAM_Day,
        },
        {
          header: "SSD Capacity",
          name: "SSD",
          options: [
            "256GB SSD",
            "512GB SSD",
            "1TB SSD",
            "2TB SSD",
            "4TB SSD",
            "8TB SSD",
          ],
          value: isChecked_SSD_Day,
          anyValue: isAny_SSD_Day,
        },
        {
          header: "HDD Capacity",
          name: "HDD",
          options: ["1TB", "2TB", "500GB"],
          value: isChecked_HDD_Day,
          anyValue: isAny_HDD_Day,
        },
        {
          header: "Screen Size",
          name: "ScreenSize",
          options: ['17.3"', '15.6"', '14.0"'],
          value: isChecked_Screen_Day,
          anyValue: isAny_Screen_Day,
        },
        {
          header: "Brand (Manufacturer)",
          name: "Brand",
          options: ["Lenovo", "Asus", "Dell", "MSI", "HP"],
          value: isChecked_Brand_Day,
          anyValue: isAny_Brand_Day,
        },
        {
          header: "Operator System",
          name: "OS",
          options: ["Windows Pro", "Windows Home"],
          value: isChecked_OS_Day,
          anyValue: isAny_OS_Day,
        },
      ],
    },
  ];

  const [data, setData] = useState([
    {
      Gaming: [
        {
          CPU: [],
          GPU: [],
          MemorySize: [],
          SSD: [],
          HDD: [],
          ScreenSize: [],
          OS: [],
          Brand: [],
        },
      ],
      EveryDay: [
        {
          CPU: [],
          GPU: [],
          MemorySize: [],
          SSD: [],
          HDD: [],
          ScreenSize: [],
          OS: [],
          Brand: [],
        },
      ],
    },
  ]);

  const newData: any = [...data];
  const gameLaptopData: any = [...newData[0]["Gaming"]];
  const everyDayLaptopData: any = [...newData[0]["EveryDay"]];

  const addData = (tab: any, section: any, name: any) => {
    const target = newData[0][tab][0][section];
    const index = target.indexOf(name);
    if (index === -1) {
      target.push(name);
    }
    console.log("newData", newData);
  };

  const removeData = (tab: any, section: any, name: any) => {
    const target = newData[0][tab][0][section];
    const index = target.indexOf(name);
    target.splice(index, 1);
  };

  const handleChange = (event: any) => {
    const e = event.target;
    const names = e.nextElementSibling.title.split(` / `);
    const tab = names[1];
    const data = e.id.replaceAll("-", " ");
    if (e.checked) {
      addData(tab, e.name, data);
    } else {
      removeData(tab, e.name, data);
    }
    // setIsChecked((current) => !current);
  };

  const isCPU_Game_Empty = () => {
    const target = newData[0]["Gaming"][0]["CPU"];
    if (target.length === 0) {
      setIsAny_CPU_Game(true);
    } else {
      setIsAny_CPU_Game(false);
    }
  };

  const isCPU_Day_Empty = () => {
    const target = newData[0]["EveryDay"][0]["CPU"];
    if (target.length === 0) {
      setIsAny_CPU_Day(true);
    } else {
      setIsAny_CPU_Day(false);
    }
  };

  const isGPU_Game_Empty = () => {
    const target = newData[0]["Gaming"][0]["GPU"];
    if (target.length === 0) {
      setIsAny_GPU_Game(true);
    } else {
      setIsAny_GPU_Game(false);
    }
  };

  const isGPU_Day_Empty = () => {
    const target = newData[0]["EveryDay"][0]["GPU"];
    if (target.length === 0) {
      setIsAny_GPU_Day(true);
    } else {
      setIsAny_GPU_Day(false);
    }
  };

  const isRAM_Game_Empty = () => {
    const target = newData[0]["Gaming"][0]["MemorySize"];
    if (target.length === 0) {
      setIsAny_RAM_Game(true);
    } else {
      setIsAny_RAM_Game(false);
    }
  };

  const isRAM_Day_Empty = () => {
    const target = newData[0]["EveryDay"][0]["MemorySize"];
    if (target.length === 0) {
      setIsAny_RAM_Day(true);
    } else {
      setIsAny_RAM_Day(false);
    }
  };

  const isSSD_Game_Empty = () => {
    const target = newData[0]["Gaming"][0]["SSD"];
    if (target.length === 0) {
      setIsAny_SSD_Game(true);
    } else {
      setIsAny_SSD_Game(false);
    }
  };

  const isSSD_Day_Empty = () => {
    const target = newData[0]["EveryDay"][0]["SSD"];
    if (target.length === 0) {
      setIsAny_SSD_Day(true);
    } else {
      setIsAny_SSD_Day(false);
    }
  };

  const isHDD_Game_Empty = () => {
    const target = newData[0]["Gaming"][0]["HDD"];
    if (target.length === 0) {
      setIsAny_HDD_Game(true);
    } else {
      setIsAny_HDD_Game(false);
    }
  };

  const isHDD_Day_Empty = () => {
    const target = newData[0]["EveryDay"][0]["HDD"];
    if (target.length === 0) {
      setIsAny_HDD_Day(true);
    } else {
      setIsAny_HDD_Day(false);
    }
  };

  const isScreen_Game_Empty = () => {
    const target = newData[0]["Gaming"][0]["ScreenSize"];
    if (target.length === 0) {
      setIsAny_Screen_Game(true);
    } else {
      setIsAny_Screen_Game(false);
    }
  };

  const isScreen_Day_Empty = () => {
    const target = newData[0]["EveryDay"][0]["ScreenSize"];
    if (target.length === 0) {
      setIsAny_Screen_Day(true);
    } else {
      setIsAny_Screen_Day(false);
    }
  };

  const isBrand_Game_Empty = () => {
    const target = newData[0]["Gaming"][0]["Brand"];
    if (target.length === 0) {
      setIsAny_Brand_Game(true);
    } else {
      setIsAny_Brand_Game(false);
    }
  };

  const isBrand_Day_Empty = () => {
    const target = newData[0]["EveryDay"][0]["Brand"];
    if (target.length === 0) {
      setIsAny_Brand_Day(true);
    } else {
      setIsAny_Brand_Day(false);
    }
  };

  const isOS_Game_Empty = () => {
    const target = newData[0]["Gaming"][0]["OS"];
    if (target.length === 0) {
      setIsAny_OS_Game(true);
    } else {
      setIsAny_OS_Game(false);
    }
  };

  const isOS_Day_Empty = () => {
    const target = newData[0]["EveryDay"][0]["OS"];
    if (target.length === 0) {
      setIsAny_OS_Day(true);
    } else {
      setIsAny_OS_Day(false);
    }
  };

  useEffect(() => {
    isCPU_Game_Empty();
    isGPU_Game_Empty();
    isRAM_Game_Empty();
    isSSD_Game_Empty();
    isHDD_Game_Empty();
    isScreen_Game_Empty();
    isBrand_Game_Empty();
    isOS_Game_Empty();

    isCPU_Day_Empty();
    isGPU_Day_Empty();
    isRAM_Day_Empty();
    isSSD_Day_Empty();
    isHDD_Day_Empty();
    isScreen_Day_Empty();
    isBrand_Day_Empty();
    isOS_Day_Empty();
  }, [data]);

  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  return (
    <>
      <div
        className={`${styles.FindLaptopButton} ${
          darkMode ? styles.darkMode : ``
        } px-2 px-xl-3 rounded-pill pe-auto`}
        onClick={handleShow}
      >
        <Stack
          direction="horizontal"
          className={`${styles.FindLaptopButton__Content} gap-1`}
        >
          {isBig ? (
            <>
              <FaLaptop /> Find Laptop
            </>
          ) : (
            <>
              <FaLaptop className="fs-6" />
            </>
          )}
        </Stack>
      </div>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <Stack direction="horizontal" gap={2}>
              <FaLaptop />
              Laptop Finder
            </Stack>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Tabs
            defaultActiveKey="gaming"
            id="find-laptop-tabs"
            className="mb-3"
          >
            {tabs.map((Section) => {
              return (
                <Tab
                  eventKey={`${Section.eventKey}`}
                  title={`${Section.tabTitle}`}
                  key={nanoid(5)}
                >
                  <Form>
                    <Accordion className="mb-3">
                      {Section.accordion.map((Item, index) => {
                        return (
                          <AccordionItem
                            index={index}
                            key={nanoid(6)}
                            Item={Item}
                            Section={Section}
                            handleChange={handleChange}
                          />
                        );
                      })}
                    </Accordion>
                    {Section.title === "Gaming" ? (
                      <Link href={`/Search?gameLaptopData=${gameLaptopData}`}>
                        <Button variant="success" type="submit" size="sm">
                          Find Gaming Laptop
                        </Button>
                      </Link>
                    ) : (
                      <Link
                        href={`/Search?everyDayLaptopData=${everyDayLaptopData}`}
                      >
                        <Button variant="primary" type="submit" size="sm">
                          Find EveryDay Laptop
                        </Button>
                      </Link>
                    )}
                  </Form>
                </Tab>
              );
            })}
          </Tabs>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default FindLaptop;
