const {
    logger
} = require("../utils/logger");

const {
    getUserInfo
} = require("../utils/utils");

const {
    storeApplication,
} = require("../models/Application.model");

async function index(req, res) {
    try {
        let email = req.session.user;
        const userInfo = await getUserInfo(email);
        if (userInfo.status) {
            res.render('application/index', {
                userInfo: userInfo.result[0]
            });
        }
    } catch (error) {
        res.render("error", {
            error: "Application Doesn't Exist",
        });
    }
}

async function create(req, res) {
    try {
        let email = req.session.user;
        const userInfo = await getUserInfo(email);
        res.render('application/create', {
            userInfo: userInfo.result[0]
        });
    } catch (error) {
        logger.error(`APPLICATION VIEW ERROR: ${error}`);
        res.render("error", {
            error: "ERROR LOADING APPLICATION VIEW PAGE",
        });
    }
}

async function store(req, res) {
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
        } = req.body;

        let email = req.session.user;

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
        }

        const result = await storeApplication(userInfo);
        if (result.status) {
            res.redirect('/dashboard');
        } else {
            throw (result.error);
        }
    } catch (error) {
        logger.error(`APPLICATION STORE ERROR: ${error}`);
        res.render('error', {
            error: "Something Went Wrong While Storing Application"
        });
    }
}

module.exports = {
    index,
    create,
    store,
};