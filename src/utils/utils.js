//Promisified Query...
const promisifiedQuery = (options) => {
    const db = require('../../config/mysql');
    return new Promise((resolve, reject) => {
        db.query(options, function (error, result) {
            if (error) {
                reject(error)
            } else {
                resolve(result)
            }
        })
    })
}

// Get Column Information...
const getColumnInfo = async (table, column, attribute, value) => {
    try {
        const result = await promisifiedQuery(
            `SELECT ${column} FROM ${table} where ${attribute}='${value}' AND deleted_at is NULL;`
        )

        return {
            status: true,
            result: result.map((value) =>
                value[column]),

        };
    } catch (error) {
        logger.error(`Column Info Fetch Error:  ${error}`);
        return {
            status: false,
            error: error
        };
    }
}

const getUserInfo = async (email) => {
    try {
        const result = await promisifiedQuery(
            `SELECT *, 
            DATE_FORMAT(dob, '%Y-%m-%d') as dob,
            DATE_FORMAT(citizenshipissueddate, '%Y-%m-%d') as citizenshipissueddate,
            DATE_FORMAT(licenseissueddate, '%Y-%m-%d') as licenseissueddate,
            DATE_FORMAT(licenseexpirydate, '%Y-%m-%d') as licenseexpirydate
            FROM user where email='${email}' AND deleted_at is NULL;`
        );
        return {
            status: true,
            result: result,
        };
    } catch (error) {
        logger.error(`User Info Fetch Error:  ${error}`);
        return {
            status: false,
            error: error,
        };
    }
};

const getApplicationInfo = async (email) => {
    try {
        const result = await promisifiedQuery(
            `SELECT
            *,
            DATE_FORMAT(officevisitdate, '%Y-%m-%d') AS officevisitdate,
            DATE_FORMAT(created_at, '%Y-%m-%d') AS registrationdate
            FROM application
            WHERE email = '${email}' AND deleted_at IS NULL
            ORDER BY created_at DESC;`
        );
        return {
            status: true,
            result: result,
        };
    } catch (error) {
        logger.error(`Application Info Fetch Error:  ${error}`);
        return {
            status: false,
            error: error,
        };
    }
};

module.exports = {
    promisifiedQuery,
    getColumnInfo,
    getUserInfo,
    getApplicationInfo,
}