import { Request, Response } from "express";
const { Router } = require("express");
const CleaningCompany = require("../models/CleaningCompany");
const CleaningService = require("../models/CleaningService");
const Order = require("../models/Order");
const Feedback = require("../models/Feedback");
// const auth = require("../middleware/auth.middleware");
const {
  auth,
  signToken,
  hashPassword,
  verifyPassword,
  checkIsInRole,
  getRedirectUrl,
} = require("../middleware/auth.middleware");
const { check, validationResult } = require("express-validator");

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
  async (req: CompanyRequest, res: Response): Promise<void> => {
    try {
      const company = await CleaningCompany.findById(req.body._id);

      company.isActive = !company.isActive;

      await company.save();

      res.status(201).json(company);
    } catch (e) {
      res.status(500).json({ message: "Something went wrong, try again" });
    }
  }
);

router.post(
  "/edit-profile",
  auth,
  [
    check("password", "Password min length must be 6 symbols").isLength({
      min: 6,
    }),
  ],
  async (req: CompanyRequest, res: Response) => {
    try {
      const company = await CleaningCompany.findById(req.body._id);
      const operationType = req.body.operationType;
      if (operationType === "profile") {
        const { name, priceList, email, address, description, _id } = req.body;

        if (company.isActive) {
          company.name = name;
          company.priceList = priceList;
          company.email = email;
          company.address = address;
          company.description = description;
        }
      } else if (operationType === "password") {
        const { oldPassword, password, confirmPassword } = req.body;

        if (company.isActive) {
          const errors = validationResult(req);
          console.log(errors);
          if (
            !errors.isEmpty() ||
            req.body.password !== req.body.confirmPassword
          ) {
            return res.status(400).json({
              errors: errors.array(),
              message: "The registration data is incorrect",
            });
          }
          const verifiedPass = await verifyPassword(
            oldPassword,
            company.password
          );

          console.log(verifiedPass);
          if (!verifiedPass) {
            return res
              .status(400)
              .json({ message: "Invalid password, please try again" });
          }

          const newPassword = await hashPassword(password);

          company.password = newPassword;
        }
      }

      await company.save();

      res.status(201).json(company);
    } catch (e) {
      res.status(500).json({ message: "Something went wrong, try again" });
    }
  }
);

router.post(
  "/delete-profile",
  auth,
  async (req: CompanyRequest, res: Response): Promise<void> => {
    try {
      const id = req.body._id;
      const company = await CleaningCompany.findById(id);

      const orders = await Order.find({ company: id });
      const feedbacks = await Feedback.find({ company: id });

      if (feedbacks.length) {
        feedbacks.forEach(async (feedback: any) => {
          await Feedback.deleteOne({ _id: feedback._id });
        });
      }

      if (orders.length) {
        orders.forEach(async (order: any) => {
          await Order.deleteOne({ _id: order._id });
        });
      }

      await CleaningCompany.deleteOne({ _id: id });

      res.status(201).json({ message: "Company deleted" });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Something went wrong, try again" });
    }
  }
);

module.exports = router;
