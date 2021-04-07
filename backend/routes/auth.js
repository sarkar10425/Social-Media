const express = require("express");
const {
  signup,
  signin,
  signout,
  forgotPassword,
  resetPassword,
  socialLogin
} = require("../controllers/auth");
const { userById } = require("../controllers/user");
const validator = require("../validators/index");

const router = express.Router();

router.post(
  "/signup",
  validator.validateSignupRequests,
  validator.isRequestValidated,
  signup
);
router.post(
  "/signin",
  validator.validateSigninRequests,
  validator.isRequestValidated,
  signin
);
router.get("/signout", signout);

// then use this route for social login
router.post("/social-login", socialLogin);

// password forgot and reset routes
router.put("/forgot-password", forgotPassword);
router.put("/reset-password", validator.passwordResetValidator, validator.isRequestValidated, resetPassword);


// any route containing :userId, our app will first execute userByID()
router.param("userId", userById);

module.exports = router;
