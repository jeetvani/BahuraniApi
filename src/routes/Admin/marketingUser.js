const { Router } = require("express");
const uniqid = require("uniqid");
const router = Router();
const connection = require("../../database/connection");
const { logger } = require("../../config/logging");

const makeMarketingUser = router.post("/makeMarketingUser", (req, res) => {
  const { userId } = req.body;
  const sql = `UPDATE User SET isMarketingUser = true WHERE User_Id = '${userId}'`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    if (result) {
      res.send({
        status: 200,
        message: `User is now a Marketing User`,
      });
    }
  });
});

const getMarketingUsers = router.post("/getMarketingUsers", (req, res) => {
  const sql = `SELECT * FROM User WHERE isMarketingUser = true`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    if (result) {
      res.send({
        status: 200,
        message: `Marketing Users Fetched Successfully`,
        MarketingUsers: result,
      });
    }
  });
});

const removeMarketingUser = router.post("/removeMarketingUser", (req, res) => {
  const { userId } = req.body;
  const sql = `UPDATE User SET isMarketingUser = false WHERE User_Id = '${userId}'`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    if (result) {
      res.send({
        status: 200,
        message: `User is no longer a Marketing User`,
      });
    }
  });
});
module.exports = { makeMarketingUser, getMarketingUsers, removeMarketingUser };
