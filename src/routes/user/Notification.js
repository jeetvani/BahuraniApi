const { Router } = require("express");
const uniqid = require("uniqid");
const router = Router();
const connection = require("../../database/connection");
const { logger } = require("../../config/logging");

const registerDeviceToken = router.post("/registerDeviceToken", (req, res) => {
  const data = req.body;
  const UserId = data.UserId;
  const DeviceToken = data.DeviceToken;
  const sql = `Insert into Notification_Tokens (Token,User_Id) values ('${DeviceToken}','${UserId} ')`;
  connection.query(sql, (err, result) => {
    if (err) {
      logger.error(err);
      res.send({ error: err, status: 500 });
    }
    if (result) {
      logger.info(`Device Token ${DeviceToken} registered successfully`);
      res.send({ status: 200 });
    }
  });
});

module.exports = { registerDeviceToken };
