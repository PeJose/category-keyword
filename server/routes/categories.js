import express from "express";
import Category from "../models/category.js";
import axios from "axios";

const router = express.Router();

/* GET users listing. */
router.get("/", (req, res, next) => {
  Category.find()
    .then((result) => res.send(result))
    .catch((error) => console.log(error));
});

router.post("/", async (req, res, next) => {
  const category_name = req.body.category_name;
  await axios
    .get(process.env.OPTIONAL_TASK_URL + "?max=10&ml=" + category_name)
    .then((result) => {
      const keywords = result.data.map((item) => {
        return { keyword_name: item.word };
      });
      const category = new Category({
        category_name: category_name,
        keywords: keywords,
      });

      category
        .save()
        .then((result) => {
          res.send(result);
        })
        .catch((error) => console.log(error));
    });
});

router.delete("/:categoryId", (req, res, next) => {
  const categoryId = req.params.categoryId;
  Category.findByIdAndDelete(categoryId)
    .then((result) => res.send(result))
    .catch((error) => console.log(error));
});

export default router;
