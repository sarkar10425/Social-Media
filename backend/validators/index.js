const { check, validationResult } = require("express-validator");

exports.validatePostRequests = [
  check("title")
    .isLength({ min: 4, max: 150 })
    .withMessage("Title must be between 4 to 150 characters")
    .notEmpty()
    .withMessage("Title is required"),
  check("body")
    .isLength({ min: 4, max: 2000 })
    .withMessage("Body must be between 4 to 2000 characters")
    .notEmpty()
    .withMessage("Body is required"),
];

exports.validateSignupRequests = [
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 4, max: 25 })
    .withMessage("Name must be between 4 to 25 characters"),
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isLength({ min: 4, max: 2000 })
    .withMessage("Name must be between 4 to 2000 characters")
    .isEmail()
    .withMessage("Must be a valid email"),
  check("password", "Password is required")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .matches(/\d/)
    .withMessage("Password should contain a number"),
];

exports.validateSigninRequests = [
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isLength({ min: 4, max: 2000 })
    .withMessage("Name must be between 4 to 2000 characters")
    .isEmail()
    .withMessage("Must be a valid email"),
  check("password", "Password is required")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .matches(/\d/)
    .withMessage("Password should contain a number"),
];

exports.passwordResetValidator = [
  check("newPassword")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 chars long")
    .matches(/\d/)
    .withMessage("must contain a number")
    .withMessage("Password must contain a number"),
];

exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};
