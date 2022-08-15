const bcrypt = require("bcrypt");
const {
  logger,
  getApplicationInfo,
} = require("../utils/logger");

const {
  userRegistration,
} = require('../models/Register.model');

const result = {
  fullname: null,
  email: null,
  password: null,
  confirmpassword: null,
}

const errorMessage = {
  fullname: null,
  email: null,
  password: null,
  confirmpassword: null,
};

async function index(req, res, next) {
  try {
    res.set('Cache-control', 'no-store');
    res.locals.signedOut = true;
    res.render('register/index', {
      result,
      errorMessage
    });
    req.session.destroy();
  } catch (error) {
    logger.error(`REGISTRATION PAGE ERROR: ${error}`);
    res.render('error', {
      error: "ERROR LOADING REGISTRATION PAGE"
    });
  }
}

async function store(req, res, next) {
  try {
    let normalPassword = req.body.confirmpassword;
    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(normalPassword, salt);
    const {
      fullname,
      email,
    } = req.body;

    const result = await userRegistration(fullname, email, hashedPassword);
    if (result.status) {
      req.session.user = email;
      res.redirect('/dashboard');
    } else {
      throw (result.error);
    }
  } catch (error) {
    logger.error(`USER REGISTRATION ERROR: ${error}`);
    res.render('error', {
      error: "Something Went Wrong While Registering User"
    });
  }
}

module.exports = {
  index,
  store,
};