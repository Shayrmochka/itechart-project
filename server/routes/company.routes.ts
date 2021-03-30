import { Request, Response } from "express";
const { Router } = require("express");
const CleaningCompany = require("../models/CleaningCompany");
const CleaningService = require("../models/CleaningService");
// const auth = require("../middleware/auth.middleware");
const {
  auth,
  signToken,
  hashPassword,
  verifyPassword,
  checkIsInRole,
  getRedirectUrl,
} = require("../middleware/auth.middleware");

const ROLES = require("../roles/roles");
const router = Router();

interface CompanyRequest extends Request {
  company: any;
}

router.get(
  "/",
  // auth,
  // checkIsInRole(ROLES.Admin),
  async (req: CompanyRequest, res: Response) => {
    try {
      const companies = await CleaningCompany.find({});
      res.json(companies);
    } catch (e) {
      res.status(500).json({ message: "Something went wrong, try again" });
    }
  }
);

router.get(
  "/:id",
  // auth,
  async (req: Request, res: Response) => {
    try {
      const company = await CleaningCompany.findById(req.params.id);
      // const services = await company.typeOfServices.map((e: String) => {
      //   return CleaningService.findById(e);
      // });

      const services: any = [];

      for (let i = 0; i < company.typeOfServices.length; i++) {
        services.push(
          await CleaningService.findById(company.typeOfServices[i])
        );
      }

      company.typeOfServices = services;
      //console.log(services);

      res.json(company);
    } catch (e) {
      res.status(500).json({ message: "Something went wrong, try again" });
    }
  }
);

router.post(
  "/update",
  auth,
  checkIsInRole(ROLES.Admin),
  async (req: CompanyRequest, res: Response) => {
    try {
      const company = await CleaningCompany.findById(req.body._id);

      company.isActive = !company.isActive;

      await company.save();

      res.status(201).json({ company });
    } catch (e) {
      res.status(500).json({ message: "Something went wrong, try again" });
    }
  }
);

module.exports = router;
