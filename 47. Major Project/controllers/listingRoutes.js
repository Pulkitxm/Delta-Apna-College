const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressErrors");

const listingRouter = require("express").Router();
const { listingSchema } = require("../Schema.js");

const checkAndHanldeNotLoggedIn = require("../utils/module.js");

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
  "/:id",
  wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id).populate("reviews");
    if (!listing) {
      req.flash("error", `Listing not found`);
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

listingRouter.post(
  "/",
  // validateListing,
  wrapAsync(async (req, res, next) => {
    if(checkAndHanldeNotLoggedIn(req,res,`You must be logged in to add a new listing`)){
      return;
    }
    // if(!req.body.title && !req.body.description && !req.body.image && !req.body.price && !req.body.location && !req.body.country){}
    const newListing = new Listing(req.body);
    await newListing
      .save()
      .then((res) => {
        req.flash("success", `'${res.title}' Listing Created Successfully`);
      })
      .catch((err) => {
        req.flash("error", err);
      });
    res.redirect("/");
  })
);

listingRouter.get(
  "/edit/:id",
  wrapAsync(async (req, res) => {
    if(checkAndHanldeNotLoggedIn(req,res,`You must be logged in to edit a listing`)){
      return;
    }
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      req.flash("error", `Listing not found`);
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
    if(checkAndHanldeNotLoggedIn(req,res,`You must be logged in to edit a listing`)){
      return;
    }
    await Listing.findByIdAndUpdate(req.params.id, { $set: req.body })
      .then((res) => {
        req.flash("success", `'${res.title}' Listing Updated Successfully`);
      })
      .catch((err) => {
        req.flash("error", err);
      });
    res.redirect(`/${req.params.id}`);
  })
);

listingRouter.delete(
  "/:id",
  wrapAsync(async (req, res) => {
    if(checkAndHanldeNotLoggedIn(req,res,`You must be logged in to delete a listing`)){
      return;
    }
    await Listing.findByIdAndDelete(req.params.id)
      .then((res) => {
        req.flash("success", `'${res.title}' Listing Deleted Successfully`);
      })
      .catch((err) => {
        req.flash("error", err);
      });
    // await Review.deleteMany({listing:req.params.id})
    // instead of the above action we define a post mongoose middleware (check it in models/listing.js)
    res.redirect("/");
  })
);

listingRouter.get(
  "/addNew/new",
  wrapAsync(async (req, res) => {
    if(checkAndHanldeNotLoggedIn(req,res,`You must be logged in to add a new listing`)){
      return;
    }
    res.render("listings/newListing");
  })
);
module.exports = listingRouter;
