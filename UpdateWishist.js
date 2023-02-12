const { Router } = require("express");
const uniqid = require("uniqid");
const router = Router();
const connection = require("../../database/connection");
const { logger } = require("../../config/logging");

const addToWishlist = router.post("/addToWishlist", (req, res) => {
  logger.debug(`Request on ${req.path}`);
  const data = req.body;
  const userId = data.userId;
  const productId = data.productId;
  const quantity = data.quantity;
  const price = data.price;
  const total = data.total;
  const optionId = data.optionId;

  const addToWishlistQuery = `INSERT INTO Wishlist (Wishlist_Id, User_Id, Product_Id, Quantity, Price, Total, Size, Color, Name, Image) VALUES ('${cartId}', '${userId}', '${productId}', '${quantity}', '${price}', '${total}', '${optionId}',`;
  connection.query(addToWishlistQuery, (err, result) => {
    if (err) logger.error(err);
    if (result) {
      logger.info(`Wishlist updated at  ${userId}`);
      res.send({ message: `Wishlist Updated`, status: 200 });
    }
  });
});
