const { Router } = require("express");
const uniqid = require("uniqid");
const router = Router();
const connection = require("../../database/connection");
const { logger } = require("../../config/logging");

//Check if product already exits in cart
const checkProductExitsInCart = router.post(
  "/checkProductExitsInCart",
  (req, res) => {
    logger.debug(`Request on ${req.path}`);

    const userId = req.body.UserId;
    const productId = req.body.ProductId;

    const checkProductExitsQuery = `SELECT * FROM Cart WHERE User_Id = '${userId}' AND JSON_CONTAINS(Cart_Data, JSON_OBJECT('ProductId','${productId}'))`;
    connection.query(checkProductExitsQuery, (err, result) => {
      if (err) {
        logger.error(err.sqlMessage);
        res.status(400).send(err.sqlMessage);
      }
      if (result.length > 0) {
        logger.info(`Product already exits in cart`);
        //send quantity of product
        const product = result[0];
        const cartData = JSON.parse(product.Cart_Data);
        const productData = cartData.filter((e) => {
          return e.ProductId == productId;
        });
        logger.info(productData);

        res.send({
          message: `Product already exits in cart`,
          status: 100,
          quantity: productData[0].Quantity,
        });
      }
      if (result.length === 0) {
        logger.info(`Product does not exits in cart`);
        res.send({
          message: `Product does not exits in cart`,
          status: 200,
        });
      }
    });
  }
);

//Add Product to cart
const addToCart = router.post("/addToCart", (req, res) => {
  logger.debug(
    `Request on ${req.path} for updating cart for user ${req.body.UserId}`
  );

  const userId = req.body.UserId;
  const productId = req.body.ProductId;
  const variantId = req.body.VariantId;
  const Quantity = req.body.Quantity;

  // Check if product already exits in cart
  const checkProductExitsQuery = `SELECT * FROM Cart WHERE User_Id = '${userId}' AND JSON_CONTAINS(Cart_Data, JSON_OBJECT('ProductId','${productId}'))`;
  connection.query(checkProductExitsQuery, (err, result) => {
    if (err) {
      logger.error(err.sqlMessage);
      res.status(400).send(err.sqlMessage);
    }
    if (result.length > 0) {
      logger.info(`Product already exits in cart`);
      res.send({
        message: `Product already exits in cart`,
        status: 400,
      });
    }
    if (result.length === 0) {
      logger.info(`Product does not exits in cart`);
      const productDataQuery = `SELECT * FROM Products WHERE ProductId = '${productId}'`;
      connection.query(productDataQuery, (err, result) => {
        if (err) {
          logger.error(err.sqlMessage);
          res.status(400).send(err.sqlMessage);
        }

        if (result.length === 0) {
          logger.error(`Product not found`);
          res.send({
            message: `There appears to be issue with the product you are trying to add to cart. Please try again later`,
            status: 400,
          });
        }
        // Check if product is available
        if (result.length > 0) {
          const product = result[0];
          const variants = JSON.parse(product.Variants);

          logger.info(variants);

          const variant = variants.filter((e) => {
            return e.id == variantId;
          });
          product.Variants = variant;
          const image = JSON.parse(product.ProductImages);
          const addToCartQuery = `Update  Cart set  Cart_Data=JSON_ARRAY_APPEND(Cart_Data, '$', JSON_OBJECT('ProductId','${productId}','Quantity','${Quantity}','Product_Name','${
            product.ProductName
          }','Product_Image','${image[0]}','Product_Description','${
            product.ProductDescription
          }','Product_Variants','${JSON.stringify(
            variant
          )}' ) ) where User_Id='${userId}'`;

          connection.query(addToCartQuery, (err, result) => {
            if (err) {
              logger.error(err.sqlMessage);
              res.status(400).send(err.sqlMessage);
            } else {
              logger.info(`Cart Updated`);
              res.status(200).send({
                message: `Product added to cart`,
                status: 200,
              });
            }
          });
        }
      });
    }
  });
});

//Decrease Product Quantity
const decreaseProductQuantity = router.post(
  "/decreaseProductQuantity",
  (req, res) => {
    logger.debug(`Request on ${req.path}`);
    const data = req.body;
    const userId = data.UserId;
    const productId = data.ProductId;
    //get index of product in cart
    const getCartDataQuery = `SELECT * FROM Cart WHERE User_Id = '${userId}' `;
    connection.query(getCartDataQuery, (err, result) => {
      if (err) {
        logger.error(err.sqlMessage);
        res.status(400).send(err.sqlMessage);
      }
      if (result.length === 0) {
        logger.info(`Product does not exits in cart`);
        res.send({
          message: `Product does not exits in cart`,
          status: 200,
        });
      }
      if (result.length > 0) {
        const cartData = JSON.parse(result[0].Cart_Data);
        const index = cartData.findIndex((e) => {
          return e.ProductId == productId;
        });
        logger.info(index);
        const increaseProductQuantityQuery = `UPDATE Cart SET Cart_Data = JSON_SET(Cart_Data, '$[${index}].Quantity', JSON_EXTRACT(Cart_Data, '$[${index}].Quantity') - 1) WHERE User_Id = '${userId}' AND JSON_CONTAINS(Cart_Data, JSON_OBJECT('ProductId','${productId}'))`;

        connection.query(increaseProductQuantityQuery, (err, result) => {
          if (err) {
            logger.error(err.sqlMessage);
            res.status(400).send(err.sqlMessage);
          } else {
            logger.info(`Product Quantity Increased`);
            res.send({ status: 200, message: `Product Quantity  Decreased` });
          }
        });
      }
    });
  }
);

const increaseProductQuantity = router.post(
  "/increaseProductQuantity",
  (req, res) => {
    logger.debug(`Request on ${req.path}`);
    const data = req.body;
    const userId = data.UserId;
    const productId = data.ProductId;
    //get index of product in cart
    const getCartDataQuery = `SELECT * FROM Cart WHERE User_Id = '${userId}' `;
    connection.query(getCartDataQuery, (err, result) => {
      if (err) {
        logger.error(err.sqlMessage);
        res.status(400).send(err.sqlMessage);
      }
      if (result.length === 0) {
        logger.info(`Product does not exits in cart`);
        res.send({
          message: `Product does not exits in cart`,
          status: 200,
        });
      }
      if (result.length > 0) {
        const cartData = JSON.parse(result[0].Cart_Data);
        const index = cartData.findIndex((e) => {
          return e.ProductId == productId;
        });
        logger.info(index);
        const increaseProductQuantityQuery = `UPDATE Cart SET Cart_Data = JSON_SET(Cart_Data, '$[${index}].Quantity', JSON_EXTRACT(Cart_Data, '$[${index}].Quantity') + 1) WHERE User_Id = '${userId}' AND JSON_CONTAINS(Cart_Data, JSON_OBJECT('ProductId','${productId}'))`;

        connection.query(increaseProductQuantityQuery, (err, result) => {
          if (err) {
            logger.error(err.sqlMessage);
            res.status(400).send(err.sqlMessage);
          } else {
            logger.info(`Product Quantity Increased`);
            res.send({ status: 200, message: `Product Quantity Increased` });
          }
        });
      }
    });
  }
);

//`Get Cart Data
const getCartData = router.post("/getCartData", (req, res) => {
  logger.debug(`Request on ${req.path}`);
  const UserId = req.body.UserId;
  const getCartDataQuery = `SELECT * FROM Cart WHERE User_Id = '${UserId}' `;
  connection.query(getCartDataQuery, (err, result) => {
    if (err) {
      logger.error(err.sqlMessage);
      res.status(400).send(err.sqlMessage);
    } else {
      //Parse Images from string to array
      const cartData = JSON.parse(result[0].Cart_Data);
      cartData.forEach((e) => {
        e.Product_Variants = JSON.parse(e.Product_Variants);
        delete e.Product_Description;
      });

      //send user how much he has to pay
      let total = 0;
      cartData.forEach((e) => {
        total += e.Product_Variants[0].ourPrice * e.Quantity;
      });

      //send user how much he has saved in cart
      let saved = 0;
      cartData.forEach((e) => {
        saved +=
          (e.Product_Variants[0].mrp - e.Product_Variants[0].ourPrice) *
          e.Quantity;
      });

      //send user how much he had to pay if he had bought all products at mrp
      let mrpTotal = 0;
      cartData.forEach((e) => {
        mrpTotal += e.Product_Variants[0].mrp * e.Quantity;
      });

      //send user the delivery charges
      let deliveryCharges = 0;

      logger.info(`Cart Data Fetched`);
      res.send({
        status: 200,
        data: cartData,
        total: total,
        saved: saved,
        mrpTotal: mrpTotal,
      });
    }
  });
});

//Delete Product From Cart Using ProductId
const deleteFromCartQuery = router.post("/deleteFromCart", (req, res) => {
  logger.debug(`Request on ${req.path}`);
  const userId = req.body.UserId;
  const ProductId = req.body.ProductId;

  //get index where product is present
  const getCartDataQuery = `SELECT * FROM Cart WHERE User_Id = '${userId}' `;
  connection.query(getCartDataQuery, (err, result) => {
    if (err) logger.error(err.sqlMessage);
    const cartData = JSON.parse(result[0].Cart_Data);
    const index = cartData.findIndex((e) => {
      return e.ProductId == ProductId;
    });
    const deleteFromCartQuery = `UPDATE Cart SET Cart_Data = JSON_REMOVE(Cart_Data, '$[${index}]') WHERE User_Id = '${userId}'`;
    connection.query(deleteFromCartQuery, (err, result) => {
      if (err) {
        logger.error(err.sqlMessage); 
        res.status(400).send(err.sqlMessage);
      } else {
        logger.info(`Product Deleted From Cart`);
        res.send({ status: 200, message: `Product Removed From Cart` });
      }
    });
  });
});

module.exports = {
  addToCart,
  deleteFromCartQuery,
  addToCart,
  getCartData,
  deleteFromCartQuery,
  increaseProductQuantity,
  decreaseProductQuantity,
  checkProductExitsInCart,
};
