const wrapAsync = require("../utils/wrapAsync.js");
const listingRouter = require("express").Router();
const listingController = require("../controllers/listing.js");
const multer = require("multer");
const { storage } = require("../clouConfig.js");
const upload = multer({
  storage,
  limits: { fileSize: 1 * 1024 * 1024 },
});

listingRouter
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(upload.single("imageFile"), wrapAsync(listingController.addListing));

listingRouter
  .route("/:id")
  .get(wrapAsync(listingController.shwoListing))
  .patch(upload.single("imageFile"), wrapAsync(listingController.updateListing))
  .delete(wrapAsync(listingController.deleteListing));

listingRouter.get("/edit/:id", wrapAsync(listingController.editListing));
listingRouter.get(
  "/addNew/new",
  wrapAsync(listingController.showAddListingForm)
);

module.exports = listingRouter;
