const jwt = require("jsonwebtoken");
require("dotenv").config();

const checkAndHanldeNotLoggedIn = (req, res, msg) => {
  if (!req.session.token) {
    req.flash("error", msg);
    const url =
      req.get("Referer").indexOf("?") == -1
        ? req.get("Referer") + "?startlogin=true"
        : req.get("Referer");
    console.log(req.get("Referer").indexOf("?") != -1, url);
    res.redirect(url);
    return true;
  }
  return false;
};

const checkIfAuthorized = (token, res, listing) => {
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const isAuthorizedToEdit = decodedToken.id === listing.owner._id.toString();
  res.locals.isAuthorizedToEdit = isAuthorizedToEdit;
  return isAuthorizedToEdit;
};

module.exports = {
  checkAndHanldeNotLoggedIn,
  checkIfAuthorized
};