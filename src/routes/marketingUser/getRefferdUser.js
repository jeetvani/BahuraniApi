const { Router } = require("express");

const router = Router();
const connection = require("../../database/connection");
const { logger } = require("../../config/logging");

const getRefferdUsers = router.post("/getRefferdUsers", (req, res) => {
  const { UserId } = req.body;
  const sql = `SELECT * FROM Users WHERE Refferal_Code_Used = ${UserId}`;
  connection.query(sql, (err, result) => {
    if (err) {
      logger.error(`Error Fetching Refferd Users`);
      logger.error(err);

      res.send({
        status: 500,
        message: `Error Fetching Refferd Users`,
        RefferdUsers: result,
      });
    }
    if (result) {
      //Change key from BannerImage to img

      res.send({
        status: 200,
        message: `Refferd Users Fetched Successfully`,
        RefferdUsers: result,
      });
    }
  });
});
