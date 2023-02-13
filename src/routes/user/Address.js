const { Router } = require("express");
const uniqid = require("uniqid");
const router = Router();
const connection = require("../../database/connection");
const { logger } = require("../../config/logging");
const RazorPayInstance = require("../../config/razorPayConfig");

const getUserAddress = router.post("/getAddress", (req, res) => {
  const { UserId } = req.body;
  logger.info(`Fetching address for   `, UserId);
  const sql = `SELECT * FROM User_Addresses WHERE User_Id = '${UserId}'`;
  connection.query(sql, (err, result) => {
    if (err) {
      logger.error(err);
      res.send(err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      logger.info("Address Fetched Successfully");
      logger.info(result);
      res.send({
        status: "success",
        Addresses: result,
      });
    }
  });
});

const addAddress = router.post("/addAddress", (req, res) => {
  const { UserId, address, pin, Name, PhoneNumber } = req.body;
  const Address_Id = uniqid("Address_");
  const sql = `INSERT INTO User_Addresses (Address_Id,User_Id,Address,PinCode,Name,PhoneNumber) VALUES ('${Address_Id}','${UserId}','${address}','${pin}','${Name}','${PhoneNumber}')`;
  connection.query(sql, (err, result) => {
    if (err) {
      logger.error(err);
    } else {
      res.send({
        status: 200,
        message: "Address Added Successfully",
      });
    }
  });
});

const updateAddress = router.post("/editAddress", (req, res) => {
  const { Address_Id, address, pin, Name, PhoneNumber } = req.body;
  const sql = `UPDATE User_Addresses SET Address = '${address}', PinCode = '${pin}', Name = '${Name}', PhoneNumber = '${PhoneNumber}' WHERE Address_Id = '${Address_Id}'`;

  connection.query(sql, (err, result) => {
    if (err) {
      logger.error(err);
    } else {
      res.send({
        status: 200,
        message: "Address Updated Successfully",
      });
    }
  });
});

const deleteAddress = router.post("/deleteAddress", (req, res) => {
  const { Address_Id } = req.body;
  const sql = `DELETE FROM User_Addresses WHERE Address_Id = '${Address_Id}'`;
  connection.query(sql, (err, result) => {
    if (err) {
      logger.error(err);
    } else {
      res.send({
        status: 200,
        message: "Address Deleted Successfully",
      });
    }
  });
});

module.exports = { getUserAddress, addAddress, deleteAddress, updateAddress };
