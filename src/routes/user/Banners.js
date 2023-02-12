const { Router } = require("express");

const router = Router();
const connection = require("../../database/connection");
const { logger } = require("../../config/logging");

const getBanners = router.post("/getBanners", (req, res) => {
  const sql = `SELECT * FROM Banners`;
  connection.query(sql, (err, result) => {
    if (err) {
      logger.error(`Error Fetching Banners`);
      logger.error(err);

      res.send({
        status: 500,
        message: `Error Fetching Banners`,
        Banners: result,
      });
    }
    if (result) {
      //Change key from BannerImage to img

      res.send({
        status: 200,
        message: `Banners Fetched Successfully`,
        Banners: result,
      });
    }
  });
});

module.exports = { getBanners };
