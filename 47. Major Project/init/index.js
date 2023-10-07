const mongoose = require("mongoose")
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const Listing = require("../models/listing")

const main = async () => {
    await mongoose.connect(MONGO_URL);
  };
  
main()
.then(() => {
    console.log("Connected to DB")
})
.catch((err) => {
    console.log(err)
});

const initDb = async () => {
    await Listing.deleteMany({})
    Listing.insertMany(require('./SampleListing.js').data)
    console.log("Database is initialized");
}
initDb()