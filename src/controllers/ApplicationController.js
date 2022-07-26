const {
    logger
} = require("../utils/logger");

const {
    getUserInfo
} = require("../utils/utils");

const {
    getLoginInfo
} = require("../models/Login.model");

async function index(req, res) {
    try {
        res.render('application/index');
    } catch (error) {
        res.render("error", {
            error: "Application Doesn't Exist",
        });
    }
}

async function create(req, res) {
    try {
        res.render('application/create');
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