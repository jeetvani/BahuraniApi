const { Router } = require("express");
const uniqid = require("uniqid");
const router = Router();
const connection = require("../../database/connection");
const { logger } = require("../../config/logging");

const getUserProfile = router.post("/getUserProfile", (req, res) => {
  const { UserId } = req.body;
  const sql = `SELECT * FROM User WHERE User_Id = '${UserId}'`;
  connection.query(sql, (err, result) => {
    if (err) logger.error(err);
    if (result.length == 0) {
      res.send({
        status: 500,
        message: `User Profile Not Found`,
      });
    }
    if (result) {
      res.send({
        status: 200,
        message: `User Profile Fetched Successfully`,
        UserProfile: result,
      });
    }
  });
});

const updateProfilePic = router.post("/updateProfilePic", (req, res) => {
  const { UserId, Profile_Picture } = req.body;
  const sql = `UPDATE User SET Profile_Picture = '${Profile_Picture}' WHERE User_Id = '${UserId}'`;
  connection.query(sql, (err, result) => {
    if (err) {
      logger.error(err);
      res.send({
        status: 500,
        message: `Error Updating User Profile`,
      });
    }
    if (result) {
      res.send({
        status: 200,
        message: `User Profile Updated Successfully`,
      });
    }
  });
});

const updateName = router.post("/updateName", (req, res) => {
  const { UserId, Name } = req.body;
  const sql = `UPDATE User SET Name = '${Name}' WHERE User_Id = '${UserId}'`;
  connection.query(sql, (err, result) => {
    if (err) {
      logger.error(err);
      res.send({
        status: 500,
        message: `Error Updating User Name`,
      });
    }
    if (result) {
      res.send({
        status: 200,
        message: `User Name Updated Successfully`,
      });
    }
  });
});

const updatePhoneNumber = router.post("/updatePhoneNumber", (req, res) => {
  const { UserId, PhoneNumber } = req.body;
  //check if phone number is already registered with another user
  const sql = `UPDATE User SET PhoneNumber = '${PhoneNumber}' WHERE User_Id = '${UserId}'`;
  
  connection.query(
    sql,
    (err, result) => {
      if (err) {
        logger.error(err);
        res.send({
          status: 500,
          message: `Error Updating User Phone Number`,
        });
      }
      if (result) {
        res.send({
          status: 200,
          message: `User Phone Number Updated Successfully`,
        });
      }
    }
  )
  //reject if phone number is already registered
  
});

const updateUserProfile = router.post("/updateUserProfile", (req, res) => {
  const { UserId, Name, PhoneNumber } = req.body;
  //Reject if user is not found or phone number is already registered

  const sql = `UPDATE User SET Name = '${Name}', PhoneNumber = '${PhoneNumber}' WHERE User_Id = '${UserId}'`;

  connection.query(sql, (err, result) => {
    if (err) {
      logger.error(err);
      res.send({
        status: 500,
        message: `Error Updating User Profile`,
      });
    }
    if (result) {
      res.send({
        status: 200,
        message: `User Profile Updated Successfully`,
      });
    }
  });
});

module.exports = {
  getUserProfile,
  updateUserProfile,
  updateProfilePic,
  updateName,
  updatePhoneNumber,
};
