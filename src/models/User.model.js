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
            `UPDATE user SET dob='${userInfo.dob}',gender='${userInfo.gender}',paddress='${userInfo.paddress}',taddress='${userInfo.taddress}',mobile='${userInfo.mobile}',bloodgroup='${userInfo.bloodgroup}',citizenship='${userInfo.citizenship}',citizenshiptype='${userInfo.citizenshiptype}',citizenshipissueddistrict='${userInfo.citizenshipissueddistrict}',citizenshipissueddate='${userInfo.citizenshipissueddate}',grandfathername='${userInfo.grandfathername}',fathername='${userInfo.fathername}',mothername='${userInfo.mothername}',spousename='${userInfo.spousename}',haslicense='${userInfo.haslicense}',licensecategory='${userInfo.licensecategory}',licensenumber='${userInfo.licensenumber}',licenseissueddate='${userInfo.licenseissueddate}',licenseexpirydate='${userInfo.licenseexpirydate}',licenseissueddistrict='${userInfo.licenseissueddistrict}' where email='${email}' AND deleted_at is NULL;`
        );
        return {
            status: true,
            result: result,
        };
    } catch (error) {
        logger.error(`User Update Error:  ${error}`);
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