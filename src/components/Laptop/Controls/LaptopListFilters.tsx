"use client";
import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import LaptopCard from "./LaptopCard";
import styles from "@/styles/Laptop/LaptopListFilters.module.scss";
import Heading from "@/components/Heading";
import { useTheme } from "@/store/ThemeContext";

const _ = require("lodash");
const LaptopListFilters = (props: any) => {
  const [laptops, setLaptops] = useState([]);
  const [filterKey, setFilterKey] = useState([]);
  const [filterText, setFilterText] = useState([]);
  const [filters, setFilters] = useState([{ key: "", values: [] }]);
  const [title, setTitle] = useState("");
  const [activeFilter, setActiveFilter] = useState({ key: "", value: "All" });
  const [laptopsFiltered, setLaptopsFiltered] = useState([]);
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  useEffect(() => {
    setLaptops(props.Laptops);
    setFilterKey(props.FilterKeys);
    setFilterText(props.FilterText);
    setTitle(props.Title);
    setLaptopsFiltered(props.Laptops);
  }, [props]);

  const setActive = (filter: any) => {
    setActiveFilter(filter);
    if (filter.value !== "All") {
      setLaptopsFiltered(
        _.filter(laptops, (laptop: any) => {
          if (
            laptop[filter.key] !== undefined &&
            laptop[filter.key] === filter.value
          )
            return laptop;
        })
      );
    } else {
      setLaptopsFiltered(laptops);
    }
  };

  useEffect(() => {
    /* laptop object filter for key search */
    if (laptops != null && laptops.length > 0) {
      let filterableKeys = _.map(filterKey, (key: any) => {
        if (_.first(laptops)[key] !== undefined) {
          return key;
        }
      });

      let fnFilters = _.map(filterableKeys, (key: any) => {
        let values = _.uniq(
          _.map(laptops, (laptop: any) => {
            if (laptop[key] !== undefined) return laptop[key];
          })
        );

        values = _.map(values, (value: any) => {
          return {
            value: value,
            count: _.filter(laptops, (laptop: any) => {
              return laptop[key] !== undefined && laptop[key] === value;
            }).length,
          };
        });

        return { key: key, values: values };
      });

      setFilters(fnFilters);
    }
  }, [laptops]);

  const LaptopGrid = (props: any) => {
    useEffect(() => {}, [props]);

    return (
      <Container
        fluid
        className={`${darkMode ? `bg-dark` : `bg-light`} px-0 py-3`}
      >
        <div
          className={`d-grid cols-2 cols-md-3 cols-lg-3 cols-xxl-4 cols-2000-5 gap-2 gap-md-3 gap-xxl-5 mb-3`}
        >
          {props.Laptops !== undefined &&
            props.Laptops.map((product: any, ind: any) => (
              <LaptopCard
                product={product}
                key={nanoid(5)}
                ShowCompare={false}
              />
            ))}
        </div>
      </Container>
    );
  };

  return (
    <Container fluid className="px-0 px-sm-2 position-relative">
      <Row
        className={`${styles.Header} ${
          darkMode
            ? `bg-dark bg-gradient text-light border-bottom border-secondary border-opacity-50 rounded-bottom mt-2`
            : `bg-light`
        } shadow position-sticky py-1`}
      >
        <div className="d-flex flex-wrap gap-2">
          <Heading level={2} className="fs-6 pt-2">
            ({laptops.length}) {title}
          </Heading>
          <span>
            <Button
              className={`btn ${
                activeFilter.value === "All"
                  ? `${
                      darkMode ? `btn-dark text-light` : `btn-dark text-light`
                    }  `
                  : `${
                      darkMode
                        ? `btn-dark text-light border-1 border-secondary`
                        : `btn-light border-1 border-dark`
                    }`
              } btn-sm m-1`}
              style={{
                backgroundColor:
                  activeFilter.value === "All" && darkMode ? `darkorchid` : ``,
              }}
              onClick={() => setActive({ key: "", value: "All" })}
            >
              All - {laptops.length}
            </Button>
            {_.map(filters, (filter) => {
              let key = filter.key;
              return _.map(filter.values, (filterVal) => {
                return (
                  <Button
                    key={nanoid(6)}
                    className={`btn ${
                      activeFilter.value === filterVal.value
                        ? `${
                            darkMode
                              ? `btn-dark text-light`
                              : `btn-dark text-light`
                          }  `
                        : `${
                            darkMode
                              ? `btn-dark text-light border-1 border-secondary`
                              : `btn-light border-1 border-dark`
                          }`
                    } btn-sm m-1`}
                    style={{
                      backgroundColor:
                        activeFilter.value === filterVal.value && darkMode
                          ? `darkorchid`
                          : ``,
                    }}
                    onClick={() =>
                      setActive({ key: key, value: filterVal.value })
                    }
                  >
                    <small>
                      {filterVal.value} - {filterVal.count}
                    </small>
                  </Button>
                );
              });
            })}
          </span>
        </div>
      </Row>

      <Row>
        <LaptopGrid Laptops={laptopsFiltered} />
      </Row>
    </Container>
  );
};

export default LaptopListFilters;
