const express = require("express");
const app = express();
const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const ejsMate = require('ejs-mate')
const path = require("path");
const method_override = require("method-override");

const listingRouter = require("./controllers/listingRoutes.js");

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


app.use((req, res, next) => {
  const clientIP =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  console.log(clientIP);
  next();
});


app.use("/listings", listingRouter);
app.get('/new', async (req, res) => {
  res.render("listings/newListing")
})

const port = 3003;
app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});