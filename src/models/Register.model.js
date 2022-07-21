const db = require('../../config/mysql');

const {
    logger
} = require('../utils/logger');

const {
    promisifiedQuery
} = require('../utils/utils');

const getUserInfo = async (email) => {
    try {
        const result = await promisifiedQuery(
            `SELECT * FROM user where email='${email}' AND deleted_at is NULL;`
        )
        return {
            status: true,
            result: result
        };
    } catch (error) {
        logger.error(`User Info Fetch Error:  ${error}`);
        return {
            status: false,
            error: error
        };
    }
}

const userRegistration = async (fullname, email, password) => {
    db.beginTransaction();
    try {
        let userInsertResult, loginInsertResult;
        userInsertResult = await promisifiedQuery(
            `INSERT INTO user (name,email) VALUES ('${fullname}', '${email}');`
        )
        if (!userInsertResult.insertId) {
            db.rollback();
            return {
                status: false
            }
        }
        const userInfo = await getUserInfo(email);
        if (userInfo.status) {
            loginInsertResult = await promisifiedQuery(
                `INSERT INTO login (user_id,email,password) VALUES (${userInfo.result[0].id}, '${email}','${password}');`
            )
        }
        if (!loginInsertResult.insertId) {
            db.rollback();
            return {
                status: false
            }
        }
        await db.commit();
        return {
            status: true
        }
    } catch (error) {
        db.rollback();
        logger.error(`User Registration Error:  ${error}`);
        return {
            status: false,
            error: error
        }
    }
}

module.exports = {
    getUserInfo,
    userRegistration,
}