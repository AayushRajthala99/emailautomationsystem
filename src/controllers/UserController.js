const {
    logger
} = require("../utils/logger");

const {
    getUserInfo
} = require("../utils/utils");

async function index(req, res) {
    try {
        res.render('user/index');
    } catch (error) {
        res.render("error", {
            error: "This User Doesn't Exist",
        });
    }
}

async function update(req, res) {
    try {
        res.render('user/create');
    } catch (error) {
        logger.error(`USER PROFILE VIEW ERROR: ${error}`);
        res.render("error", {
            error: "ERROR LOADING USER PROFILE PAGE",
        });
    }
}

module.exports = {
    index,
    update,
};