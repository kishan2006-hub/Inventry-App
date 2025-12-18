import { body, validationResult } from "express-validator";

const validation = async (req, res, next) => {
  const rules = [
    body("name").notEmpty().withMessage("Name is required"),
    body("price").isFloat({ gt: 0 }).withMessage("Price should be a positive value"),
    // body("imageUrl").isURL().withMessage("Invalid URL")
  ];

  await Promise.all(rules.map((rule) => rule.run(req)));

  const errors = validationResult(req);
   
  // console.log(errors)
  if (!errors.isEmpty()) {
    return res.render("new-product", { error: errors.array()[0].msg });
  }

  return next();
};

export default validation;

