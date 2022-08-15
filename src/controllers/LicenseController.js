const {
    logger
} = require("../utils/logger");

const {
    getUserInfo,
} = require("../utils/utils");

async function index(req, res) {
    try {
        let email = req.session.user;
        const userInfo = await getUserInfo(email);

        res.render('license/index', {
            userInfo: userInfo.result[0],
        });
    } catch (error) {
        logger.error(`LICENSE VIEW ERROR: ${error}`);
        res.render("error", {
            error: "ERROR LOADING LICENSE VIEW PAGE",

        });
    }
}

module.exports = {
    index,
};