const mongoose = require("mongoose")
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const Listing = require("../models/listing")
const Review = require("../models/review")

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
    const data = require('./SampleListing.js').data
    await Listing.deleteMany({})
    await Review.deleteMany({})
    const file = require('./SampleListing.js');
    const {sampleListings:Listings,reviews} = file;
    let i = 0,j=0; //til 84
    while(i<Listings.length){
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
        listing.reviews = [
            review1._id,
            review2._id,
            review3._id
        ]
        await listing.save();
        await review1.save();
        await review2.save();
        await review3.save();
        // console.log(listing,[review1,review2,review3]);
        i++;
    }
}

(async()=>{
    await initDb()
    console.log("complete");
    // await Listing.deleteMany({})
    // await Review.deleteMany({})
    // const file = require('./SampleListing.js');
    // const {sampleListings:Listings,reviews} = file;
    // const listing = new Listing(Listings[0])
    // let review1 = new Review(reviews[0]);
    // listing.reviews = [review1._id];
    // review1.listing = listing._id;
    // await listing.save()
    // await review1.save()
    // Listing.find({}).then(i=>console.log(i))
    // Review.find({}).then(i=>console.log(i))
})()
