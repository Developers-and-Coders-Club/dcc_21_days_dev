import authService from "../service/auth.js";

function checkForAuthentication(req, res, next) {
  // const authorizationHeaderValue = req.headers["authorization"];
  const tokenCookie = req.cookies?.token;
  req.user = null;
  if (!tokenCookie) return next();
  const user = authService.getUser(tokenCookie);
  req.user = user;
  next();
}

function restrictTo(roles = []) {
  return function (req, res, next) {
    if (!req.user) res.redirect("/login");
    if (!roles.includes(req.user.role)) return res.end("UnAuthorized");
    return next();
  };
}

const authMiddleware = {
  checkForAuthentication,
  restrictTo,
};

export default authMiddleware;