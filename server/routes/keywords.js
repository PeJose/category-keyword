import express from "express";
import Category from "../models/category.js";
const router = express.Router();

router.get("/:categoryId", (req, res, next) => {
  const categoryId = req.params.categoryId;
  Category.findById(categoryId)
    .then((result) => {
      if (result !== null) {
        res.send(result.keywords);
      } else {
        res.send(null);
      }
    })
    .catch((error) => console.log(error));
});

router.post("/:categoryId", (req, res, next) => {
  const categoryId = req.params.categoryId;
  const keyword_name = req.body.keyword_name;
  Category.findByIdAndUpdate(categoryId, {
    $push: {
      keywords: {
        keyword_name: keyword_name,
      },
    },
  })
    .then((result) => res.send(result))
    .catch((error) => console.log(error));
});

router.delete("/:categoryId", (req, res, next) => {
  const categoryId = req.params.categoryId;
  const keyword_id = req.body.keyword_id;
  Category.findByIdAndUpdate(categoryId, {
    $pull: {
      keywords: {
        _id: keyword_id,
      },
    },
  })
    .then((result) => res.send(result))
    .catch((error) => console.log(error));
});

export default router;
