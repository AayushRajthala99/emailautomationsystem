const {
    logger
} = require("../utils/logger");

const {
    promisifiedQuery
} = require("../utils/utils");

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

const userUpdate = async (userInfo) => {
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

module.exports = {
    getUserInfo,
    userUpdate,
};