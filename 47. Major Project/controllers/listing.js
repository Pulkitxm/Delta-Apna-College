const jwt = require("jsonwebtoken");
const Listing = require("../models/listing");
const User = require("../models/user");
const geoCoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAP_TOKEN;
const geocodingClient = geoCoding({ accessToken: mapBoxToken });

require("dotenv").config();
const {
  checkAndHanldeNotLoggedIn,
  checkIfAuthorized,
} = require("../utils/module.js");

const index = async (req, res) => {
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
};
const shwoListing = async (req, res) => {
  let listing = await Listing.findById(req.params.id).populate([
    "reviews",
    "owner",
  ]);
  let resp = await geocodingClient
    .forwardGeocode({
      query: listing.location,
      limit: 2,
    })
    .send();
  res.locals.coordinates = resp.body.features[0].geometry.coordinates
  if (res.locals.token) {
    const decodedToken = jwt.verify(res.locals.token, process.env.JWT_SECRET);
    const currUserId = decodedToken.id;
    const usersWithReviews = [];
    for (review of listing.reviews) {
      const owner = await User.findById(review.owner);
      usersWithReviews.push(owner);
    }
    let uniqueUsers = [
      ...new Set(usersWithReviews.map((user) => user.username)),
    ];
    let uniqueUserObjects = uniqueUsers.map((username) =>
      usersWithReviews.find((user) => user.username === username)
    );
    const reviewObj = listing.reviews.map((review) => {
      const obj = review.toObject();

      if (obj.owner == currUserId) obj["isOwner"] = true;

      const OwnerObj = uniqueUserObjects.filter(
        (user) => JSON.stringify(user._id) == JSON.stringify(review.owner)
      )[0];
      if (!!OwnerObj) {
        obj.ownerName = OwnerObj.username;
        return obj;
      } else {
        obj.ownerName = "";
        return obj;
      }
    });
    listing = {
      _id: listing._id,
      title: listing.title,
      description: listing.description,
      image: listing.image,
      price: listing.price,
      location: listing.location,
      country: listing.country,
      owner: listing.owner,
      reviews: reviewObj,
    };
  } else {
    const usersWithReviews = [];
    for (review of listing.reviews) {
      const owner = await User.findById(review.owner);
      usersWithReviews.push(owner);
    }
    let uniqueUsers = [
      ...new Set(usersWithReviews.map((user) => user.username)),
    ];
    let uniqueUserObjects = uniqueUsers.map((username) =>
      usersWithReviews.find((user) => user.username === username)
    );
    const reviewObj = listing.reviews.map((review) => {
      const obj = review.toObject();
      const OwnerObj = uniqueUserObjects.filter(
        (user) => JSON.stringify(user._id) == JSON.stringify(review.owner)
      )[0];
      if (!!OwnerObj) {
        obj.ownerName = OwnerObj.username;
        return obj;
      } else {
        obj.ownerName = "";
        return obj;
      }
    });
    listing = {
      _id: listing._id,
      title: listing.title,
      description: listing.description,
      image: listing.image,
      price: listing.price,
      location: listing.location,
      country: listing.country,
      owner: listing.owner,
      reviews: reviewObj,
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

      res.render("listings/place", {
        place: listing,
        netRating,
        map_token: process.env.MAP_TOKEN,
      });
    } else {
      res.render("listings/place", {
        place: listing,
        netRating: "No Ratings",
      });
    }
  }
};
const addListing = async (req, res, next) => {
  if (res.locals.token) {
    const decodedToken = jwt.verify(res.locals.token, process.env.JWT_SECRET);
    const currUserId = decodedToken.id;
    const newListing = new Listing({
      ...req.body,
      owner: currUserId,
      image: { url: req.file.path, filename: req.file.filename },
    });
    await newListing
      .save()
      .then((response) => {
        console.log(response);
        req.flash(
          "success",
          `'${response.title}' Listing Created Successfully`
        );
        res.redirect(`/${response._id}`);
      })
      .catch((err) => {
        console.log(err);
        req.flash("error", err.message);
        res.redirect(`/`);
      });
  } else {
    req.flash("error", `You must be logged in to add a new listing`);
    res.redirect("/?startlogin=true");
  }
};
const editListing = async (req, res) => {
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
      let originalImageUrl = listing.image.url;
      if (
        originalImageUrl &&
        originalImageUrl.indexOf("res.cloudinary.com") != -1
      ) {
        originalImageUrl = originalImageUrl.replace("upload/", "upload/w_300/");
      }
      res.render("listings/edit", { place: listing, originalImageUrl });
    } else {
      req.flash("error", `You are not authorized to edit this listing`);
      res.redirect(`/${req.params.id}`);
    }
  }
};
const updateListing = async (req, res) => {
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
    console.log(req.body);
    try {
      const listing = await Listing.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      if (req.file) {
        listing.image = { url: req.file.path, filename: req.file.filename };
      }
      await listing.save();
      req.flash("success", `'${listing.title}' Listing Updated Successfully`);
    } catch (err) {
      req.flash("error", err.message);
    }
  } else {
    req.flash("error", `You are not authorized to edit this listing`);
  }
  res.redirect(`/${req.params.id}`);
};
const deleteListing = async (req, res) => {
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
};
const showAddListingForm = async (req, res) => {
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
};

module.exports = {
  index,
  shwoListing,
  addListing,
  editListing,
  updateListing,
  deleteListing,
  showAddListingForm,
};
