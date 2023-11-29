const mongoose = require("mongoose");
const Listing = require("../models/listing");
const Review = require("../models/review");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const main = async () => {
  await mongoose.connect(
    "mongodb+srv://pulkit:pp11223334@cluster0.nyotmfb.mongodb.net/?retryWrites=true&w=majority"
  );
};

const initDb = async () => {
  main()
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      console.log(err);
    });
  await Listing.deleteMany({});
  console.log("Listing deleted");
  await Review.deleteMany({});
  console.log("Review deleted");
  await User.deleteMany({ username: { $ne: "pulkit" } });
  console.log("Users deleted");
  const file = require("./SampleListing.js");
  const { sampleListings: Listings, reviews } = file;
  let i = 0,
    j = 0; //til 84
  while (i < Listings.length) {
    const listing = new Listing(Listings[i]);
    let review1 = new Review(reviews[j]);
    review1.listing = listing._id;
    j++;
    let review2 = new Review(reviews[j]);
    review2.listing = listing._id;
    j++;
    let review3 = new Review(reviews[j]);
    review3.listing = listing._id;
    j++;
    listing.reviews = [review1._id, review2._id, review3._id];
    await listing.save();
    await review1.save();
    await review2.save();
    await review3.save();
    i++;
    console.log(`Listing ${i} saved`);
  }
};

try {
  (async () => {
    await initDb();
    console.log("complete");
  })();
} catch (err) {
  console.log(err);
}
