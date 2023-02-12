const { Router } = require("express");
const uniqid = require("uniqid");
const router = Router();
const connection = require("../../database/connection");
const { logger } = require("../../config/logging");

const getAllProducts = router.get("/GetProducts", (req, res) => {
  connection.query("SELECT * FROM Products", (err, result) => {
    logger.info("querying for all products");
    if (err) {
      logger.error(err);
      res.status(500).send("Error");
    } else {
      //Parse images and Variants from string to array
      result.forEach((product) => {
        product.ProductImages = JSON.parse(product.ProductImages);
        product.Variants = JSON.parse(product.Variants);
        delete product.ProductDescription;

      });
      logger.info("sending all products");
      res.status(200).send(result);
      logger.info("sent all products");
    }
  });
});


const getProductById = router.get("/GetProductById/:id", (req, res) => {
  const { id } = req.params;

  connection.query(
    `SELECT * FROM Products WHERE ProductId = '${id}'`,
    (err, result) => {
      if (err) {
        logger.error(err);
        res.status(500).send("Error");
      } else {
        if (result.length === 0) {
          logger.info("No Product Found with this id ");
          res.status(404).send("No Product Found");
        } else {
          //Parse images and Variants from string to array
          result.forEach((product) => {
            product.ProductImages = JSON.parse(product.ProductImages);
            product.Variants = JSON.parse(product.Variants);
          });
          res.status(200).send(result);
        }
      }
    }
  );
});

module.exports = { getAllProducts, getProductById };
