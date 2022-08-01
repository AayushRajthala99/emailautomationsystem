const {
    logger
} = require("../utils/logger");

const {
    getUserInfo
} = require("../models/User.model");

const {
    userUpdate
} = require("../models/User.model");

async function index(req, res) {
    try {
        let email = req.session.user;
        const userInfo = await getUserInfo(email);
        if (userInfo.status) {
            res.render('user/index', {
                userInfo: userInfo.result[0]
            });
        }
    } catch (error) {
        res.render("error", {
            error: "This User Doesn't Exist",
        });
    }
}

async function update(req, res) {
    try {
        const {
            fullname,
            dob,
            mobile,
            bloodgroup,
            paddress,
            taddress,
            gender,
            citizenship,
            citizenshiptype,
            citizenshipissueddistrict,
            citizenshipissueddate,
            grandfather,
            father,
            mother,
            spouse,
            licensecategory,
            licensenumber,
            licenseissueddistrict,
            licenseissueddate,
            licenseexpirydate,
        } = req.body;

        let haslicense;

        let email = req.session.user;

        if (req.body.haslicense == 'on') {
            haslicense = 1;
        } else {
            haslicense = 0;
        }

        const userInfo = {
            fullname,
            email,
            dob,
            mobile,
            bloodgroup,
            paddress,
            taddress,
            gender,
            citizenship,
            citizenshiptype,
            citizenshipissueddistrict,
            citizenshipissueddate,
            grandfather,
            father,
            mother,
            spouse,
            haslicense,
            licensecategory,
            licensenumber,
            licenseissueddistrict,
            licenseissueddate,
            licenseexpirydate,
        }

        const result = await userUpdate(userInfo);
        if (result.status) {
            res.redirect('/dashboard');
        } else {
            throw (result.error);
        }
    } catch (error) {
        logger.error(`USER UPDATE ERROR: ${error}`);
        res.render('error', {
            error: "Something Went Wrong While Updating User"
        });
    }
}

module.exports = {
    index,
    update,
};