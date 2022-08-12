const {
    logger
} = require("../utils/logger");

const {
    promisifiedQuery
} = require("../utils/utils");

const storeApplication = async (userInfo) => {
    try {
        const result = await promisifiedQuery(
            `UPDATE user SET 
            name='${userInfo.fullname}',
            email='${userInfo.email}',
            dob='${userInfo.dob}',
            gender='${userInfo.gender}',
            paddress='${userInfo.paddress}',
            taddress='${userInfo.taddress}',
            mobile='${userInfo.mobile}',
            bloodgroup='${userInfo.bloodgroup}',
            citizenship='${userInfo.citizenship}',
            citizenshiptype='${userInfo.citizenshiptype}',
            citizenshipissueddistrict='${userInfo.citizenshipissueddistrict}',
            citizenshipissueddate='${userInfo.citizenshipissueddate}',
            grandfathername='${userInfo.grandfather}',
            fathername='${userInfo.father}',
            mothername='${userInfo.mother}',
            spousename='${userInfo.spouse}',
            
            where email='${userInfo.email}' AND deleted_at is NULL;`
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