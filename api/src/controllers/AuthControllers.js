const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRE_TIME, JWT_COOKIE_EXPIRE } = process.env;
const { User } = require("../db.js");

exports.isAuthenticated = async (req, res, next) => {
  try {
    const { codenet } = req.cookies;
    if (!req.cookies.codenet) throw "You must be logged in";

    const decodification = await promisify(jwt.verify)(codenet, JWT_SECRET);
    const user = await User.findOne({ where: { id: decodification.id } });
    if (!user) {
      return next();
    }
    req.user = user.username;
    next();
  } catch (e) {
    res.status(402).send({ success: false, error: e });
  }
};

exports.logout = (req, res) => {
  res.clearCookie();
  return res.status(200).send("Logged out succesfully");
};
