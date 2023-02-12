const { Router, json } = require("express");
const uniqid = require("uniqid");
const router = Router();
const connection = require("../../database/connection");
const { logger } = require("../../config/logging");

const sendNotification = router.post("/SendNotification", (req, res) => {
  const { Title, Message, Image } = req.body;
  const NotificationId = uniqid("BahuraniNotification");
  const sql = ` INSERT INTO Notifications (NotificationId, Title, Message, Image) VALUES ('${NotificationId}', '${Title}', '${Message}', '${Image}')`;
});
