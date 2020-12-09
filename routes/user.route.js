var express = require("express");
var router = express.Router();
const userController = require("../controllers/user.controller");
const userApiController = require("./../api/v1/controllers/user");

const upload = require("./../config/multer");

const {
  checkAuthenticated,
  checkNotAuthenticated,
} = require("./../middlewares/auth.middleware");

// Controller
router.get("/auth", checkNotAuthenticated, userController.getAuth);
router.post("/register", checkNotAuthenticated, userController.postSignUp);
router.post("/login", checkNotAuthenticated, userController.postSignIn);
router.post("/logout", checkAuthenticated, userController.postSignOut);
router.get("/confirm/:token", checkNotAuthenticated, userController.getConfirm);
router.get(
  "/forgot/:token",
  checkNotAuthenticated,
  userController.getResetPassword
);
router.post(
  "/forgot",
  checkNotAuthenticated,
  userController.postForgotPassword
);
router.post("/reset", checkNotAuthenticated, userController.postResetPassword);
router.get(
  "/account/dashboard",
  checkAuthenticated,
  userController.getDashboard
);
router.get("/wishlist", checkAuthenticated, userController.getWishlist);

// API
router.put(
  "/api/v1/account/password",
  checkAuthenticated,
  userApiController.putUpdatePassword
);
router.put(
  "/api/v1/account/info",
  checkAuthenticated,
  upload.single("thumbnail"),
  userApiController.putUpdateInfo
);
router.post(
  "/api/v1/like/:productSlugName",
  checkAuthenticated,
  userApiController.postLike
);
router.post(
  "/api/v1/unlike/:productSlugName",
  checkAuthenticated,
  userApiController.postUnLike
);

// router.post("/resend", checkNotAuthenticated, userController.postResend);
// router.get("/recovery", checkNotAuthenticated, userController.getRecovery);
// router.post("/recovery", checkNotAuthenticated, userController.postRecovery);
// router.get("/reset/:token", checkNotAuthenticated, userController.getReset);
// router.post("/reset/:token", checkNotAuthenticated, userController.postReset);
// router.get("/:id/info", checkAuthenticated, userController.getInfo);
// router.patch("/:id", checkAuthenticated, userController.patchUpdate);
// router.get("/", checkAuthenticated, userController.getAll);
// router.get("/:id", checkAuthenticated, userController.getOne);
// router.delete("/:id", checkAuthenticated, userController.deleteOne);

module.exports = router;
