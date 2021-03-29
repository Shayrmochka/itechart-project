import { Request, Response } from "express";
const { Router } = require("express");
const User = require("../models/User");
const Order = require("../models/Order");
const Feedback = require("../models/Feedback");
const {
  auth,
  signToken,
  hashPassword,
  verifyPassword,
  checkIsInRole,
  getRedirectUrl,
} = require("../middleware/auth.middleware");
const { check, body, validationResult } = require("express-validator");
const ROLES = require("../roles/roles");
const router = Router();

interface UserRequest extends Request {
  user: any;
}

router.get(
  "/",
  auth,
  checkIsInRole(ROLES.Admin),
  async (req: UserRequest, res: Response): Promise<void> => {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (e) {
      res.status(500).json({ message: "Something went wrong, try again" });
    }
  }
);

router.get(
  "/:id",
  auth,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await User.findById(req.params.id);

      res.json(user);
    } catch (e) {
      res.status(500).json({ message: "Something went wrong, try again" });
    }
  }
);

router.post(
  "/update",
  auth,
  checkIsInRole(ROLES.Admin),
  async (req: UserRequest, res: Response): Promise<void> => {
    try {
      const user = await User.findById(req.body._id);

      user.isActive = !user.isActive;

      await user.save();

      res.status(201).json({ user });
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
  async (req: UserRequest, res: Response) => {
    try {
      const user = await User.findById(req.body._id);
      const operationType = req.body.operationType;
      if (operationType === "profile") {
        const { firstName, lastName, email, phone, _id } = req.body;

        if (user.isActive) {
          user.firstName = firstName;
          user.lastName = lastName;
          user.email = email;
          user.phone = phone;
        }
      } else if (operationType === "password") {
        const { oldPassword, password, confirmPassword } = req.body;

        if (user.isActive) {
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
          const verifiedPass = await verifyPassword(oldPassword, user.password);

          console.log(verifiedPass);
          if (!verifiedPass) {
            return res
              .status(400)
              .json({ message: "Invalid password, please try again" });
          }

          const newPassword = await hashPassword(password);

          user.password = newPassword;
        }
      }

      await user.save();

      res.status(201).json(user);
    } catch (e) {
      res.status(500).json({ message: "Something went wrong, try again" });
    }
  }
);

router.post(
  "/delete-profile",
  auth,
  async (req: UserRequest, res: Response): Promise<void> => {
    try {
      const id = req.body._id;
      const user = await User.findById(id);
      const feedbacks = await Feedback.find({ owner: id });
      const orders = await Order.find({ owner: id });

      console.log("USER", user);
      console.log("FEEDBACKS", feedbacks);
      console.log("ORDERS", orders);
      if (feedbacks.length) {
        feedbacks.forEach(async (feedback: any) => {
          await Feedback.deleteOne({ _id: feedback._id });
        });
      }
      if (orders.length) {
        orders.forEach(async (feedback: any) => {
          await Order.deleteOne({ _id: feedback._id });
        });
      }

      await User.deleteOne({ _id: id });

      res.status(201).json({ message: "User deleted" });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Something went wrong, try again" });
    }
  }
);

module.exports = router;
