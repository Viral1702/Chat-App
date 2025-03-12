// =====> Default Imports
const { Router } = require("express");
const passport = require("passport");

// =====> Coustom imports
const { signin, signup } = require("../Controllers/AuthController");

// =====> Global variables
const AuthRoute = Router();

// =====> Signup Route
AuthRoute.post("/signup", signup);

// =====> Signin Route
AuthRoute.post("/signin", passport.authenticate("local"), signin);

module.exports = AuthRoute;
