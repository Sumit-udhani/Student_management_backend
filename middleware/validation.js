const { body } = require("express-validator");
exports.studentValidator = [
  body("name").notEmpty().withMessage("Name is reuired"),
  body("parentNo")
    .notEmpty()
    .isLength({ min: 10,max:10 })
    .withMessage("Number should be 10 characters long"),
    body("std").notEmpty().withMessage("Standard is required"),
    body("address").notEmpty().withMessage("Address is required"),
    body("admissionDate")
    .isISO8601()
    .toDate()
    .withMessage("Date must be a valid ISO8601 date"),
];
