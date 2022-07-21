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
            result: result.map((value) => value[column])
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
    promisifiedQuery,
    getColumnInfo,
}