// =====> Defaults
const express = require("express");
const app = express();
const passport = require("passport");
const expressSession = require("express-session");
const cors = require("cors");

// =====> Coustomes
const ConnectDB = require("./Config/ConnectDB");
const AuthRoute = require("./Routes/AuthRoute");
const PassportInit = require("./Config/PassportInit");

// ======> Default calls
PassportInit(passport);

// =====> Default Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(
  expressSession({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// =====> Routes
app.use("/auth", AuthRoute);

// =====> Listning
app.listen(process.env.APP_PORT, () => {
  console.log("Listning");
  ConnectDB();
});
