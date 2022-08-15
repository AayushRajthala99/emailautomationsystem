const {
    logger
} = require("../utils/logger");

const {
    promisifiedQuery
} = require("../utils/utils");

const userUpdate = async (userInfo) => {
    try {
        const result = await promisifiedQuery(
            `UPDATE user SET 

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
            haslicense='${userInfo.haslicense}',
            licensecategory='${userInfo.licensecategory}',
            licensenumber='${userInfo.licensenumber}',
            licenseissueddate='${userInfo.licenseissueddate}',
            licenseexpirydate='${userInfo.licenseexpirydate}',
            licenseissueddistrict='${userInfo.licenseissueddistrict}',
            filledprofile='1'
            
            where email='${userInfo.email}' AND deleted_at is NULL;`
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
    userUpdate,
};