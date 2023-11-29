const Listing = require("../models/listing");
const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressErrors");

const reviewRouter = require("express").Router();
const { reviewSchema } = require("../Schema.js");

const {checkAndHanldeNotLoggedIn} = require("../utils/module.js");

const validaterReview = (req, res, next) => {
  let review = req.body;
  const result = reviewSchema.validate({
    review: { ...review, rating: parseInt(review.rating) },
  });
  if (result.error) {
    throw new ExpressError(400, result.error);
  }
};

reviewRouter.delete(
  "/listings/:listingId/reviews/:reviewId",
  wrapAsync(async (req, res) => {
    if(checkAndHanldeNotLoggedIn(req,res,`You must be logged to delete a review`)) return;
    const { reviewId, listingId } = req.params;
    const data = await Review.find({ listing: listingId });
    console.log("review to be deleted", data);
    
    if (res.locals.token && data.isOwner) { 
      await Listing.findByIdAndUpdate(listingId, {
        $pull: { reviews: reviewId },
      });
      await Review.findByIdAndDelete(reviewId)
        .then((res) => {
          req.flash("success", `'${res.comment}' Review Deleted Successfully`);
        })
        .catch((err) => {
          req.flash("error", err);
        });
    } else {
      req.flash("error", `You are not authorized to delete this review`);
    }
    res.redirect(`/${listingId}`);
  })
);

reviewRouter.post(
  "/listings/:id/reviews",
  //   validaterReview,
  wrapAsync(async (req, res) => {
    if(checkAndHanldeNotLoggedIn(req,res,`You must be logged to add a review`)) return;
    const id = req.params.id;
    const newReview = new Review({
      ...req.body,
      rating: parseInt(req.body.rating),
      date: Date.now(),
    });
    const reviews = await Review.find({ listing: id });
    const updatedReviews = reviews.concat(newReview);
    const newObj = await Listing.findByIdAndUpdate(id, {
      $set: { reviews: updatedReviews },
    });
    newReview.listing = newObj._id;
    await newReview
      .save()
      .then((res) => {
        req.flash("success", `'${res.comment}' Review Added Successfully`);
      })
      .catch((err) => {
        req.flash("error", err);
      });
    res.redirect(`/${id}`);
  })
);

module.exports = reviewRouter;
