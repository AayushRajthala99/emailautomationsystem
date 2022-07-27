const {
  logger
} = require("../utils/logger");

async function index(req, res, next) {
  try {
    if (res.locals.signedOut) {
      res.render("login", {
        loginErr: req.session.loginErr ? req.session.loginErr : null,
      });
      req.session.destroy(); // for loginErr session, otherwise error will be shown when loading / url page as well
    } else {
      let email = req.session.user;
      const userInfo = await getUserInfo(email);
      res.render('dashboard/index', {
        userInfo: userInfo.result[0]
      });
    }
  } catch (err) {
    logger.error(`${err}`);
    res.render('error', {
      error: "ERROR LOADING DASHBOARD"
    });
  }
}

module.exports = {
  index,
};