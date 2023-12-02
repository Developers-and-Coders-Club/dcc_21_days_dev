import authService from '../service/auth.js';

function checkForAuthentication(req, res, next) {
  const user = authService.getUser(req.headers.token);
  req.user = null;
  if (!user) {
    return res.status(401).json({ msg: 'unauthorized login required!' });
  }
  req.user = user;
  next();
}

function restrictTo(roles = []) {
  return function (req, res, next) {
    if (!roles.includes(req.user.role))
      return res.status(403).json({ msg: 'Forbidden' });
    return next();
  };
}

const authMiddleware = {
  checkForAuthentication,
  restrictTo,
};

export default authMiddleware;
