import { Request, Response } from "express";
import { User, IUser } from "../models/User";
import { signToken, hashPassword } from "../middleware/auth.middleware";
import { validationResult } from "express-validator";
import { useBot } from "../telegramBot/telegramBot";
import ROLES from "../roles/roles";

export default class SocialController {
  public static async googleAuth(req: Request, res: Response) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty() || req.body.password !== req.body.confirmPassword) {
        return res.status(400).json({
          errors: errors.array(),
          message: "The registration data is incorrect",
        });
      }

      const { id, email, firstName, lastName, profilePicURL } = req.body;

      const candidate: IUser = await User.findOne({ email });

      if (candidate) {
        if (!candidate.isActive) {
          return res.status(400).json({ message: "The user is banned" });
        }

        const token = await signToken(candidate.id, "user");
        useBot(`${candidate.firstName} ${candidate.lastName}`, "Authenticated");
        return res.json({ token, user: candidate });
      }

      const hashedPassword = await hashPassword(id);

      const user: IUser = new User({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phone: "not found",
        logo: profilePicURL,
        isActive: true,
        role: ROLES.User,
      });

      await user.save();

      const token = await signToken(user.id, "user");
      useBot(`${user.firstName} ${user.lastName}`, "Authenticated");
      res.json({ token, user });
    } catch (e) {
      res.status(500).json({ message: "Something went wrong, try again" });
    }
  }
}
