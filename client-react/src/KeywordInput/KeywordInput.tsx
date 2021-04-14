import React, { useState } from "react";
import axios from "axios";
import "./KeywordInput.css";

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

  const changeNewKeyword: Function = (event: any, type: string) => {
    if (type === "id") {
      setNewKeyword({ ...newKeyword, category_id: event.target.value });
    } else {
      setNewKeyword({ ...newKeyword, keyword_name: event.target.value });
    }
  };

  const addKeyword: Function = () => {
    if (newKeyword.keyword_name.length > 0 && newKeyword.category_id !== "")
      axios
        .post("http://localhost:3000/keywords/" + newKeyword.category_id, {
          keyword_name: newKeyword.keyword_name,
        })
        .then(() => {
          setNewKeyword({ category_id: "", keyword_name: "" });
          closeInput();
          //   setLoading(true);
        })
        .finally(() => fetchCategories())
        .catch((error) => console.log(error));
    console.log(newKeyword);
  };

  let categoryOptions = null;
  if (categories.length > 0) {
    categoryOptions = categories.map((category) => (
      <option value={category._id} key={category._id}>
        {category.category_name}
      </option>
    ));
  }

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      addKeyword();
    } else if (event.key === "Escape") {
      closeInput();
    }
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
          add new keyword.
          <span
            className="input-close"
            onClick={() => {
              closeInput();
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
        <input
          className="input"
          onChange={(event) => {
            changeNewKeyword(event, "keyword");
          }}
          value={newKeyword.keyword_name}
        ></input>
        <button
          className="input-button"
          onClick={() => {
            addKeyword();
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
