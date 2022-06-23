const getMe = require("./modules/getMe");
const update = require("./modules/update");
const destroy = require("./modules/delete");

// Verify
const sendEmail = require("./modules/verify/sendEmail");
const sendMessage = require("./modules/verify/sendMessage");
const verify_token = require("./modules/verify/verifyToken");
// Organiza as rotas em modulos
module.exports = {
  getMe,
  update,
  destroy,
  verify_email: {
    send: sendEmail,
  },
  verify_phone: {
    send: sendMessage,
  },
  verify_token,
};
