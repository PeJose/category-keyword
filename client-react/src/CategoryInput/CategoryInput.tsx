import React, { useState } from "react";
import api from "../client";
import "./CategoryInput.css";
import { toast } from "react-toastify";

type KeywordsType = {
  _id: number;
  keyword_name: string;
};

type CategoryType = {
  _id: number;
  category_name: string;
  keywords: KeywordsType[];
};

type CategoryInputProps = {
  setLoading: Function;
  fetchCategories: Function;
  closeInput: Function;
  active: string;
  categories: CategoryType[];
};

const CategoryInput = ({
  setLoading,
  fetchCategories,
  closeInput,
  active,
  categories,
}: CategoryInputProps) => {
  const [newCategory, setNewCategory] = useState("");
  const [newCategoryValidation, setNewCategoryValidation] = useState({
    class: "empty",
    text: "",
  });

  const handleValidation: Function = () => {
    if (newCategory === "") {
      setNewCategoryValidation({
        class: "error",
        text: "This field should not be empty",
      });
    } else if (categories.some((item) => item.category_name === newCategory)) {
      setNewCategoryValidation({
        class: "warning",
        text: "This category is already in database",
      });
    } else {
      addCategory();
      setNewCategoryValidation({
        class: "empty",
        text: "",
      });
    }
  };

  const changeNewCategory: Function = (event: any) => {
    setNewCategory(event.target.value);
  };

  const addCategory: Function = () => {
    if (newCategory.length > 0)
      api
        .post("/categories", {
          category_name: newCategory,
        })
        .then(() => {
          setLoading(true);
          handleCloseInput();
        })
        .finally(() => {
          fetchCategories();
          toast.success("Succesfully deleted keyword!");
        })
        .catch((error) => console.log(error));
  };

  const handleKeyDown: Function = (event: any) => {
    if (event.key === "Enter") {
      handleValidation();
    } else if (event.key === "Escape") {
      handleCloseInput();
    }
  };

  const handleCloseInput: Function = () => {
    setNewCategory("");
    setNewCategoryValidation({
      class: "empty",
      text: "",
    });
    closeInput();
  };

  return (
    <div
      className={"input-overlay" + active}
      onKeyDown={(event) => {
        handleKeyDown(event);
      }}
    >
      <div className="input-content">
        <div className="input-title">
          add new category.
          <span
            className="input-close"
            onClick={() => {
              handleCloseInput();
            }}
          ></span>
        </div>
        <input
          className="input"
          value={newCategory}
          onChange={(event) => {
            changeNewCategory(event);
          }}
        ></input>
        <span className={newCategoryValidation.class}>
          {newCategoryValidation.text}
        </span>
        <div className="input-footer">
          <button
            className="input-button"
            onClick={() => {
              handleValidation();
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
