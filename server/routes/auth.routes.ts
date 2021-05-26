import { Router } from "express";
import { check } from "express-validator";
import AuthController from "../controllers/auth.controller";
const router = Router();

// /api/auth/check
router.post("/check", AuthController.checkStatus);

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
  AuthController.registerUser
);

// /api/auth/login
router.post(
  "/login",
  [
    check("email", "Email is incorrect").normalizeEmail().isEmail(),
    check("password", "Enter the password").exists(),
  ],
  AuthController.loginUser
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
  AuthController.registerCompany
);

// /api/auth/login
router.post(
  "/login-company",
  [
    check("email", "Email is incorrect").normalizeEmail().isEmail(),
    check("password", "Password min length must be 6 symbols").exists(),
  ],
  AuthController.loginCompany
);

module.exports = router;
