const express = require("express");
const app = express();
const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const ejsMate = require('ejs-mate')
const path = require("path");
const method_override = require("method-override");

const listingRouter = require("./controllers/listingRoutes.js");

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

// app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static('C:/Users/ASUS/Desktop/Courses/Delta/Codes n all/47. Major Project/public'));
app.use(method_override("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("ejs",ejsMate)

app.use("/listings", listingRouter);
app.get('/new', async (req, res) => {
  res.render("listings/newListing")
})

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const port = 3003;
app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
