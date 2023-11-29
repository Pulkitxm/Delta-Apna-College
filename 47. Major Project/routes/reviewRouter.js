const reviewController = require("../controllers/review.js");
const wrapAsync = require("../utils/wrapAsync.js");
const reviewRouter = require("express").Router();

reviewRouter.delete("/listings/:listingId/reviews/:reviewId",wrapAsync(reviewController.deleteReview));
reviewRouter.post("/listings/:id/reviews",(reviewController.addReview));

module.exports = reviewRouter;