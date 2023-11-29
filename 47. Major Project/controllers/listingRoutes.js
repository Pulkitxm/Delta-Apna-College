const jwt = require("jsonwebtoken");
const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressErrors");
const listingRouter = require("express").Router();
const { listingSchema } = require("../Schema.js");
require("dotenv").config();
const {
  checkAndHanldeNotLoggedIn,
  checkIfAuthorized,
} = require("../utils/module.js");

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
    if (res.locals.token) {
      const decodedToken = jwt.verify(res.locals.token, process.env.JWT_SECRET);
      const currUserId = decodedToken.id;
      res.render("listings/index", {
        allListings: allListings.map((i) => {
          if (i.owner == currUserId) i["isOwner"] = true;
          return i;
        }),
      });
    } else {
      res.render("listings/index", { allListings });
    }
  })
);

listingRouter.get(
  "/:id",
  wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id).populate([
      "reviews",
      "owner",
    ]);
    if (res.locals.token) {
      const decodedToken = jwt.verify(res.locals.token, process.env.JWT_SECRET);
      const currUserId = decodedToken.id;
      listing = {
        _id: listing._id,
        title: listing.title,
        description: listing.description,
        image: listing.image,
        price: listing.price,
        location: listing.location,
        country: listing.country,
        owner: listing.owner,
        reviews: listing.reviews.map((i) => {
          if (i.owner == currUserId)
            i.isOwner = true;
          return i;
        }),
      };     
    }

    res.locals.isAuthorizedToEdit = false;
    if (res.locals.token) {
      checkIfAuthorized(res.locals.token, res, listing);
    }
    if (!listing) {
      req.flash("error", `Listing not found`);
      res.redirect("/");
    } else {
      if (listing.reviews.length > 0) {
        let netRating = listing.reviews.map((i) => i.rating);
        netRating = (
          netRating.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
          }, 0) / netRating.length
        ).toFixed(1);
        if (!res.locals.netRating) res.locals.netRating = "No Ratings";
        res.render("listings/place", { place: listing, netRating });
      } else {
        res.render("listings/place", {
          place: listing,
          netRating: "No Ratings",
        });
      }
    }
  })
);

listingRouter.post(
  "/",
  // validateListing,
  wrapAsync(async (req, res, next) => {
    if (res.locals.token) {
      const decodedToken = jwt.verify(res.locals.token, process.env.JWT_SECRET);
      const currUserId = decodedToken.id;
      const newListing = new Listing({ ...req.body, owner: currUserId });
      await newListing
        .save()
        .then((res) => {
          req.flash("success", `'${res.title}' Listing Created Successfully`);
          res.redirect(`/${res._id}`);
        })
        .catch((err) => {
          req.flash("error", err);
          res.redirect(`/`);
        });
    } else {
      req.flash("error", `You must be logged in to add a new listing`);
      res.redirect("/?startlogin=true");
    }
  })
);

listingRouter.get(
  "/edit/:id",
  wrapAsync(async (req, res) => {
    if (
      checkAndHanldeNotLoggedIn(
        req,
        res,
        `You must be logged in to edit a listing`
      )
    ) {
      return;
    }
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      req.flash("error", `Listing not found`);
      res.redirect("/");
    } else {
      if (
        res.locals.token &&
        checkIfAuthorized(
          res.locals.token,
          res,
          await Listing.findById(req.params.id)
        )
      ) {
        res.render("listings/edit", { place: listing });
      } else {
        req.flash("error", `You are not authorized to edit this listing`);
        res.redirect(`/${req.params.id}`);
      }
    }
  })
);

listingRouter.patch(
  "/:id",
  // validateListing,
  wrapAsync(async (req, res) => {
    if (
      checkAndHanldeNotLoggedIn(
        req,
        res,
        `You must be logged in to edit a listing`
      )
    ) {
      return;
    }
    if (
      res.locals.token &&
      checkIfAuthorized(
        res.locals.token,
        res,
        await Listing.findById(req.params.id)
      )
    ) {
      await Listing.findByIdAndUpdate(req.params.id, { $set: req.body })
        .then((res) => {
          req.flash("success", `'${res.title}' Listing Updated Successfully`);
        })
        .catch((err) => {
          req.flash("error", err);
        });
    } else {
      req.flash("error", `You are not authorized to edit this listing`);
    }
    res.redirect(`/${req.params.id}`);
  })
);

listingRouter.delete(
  "/:id",
  wrapAsync(async (req, res) => {
    if (
      checkAndHanldeNotLoggedIn(
        req,
        res,
        `You must be logged in to delete a listing`
      )
    ) {
      return;
    }
    if (
      res.locals.token &&
      checkIfAuthorized(
        res.locals.token,
        res,
        await Listing.findById(req.params.id)
      )
    ) {
      await Listing.findByIdAndDelete(req.params.id)
        .then((res) => {
          req.flash("success", `'${res.title}' Listing Deleted Successfully`);
        })
        .catch((err) => {
          req.flash("error", err);
        });
      // await Review.deleteMany({listing:req.params.id})
      // instead of the above action we define a post mongoose middleware (check it in models/listing.js)
    } else {
      req.flash("error", `You are not authorized to delete this listing`);
      res.redirect(`/${req.params.id}`);
    }
    res.redirect("/");
  })
);

listingRouter.get(
  "/addNew/new",
  wrapAsync(async (req, res) => {
    if (
      checkAndHanldeNotLoggedIn(
        req,
        res,
        `You must be logged in to add a new listing`
      )
    ) {
      return;
    }
    res.render("listings/newListing");
  })
);
module.exports = listingRouter;
