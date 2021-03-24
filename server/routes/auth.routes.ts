import { Request, Response } from "express";
const { Router } = require("express");
const bcrypt = require("bcryptjs");
const { check, body, validationResult } = require("express-validator");
const User = require("../models/User");
const CleaningCompany = require("../models/CleaningCompany");
const router = Router();
const ROLES = require("../roles/roles");
const {
  auth,
  signToken,
  hashPassword,
  verifyPassword,
  checkIsInRole,
  getRedirectUrl,
} = require("../middleware/auth.middleware");
console.log(User);
// /api/auth/register
router.post(
  "/register",
  [
    check("email", "Email is incorrect").isEmail(),
    check("password", "Password min length must be 6 symbols").isLength({
      min: 6,
    }),
    check("firstName", "First Name is too short").isLength({
      min: 1,
    }),
    check("lastName", "Last Name is too short").isLength({
      min: 1,
    }),
    check("phone", "Last Name is too short").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    // res.set("Access-Control-Allow-Origin", "*");
    try {
      const errors = validationResult(req);
      console.log(errors);
      if (!errors.isEmpty() || req.body.password !== req.body.confirmPassword) {
        return res.status(400).json({
          errors: errors.array(),
          message: "The registration data is incorrect",
        });
      }

      const { email, password, firstName, lastName, phone } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: "This user already exists" });
      }

      //const hashedPassword = await bcrypt.hash(password, 12);
      const hashedPassword = await hashPassword(password);
      const user = new User({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phone,
        isActive: true,
        role: ROLES.Customer,
      });

      await user.save();

      res.status(201).json({ message: "User created" });
    } catch (e) {
      res.status(500).json({ message: "Something went wrong, try again" });
    }
  }
);

// /api/auth/login
router.post(
  "/login",
  [
    check("email", "Email is incorrect").normalizeEmail().isEmail(),
    check("password", "Enter the password").exists(),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Invalid login data",
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });
      //console.log("Login:", user);

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      if (!user.isActive) {
        return res.status(400).json({ message: "The user is banned" });
      }

      //const isMatch = await bcrypt.compare(password, user.password);
      const isMatch = await verifyPassword(password, user.password);
      console.log(isMatch);
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Invalid password, please try again" });
      }

      // const token = jwt.sign({ userId: user.id }, config.jwtSecret, {
      //   expiresIn: "12h",
      // });

      const token = await signToken(user.id);

      // res.json({ token, userId: user.id });
      res.json({ token, dataId: user.id, data: user });
    } catch (e) {
      res.status(500).json({ message: "Something went wrong, try again" });
    }
  }
);

router.post(
  "/register-company",
  [
    check("email", "Email is incorrect").isEmail(),
    check("password", "Password min length must be 6 symbols").isLength({
      min: 6,
    }),
    check("name", "Name is too short").isLength({
      min: 1,
    }),
    check("address", "Address is too short").isLength({
      min: 1,
    }),

    // check('confirmPassword').custom(  (value: any, req: any) => {
    //   if (value !== req.body.password) {
    //     throw new Error('Password confirmation does not match password');
    //   }
    //   return true;
    // }),
  ],
  async (req: Request, res: Response) => {
    // res.set("Access-Control-Allow-Origin", "*");
    console.log("REQ", req.body);
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty() || req.body.password !== req.body.confirmPassword) {
        return res.status(400).json({
          errors: errors.array(),
          message: "The registration data is incorrect",
        });
      }

      const {
        email,
        password,
        logo,
        name,
        description,
        address,
        typeOfServices,
        priceList,
      } = req.body;

      const candidate = await CleaningCompany.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: "This Company already exist" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const company = new CleaningCompany({
        email,
        password: hashedPassword,
        logo,
        name,
        description,
        address,
        typeOfServices,
        priceList,
        rating: 0,
        isActive: true,
      });

      await company.save();

      res.status(201).json({ message: "Company created" });
    } catch (e) {
      res.status(500).json({ message: "Something went wrong, try again" });
    }
  }
);

// /api/auth/login
router.post(
  "/login-company",
  [
    check("email", "Email is incorrect").normalizeEmail().isEmail(),
    check("password", "Password min length must be 6 symbols").exists(),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Invalid login data",
        });
      }

      const { email, password } = req.body;

      const company = await CleaningCompany.findOne({ email });

      if (!company) {
        return res.status(400).json({ message: "Company not found" });
      }

      if (!company.isActive) {
        return res.status(400).json({ message: "The Company is banned" });
      }

      // const isMatch = await bcrypt.compare(password, company.password);
      const isMatch = await verifyPassword(password, company.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Invalid password, please try again" });
      }

      // const token = jwt.sign({ companyId: company.id }, config.jwtSecret, {
      //   expiresIn: "12h",
      // });
      const token = await signToken(company.id);

      res.json({ token, companyId: company.id, data: company });
    } catch (e) {
      res.status(500).json({ message: "Something went wrong, try again" });
    }
  }
);

module.exports = router;
