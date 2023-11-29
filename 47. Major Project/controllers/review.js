const jwt = require("jsonwebtoken");
const Listing = require("../models/listing");
const Review = require("../models/review.js");
const { checkAndHanldeNotLoggedIn } = require("../utils/module.js");
require("dotenv").config();
const deleteReview = async (req, res) => {
  if (
    checkAndHanldeNotLoggedIn(req, res, `You must be logged to delete a review`)
  )
    return;
  const { reviewId, listingId } = req.params;
  const data = await Review.findById(reviewId);
  if (res.locals.token) {
    const decodedToken = jwt.verify(res.locals.token, process.env.JWT_SECRET);
    const currUserId = decodedToken.id;
    if (JSON.stringify(currUserId) !== JSON.stringify(data.owner)) {
      req.flash("error", `You are not authorized to delete this review`);
      res.redirect(`/${listingId}`);
      return;
    }

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
};
const addReview = async (req, res) => {
  if (checkAndHanldeNotLoggedIn(req, res, `You must be logged to add a review`))
    return;
  const id = req.params.id;
  const newReview = new Review({
    ...req.body,
    rating: parseInt(req.body.rating),
    date: Date.now(),
  });
  if (res.locals.token) {
    const decodedToken = jwt.verify(res.locals.token, process.env.JWT_SECRET);
    const currUserId = decodedToken.id;
    newReview.owner = currUserId;
  }
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
};

module.exports = {
  addReview,
  deleteReview,
};
