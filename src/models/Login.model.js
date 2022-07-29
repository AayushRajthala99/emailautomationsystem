const {
  logger
} = require("../utils/logger");

const {
  promisifiedQuery
} = require("../utils/utils");

const getLoginInfo = async (email) => {
  try {
    const result = await promisifiedQuery(
      `SELECT *,LOWER(email) as email FROM login where email='${email}' AND deleted_at is NULL;`
    );

    return {
      status: true,
      result: result,
    };
  } catch (error) {
    logger.error(`Login Info Error:  ${error}`);
    return {
      status: false,
      error: error,
    };
  }
};

const getUserInfo = async (email) => {
  try {
    const result = await promisifiedQuery(
      `SELECT * FROM user where email='${email}' AND deleted_at is NULL;`
    );
    return {
      status: true,
      result: result,
    };
  } catch (error) {
    logger.error(`Login Info Error:  ${error}`);
    return {
      status: false,
      error: error,
    };
  }
};

const getColumnInfo = async (table, column, attribute, value, hashedPassword) => {
  try {
    const result = await promisifiedQuery(
      `SELECT ${column},${hashedPassword} FROM ${table} where ${attribute}='${value}' AND deleted_at is NULL;`
    )

    return {
      status: true,
      result: result.map((value) =>
        value[column]),
      hashedPassword: result.map((value) =>
        value[hashedPassword]),
    };
  } catch (error) {
    logger.error(`Column Info Fetch Error:  ${error}`);
    return {
      status: false,
      error: error
    };
  }
}

module.exports = {
  getLoginInfo,
  getUserInfo,
  getColumnInfo,
};