const {
  logger
} = require("../utils/logger");

const {
  getUserInfo,
  getApplicationInfo,
} = require("../utils/utils");

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
      // let applicationInfo = await getApplicationInfo(email);
      // let applicationstatus = null;

      // if (applicationInfo.status) {
      //   if (applicationInfo.result || applicationInfo.result[0].length != 0) {
      //     applicationstatus = applicationInfo.result[0].status;
      //   }
      // } else {
      //   throw error;
      // }

      res.render('dashboard/index', {
        userInfo: userInfo.result[0],
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