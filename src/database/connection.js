const mysql = require("mysql");
const { dbConfig } = require("../config/dbConfig");
const { logger } = require("../config/logging");
const ENVIRONMENT = dbConfig.productionEnvironment;
const connection = mysql.createConnection(ENVIRONMENT);
connection.connect((err) => {
  if (err) logger.error("Error Connecting Database", err.sqlMessage);
  logger.info(`Database connected at ${ENVIRONMENT.host}`);

  logger.info(`Creating Tables if not exists`);
});

module.exports = connection;
