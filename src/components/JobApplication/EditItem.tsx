import useMediaQuery from "@/custom/hooks/useMediaQuery";
import React from "react";
import { Button, Form, FormFloating } from "react-bootstrap";
import { FaAsterisk } from "react-icons/fa";

const EditItem = ({ item, list, setList, handleUpdate }: any) => {
  const isMD = useMediaQuery("(min-width: 768px)");

  const handleInput = (e: any) => {
    const newList = list.map((li: any) =>
      li.id === item.id ? { ...li, [e.target.name]: e.target.value } : li
    );
    setList(newList);
  };

  const FormSection = () => {
    return (
      <Form.Group className="p-2 p-md-3 bg-primary bg-opacity-10">
        <div className="d-grid gap-2 cols-2">
          <div>
            <FormFloating>
              <Form.Control
                type="text"
                id="editjobcomp"
                placeholder="Company"
                name="company"
                value={item.company}
                onChange={handleInput}
                className="shadow-sm"
              />
              <label htmlFor="editjobcomp">Company Name</label>
            </FormFloating>
          </div>
          <div>
            <FormFloating>
              <Form.Control
                type="text"
                id="editjob"
                placeholder="Position"
                name="job"
                value={item.job}
                onChange={handleInput}
                className="shadow-sm"
              />
              <label htmlFor="editjob">Position</label>
            </FormFloating>
          </div>
          <div className="span-full">
            <FormFloating>
              <Form.Control
                type="text"
                id="editdescribe"
                placeholder="Description"
                name="description"
                value={item.description}
                onChange={handleInput}
                className="shadow-sm"
              />
              <label htmlFor="editdescribe">Description</label>
            </FormFloating>
          </div>
        </div>

        {item.company.length === 0 ||
        item.job.length === 0 ||
        item.description.length === 0 ? (
          <Form.Text>
            <span className="text-danger">
              <FaAsterisk /> All fields Required{" "}
            </span>
          </Form.Text>
        ) : (
          <Button
            variant="success"
            onClick={handleUpdate}
            className="m-2 mt-md-3 mx-md-0 z-index-1 bg-success"
          >
            Update
          </Button>
        )}
      </Form.Group>
    );
  };

  return <></>;
};

export default EditItem;
