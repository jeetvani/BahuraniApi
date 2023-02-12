const { Router, json } = require("express");
const uniqid = require("uniqid");
const router = Router();
const connection = require("../../database/connection");
const { logger } = require("../../config/logging");

const createCategory = router.post("/CreateCategory", (req, res) => {
  const { CategoryName } = req.body;
  const { CategoryImage } = req.body;
  const CategoryId = uniqid("BahuraniCategory");
  connection.query(
    `INSERT INTO categories (CategoryId, CategoryName,CategoryImage) VALUES ('${CategoryId}', '${CategoryName}', '${CategoryImage}')`,
    (err, result) => {
      if (err) {
        logger.error(err);
        res.status(500).send("Error");
      } else {
        logger.info(`${CategoryName} Category Created`);
        res.send({
          message: "Category Created",
          CategoryId: CategoryId,
          CategoryName: CategoryName,
        });
      }
    }
  );
});
module.exports = { createCategory };
