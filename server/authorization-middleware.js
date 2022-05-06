const jwt = require('jsonwebtoken');
const ClientError = require('./client-error');

function authorizationMiddleware(req, res, next) {
  const accessToken = req.headers['x-access-token'];
  if (!accessToken) {
    throw new ClientError(401, 'authentication required');
  }
  const payload = jwt.verify(accessToken, process.env.TOKEN_SECRET);
  req.user = payload;
  next();
}

module.exports = authorizationMiddleware;
