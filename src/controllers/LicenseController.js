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
        if (userInfo.status & userInfo.result.length != 0) {
            if (userInfo.result[0].haslicense == '1') {
                res.render('license/index', {
                    userInfo: userInfo.result[0],
                });
            } else {
                res.render('error', {
                    error: 'License Information Not Found!'
                });
            }
        }

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