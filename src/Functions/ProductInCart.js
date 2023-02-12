const { Router } = require("express");

const connection = require("../database/connection");
const { logger } = require("../../src/config/logging");

const CheckProductExitsInCart = (UserId, ProductId) => {
  return new Promise((resolve, reject) => {
    const checkProductExitsQuery = `SELECT * FROM Cart WHERE User_Id = '${UserId}' AND JSON_CONTAINS(Cart_Data, JSON_OBJECT('ProductId','${ProductId}'))`;
    const getAllProductsFromCart = `Select * from Cart where User_Id =  '${UserId}' `;
    connection.query(getAllProductsFromCart, (err, result) => {
      if (err) {
        logger.error(err.sqlMessage);
        reject(err.sqlMessage);
      }
      if (result.length > 0) {
        const CartData = JSON.parse(result[0].Cart_Data);
        const resultData = CartData.filter((e) => {
          return e.ProductId == ProductId;
        });
        if (resultData.length > 0) {
          resolve({
            message: `Product already exits in cart`,
            status: 100,
            quantity: resultData[0].Quantity,
            name: resultData[0].Product_Name,

            Product_Variants: JSON.parse(resultData[0].Product_Variants)[0],
            ProductId: resultData[0].ProductId,
            exitsInCart: true,
            Image: resultData[0].Product_Image,
          });
        } else {
          //get product details from product table and send
          const getProductDetailsQuery = `SELECT * FROM Products WHERE ProductId = '${ProductId}'`;
          connection.query(getProductDetailsQuery, (err, result) => {
            if (err) {
              logger.error(err.sqlMessage);
              reject(err.sqlMessage);
            }
            if (result.length > 0) {
              const Image = JSON.parse(result[0].ProductImages)[0];
              const Product_Variants = JSON.parse(result[0].Variants)[0];
              logger.info(`Product does not exits in cart`);
              const product = result[0];
              resolve({
                message: `Product does not exits in cart`,
                status: 200,
                exitsInCart: false,
                ProductId: product.ProductId,
                name: product.ProductName,
                Image: Image,
                Product_Variants: Product_Variants,
              });
            }
          });
        }
      }
    });
    // connection.query(checkProductExitsQuery, (err, result) => {
    //   if (err) {
    //     logger.error(err.sqlMessage);
    //     reject(err.sqlMessage);
    //   }
    //   if (result.length > 0) {
    //     logger.info(`Product already exits in cart`);
    //     //send quantity of product
    //     const product = result[0];
    //     const cartData = JSON.parse(product.Cart_Data);

    //     const productData = cartData.filter((e) => {
    //       return e.ProductId == ProductId;
    //     });
    //     logger.info(productData);
    //     //send Product_Variants
    //     const ProductData = JSON.parse(result[0].Cart_Data);
    //     resolve({
    //       message: `Product already exits in cart`,
    //       status: 100,
    //       quantity: ProductData[0].Quantity,
    //       name: ProductData[0].Product_Name,
    //       Product_Variants: JSON.parse(ProductData[0].Product_Variants)[0],
    //       ProductId: ProductData[0].ProductId,
    //       exitsInCart: true,
    //       Image: ProductData[0].Product_Image,
    //     });
    //   }
    //   if (result.length === 0) {
    //     //get product details from product table and send
    //     const getProductDetailsQuery = `SELECT * FROM Products WHERE ProductId = '${ProductId}'`;
    //     connection.query(getProductDetailsQuery, (err, result) => {
    //       if (err) {
    //         logger.error(err.sqlMessage);
    //         reject(err.sqlMessage);
    //       }
    //       if (result.length > 0) {
    //         const Image = JSON.parse(result[0].ProductImages)[0];
    //         const Product_Variants = JSON.parse(result[0].Variants)[0];
    //         logger.info(`Product does not exits in cart`);
    //         const product = result[0];
    //         resolve({
    //           message: `Product does not exits in cart`,
    //           status: 200,
    //           exitsInCart: false,
    //           ProductId: product.ProductId,
    //           name: product.ProductName,
    //           Image: Image,
    //           Product_Variants: Product_Variants,
    //         });
    //       }
    //     });
    //   }
    // });
  });
};

module.exports = { CheckProductExitsInCart };
