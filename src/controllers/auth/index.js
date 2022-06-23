const login = require("./modules/login");
const register = require("./modules/register");
const renewToken = require("./modules/renewToken.js");
const resetPassword = require("./modules/resetPassword.js");

module.exports = {
  login,
  register,
  renewToken,
  resetPassword
};
