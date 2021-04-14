import React, { useEffect, useState, useMemo } from "react";
import "./App.css";
import axios from "axios";

import CategoriesList from "./CategoriesList/CategoriesList";
import CategoryInput from "./CategoryInput/CategoryInput";
import KeywordInput from "./KeywordInput/KeywordInput";

function App() {
  type KeywordsType = {
    _id: number;
    keyword_name: string;
  };

  type CategoryType = {
    _id: number;
    category_name: string;
    keywords: KeywordsType[];
  };
  const [categories, setCategories] = useState([] as CategoryType[]);
  const [loading, setLoading] = useState(false);
  const [loadingClass, setLoadingClass] = useState("loading");
  const [editMode, setEditMode] = useState(false);
  const [categoryInputActive, setCategoryInputActive] = useState("");
  const [keywordInputActive, setKeywordInputActive] = useState("");

  useEffect(() => {
    setLoading(true);
    fetchCategories();
  }, []);

  const transitionLoading: Function = () => {
    setLoadingClass("loading active");
    setTimeout(() => {
      setLoading(false);
      setLoadingClass("loading hide");
    }, 500);
  };

  const fetchCategories: Function = () => {
    axios
      .get("http://localhost:3000/categories")
      .then((result) => {
        const categories = result.data;
        setCategories(categories);
        transitionLoading();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editCategories: Function = () => {
    setEditMode(!editMode);
  };

  const openCategoryInput: Function = () => {
    setCategoryInputActive(" active");
  };

  const closeCategoryInput: Function = () => {
    setCategoryInputActive("");
  };

  const openKeywordInput: Function = () => {
    setKeywordInputActive(" active");
  };

  const closeKeywordInput: Function = () => {
    setKeywordInputActive("");
  };

  return (
    <div className="App">
      <div className={loadingClass}>
        <p>Loading...</p>
      </div>
      <div className="wrap">
        {loading ? (
          <div className="mainGrid">
            <div className="grid header" key="header">
              <span className="category">categories</span>
              <span className="keywords">keywords</span>
            </div>
            <div className="grid row" key="empty">
              <span className="category"></span>
              <span className="keywords"></span>
            </div>
          </div>
        ) : (
          <div className="mainGrid">
            <div className="grid header" key="header">
              <span className="category">categories</span>
              <span className="keywords">keywords</span>
            </div>
            <CategoriesList
              setLoading={setLoading}
              categories={categories}
              edit={editMode}
              fetchCategories={fetchCategories}
            />
          </div>
        )}
        <div>
          <CategoryInput
            setLoading={setLoading}
            fetchCategories={fetchCategories}
            closeInput={closeCategoryInput}
            active={categoryInputActive}
          />
          <KeywordInput
            setLoading={setLoading}
            fetchCategories={fetchCategories}
            categories={categories}
            closeInput={closeKeywordInput}
            active={keywordInputActive}
          />
        </div>
        <button
          className="mainButton"
          onClick={() => {
            openCategoryInput();
          }}
        >
          add new category.
        </button>
        <button
          className="mainButton"
          onClick={() => {
            openKeywordInput();
          }}
        >
          add new keyword.
        </button>
        <button
          className="mainButton"
          onClick={() => {
            editCategories();
          }}
        >
          edit.
        </button>
      </div>
    </div>
  );
}

export default App;
