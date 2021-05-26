import { useBot } from "./../telegramBot/telegramBot";
import { Request, Response } from "express";
import { User, IUser } from "../models/User";
import RequestWithUser from "../interfaces/requestWithUser.interface";
import { Order, IOrder } from "../models/Order";
import { Feedback, IFeedback } from "../models/Feedback";
import { hashPassword, verifyPassword } from "../middleware/auth.middleware";
import { validationResult } from "express-validator";
import SomethingWentWrong from "../exceptions/SomethingWentWrong";
import UserNotFoundException from "../exceptions/UserNotFoundException";

export default class UserController {
  public static async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users: Array<IUser> = await User.find({});
      res.json(users);
    } catch (e) {
      const wrongError = new SomethingWentWrong();
      res.status(wrongError.status).json({ message: wrongError.message });
    }
  }

  public static async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const user: IUser = await User.findById(req.params.id);

      res.json(user);
    } catch (e) {
      const wrongError = new SomethingWentWrong();
      res.status(wrongError.status).json({ message: wrongError.message });
    }
  }

  public static async updateUser(req: RequestWithUser, res: Response) {
    try {
      const user: IUser | null = await User.findById(req.body._id);

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      if (req.body.banReason) {
        user.banReason = req.body.banReason;
      }
      user.isActive = !user.isActive;

      await user.save();

      if (user.isActive) {
        useBot(`${user.firstName} ${user.lastName}`, "Unblocked");
      } else {
        useBot(`${user.firstName} ${user.lastName}`, "Blocked");
      }

      res.status(201).json(user);
    } catch (e) {
      const wrongError = new SomethingWentWrong();
      res.status(wrongError.status).json({ message: wrongError.message });
    }
  }

  public static async editProfile(req: RequestWithUser, res: Response) {
    try {
      const user: IUser | null = await User.findById(req.body._id);
      if (!user) {
        const userError = new UserNotFoundException();
        return res
          .status(userError.status)
          .json({ message: userError.message });
      }
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
      const wrongError = new SomethingWentWrong();
      res.status(wrongError.status).json({ message: wrongError.message });
    }
  }

  public static async deleteProfile(
    req: RequestWithUser,
    res: Response
  ): Promise<void> {
    try {
      const id = req.body._id;
      const feedbacks: Array<IFeedback> = await Feedback.find({ owner: id });
      const orders: Array<IOrder> = await Order.find({ owner: id });

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
      const wrongError = new SomethingWentWrong();
      res.status(wrongError.status).json({ message: wrongError.message });
    }
  }
}
