import React from "react";
import axios from "axios";
import "./CategoriesList.css";

type KeywordsType = {
  _id: number;
  keyword_name: string;
};

type CategoryType = {
  _id: number;
  category_name: string;
  keywords: KeywordsType[];
};

type CategoriesListProps = {
  setLoading: Function;
  categories: CategoryType[];
  edit: boolean;
  fetchCategories: Function;
};

const CategoriesList = ({
  setLoading,
  categories,
  edit,
  fetchCategories,
}: CategoriesListProps) => {
  const deleteKeyword: Function = (category_id: string, keyword_id: string) => {
    axios
      .delete("http://localhost:3000/keywords/" + category_id, {
        data: {
          keyword_id: keyword_id,
        },
      })
      // .then(setLoading(true))
      .finally(() => fetchCategories())
      .catch((error) => console.log(error));
  };

  const deleteCategory: Function = (category_id: string) => {
    axios
      .delete("http://localhost:3000/categories/" + category_id, {})
      // .then(setLoading(true))
      .finally(() => fetchCategories())
      .catch((error) => console.log(error));
  };

  const editShake = edit ? " shake" : "";
  let categoriesList = null;

  if (categories.length > 0) {
    categoriesList = categories.map((category) => (
      <div className="grid row" key={"row" + category._id}>
        <span
          className={"category" + editShake}
          key={"category" + category._id}
        >
          <p key={"p" + category._id}>
            {category.category_name}
            {edit ? (
              <span
                className="close"
                onClick={() => {
                  deleteCategory(category._id);
                }}
                key={"close" + category._id}
              ></span>
            ) : (
              <span key={"close" + category._id}></span>
            )}
          </p>
        </span>
        <span
          className={"keywords" + editShake}
          key={"keywords" + category._id}
        >
          {category.keywords.map((keyword) => (
            <p key={"p" + keyword._id}>
              {keyword.keyword_name}
              {edit ? (
                <span
                  className="close"
                  onClick={() => {
                    deleteKeyword(category._id, keyword._id);
                  }}
                  key={"close" + keyword._id}
                ></span>
              ) : (
                <span key={"close" + keyword._id}></span>
              )}
            </p>
          ))}
        </span>
      </div>
    ));
  }
  return <div>{categoriesList}</div>;
};

export default CategoriesList;
