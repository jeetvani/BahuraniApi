const { Router } = require("express");
const uniqid = require("uniqid");
const router = Router();
const stringArray = require("string-array");
const connection = require("../../database/connection");
const { logger } = require("../../config/logging");
const RazorPayInstance = require("../../config/razorPayConfig");

const getUserOrders = router.post("/getUserOrders", async (req, res) => {
  const UserId = req.body.UserId;

  const sql = `Select * FROM Orders WHERE User_Id = '${UserId}'`;

  connection.query(sql, async (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      logger.error("User not found");
      res.send({
        status: 400,
        info: "No Orders Found  ",
      });
    } else {
      const OrderData = result;

      //for loop to parse the json data
      for (let i = 0; i < OrderData.length; i++) {
        OrderData[i].Order_Data = JSON.parse(OrderData[i].Order_Data);

        OrderData[i].Address = JSON.parse(OrderData[i].Address);
        // parse the json data inside the order data
        
      }
      //List all names of the products
      //List all ids of the products
  

        


      res.send({
        info: "User Orders",
        OrderData: OrderData,
    
      });
    }
  });
});

module.exports = { getUserOrders };
