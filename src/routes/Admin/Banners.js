const { Router, json } = require("express");
const uniqid = require("uniqid");
const router = Router();
const connection = require("../../database/connection");
const { logger } = require("../../config/logging");

const addMainBanner = router.post("/AddMainBanner", (req, res) => {
  const { BannerImage } = req.body;
  const BannerId = uniqid("BahuraniBanner");

  const sql = ` INSERT INTO Banners (BannerId, BannerImage) VALUES ('${BannerId}', '${BannerImage}')`;

  connection.query(sql, (err, result) => {
    if (err) {
      logger.error(err);
      res.status(500).send("Error");
    } else {
      logger.info(`${BannerId} Banner Created`);
      res.send({
        message: "Banner Created",
        BannerId: BannerId,
        BannerImage: BannerImage,
      });
    }
  });
});

const removeMainBanner = router.post("/RemoveMainBanner", (req, res) => {
  const { BannerId } = req.body;

  const sql = ` DELETE FROM Banners WHERE BannerId = '${BannerId}'`;

  connection.query(sql, (err, result) => {
    if (err) {
      logger.error(err);
      res.status(500).send("Error");
    } else {
      logger.info(`${BannerId} Banner Deleted`);
      res.send({
        message: "Banner Deleted",
        BannerId: BannerId,
      });
    }
  });
});

const addOfferBanner = router.post("/AddOfferBanner", (req, res) => {
  const { BannerImage } = req.body;
  const BannerId = uniqid("BahuraniBanner");

  const sql = ` INSERT INTO OfferBanner (BannerId, BannerImage) VALUES ('${BannerId}', '${BannerImage}')`;

  connection.query(sql, (err, result) => {
    if (err) {
      logger.error(err);
      res.status(500).send("Error");
    } else {
      logger.info(`${BannerId} Banner Created`);
      res.send({
        message: "Banner Created",
        BannerId: BannerId,
        BannerImage: BannerImage,
      });
    }
  });
});

const removeOfferBanner = router.post("/RemoveOfferBanner", (req, res) => {
  const { BannerId } = req.body;

  const sql = ` DELETE FROM OfferBanner WHERE BannerId = '${BannerId}'`;

  connection.query(sql, (err, result) => {
    if (err) {
      logger.error(err);
      res.status(500).send("Error");
    } else {
      logger.info(`${BannerId} Banner Deleted`);
      res.send({
        message: "Banner Deleted",
        BannerId: BannerId,
      });
    }
  });
});
