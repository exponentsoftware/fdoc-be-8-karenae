const authJwt = require("./authentication");
const verifySignUp = require("./verifysignup").default;

module.exports = {
  authJwt,
  verifySignUp
};