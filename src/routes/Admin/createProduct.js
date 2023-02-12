const { Router, json } = require("express");
const uniqid = require("uniqid");
const router = Router();
const connection = require("../../database/connection");
const { logger } = require("../../config/logging");

const createProduct = router.post("/CreateProduct", (req, res) => {
  const {
    ProductName,
    ProductDescription,
    Variants,
    ProductImage,
    ProductCategory,
    CategoryId,
  } = req.body;

  const ProductId = uniqid("BahuraniProduct");
  connection.query(
    `INSERT INTO products (ProductId, ProductName, ProductDescription, Variants, ProductImages, Category,CategoryId) VALUES ('${ProductId}', '${ProductName}', '${ProductDescription}', '${JSON.stringify(
      Variants
    )}', '${JSON.stringify(
      ProductImage
    )}', '${ProductCategory}','${CategoryId}')`,
    (err, result) => {
      if (err) {
        logger.error(err);
        res.status(500).send("Error");
      } else {
        res.send({
          message: "Product Created",
          ProductId: ProductId,
          ProductName: ProductName,
        });
      }
    }
  );
});




//write a route to edit the product
const editProduct = router.post("/EditProduct", (req, res) => {
  const {
    ProductName,
    ProductDescription,
    Variants,
    ProductImage,
    ProductCategory,
    CategoryId,
    ProductId,
  } = req.body;

  connection.query(
    `UPDATE products SET ProductName = '${ProductName}', ProductDescription = '${ProductDescription}', Variants = '${JSON.stringify(
      Variants
    )}', ProductImages = '${JSON.stringify(
      ProductImage
    )}', Category = '${ProductCategory}', CategoryId = '${CategoryId}' WHERE ProductId = '${ProductId}'`,
    (err, result) => {
      if (err) {
        logger.error(err);
        res.status(500).send("Error");
      } else {
        res.send({
          message: "Product Edited",
          ProductId: ProductId,
          ProductName: ProductName,
        });
      }
    }
  );
});


//write a route to delete the product
const deleteProduct = router.post("/DeleteProduct", (req, res) => {
  const { ProductId } = req.body;

  connection.query(
    `DELETE FROM products WHERE ProductId = '${ProductId}'`,
    (err, result) => {
      if (err) {
        logger.error(err);
        res.status(500).send("Error");
      } else {
        res.send({

          message: "Product Deleted",
          ProductId: ProductId,
        });
      }
    }
  );
});

//write a route to get all the products
const getAllProducts = router.post("/GetAllProducts", (req, res) => {
  connection.query(
    `SELECT * FROM products`,
    (err, result) => {
      if (err) {
        logger.error(err);
        res.status(500).send("Error");
      } else {
        res.send({
          message: "All Products",
          Products: result,
        });
      }
    }
  );
});




module.exports = { createProduct ,editProduct};
 