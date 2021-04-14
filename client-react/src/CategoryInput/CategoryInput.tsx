import axios from "axios";
import React, { useState } from "react";
import "./CategoryInput.css";

type CategoryInputProps = {
  setLoading: Function;
  fetchCategories: Function;
  closeInput: Function;
  active: string;
};

const CategoryInput = ({
  setLoading,
  fetchCategories,
  closeInput,
  active,
}: CategoryInputProps) => {
  const [newCategory, setNewCategory] = useState("");

  const changeNewCategory = (event: any) => {
    setNewCategory(event.target.value);
  };

  const addCategory = () => {
    if (newCategory.length > 0)
      axios
        .post("http://localhost:3000/categories", {
          category_name: newCategory,
        })
        .then(() => {
          setNewCategory("");
          closeInput();
          //   setLoading(true);
        })
        .finally(() => fetchCategories())
        .catch((error) => console.log(error));

    console.log(newCategory);
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      addCategory();
    } else if (event.key === "Escape") {
      closeInput();
    }
  };

  return (
    <div className={"input-overlay" + active} onKeyDown={handleKeyDown}>
      <div className="input-content">
        <div className="input-title">
          add new category.
          <span
            className="input-close"
            onClick={() => {
              closeInput();
            }}
          ></span>
        </div>
        <input
          className="input"
          value={newCategory}
          onChange={changeNewCategory}
        ></input>
        <div className="input-footer">
          <button
            className="input-button"
            onClick={() => {
              addCategory();
            }}
          >
            ADD CATEGORY
          </button>
        </div>
        <div />
      </div>
    </div>
  );
};

export default CategoryInput;
