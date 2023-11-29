const userController = require("../controllers/user.js");
const userRouter = require("express").Router();
const wrapAsync = require("../utils/wrapAsync");

userRouter.route("/")
    .post(wrapAsync(userController.register))
    .patch(wrapAsync(userController.loginUser))
    .delete(wrapAsync(userController.logOut))

module.exports = userRouter;