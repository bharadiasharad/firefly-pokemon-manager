import { Sequelize } from "sequelize";
import { dbConfig } from "../config/config";
import logger from "../util/logger";

// Check if the environment is development
const isDev = process.env.NODE_ENV === "development";

// Initialize Sequelize connection with database configuration
const sequelizeConnection = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: msg => logger.debug(msg), // Log SQL queries in debug mode
  }
);

/**
 * @function dbSync
 * @description Synchronizes the database schema. In development mode, it alters existing tables to match the model.
 * @returns {Promise<{ success: boolean }>} A promise that resolves when synchronization is complete.
 */
const dbSync = async () => {
  try {
    await sequelizeConnection.sync({ alter: isDev });
    return { success: true };
  } catch (error) {
    throw error;
  }
};

// Perform database synchronization on initialization

dbSync()
  .then(res => {
    logger.info(`DB sync with status: ${res.success}`);
  })
  .catch(err => {
    logger.error("Failed to sync DB", err);
  });

export { dbSync };
export default sequelizeConnection;