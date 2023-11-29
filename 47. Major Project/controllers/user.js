const {
  alreadyExistsUser,
  registerUser,
  handleLogin,
} = require("../utils/module");

const register = async (req, res) => {
  const { username, email, password } = req.body;
  if (await alreadyExistsUser(username, password)) {
    req.flash("error", "Username already exists");
    return res.redirect(req.get("Referer"));
  } else {
    await registerUser(username, email, password, req);

    //automatic sign in
    const token = await handleLogin(req, username, password, email);
    if (!token) req.flash("error", "Invalid Password!");
    else {
      req.flash("success", `Welcome ${username} to Wanderlust!`);
      req.session.token = token;
    }
    res.redirect(req.get("Referer"));
  }
};
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  if (!(await alreadyExistsUser(username, password))) {
    req.flash("error", "Invalid Username!");
    res.redirect("/");
  } else {
    const token = await handleLogin(req, username, password);
    if (!token) req.flash("error", "Invalid Password!");
    else {
      req.flash("success", `Welcome back ${username}`);
      req.session.token = token;
    }
    res.redirect(req.get("Referer"));
  }
};
const logOut = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
    } else {
      res.redirect(req.get("Referer"));
    }
  });
};

module.exports = {
  register,
  loginUser,
  logOut,
};