import { Request, Response } from "express";
const { Router } = require("express");
const User = require("../models/User");
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

module.exports = router;
