const bcrypt = require("bcrypt");
const yup = require("yup");
const {
  getColumnInfo
} = require("../models/Login.model");

let inputLength = {
  min: 3,
  max: 60,
};

function checkSignIn(req, res, next) {
  if (req.session.user) {
    res.locals.user = req.session.user;
    next();
  } else {
    const loginErr = new Error("Un-Authenticated Request");
    // storing in session because res.locals only lasts for a single request response cycle
    // redirect starts a new cycle
    // using redirect in error handling middleware
    req.session.loginErr = "Un-Authenticated Request";
    next(loginErr);
  }
}

function checkSignedOut(req, res, next) {
  res.set("Cache-control", "no-store"); // so that going back doesnt load from cache
  if (!req.session.user) {
    res.locals.signedOut = true;
    next();
  } else {
    res.locals.signedOut = false;
    next();
  }
}

//Validation Schema for login...
const linkSchemaLogin = yup.object({
  body: yup.object({
    email: yup
      .string()
      .min(inputLength.min, "* Invalid Value Length!")
      .max(inputLength.max, "* Invalid Value Length!")
      .matches(
        /[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?/,
        "* Invalid Format!"
      )
      .required("* Email Required!")
      .test("* User Doesn't Exist!", "* User Doesn't Exist!", () => {
        return userArray.result.length !== 0;
      }),

    password: yup
      .string()
      .min(inputLength.min, "* Invalid Value Length!")
      .max(inputLength.max, "* Invalid Value Length!")
      .required("* Password Required!"),
  }),
});

// Validation Function for login store ...
const validateLogin = (schema) => async (req, res, next) => {
  try {
    const {
      email,
      password
    } = req.body;

    const result = {
      email: email,
      password: password,
    };

    userArray = await getColumnInfo(
      "login",
      "email",
      "email",
      email,
      "password"
    );
    if (userArray.status) {
      try {
        if (bcrypt.compare(password, userArray.hashedPassword[0])) {
          await schema.validate({
            body: req.body,
          }, {
            abortEarly: false,
          });

          return next();
        }
      } catch (error) {
        const errorMessage = {
          email: null,
          password: null,
        };

        // Storing error message...
        error.inner.forEach((e) => {
          if (e.path.slice(5) == "email") {
            errorMessage.email = e.errors[0];
          } else if (e.path.slice(5) == "password") {
            errorMessage.password = e.errors[0];
          }
        });
        res.render("login", {
          result: result,
          errorMessage: errorMessage,
          loginErr: null,
        });
      }
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  checkSignIn,
  checkSignedOut,
  linkSchemaLogin,
  validateLogin,
};