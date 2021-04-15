import React, { useState } from "react";
import "./KeywordInput.css";
import api from "../client";

type KeywordsType = {
  _id: number;
  keyword_name: string;
};

type CategoryType = {
  _id: number;
  category_name: string;
  keywords: KeywordsType[];
};
type KeywordInputProps = {
  setLoading: Function;
  fetchCategories: Function;
  categories: CategoryType[];
  closeInput: Function;
  active: string;
};

const KeywordInput: Function = ({
  setLoading,
  fetchCategories,
  categories,
  closeInput,
  active,
}: KeywordInputProps) => {
  const [newKeyword, setNewKeyword] = useState({
    category_id: "",
    keyword_name: "",
  });
  const [categoryValidator, setCategoryValidator] = useState({
    class: "empty",
    text: "",
  });
  const [keywordValidator, setKeywordValidator] = useState({
    class: "empty",
    text: "",
  });

  const handleValidation: Function = () => {
    const categoryEmpty =
      newKeyword.category_id === "" || newKeyword.category_id === "0";
    const keywordEmpty = newKeyword.keyword_name === "";
    const keywordExist = categories.some((item) =>
      item.keywords.some(
        (item2) => item2.keyword_name === newKeyword.keyword_name
      )
    );

    if (categoryEmpty) {
      setCategoryValidator({
        class: "error",
        text: "This field should not be empty",
      });
    } else {
      setCategoryValidator({
        class: "empty",
        text: "",
      });
    }
    if (keywordEmpty) {
      setKeywordValidator({
        class: "error",
        text: "This field should not be empty",
      });
    } else if (keywordExist) {
      setKeywordValidator({
        class: "warning",
        text: "This category is already in database",
      });
    } else {
      setKeywordValidator({
        class: "empty",
        text: "",
      });
    }

    if (!categoryEmpty && !keywordEmpty && !keywordExist) {
      console.log("empty");

      addKeyword();
      setCategoryValidator({
        class: "empty",
        text: "",
      });
      setKeywordValidator({
        class: "empty",
        text: "",
      });
    }
  };

  const changeNewKeyword: Function = (event: any, type: string) => {
    if (type === "id") {
      setNewKeyword({ ...newKeyword, category_id: event.target.value });
    } else {
      setNewKeyword({ ...newKeyword, keyword_name: event.target.value });
    }
  };

  const addKeyword: Function = () => {
    if (newKeyword.keyword_name.length > 0 && newKeyword.category_id !== "")
      api
        .post("/keywords/" + newKeyword.category_id, {
          keyword_name: newKeyword.keyword_name,
        })
        .then(() => {
          setLoading(true);
          handleCloseInput();
        })
        .finally(() => fetchCategories())
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
    setNewKeyword({ category_id: "", keyword_name: "" });
    setCategoryValidator({
      class: "empty",
      text: "",
    });
    setKeywordValidator({
      class: "empty",
      text: "",
    });
    closeInput();
  };

  let categoryOptions = null;
  if (categories.length > 0) {
    categoryOptions = categories.map((category) => (
      <option value={category._id} key={category._id}>
        {category.category_name}
      </option>
    ));
  }

  return (
    <div
      className={"input-overlay" + active}
      onKeyDown={(event) => {
        handleKeyDown(event);
      }}
    >
      <div className="input-content">
        <div className="input-title">
          add new keyword.
          <span
            className="input-close"
            onClick={() => {
              handleCloseInput();
            }}
          ></span>
        </div>
        <select
          className="select"
          onChange={(event) => {
            changeNewKeyword(event, "id");
          }}
          value={newKeyword.category_id}
        >
          <option value="0"></option>
          {categoryOptions}
        </select>
        <span className={categoryValidator.class}>
          {categoryValidator.text}
        </span>
        <input
          className="input"
          onChange={(event) => {
            changeNewKeyword(event, "keyword");
          }}
          value={newKeyword.keyword_name}
        ></input>
        <span className={keywordValidator.class}>{keywordValidator.text}</span>
        <button
          className="input-button"
          onClick={() => {
            handleValidation();
          }}
        >
          ADD KEYWORD
        </button>
        <div />
      </div>
    </div>
  );
};

export default KeywordInput;
