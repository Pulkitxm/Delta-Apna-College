const mongoose = require("mongoose");
const Listing = require("../models/listing");
const Review = require("../models/review");
const User = require("../models/user");

const main = async () => {
  await mongoose.connect(
    "mongodb+srv://pulkit:pp11223334@cluster0.nyotmfb.mongodb.net/?retryWrites=true&w=majority"
    // "mongodb://127.0.0.1:27017/wanderlust"
  );
};

const initDb = async () => {
  await main()
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      console.log(err);
    });
  const adminUser = await User.findOne({ username: "pulkit" });
  const testUser = await User.findOne({ username: "pulkit1" });
  let counter = true;
  let counter1 = true;
  await Listing.deleteMany({});
  console.log("Listing deleted");
  await Review.deleteMany({});
  console.log("Review deleted");
  await User.deleteMany({ username: { $nin: ["pulkit", "pulkit1"] } });
  console.log("Users deleted");
  const file = require("./SampleListing.js");
  const { sampleListings: Listings, reviews } = file;
  let i = 0,
    j = 0; //til 84
  while (i < Listings.length) {
    const listing = new Listing({ ...Listings[i] ,owner: counter ? adminUser._id : testUser._id });
    let review1 = new Review({...reviews[j],owner:counter1 ? adminUser._id : testUser._id});
    review1.listing = listing._id;
    j++;counter1=!counter1;
    let review2 = new Review({...reviews[j],owner:counter1 ? adminUser._id : testUser._id});
    review2.listing = listing._id;
    j++;counter1=!counter1;
    let review3 = new Review({...reviews[j],owner:counter1 ? adminUser._id : testUser._id});
    review3.listing = listing._id;
    j++;counter1=!counter1;
    listing.reviews = [review1._id, review2._id, review3._id];
    await listing.save();
    await review1.save();
    await review2.save();
    await review3.save();
    i++;
    console.log(`Listing ${i} saved`);
    counter = !counter;
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
