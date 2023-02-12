const { Router } = require("express");
const uniqid = require("uniqid");
const router = Router();
const connection = require("../../database/connection");
const { logger } = require("../../config/logging");
const RazorPayInstance = require("../../config/razorPayConfig");

const verifyPayment = router.post("/verifyPayment", async (req, res) => {
  const { order_id, payment_id, UserId } = req.body;
  const sql = `Select * FROM Orders WHERE Order_Id = '${order_id}'`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      logger.error("Order not found");
      res.send("Order not found");
    } else {
      const orderData = result[0];
      const paymentVerification = RazorPayInstance.payments.fetch(payment_id);
      paymentVerification
        .then((data) => {
          const { amount, currency, status } = data;
          if (status === "captured") {
            const sql2 = `Update Orders set Status='In Process' where Order_Id='${order_id}'`;
            connection.query(sql2);
            const updatePaymentStatus = `Update Orders set Payment_Status='Paid' where Order_Id='${order_id}'`;
            connection.query(updatePaymentStatus, (err, result) => {
              if (err) {
                console.log(err);
                res.send({
                  info: "Payment has not been verified",
                  status: 400,
                });
              }
              if (result) {
                //empty cart
                const sql = `Update Cart set Cart_Data= [] where User_Id='${UserId}'`;
                connection.query(sql  );
                res.send({
                  info: "Payment has been verified successfully",
                  status: 200,
                });
              }
            });
          } else {
            res.send({
              info: "Payment has not been verified",
              status: 400,
            });
          }
        })
        .catch((err) => {
          res.send({
            info: "Payment has not been verified",
            status: 400,
          });
        });
    }
  });
});

module.exports = { verifyPayment };
