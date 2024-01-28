import { useTheme } from "@/store/ThemeContext";
import React from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";

const AddLang = ({ lang, onChange, onAdd }: any) => {
  const hasSpecialChars = (string: any) => {
    const specialChars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(string);
  };

  const hasNumber = (myString: any) => {
    return /\d/.test(myString);
  };

  const validateLang = () => {
    if (lang.length > 3) {
      return hasNumber(lang) || hasSpecialChars(lang);
    } else {
      return true;
    }
  };

  const keyAdd = (event: any) => {
    if (event.key === "Enter" || event.key === " " || event.key === ",") {
      onAdd();
    }
  };

  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  return (
    <>
      <Form.Group
        className={`
        ${
          darkMode
            ? `bg-opacity-75 border-secondary border-opacity-25`
            : `bg-opacity-10`
        }
        mb-1 border rounded bg-dark p-3
      `}
      >
        <InputGroup>
          <Form.Control
            type="text"
            value={lang}
            onChange={onChange}
            onKeyDown={keyAdd}
            placeholder="Add language here"
            className={`${
              darkMode
                ? `bg-black border-secondary border-opacity-75 text-light`
                : ``
            }`}
          />
          {validateLang() === false ? (
            <Button onClick={onAdd}>Add</Button>
          ) : null}
        </InputGroup>

        <Form.Text>
          {validateLang() === true ? (
            <span className={darkMode ? `text-light` : ``}>
              Language cant contain special characters or numbers
            </span>
          ) : (
            <span className={darkMode ? `text-light` : ``}>
              <span className="text-success">
                <FaCheck /> Valid Text
              </span>
              <span> - You can press &quot;Add&quot; to add your language</span>
            </span>
          )}
        </Form.Text>
      </Form.Group>
    </>
  );
};

export default AddLang;
