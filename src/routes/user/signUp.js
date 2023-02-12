const { Router } = require("express");
const uniqid = require("uniqid");
const router = Router();
const connection = require("../../database/connection");
const { logger } = require("../../config/logging");
const moment = require("moment");
const RegistrationDate = moment().format("DD-MM-YYYY");
router.post("/signUp", (req, res) => {
  logger.debug(`Request on ${req.path}`);

  const data = req.body;
  const name = data.name;
  const userId = uniqid("BahuraniUser");
  const address = data.address;
  const PinCode = data.PinCode;
  const referCodeUsed = data.referCode;
  const phoneNumber = data.phoneNumber;
  const ReferralCode = uniqid("ReferralCode");
  const profilePicture = data.profilePicture;
  logger.info(`Checking ${data.phoneNumber}  exits`);
  connection.query(
    `SELECT * FROM User WHERE PhoneNumber = '${data.phoneNumber}' `,
    (err, result) => {
      if (err) throw err;
      if (result.length != 0)
        logger.error(`PhoneNumber ${data.phoneNumber} already exits`),
          res.send({ error: "Phone Number already exists" });
      else {
        logger.info(
          `PhoneNumber ${data.phoneNumber} does not exits .. proceeding further`
        );
        logger.info(`Checking Refer Code if exits`);
        const createNewUserQuery = `INSERT INTO User (User_Id, Name, PhoneNumber, Profile_Picture, Refferal_Code,Refferal_Code_Used,RegistrationDate) VALUES ('${userId}', '${name}', '${phoneNumber}', '${profilePicture}', '${ReferralCode}','${referCodeUsed}','${RegistrationDate}')`;

        const sql = `SELECT * FROM User WHERE Refferal_Code = '${referCodeUsed}'`;
        connection.query(sql, (err, result) => {
          if (err) throw err;

          // If refer code exits

          if (result.length != 0 && result[0].isMarketingUser == 1) {
            const marketerName = result[0].Name;
            logger.info(`Refer Code ${referCodeUsed} exits`);

            connection.query(createNewUserQuery, (err, data) => {
              if (err) logger.error(err);
              if (data) {
                logger.info(`New User Created with User_Id ${userId}`);

                //Create a cart for the user
                const createCartQuery = `INSERT INTO Cart (User_Id, Cart_Data) VALUES ('${userId}', '[]')`;
                connection.query(createCartQuery, (err, data) => {
                  if (err) logger.error(err);
                  if (data) {
                    logger.info(`Cart Created for User_Id ${userId}`);

                    // Create wishlist for the user
                    const createWishlistQuery = `INSERT INTO Wishlist (User_Id, Wishlist_Data) VALUES ('${userId}', '[]')`;
                    connection.query(createWishlistQuery, (err, data) => {
                      if (err) logger.error(err);
                      if (data) {
                        logger.info(`Wishlist Created for User_Id ${userId}`);
                        //Add Default Address
                        const Address_Id = uniqid("BahuraniAddress");
                        const addDefaultAddressQuery = `INSERT INTO User_Addresses (User_Id, Address_Id,Address, PinCode,Name,PhoneNumber) VALUES ('${userId}','${Address_Id}' ,'${address}', '${PinCode}','${name}','${phoneNumber}')`;
                        connection.query(
                          addDefaultAddressQuery,
                          (err, data) => {
                            if (err) logger.error(err);
                            if (data) {
                              logger.info(
                                `Default Address Added for User_Id ${userId}`
                              );
                              res.send({
                                userId: userId,
                                status: 200,
                                referCode: true,
                                message: `You have been referred by  ${marketerName} `,
                              });
                            }
                          }
                        );
                      }
                    });
                  }
                });
              }
            });
          }
          if (result.length != 0 && !result[0].isMarketingUser == 1) {
            const marketerName = result[0].Name;
            logger.info(`Refer Code ${referCodeUsed} exits`);

            connection.query(createNewUserQuery, (err, data) => {
              if (err) logger.error(err);
              if (data) {
                logger.info(`New User Created with User_Id ${userId}`);
                //Create a cart for the user
                const createCartQuery = `INSERT INTO Cart (User_Id, Cart_Data) VALUES ('${userId}', '[]')`;
                connection.query(createCartQuery, (err, data) => {
                  if (err) logger.error(err);
                  if (data) {
                    logger.info(`Cart Created for User_Id ${userId}`);
                    // Create wishlist for the user
                    const createWishlistQuery = `INSERT INTO Wishlist (User_Id, Wishlist_Data) VALUES ('${userId}', '[]')`;
                    connection.query(createWishlistQuery, (err, data) => {
                      if (err) logger.error(err);
                      if (data) {
                        logger.info(`Wishlist Created for User_Id ${userId}`);
                        //Add Default Address
                        const Address_Id = uniqid("BahuraniAddress");
                        const addDefaultAddressQuery = `INSERT INTO User_Addresses (User_Id, Address_Id,Address, PinCode,Name,PhoneNumber) VALUES ('${userId}','${Address_Id}' ,'${address}', '${PinCode}','${name}','${phoneNumber}')`;
                        connection.query(
                          addDefaultAddressQuery,
                          (err, data) => {
                            if (err) logger.error(err);
                            if (data) {
                              logger.info(
                                `Default Address Added for User_Id ${userId}`
                              );
                              res.send({
                                userId: userId,
                                status: 200,
                                referCode: true,
                                message: `  ${marketerName} is not a Marketing User`,
                              });
                            }
                          }
                        );
                      }
                    });
                  }
                });
              }
            });
          }

          // If refer code does not exits

          if (result.length == 0) {
            logger.info(`Refer Code ${referCodeUsed} does not exits`);
            connection.query(createNewUserQuery, (err, result) => {
              if (err) logger.error(err);
              if (result) {
                logger.info(`New User Created with User_Id ${userId}`);
                //Create a cart for the user
                const createCartQuery = `INSERT INTO Cart (User_Id, Cart_Data) VALUES ('${userId}', '[]')`;
                connection.query(createCartQuery, (err, data) => {
                  if (err) logger.error(err);
                  if (data) {
                    logger.info(`Cart Created for User_Id ${userId}`);
                    //  Create wishlist for the user
                    const createWishlistQuery = `INSERT INTO Wishlist (User_Id, Wishlist_Data) VALUES ('${userId}', '[]')`;
                    connection.query(createWishlistQuery, (err, data) => {
                      if (err) logger.error(err);
                      if (data) {
                        logger.info(`Wishlist Created for User_Id ${userId}`);
                        //Add Default Address
                        const Address_Id = uniqid("BahuraniAddress");
                        const addDefaultAddressQuery = `INSERT INTO User_Addresses (User_Id, Address_Id,Address, PinCode,Name,PhoneNumber) VALUES ('${userId}','${Address_Id}' ,'${address}', '${PinCode}','${name}','${phoneNumber}')`;
                        connection.query(
                          addDefaultAddressQuery,
                          (err, data) => {
                            if (err) logger.error(err);
                            if (data) {
                              logger.info(
                                `Default Address Added for User_Id ${userId}`
                              );
                              res.send({
                                userId: userId,
                                status: 200,
                                referCode: false,
                              });
                            }
                          }
                        );
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }
    }
  );
});

module.exports = router;
