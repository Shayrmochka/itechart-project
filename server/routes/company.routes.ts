import { Router } from "express";
import { check } from "express-validator";
import ROLES from "../roles/roles";
import { auth, checkIsInRole } from "../middleware/auth.middleware";

import CompanyController from "../controllers/company.controller";

const router = Router();

router.get("/", CompanyController.getCompanies);

router.get("/:id", CompanyController.getCompanyById);

router.put(
  "/update",
  auth,
  checkIsInRole(ROLES.Admin),
  CompanyController.updateStatus
);

router.put(
  "/edit-profile",
  auth,
  [
    check("password", "Password min length must be 6 symbols").isLength({
      min: 6,
    }),
  ],
  CompanyController.editProfile
);

router.delete("/delete-profile", auth, CompanyController.deleteProfile);

module.exports = router;
