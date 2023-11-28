import authService from "../service/auth.js";

function checkForAuthentication(req, res, next) {
  const user = authService.getUser(req.token);
  if (!user) {
    return res.status(400).json({ msg: "Login Required" });
  }
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