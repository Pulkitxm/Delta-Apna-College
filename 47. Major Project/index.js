require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const path = require("path");
const method_override = require("method-override");
const morgan = require("morgan");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const connectFlash = require("connect-flash");

const listingRouter = require("./routes/listingRoutes.js");
const reviewRouter = require("./routes/reviewRouter");
const userRouter = require("./routes/userRouter");
const ExpressError = require("./utils/ExpressErrors.js");

const store = MongoStore.create({
  mongoUrl: process.env.MONGO_URI,
  crypt: {
    secret: process.env.sessionSecret,
  },
  touchAfter: 24 * 60 * 60 * 1000,
});

store.on("error", function (e) { 
  console.log("Mongo Session Store Error", e);
})

const sessionOptions = {
  store,
  secret: process.env.sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    http: true,
  },
};

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(method_override("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.use(session(sessionOptions));
app.use(connectFlash());

const main = async () => {
  await mongoose.connect(process.env.MONGO_URI);
};

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
    ].join(" ");
  })
);

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.failure = req.flash("error") || req.flash("error");
  res.locals.isLoggedin = !!req.session.token;
  res.locals.token = req.session.token;
  res.locals.login = req.query.startlogin;
  res.locals.register = req.query.startRegister;
  res.locals.isAuthorizedToEdit = false;
  next();
});

app.use("/", listingRouter);
app.use("/", reviewRouter);
app.use("/listings/user", userRouter);

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Some Error Occured" } = err;
  res.status(statusCode).render("error", { err });
});

app.listen(process.env.PORT, () => {
  console.log(`app is listening on port ${process.env.PORT}`);
});
