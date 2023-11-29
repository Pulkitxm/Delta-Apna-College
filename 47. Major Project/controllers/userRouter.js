const User = require("../models/user");
const userRouter = require("express").Router();
const wrapAsync = require("../utils/wrapAsync");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const saltPass = (password) =>
  `${process.env.forwardSalt}${password}${process.env.backwardSalt}}`;

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
    const token = jwt.sign({ username, id: user._id }, process.env.JWT_SECRET, {
      expiresIn: 24 * 60 * 60 * 1000,
    });
    return token;
  } else {
    return false;
  }
};

//Register
userRouter.post(
  "/",
  wrapAsync(async (req, res) => {
    const { username, email, password } = req.body;
    if (await alreadyExistsUser(username, password)) {
      req.flash("error", "Username already exists");
      return res.redirect(req.get("Referer"));
    } else {
      await registerUser(username, email, password, req);

      //automatic sign in
      const token = await handleLogin(req, username, password);
      if (!token) req.flash("error", "Invalid Password!");
      else {
        req.flash("success", `Welcome ${username} to Wanderlust!`);
        req.session.token = token;
      }
      res.redirect(req.get("Referer"));
    }
  })
);

userRouter.patch("/", async (req, res) => {
  const { username, password } = req.body;
  if (!(await alreadyExistsUser(username, password))) {
    req.flash("error", "Invalid Username!");
    res.redirect("/");
  } else {
    const token = await handleLogin(req, username, password);
    if (!token) req.flash("error", "Invalid Password!");
    else {
      req.flash("success", `Welcome ${username} to Wanderlust!`);
      req.session.token = token;
    }
    res.redirect(req.get("Referer"));
  }
});

userRouter.delete("/", async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
    } else {
      res.redirect(req.get("Referer"));
    }
  });
});

module.exports = userRouter;
