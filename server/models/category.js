import mongoose from "mongoose";

const Schema = mongoose.Schema;

const keywordSchema = new Schema(
  {
    keyword_name: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

const categorySchema = new Schema(
  {
    category_name: {
      type: String,
      required: true,
    },
    keywords: [keywordSchema],
  },
  { versionKey: false }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
