import { Request, Response } from "express";
import { Router } from "express";
import bcrypt from "bcryptjs";
import { check, validationResult } from "express-validator";
import { User, IUser } from "../models/User";
import { CleaningCompany, ICleaningCompany } from "../models/CleaningCompany";
import { useBot } from "../telegramBot/telegramBot";
import ROLES from "../roles/roles";
const router = Router();
const {
  signToken,
  hashPassword,
  verifyPassword,
  checkToken,
} = require("../middleware/auth.middleware");

// /api/auth/check
router.post(
  "/check",

  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Invalid token",
        });
      }

      const decoded = checkToken(req.body.data);

      if (decoded.accountOwner === "user") {
        const user: IUser = await User.findById(decoded.dataId);

        if (!user) {
          return res.status(400).json({ message: "User not found" });
        }

        if (!user.isActive) {
          return res.status(400).json({ message: "The user is banned" });
        }

        res.json(user);
      } else if (decoded.accountOwner === "company") {
        const company: ICleaningCompany = await CleaningCompany.findById(
          decoded.dataId
        );

        if (!company) {
          return res.status(400).json({ message: "Company not found" });
        }

        if (!company.isActive) {
          return res.status(400).json({ message: "The company is banned" });
        }

        res.json(company);
      }
    } catch (e) {
      res.status(500).json({ message: "Something went wrong, try again" });
    }
  }
);

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
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty() || req.body.password !== req.body.confirmPassword) {
        return res.status(400).json({
          errors: errors.array(),
          message: "The registration data is incorrect",
        });
      }

      const { email, password, firstName, lastName, phone } = req.body;

      const candidate: IUser = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: "This user already exists" });
      }

      const hashedPassword = await hashPassword(password);

      const user = new User({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phone,
        isActive: true,
        role: ROLES.User,
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

      const user: IUser = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      if (!user.isActive) {
        return res.status(400).json({ message: "The user is banned" });
      }

      const isMatch = await verifyPassword(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Invalid password, please try again" });
      }

      const token = await signToken(user.id, "user");
      useBot(`${user.firstName} ${user.lastName}`, "Authenticated");
      res.json({ token, user });
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
  ],
  async (req: Request, res: Response) => {
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
        name,
        description,
        address,
        services,
        priceList,
      } = req.body;

      const candidate: ICleaningCompany = await CleaningCompany.findOne({
        email,
      });

      if (candidate) {
        return res.status(400).json({ message: "This Company already exist" });
      }

      const sortedServices = services
        .filter((e: any) => e.checked)
        .map((e: any) => e._id);

      const hashedPassword = await bcrypt.hash(password, 12);
      const company: ICleaningCompany = new CleaningCompany({
        email,
        password: hashedPassword,
        name,
        description,
        address,
        typeOfServices: sortedServices,
        priceList,
        rating: 0,
        isActive: true,
      });

      await company.save();

      useBot(`${name}`, "Company created");
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

      const company: ICleaningCompany = await CleaningCompany.findOne({
        email,
      });

      if (!company) {
        return res.status(400).json({ message: "Company not found" });
      }

      if (!company.isActive) {
        return res.status(400).json({ message: "The Company is banned" });
      }

      const isMatch = await verifyPassword(password, company.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Invalid password, please try again" });
      }

      const token = await signToken(company.id, "company");

      res.json({ token, company });
    } catch (e) {
      res.status(500).json({ message: "Something went wrong, try again" });
    }
  }
);

module.exports = router;
