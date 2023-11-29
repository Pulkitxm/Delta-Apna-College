const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const saltPass = (password) =>`${process.env.forwardSalt}${password}${process.env.backwardSalt}}`;

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

const alreadyExistsUser = async (username, password) => {
  const user = await User.find({ username });
  return user.length != 0;
};

const registerUser = async (username, email, password, req) => {
  let saltedPass = saltPass(password);
  //passward hashing
  const hashedPass = await new Promise((resolve, reject) => {
    bcrypt.hash(saltedPass, saltRounds, function (err, hash) {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
  await new User({
    username,
    email,
    password: hashedPass,
  }).save();
};

const handleLogin = async (req, username, password) => {
  const user = await User.findOne({ username });
  const saltedPass = saltPass(password);
  const isPassCorrect = await bcrypt.compare(saltedPass, user.password);
  if (isPassCorrect) {
    const token = jwt.sign(
      { username, email: user.email, id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: 24 * 60 * 60 * 1000,
      }
    );
    return token;
  } else {
    return false;
  }
};


module.exports = {
  checkAndHanldeNotLoggedIn,
  checkIfAuthorized,
  alreadyExistsUser,
  registerUser,
  handleLogin,
};