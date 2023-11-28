const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressErrors");

const listingRouter = require("express").Router();
const { listingSchema } = require("../Schema.js");

const validateListing = (req, res, next) => {
  const result = listingSchema.validate({ listing: req.body });
  if (result.error) {
    throw new ExpressError(400, result.error);
  }
};

listingRouter.get(
  "/",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
  })
);

listingRouter.get(
  "/listings",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({}).populate("reviews");
    res.send(allListings);
  })
);

listingRouter.post(
  "/",
  // validateListing,
  wrapAsync(async (req, res, next) => {
    // if(!req.body.title && !req.body.description && !req.body.image && !req.body.price && !req.body.location && !req.body.country){}
    const newListing = new Listing(req.body);
    await newListing
      .save()
      .then((res) => {
        req.flash("success", {
          msg: `'${res.title}' Listing Created Successfully`,
          type: "normal",
        });
      })
      .catch((err) => {
        req.flash("failure", err);
      });
    res.redirect("/");
  })
);

listingRouter.get(
  "/:id",
  wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id).populate("reviews");
    console.log("listing", listing);
    if (!listing) {
      req.flash("failure", {
        msg: `Listing not found`,
        type: "notFound",
      });
      res.redirect("/");
    } else {
      let netRating = listing.reviews.map((i) => i.rating);
      netRating = (
        netRating.reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        }, 0) / netRating.length
      ).toFixed(1);
      res.render("listings/place", { place: listing, netRating });
    }
  })
);

listingRouter.get(
  "/edit/:id",
  wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      req.flash("failure", {
        msg: `Listing not found`,
        type: "notFound",
      });
      res.redirect("/");
    } else {
      res.render("listings/edit", { place: listing });
    }
  })
);

listingRouter.patch(
  "/:id",
  // validateListing,
  wrapAsync(async (req, res) => {
    // try{
    //     await Listing.findByIdAndUpdate( req.params.id , {$set: req.body})
    //     res.redirect(`/listings`)
    // } catch(err){
    //     next(err)
    // }
    // if(!req.body.title || !req.body.description || !req.body.image || !req.body.price || !req.body.location || !req.body.country){
    //     throw new ExpressError(400,"Recieved No Updation Data")
    // }
    await Listing.findByIdAndUpdate(req.params.id, { $set: req.body })
      .then((res) => {
        req.flash("success", {
          msg: `'${res.title}' Listing Updated Successfully`,
          type: "normal",
        });
      })
      .catch((err) => {
        req.flash("failure", err);
      });
    res.redirect(`/${req.params.id}`);
  })
);

listingRouter.delete(
  "/:id",
  wrapAsync(async (req, res) => {
    await Listing.findByIdAndDelete(req.params.id)
      .then((res) => {
        req.flash("success", {
          msg: `'${res.title}' Listing Deleted Successfully`,
          type: "delete",
        });
      })
      .catch((err) => {
        req.flash("failure", err);
      });
    // await Review.deleteMany({listing:req.params.id})
    // instead of the above action we define a post mongoose middleware (check it in models/listing.js)
    res.redirect("/");
  })
);

listingRouter.get(
  "/addNew/new",
  wrapAsync(async (req, res) => {
    res.render("listings/newListing");
  })
);
module.exports = listingRouter;
