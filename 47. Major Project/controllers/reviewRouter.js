const Listing = require("../models/listing");
const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressErrors");

const reviewRouter = require("express").Router();
const { reviewSchema } = require("../Schema.js");

const validaterReview = (req, res, next) => {
  let review = req.body;
  console.log({...review,rating:parseInt(review.rating)});
  const result = reviewSchema.validate({review:{...review,rating:parseInt(review.rating)}});
  if (result.error) {
    throw new ExpressError(400, result.error);
  }
};

reviewRouter.get(
  "/listings/reviews/all",
  wrapAsync(async (req, res) => {
    const id = req.params.id;
    const data = await Review.find({});
    res.send(data);
  })
);

reviewRouter.get(
  "/listings/:listingId/reviews",
  wrapAsync(async (req, res) => {
    const listingId = req.params.listingId;
    const data = await Review.find({ listing: listingId });
    res.send(data);
  })
);

reviewRouter.get(
  "/listings/:listingId/reviews/:reviewId",
  wrapAsync(async (req, res) => {
    const { listingId, reviewId } = req.params;
    const data = await Review.find({ listing: listingId });
    res.send(data.filter((i) => i._id == reviewId));
  })
);

reviewRouter.delete(
  "/listings/:listingId/reviews/:reviewId",
  wrapAsync(async (req, res) => {
    const { reviewId, listingId } = req.params;
    const data = await Review.find({ listing: listingId });
    // await Listing.findByIdAndUpdate(listingId,{reviews:data.filter(i=>i._id != reviewId)});
    await Listing.findByIdAndUpdate(listingId, {
      $pull: { reviews: reviewId },
    });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/${listingId}`);
  })
);

reviewRouter.post(
  "/listings/:id/reviews",
//   validaterReview,
  wrapAsync(async (req, res) => {
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
    await newReview.save();
    res.redirect(`/${id}`);
  })
);

module.exports = reviewRouter;
