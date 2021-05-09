import { Request, Response } from "express";
import { Router } from "express";
import { User, IUser } from "../models/User";
import { signToken, hashPassword } from "../middleware/auth.middleware";
import { validationResult } from "express-validator";
import ROLES from "../roles/roles";
const router = Router();

router.post(
  "/google",

  async (req: Request, res: Response) => {
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

      res.json({ token, user });
    } catch (e) {
      res.status(500).json({ message: "Something went wrong, try again" });
    }
  }
);

module.exports = router;
