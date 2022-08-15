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
                name,
                email,
                type,
                licensecategory,
                officevisitdate,
                hasapplied
                ) 
                VALUES
                (
                ${userInfo.id},
                ${userInfo.fullname},
                '${userInfo.email}',
                '${userInfo.type}',
                '${userInfo.licensecategory}',
                '${userInfo.officeVisitDate}',
                '1'
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