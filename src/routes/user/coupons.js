const { Router } = require("express");
const uniqid = require("uniqid");
const router = Router();
const connection = require("../../database/connection");
const { logger } = require("../../config/logging");

const validateCoupon = router.post("/validateCoupon", (req, res) => {
  const data = req.body;
  const CouponId = data.CouponId;
  logger.info(`Checking ${data.couponCode}  exits`);
  const checkCouponQuery = `SELECT * FROM Coupons WHERE CouponId = '${data.CouponId}' AND Status = 1`;
  connection.query(checkCouponQuery, (err, result) => {
    if (err) throw err;
    if (result.length != 0)
      logger.info(`Coupon ${data.couponCode}  exits`),
        res.send({ data:result, msg: "Coupon Verified", status: 200 });
    else {
      logger.info(`Coupon ${data.couponCode} does not exits ..`);
      res.send({ msg: "Coupon does not exists", status: 400 });
    }
  });
});









const getAllCoupons = router.post("/getAllCoupons", (req, res) => {
  const data = req.body;
  const userId = data.UserId;
  const getAllCouponsQuery = `SELECT * FROM Coupons WHERE Status = 1 AND User_Id = '${userId}'`;
 //there are two types of coupons one is for all users and other is for specific user
 // if you want to get all coupons for all users then you can use this query
  // const getAllCouponsQuery = `SELECT * FROM Coupons WHERE Status = 1`;
  // if coupon is already used then we will store it in 
 
  connection.query(getAllCouponsQuery, (err, result) => {
    if (err) throw err;
    if (result.length != 0)
      logger.info(`Coupons found`),
        res.send({ msg: "Coupons found", coupons: result, status: 200 });
    else {
      logger.info(`No Coupons found`);
      res.send({ msg: "No Coupons found", status: 404 });
    } 
  });
});

//User Used Coupon
const userUsedCoupon = router.post("/userUsedCoupon", (req, res) => {
    const data = req.body;
    
    const couponId = data.couponId;
    const userUsedCouponQuery = `UPDATE Coupons SET Status = 0 WHERE CouponId = '${couponId}' `;

    connection.query(userUsedCouponQuery, (err, result) => {
        if (err) throw err;
        if (result.length != 0)
            logger.info(`Coupon used successfully`),
            res.send({ msg: "Coupon used successfully", status: 200 });
        else {
            logger.info(`Coupon not used`);
            res.send({ msg: "Coupon not used", status: 404 });
        }
    });
});



module.exports = { validateCoupon, getAllCoupons,userUsedCoupon };
