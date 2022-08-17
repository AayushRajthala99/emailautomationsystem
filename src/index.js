const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const ejs = require("ejs");
const session = require("express-session");
const config = require("../config/default.json");
require("dotenv").config();

const {
  loginRouter,
  dashboardRouter,
  registerRouter,
} = require("./routers");

app.use(express.static(path.join(__dirname, "..", "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.json());

//Session Configuration...
app.use(
  session({
    secret: "03O{kIPl6a#`|mQ",
    resave: false,
    saveUninitialized: true,
  })
);

//BodyParser Initialized...
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const {
  checkSignIn,
  checkSignedOut
} = require("./middleware/login");

//Routes...
app.use("/", checkSignedOut, loginRouter);
app.use("/register", checkSignedOut, registerRouter);
app.use("/dashboard", checkSignIn, dashboardRouter);

// error handling of middleware
app.use((err, req, res, next) => {
  // console.log("*******************", err.message, "*******************");
  res.redirect("/");
});


//404 page not found error for non existing routes
app.get("*", function (req, res) {
  res.render("error404");
});

app.listen(process.env.APP_PORT || config.app.port, () => {
  console.log(
    `Server is up and running on port ${
      process.env.APP_PORT || config.app.port
    }`
  );
});