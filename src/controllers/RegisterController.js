const {
  logger
} = require("../utils/logger");

const {
  userRegistration,
} = require('../models/Register.model');


async function index(req, res, next) {
  try {
    res.render('register/index');
  } catch (error) {
    logger.error(`REGISTRATION PAGE ERROR: ${error}`);
    res.render('error', {
      error: "ERROR LOADING REGISTRATION PAGE"
    });
  }
}

async function store(req, res, next) {
  try {
    const {
      fullname,
      email,
      confirmpassword,
    } = req.body;

    const result = await userRegistration(fullname, email, confirmpassword);
    if (result.status) {
      res.redirect('/');
    } else {
      throw (result.error);
    }
  } catch (error) {
    res.render('error', {
      error: "Something Went Wrong While Registering User"
    });
  }
}

module.exports = {
  index,
  store,
};