const { Router, json } = require("express");
const uniqid = require("uniqid");
const router = Router();
const connection = require("../../database/connection");
const { logger } = require("../../config/logging");

const createCouponForUser = router.post("/CreateCouponForUser", (req, res) => {
  const { UserId, Value, Description } = req.body;
  const CouponId = uniqid({
    prefix: "Disc",
    length: 10,
  });

  const sql = ` INSERT INTO Coupons (CouponId, UserId, Value,  Description      ) VALUES ('${CouponId}', '${UserId}', '${Value}', '${Description}')`;

  connection.query(sql, (err, result) => {
    if (err) {
      logger.error(err);
      res.status(500).send("Error");
    } else {
      logger.info(`${CouponId} Coupon Created`);
      res.send({
        message: "Coupon Created",
        CouponId: CouponId,
        UserId: UserId,
        Value: Value,
        Description: Description,
      });
    }
  });
});

const createCouponForAllUsers = router.post(
  "/CreateCouponForAllUsers",
  (req, res) => {
    //get list of all users and run a loop to create a coupon for each user
    const { Value, Description } = req.body;
    const CouponId = uniqid({
      prefix: "Disc",
      length: 10,
    });

    const getAllUsersQuery = `SELECT * FROM Users`;
    connection.query(getAllUsersQuery, (err, result) => {
      if (err) throw err;
      if (result.length != 0) {
        const data = result;
        for (let i = 0; i < data.length; i++) {
          const UserId = data[i].UserId;
          const sql = ` INSERT INTO Coupons (CouponId, UserId, Value,  Description      ) VALUES ('${CouponId}', '${UserId}', '${Value}', '${Description}')`;
          connection.query(sql, (err, result) => {
            if (err) {
              logger.error(err);
              res.status(500).send("Error");
            } else {
              logger.info(`${CouponId} Coupon Created`);
            }
          });
        }
      } else {
        logger.info(`No Users found`);
        res.send({ msg: "No Users found", status: 404 });
      }
    });

    const sql = ` INSERT INTO Coupons (CouponId, UserId, Value,  Description      ) VALUES ('${CouponId}', '${UserId}', '${Value}', '${Description}')`;
  }
);
