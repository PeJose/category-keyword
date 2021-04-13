import express from "express";
import Category from "../models/category.js";

const router = express.Router();

/* GET users listing. */
router.get("/", (req, res, next) => {
  Category.find()
    .then((result) => res.send(result))
    .catch((error) => console.log(error));
});

router.post("/", (req, res, next) => {
  const category_name = req.body.category_name;
  const category = new Category({
    category_name: category_name,
  });

  category
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((error) => console.log(error));
});

router.delete("/:categoryId", (req, res, next) => {
  const categoryId = req.params.categoryId;
  Category.findByIdAndDelete(categoryId)
    .then((result) => res.send(result))
    .catch((error) => console.log(error));
});

export default router;
