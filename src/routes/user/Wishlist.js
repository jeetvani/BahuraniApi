const { Router } = require("express");
const uniqid = require("uniqid");
const router = Router();
const connection = require("../../database/connection");
const { logger } = require("../../config/logging");
const { CheckProductExitsInCart } = require("../../Functions/ProductInCart");

const addToWishlist = router.post("/addToWishlist", (req, res) => {
  logger.debug(`Request on ${req.path}`);
  const data = req.body;
  const userId = data.UserId;
  const productId = data.ProductId;
  const checkProductExitsQuery = `SELECT * FROM Wishlist WHERE User_Id = '${userId}' AND JSON_CONTAINS(Wishlist_Data, JSON_OBJECT('Product_Id','${productId}'))`;
  connection.query(checkProductExitsQuery, (err, result) => {
    if (err) {
      logger.error(err.sqlMessage);
      res.status(400).send(err.sqlMessage);
    }
    if (result.length > 0) {
      logger.info(`Product already exits in Wishlist`);
      //check if product is in cart and send quantity

      res.send({
        message: `Product already exits in Wishlist`,
        status: 400,
      });
    }
    if (result.length === 0) {
      logger.info(`Product does not exits in cart`);
      const addToWishlistQuery = `UPDATE Wishlist SET Wishlist_Data = JSON_ARRAY_APPEND(Wishlist_Data, '$', JSON_OBJECT('Product_Id', '${productId}')) WHERE User_Id = '${userId}'`;
      connection.query(addToWishlistQuery, (err, result) => {
        if (err) logger.error(err);
        if (result) {
          res.send({
            message: `Product added to wishlist`,
            status: 200,
          });
        }
      });
    }
  });
});

const checkProductExitsInWishlist = router.post(
  "/checkProductExitsInWishlist",
  (req, res) => {
    logger.debug(`Request on ${req.path}`);
    const data = req.body;
    const userId = data.UserId;
    const productId = data.ProductId;
    const checkProductExitsQuery = `SELECT * FROM Wishlist WHERE User_Id = '${userId}' AND JSON_CONTAINS(Wishlist_Data, JSON_OBJECT('Product_Id','${productId}'))`;
    connection.query(checkProductExitsQuery, (err, result) => {
      if (err) {
        logger.error(err.sqlMessage);
        res.status(400).send(err.sqlMessage);
      }
      if (result.length > 0) {
        logger.info(`Product already exits in Wishlist`);
        //check if product is in cart and send quantity

        res.send({
          message: `Product already exits in Wishlist`,
          status: 100,
        });
      }
      if (result.length === 0) {
        logger.info(`Product does not exits in wishlist`);
        res.send({
          message: `Product does not exits in Wishlist`,
          status: 200,
        });
      }
    });
  }
);

const getWishlist = router.post("/getWishlist", (req, res) => {
  logger.debug(`Request on ${req.path}`);
  const data = req.body;
  const userId = data.UserId;

  const getWishlistQuery = `SELECT * FROM Wishlist  WHERE User_Id = '${userId}' `;
  connection.query(getWishlistQuery, async (err, result) => {
    if (err) {
      logger.error(err);
      res.send({
        status: 400,
        message: err.sqlMessage,
      });
    }

    if (result) {
      var Wishlist = JSON.parse(result[0].Wishlist_Data);
      //run a loop to get product details
      for (let i = 0; i < Wishlist.length; i++) {
        const product = await CheckProductExitsInCart(
          userId,
          Wishlist[i].Product_Id
        );
        Wishlist[i].Product_Status = product;
      }

      res.send({
        status: 200,
        message: `Wishlist Fetched Successfully`,
        Wishlist: Wishlist,
      });
    }
  });
});

const getWishlistData = router.post("/getWishlistData", (req, res) => {
  res.send({
    info: "This query is deprecated",
    status: 400,
  });
});

const removeFromWishlist = router.post("/removeFromWishlist", (req, res) => {
  logger.debug(`Request on ${req.path}`);
  const data = req.body;
  const userId = data.UserId;
  const productId = data.ProductId;

  //get index where product is present
  const getWishlistQuery = `SELECT * FROM Wishlist  WHERE User_Id = '${userId}' `;
  connection.query(getWishlistQuery, async (err, result) => {
    if (err) {
      logger.error(err);
      res.send({
        status: 400,
        message: err.sqlMessage,
      });
    }
    if (result) {
      var Wishlist = JSON.parse(result[0].Wishlist_Data);
      for (let i = 0; i < Wishlist.length; i++) {
        if (Wishlist[i].Product_Id === productId) {
          Wishlist.splice(i, 1);
          break;
        }
      }
      const updateWishlistQuery = `UPDATE Wishlist SET Wishlist_Data = '${JSON.stringify(
        Wishlist
      )}' WHERE User_Id = '${userId}'`;
      connection.query(updateWishlistQuery, (err, result) => {
        if (err) logger.error(err);
        if (result) {
          res.send({
            message: `Product removed from wishlist`,
            status: 200,
          });
        }
      });
    }
  });
});

module.exports = {
  addToWishlist,
  checkProductExitsInWishlist,
  getWishlist,
  getWishlistData,
  removeFromWishlist,
};
