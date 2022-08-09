const {
    logger
} = require("../utils/logger");

const {
    getUserInfo
} = require("../models/User.model");

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
        res.render('application/create');
    } catch (error) {
        logger.error(`APPLICATION STORE ERROR: ${error}`);
        res.render("error", {
            error: "ERROR STORING APPLICATION INFORMATION",
        });
    }
}

module.exports = {
    index,
    create,
    store,
};