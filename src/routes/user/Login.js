const { Router } = require("express");
const uniqid = require("uniqid");
const router = Router();
const connection = require("../../database/connection");
const { logger } = require("../../config/logging");
router.post("/Login", (req, res) => {
  logger.debug(`Request on ${req.path}`);

  const data = req.body;
  const phoneNumber = data.phoneNumber;
  logger.info(`Checking ${data.phoneNumber}  exits`);
  connection.query(
    `SELECT * FROM User WHERE PhoneNumber = '${data.phoneNumber}' `,
    (err, result) => {
      if (err) throw err;
      if (result.length != 0) {
        logger.info(
          `PhoneNumber ${data.phoneNumber} does  exits .. proceeding further`
        );
        res.send({ UserId: result[0].User_Id, status: 200 });
      } else {
        logger.error(`PhoneNumber ${data.phoneNumber} does not exits`);
        res.send({ error: "Phone Number does not exists" });
      }
    }
  );
});
module.exports = router;
