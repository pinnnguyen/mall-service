const jwt = require('jsonwebtoken');
const config = require('../config');

const secret = config.jwtSecret;

const addToken = (userinfo) => {
  const token = jwt.sign({
    id: userinfo.id,
    account: userinfo.account,
  }, secret, { expiresIn: '1h' });
  return token;
};

const provingToken = (token) => {

  if (token) {
    let decoded = jwt.verify(token, secret);
    console.log(decoded);
    return decoded;
  }
};

module.exports = {
  addToken,
  provingToken
}