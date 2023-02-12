const { Router } = require("express");
const uniqid = require("uniqid");
const router = Router();
const connection = require("../../database/connection");
const { logger } = require("../../config/logging");
const RazorPayInstance = require("../../config/razorPayConfig");
const moment = require("moment");
const OrderDate = moment().format("DD-MM-YYYY");
const createSingleProductOrder = router.post(
  "/createSingleProductOrder",
  async (req, res) => {
    const orderStatus = "In Process";
    const ProductId = req.body.ProductId;
    const UserId = req.body.UserId;
    const Quantity = req.body.Quantity;
    const VariantId = req.body.VariantId;
    const Address = req.body.Address;
    const PaymentMethod = req.body.PaymentMethod;

    //Check if product exists
    const sql = `Select * FROM Products WHERE ProductId = '${ProductId}'`;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      if (result.length === 0) {
        logger.error("Product not found");
        res.send("Product not found");
      } else {
        let productData = result[0];
        //remove Product_Description from productData
        delete productData.Product_Description;
        const variant = JSON.parse(productData.Variants).filter((e) => {
          return e.id == VariantId;
        });

        const finalPrice = Quantity * parseFloat(variant[0].price);
        productData.Variants = variant;

        RazorPayInstance.orders
          .create({
            amount: finalPrice,
            currency: "INR",
            receipt: "Reciept For Bahurani Order",
            notes: {
              key1: "value3",
              key2: "value2",
            },
          })
          .then((data) => {
            const order_id = data.id;
            const orderEntrySql = `INSERT INTO Orders (Order_Id,Order_Data,Address,User_Id,Status,Payment_Method) VALUES('${order_id}','[]','${Address}','${UserId}','${orderStatus}','${PaymentMethod}')`;
            connection.query(orderEntrySql);
            res.send({
              info: "Order has been created successfully",
              order_id: order_id,
              status: 200,
              PaymentMethod: PaymentMethod,
              amount: finalPrice,
            });
            console.log(data);
            const sql2 =
              "Update Orders set  Order_Data=JSON_ARRAY_APPEND(Order_Data, '$', JSON_OBJECT('ProductData'," +
              "'" +
              `${JSON.stringify(productData)}` +
              "')) where Order_Id=" +
              "'" +
              order_id +
              "'";
            connection.query(sql2);
            logger.info("Order has been created");
          })
          .catch((err) => {
            res.send(err);
          });
      }
    });
  }
);

const checkOutCart = router.post("/CheckOutCart", (req, res) => {
  logger.info(`CheckOutCart for user ${req.body.userId}`);
  //Calculate Amount In Cart
  const userId = req.body.UserId;
  const Address = req.body.Address;
  const PaymentMethod = req.body.PaymentMethod;
  const CouponId = req.body.CouponId;
  const sql = `Select Cart_Data FROM Cart WHERE User_Id = '${userId}'`;
  connection.query(sql, (err, result) => {
    const orderStatus =
      PaymentMethod == "Cash On Delivery" ? "In Process" : "Not Confirmed";

    if (err) throw err;
    if (result.length === 0) {
      logger.error("Cart is empty");
      res.send("Cart is empty");
    } else {
      let cartData = result[0].Cart_Data;
      let data = JSON.parse(cartData);

      var totalAmount = 0;
      data.forEach((e) => {
        delete e.Product_Description;

        let price = JSON.parse(e.Product_Variants)[0].ourPrice;
        logger.info(`Price of ${e.Product_Name} is ${price}`);
        logger.info(`Quantity of ${e.Product_Name} is ${e.Quantity}`);
        totalAmount += parseFloat(price) * parseInt(e.Quantity);
        logger.info(`Total Amount is ${totalAmount}`);
      });
      // Create Order in RazorPay
      //Validate Coupon Code if exists and apply discount
      const sql = `Select * FROM Coupons WHERE CouponId = '${CouponId}'`;
      connection.query(sql, (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
          logger.error("Coupon not found");
        } else {
          let couponData = result[0];
          let discount = couponData.Value;
          totalAmount = totalAmount - discount;
          logger.info(`Total Amount after discount is ${totalAmount}`);
        }
      });

      RazorPayInstance.orders
        .create({
          amount: totalAmount * 100,
          currency: "INR",
          receipt: "Reciept For Bahurani Order",
          notes: {
            key1: "value3",
            key2: "value2",
          },
        })
        .then((razorPayResponse) => {
          logger.info(`Order Created in RazorPay`);
          const order_id = razorPayResponse.id;
          logger.info(`Order Id is ${order_id}`);

          // Create Order in Database
          const orderEntrySql = `INSERT INTO Orders (Order_Id,Order_Data,Address,User_Id,Status,Payment_Method,Amount,OrderDate) VALUES('${order_id}','[]','${Address}','${userId}','${orderStatus}','${PaymentMethod}','${totalAmount}','${OrderDate}')`;

          connection.query(orderEntrySql, (err, result) => {
            if (err) logger.error(err);
            logger.info(`Order Created in Database`);

            // Update Order Data in Database
            data.forEach((e) => {
              e.Product_Variants = JSON.parse(e.Product_Variants);
              e.ourPrice = e.Product_Variants[0].ourPrice;
              e.VariantName = e.Product_Variants[0].name;
              e.mrp = e.Product_Variants[0].mrp;
              delete e.Product_Variants;

              // append product data to order data

              // dont set product data as string
              const sql2 = `Update Orders set  Order_Data=JSON_ARRAY_APPEND(Order_Data, '$', JSON_OBJECT('ProductData',JSON_OBJECT('ProductName','${e.Product_Name}',
'ProductImage','${e.Product_Image}',
'Quantity','${e.Quantity}',
'VariantName','${e.VariantName}',
'ourPrice','${e.ourPrice}',
'mrp','${e.mrp}',
'Product_Id','${e.ProductId}'
)
)) where Order_Id="${order_id}"`;
              // const sql2 =
              //   "Update Orders set  Order_Data=JSON_ARRAY_APPEND(Order_Data, '$', JSON_OBJECT('ProductData'," +
              //   "'" +
              //   `[${(e)}]` +
              //   "')) where Order_Id=" +
              //   "'" +
              //   order_id +
              //   "'";
              connection.query(sql2, (err, result) => {
                if (err) throw err;
                logger.info(`Product Data Updated in Database`);
              });
            });

            res.send({
              info: "Order has been created successfully",
              order_id: order_id,
              status: 200,
              PaymentMethod: PaymentMethod,
              amount: totalAmount,
            });

            logger.info(`Order Id sent to client`);
          });
        });
    }
  });
});
module.exports = { createSingleProductOrder, checkOutCart };
