const express = require("express");
const app = express();
const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const ejsMate = require('ejs-mate')
const path = require("path");
const method_override = require("method-override");

const listingRouter = require("./controllers/listingRoutes.js");
morgan = require('morgan')

const ExpressError = require("./utils/ExpressErrors.js")

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(method_override("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.engine("ejs", ejsMate)

const main = async () => {
  await mongoose.connect(MONGO_URL);
};

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
}))

app.use("/listings", listingRouter);
app.all("*",(req,res,next)=>{
  next(new ExpressError(404,"Page Not Found"));
})

app.use((err,req,res,next)=>{
  let {statusCode=500, message="Some Error Occured"} = err;
  res.status(statusCode).render("error",{err});
});

const port = 3003;
app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
