const wrapAsync = require("../utils/wrapAsync.js");
const listingRouter = require("express").Router();
const listingController = require("../controllers/listing.js");

listingRouter.route("/")
    .get(wrapAsync(listingController.index))
    .post(wrapAsync(listingController.addListing))
    
listingRouter.route("/:id")
    .get(wrapAsync(listingController.shwoListing))
    .patch(wrapAsync(listingController.updateListing))
    .delete(wrapAsync(listingController.deleteListing))

listingRouter.get("/edit/:id", wrapAsync(listingController.editListing));
listingRouter.get("/addNew/new", wrapAsync(listingController.showAddListingForm));

module.exports = listingRouter;