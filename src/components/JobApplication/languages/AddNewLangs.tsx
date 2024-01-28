import { nanoid } from "nanoid";
import React from "react";
import { Badge, Card, Form } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import AddLang from "./AddLang";
import { useTheme } from "@/store/ThemeContext";

const AddNewLangs = ({ handleUpdateLang, validateLangs }: any) => {
  const langsList: any = new Set([]);
  const [listo, setListo] = React.useState(langsList);
  const _ = require("lodash");
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  const [lang, setLang] = React.useState("");

  function handleChange(event: any) {
    setLang(event.target.value);
  }

  function handleAdd() {
    const newLangList: any = Array.from(listo).concat({ lang, id: nanoid(7) });
    setListo(newLangList);
    validateLangs(newLangList);
    handleUpdateLang(newLangList);
    setLang("");
  }

  const deleteLang = (id: any) => {
    const newList = listo.filter((li: any) => li.id !== id);
    setListo(newList);
    validateLangs(newList);
    handleUpdateLang(newList);
  };

  React.useEffect(() => {}, [listo]);

  return (
    <>
      <section className="mb-3 span-full span-lg-1">
        <Card
          className={`
            shadow p-3 pb-2
            ${darkMode ? `bg-black bg-gradient text-light` : ``}
        `}
        >
          <h2 className="fs-4">Languages</h2>
          <AddLang lang={lang} onChange={handleChange} onAdd={handleAdd} />

          <Form.Group
            className={`
            ${darkMode ? `border-secondary border-opacity-50` : ``} 
            mt-2 p-3 border rounded mb-3 border-2
          `}
          >
            {listo.size === 0 || listo.length === 0 ? (
              <>
                <span className="fst-italic opacity-50">
                  No Languages Added
                </span>
                <span className="text-danger"> - 1 Language Required</span>
              </>
            ) : null}
            {listo.length > 0 ? (
              <>
                <h3 className="fs-5">Your Languages</h3>
                <div className="d-flex flex-wrap gap-2">
                  {_.map(listo, (item: any) => {
                    return (
                      <Badge
                        key={nanoid(3)}
                        className="p-0 rounded-5 overflow-hidden"
                      >
                        <span className="fw-1 fs-6 d-flex align-items-center d-flex">
                          <div className="px-2">{item.lang}</div>
                          <div
                            className="px-2 bg-danger py-1 cursor-pointer"
                            onClick={() => deleteLang(item.id)}
                          >
                            <FaTimes />
                          </div>
                        </span>
                      </Badge>
                    );
                  })}
                </div>
              </>
            ) : null}
          </Form.Group>
        </Card>
      </section>
    </>
  );
};

export default AddNewLangs;
