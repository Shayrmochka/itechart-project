import { Request, Response } from "express";
import { Router } from "express";
import { CleaningCompany, ICleaningCompany } from "../models/CleaningCompany";
import { CleaningService, ICleaningService } from "../models/CleaningService";
import { Order, IOrder } from "../models/Order";
import { Feedback, IFeedback } from "../models/Feedback";
import CompanyRequest from "../interfaces/companyRequest.interface";
import { check, validationResult } from "express-validator";
import ROLES from "../roles/roles";
import {
  auth,
  hashPassword,
  verifyPassword,
  checkIsInRole,
} from "../middleware/auth.middleware";

const router = Router();

router.get(
  "/",

  async (req: CompanyRequest, res: Response) => {
    try {
      const companies: Array<ICleaningCompany> = await CleaningCompany.find({});
      res.json(companies);
    } catch (e) {
      res.status(500).json({ message: "Something went wrong, try again" });
    }
  }
);

router.get(
  "/:id",

  async (req: Request, res: Response) => {
    try {
      const company: ICleaningCompany = await CleaningCompany.findById(
        req.params.id
      );

      const services: Array<ICleaningService> = [];

      for (let i = 0; i < company.typeOfServices.length; i++) {
        services.push(
          await CleaningService.findById(company.typeOfServices[i])
        );
      }

      company.typeOfServices = services;

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
      const company: ICleaningCompany = await CleaningCompany.findById(
        req.body._id
      );

      if (req.body.banReason) {
        company.banReason = req.body.banReason;
      }
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
      const company: ICleaningCompany = await CleaningCompany.findById(
        req.body._id
      );
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
      const orders: Array<IOrder> = await Order.find({ company: id });
      const feedbacks: Array<IFeedback> = await Feedback.find({ company: id });

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
      res.status(500).json({ message: "Something went wrong, try again" });
    }
  }
);

module.exports = router;
