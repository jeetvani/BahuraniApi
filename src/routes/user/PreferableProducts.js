const { Router } = require("express");
const uniqid = require("uniqid");
const router = Router();
const connection = require("../../database/connection");
const { logger } = require("../../config/logging");

const getPreferableProducts = router.post(
  "/getPreferableProducts",
  (req, res) => {
    //select first 6 products
    const sql = `SELECT * FROM Products LIMIT 6`;
    connection.query(sql, (err, result) => {
      if (err) {
        logger.error(err);
        res.send({
          status: 500,
          message: `Error Fetching Preferable Products`,
        });
      }
      if (result) {
        //Parse images from string to array
        result.forEach((product) => {
          product.ProductImages = JSON.parse(product.ProductImages);

          product.Variants = JSON.parse(product.Variants);
          delete product.ProductDescription;
        });
        res.send({
          status: 200,
          message: `Preferable Products Fetched Successfully`,
          PreferableProducts: result,
        });
      }
    });
  }
);
module.exports = { getPreferableProducts };
