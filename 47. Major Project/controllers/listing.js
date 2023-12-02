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
  const query = req.query.query;
  const cateogary = req.flash("cateogary")[0];
  const showtaxes = req.flash("showtaxes")[0];
  let allListings = await Listing.find({}).populate("owner");
  if (cateogary) {
    cateogarizedListings = allListings.filter((i) => {
      for (item of i.cateogries) {
        if (item == cateogary) return true;
      }
      return false;
    });
    if (cateogarizedListings.length > 0) allListings = cateogarizedListings;
    else {
      req.flash(
        "error",
        `No listings found for the cateogary '${req.query.cateogary}'`
      );
      res.redirect("/");
      return;
    }
  }
  if (showtaxes == "true" || showtaxes == true) {
    const tax = process.env.tax;
    allListings = allListings.map((i) => {
      i.price = (i.price + (i.price * tax) / 100).toFixed(2);
      return i;
    });
  }
  if (!!query) {
    allListings = allListings.filter((i, index) => {
      let counter = false;
      if (i.location.toLowerCase().indexOf(query.toLowerCase()) != -1){
        counter = true;
        // console.log("Common factor here for ",index+1,"the listing is i.location",i.location);
      }
      if (i.country.toLowerCase().indexOf(query.toLowerCase()) != -1){
        counter = true;
        // console.log("Common factor here for ",index+1,"the listing is i.country",i.country);
      }
      if (i.title.toLowerCase().indexOf(query.toLowerCase()) != -1){
        counter = true;
        // console.log("Common factor here for ",index+1,"the listing is i.title",i.title);
      }
      if (i.description.toLowerCase().indexOf(query.toLowerCase()) != -1) {
        counter = true;
        // console.log("Common factor here for ",index+1,"the listing is i.description",i.description);
      }
      if (i.owner.username.toLowerCase().indexOf(query.toLowerCase()) != -1) {
        counter = true;
        // console.log("Common factor here for ",index+1,"the listing is i.owner.username",i.owner.username);
      }
      i.cateogries.forEach((j) => { 
        if (j.toLowerCase().indexOf(query.toLowerCase()) != -1) {
          counter = true;
          // console.log("Common factor here for ",index+1,"the listing is i.cateogries",i.cateogries);
        };
      })
      return counter;
    });
    res.locals.queryFoundLength = allListings.length;
  }
  if (res.locals.token) {
    const decodedToken = jwt.verify(res.locals.token, process.env.JWT_SECRET);
    const currUserId = decodedToken.id;
    if (allListings.length) {
      console.log("allListings",allListings);
      res.render("listings/index", {
        allListings: allListings.map((i) => {
          if (i.owner._id == currUserId) i["isOwner"] = true;
          return i;
        }),
        cateogary: req.query.cateogary ? req.query.cateogary : "",
        showtaxes,
        cateogary,
        queryFoundLength:res.locals.queryFoundLength,
      });
    } else {
      req.flash("error", `No listings found`);
      res.redirect("/");
    }
  } else {
    if (allListings.length) {
      res.render("listings/index", {
        allListings,
        cateogary: req.query.cateogary ? req.query.cateogary : "",
        showtaxes,
        cateogary,
        queryFoundLength:res.locals.queryFoundLength,
      });
    } else {
      req.flash("error", `No listings found`);
      res.redirect("/");
    }
  }
};
const showCateogaryListing = async (req, res) => {
  req.flash("cateogary", req.params.cateogary);
  res.redirect(`/`);
};
const showtaxes = async (req, res) => {
  req.flash("showtaxes", true);
  res.redirect(`/`);
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
  res.locals.coordinates = resp.body.features[0].geometry.coordinates;
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
      cateogries: listing.cateogries,
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
      cateogries: listing.cateogries,
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
    newListing.cateogries =
      newListing.cateogries == "null" ? [] : newListing.cateogries;
    await newListing
      .save()
      .then((response) => {
        req.flash(
          "success",
          `'${response.title}' Listing Created Successfully`
        );
        res.redirect(`/${response._id}`);
      })
      .catch((err) => {
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
  showCateogaryListing,
  showtaxes,
};
