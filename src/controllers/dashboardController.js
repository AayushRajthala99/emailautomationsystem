const {
  logger
} = require("../utils/logger");

async function index(req, res, next) {
  try {
    res.render('dashboard/index');
  } catch (err) {
    logger.error(`${err}`);
    res.render('error', {
      error: "ERROR LOADING DASHBOARD"
    });
  }
}

module.exports = {
  index
};