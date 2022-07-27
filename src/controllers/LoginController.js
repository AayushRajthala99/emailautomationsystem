const {
  logger
} = require("../utils/logger");

const {
  getUserInfo
} = require("../utils/utils");

const {
  getLoginInfo
} = require("../models/Login.model");

const result = {
  email: null,
  password: null,
}

const errorMessage = {
  email: null,
  password: null,
};

async function index(req, res) {
  try {
    if (res.locals.signedOut) {
      res.render("login", {
        loginErr: req.session.loginErr ? req.session.loginErr : null,
        result,
        errorMessage
      });
      req.session.destroy(); // for loginErr session, otherwise error will be shown when loading / url page as well
    }
  } catch (error) {
    logger.error(`LOGIN PAGE ERROR: ${error}`);
    res.render("error", {
      error: "ERROR LOADING LOGIN PAGE",
    });
  }
}

async function view(req, res) {
  try {
    const {
      email,
      password
    } = req.body;

    const loginInfo = await getLoginInfo(email);
    if (
      loginInfo.status &&
      email == loginInfo.result[0].email &&
      password == loginInfo.result[0].password
    ) {
      const userInfo = await getUserInfo(email);
      if (userInfo.status) {
        req.session.user = email;
        res.render('dashboard', {
          userInfo: userInfo.result[0]
        });
      }
    }
  } catch (error) {
    res.render("error", {
      error: "This User Doesn't Exist",
    });
  }
}

function logout(req, res) {
  if (res.locals.signedOut) {
    res.render("../views/login", {
      loginErr: "Login First",
    });
  } else {
    req.session.destroy();
    res.set("Clear-Site-Data", '"cache"');
    res.redirect("/");
  }
}

module.exports = {
  index,
  view,
  logout,
};