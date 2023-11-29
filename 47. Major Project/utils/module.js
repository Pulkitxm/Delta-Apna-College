const checkAndHanldeNotLoggedIn = (req, res, msg) => {
  if (!req.session.token) {
    req.flash("error", msg);
    const url =
      req.get("Referer").indexOf("?") == -1
        ? req.get("Referer") + "?startlogin=true"
        : req.get("Referer");
    console.log(req.get("Referer").indexOf("?") != -1,url);
    res.redirect(url);
    return true;
  }
  return false;
};

module.exports = checkAndHanldeNotLoggedIn;