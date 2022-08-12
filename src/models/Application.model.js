const {
    logger
} = require("../utils/logger");

const {
    promisifiedQuery
} = require("../utils/utils");

const storeApplication = async (userInfo) => {
    try {
        const result = await promisifiedQuery(
            `INSERT INTO application (
                user_id,
                email,
                licensecategory,
                officevisitdate
                ) 
                VALUES
                (
                ${userInfo.id},
                '${userInfo.email}',
                '${userInfo.licensecategory}',
                '${userInfo.officeVisitDate}'
                );`
        );
        return {
            status: true,
            result: result,
        };
    } catch (error) {
        logger.error(`Application Store Error:  ${error}`);
        return {
            status: false,
            error: error,
        };
    }
};

module.exports = {
    storeApplication,
};