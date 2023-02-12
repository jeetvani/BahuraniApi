const { Router } = require("express");
const uniqid = require("uniqid");
const router = Router();
const connection = require("../../database/connection");
const { logger } = require("../../config/logging");

router.post("/checkPhoneNumber", (req, res) => {
  const data = req.body;
  const PhoneNumber = data.PhoneNumber;
  logger.info(`Checking ${data.phoneNumber}  exits`);
  const checkPhoneNumberQuery = `SELECT * FROM User WHERE PhoneNumber = '${data.PhoneNumber}' `;
  connection.query(checkPhoneNumberQuery, (err, result) => {
    if (err) throw err;
    if (result.length != 0)
      logger.info(`PhoneNumber ${data.phoneNumber} already exits`),
        res.send({ msg: "Phone Number already exists", perform: "login" });
    else {
      logger.info(`PhoneNumber ${data.phoneNumber} does not exits ..`);
      res.send({ msg: "Phone Number does not exists", perform: "signup" });
    }
  });
});
module.exports = router;
