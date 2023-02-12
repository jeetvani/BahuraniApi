const { Router } = require("express");
const uniqid = require("uniqid");
const router = Router();
const connection = require("../../database/connection");
const { logger } = require("../../config/logging");

const getAllCategories = router.get("/GetCategories", (req, res) => {
  connection.query("SELECT * FROM Categories", (err, result) => {
    if (err) {
      logger.error(err);
      res.status(500).send("Error");
    } else {
      res.status(200).send(result);
    }
  });
});

const getCategoryProducts = router.post("/GetCategoryProducts", (req, res) => {
  const { id } = req.body;
  connection.query(
    `SELECT * FROM Products WHERE CategoryId = '${id}'`,
    (err, result) => {
      if (err) {
        logger.error(err);
        res.status(500).send("Error");
      } else {
        //parse images from string to array
        result.forEach((product) => {
          product.ProductImages = JSON.parse(product.ProductImages);
          product.Variants = JSON.parse(product.Variants);
        });
        res.status(200).send(result);
      }
    }
  );
});
module.exports = { getAllCategories, getCategoryProducts };
