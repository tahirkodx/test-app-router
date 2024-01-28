"use client";
import { useTheme } from "@/store/ThemeContext";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { FaAsterisk, FaCaretDown, FaCaretUp } from "react-icons/fa";

const AddItem = ({
  company,
  job,
  description,
  onChange,
  onAdd,
  showAddForm,
  setShowAddForm,
}: any) => {
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  return (
    <>
      <Form.Group
        className={`
        mb-3 p-3 rounded border
        ${
          darkMode
            ? `bg-secondary bg-opacity-25 border-0`
            : `bg-dark bg-opacity-10`
        }
      `}
      >
        {!showAddForm ? (
          <h3
            className="fs-4 cursor-pointer"
            onClick={() => setShowAddForm(true)}
          >
            <FaCaretDown /> Add work Position
          </h3>
        ) : null}

        {showAddForm ? (
          <h3
            className="fs-4 cursor-pointer"
            onClick={() => setShowAddForm(false)}
          >
            <FaCaretUp /> Add work Position
          </h3>
        ) : null}

        {showAddForm ? (
          <>
            <div className="d-grid gap-2 cols-2">
              <div>
                <Form.Control
                  type="text"
                  value={company}
                  onChange={onChange}
                  placeholder="Company"
                  name="company"
                  className={`${
                    darkMode ? `bg-black text-light border-secondary` : ``
                  }`}
                />
              </div>

              <div>
                <Form.Control
                  type="text"
                  value={job}
                  onChange={onChange}
                  placeholder="Position"
                  name="job"
                  className={`${
                    darkMode ? `bg-black text-light border-secondary` : ``
                  }`}
                />
              </div>

              <div className="span-full">
                <Form.Control
                  type="text"
                  value={description}
                  onChange={onChange}
                  placeholder="Description"
                  name="description"
                  className={`${
                    darkMode ? `bg-black text-light border-secondary` : ``
                  }`}
                />
              </div>
            </div>
            {company.length === 0 ||
            job.length === 0 ||
            description.length === 0 ? (
              <div className="mt-2 text-danger">
                <FaAsterisk /> All fields are required
              </div>
            ) : (
              <div className="mt-2">
                <Button onClick={onAdd}>Add Position</Button>
              </div>
            )}
          </>
        ) : null}
      </Form.Group>
    </>
  );
};

export default AddItem;
