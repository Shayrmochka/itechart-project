import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User, IUser } from "../models/User";
import RequestWithUser from "../interfaces/requestWithUser.interface";
import DataStoredInToken from "../interfaces/dataStoredInToken";
import RequestWithHeader from "../interfaces/requestWithHeader.interface";
import NotAuthorizedException from "../exceptions/NotAuthorizedException";
import UserNotFoundException from "../exceptions/UserNotFoundException";
import dotenv from 'dotenv'
dotenv.config()

const auth = (req: RequestWithHeader, res: Response, next: NextFunction) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token: string = req.headers.authorization.split(" ")[1];

    if (!token) {
      const authError = new NotAuthorizedException();
      return res.status(authError.status).json({ message: authError.message });
    }

    const decoded: object = jwt.verify(token, process.env.jwtSecret);

    req.user = decoded;
    next();
  } catch (e) {
    const authError = new NotAuthorizedException();
    res.status(authError.status).json({ message: authError.message });
  }
};

const checkToken = (token: string) => {
  const decoded = jwt.verify(token, process.env.jwtSecret);
  return decoded;
};

const signToken = (user: string, accountOwner: string): void => {
  const dataStoredInToken: DataStoredInToken = {
    dataId: user,
  };

  return jwt.sign({ ...dataStoredInToken, accountOwner }, process.env.jwtSecret, {
    expiresIn: 604800,
  });
};

const hashPassword = async (password: string) => {
  if (!password) {
    throw new Error("Password was not provided");
  }

  const salt = await bcrypt.genSalt(12);
  return await bcrypt.hash(password, salt);
};

const verifyPassword = async (candidate: string, actual: string) => {
  return await bcrypt.compare(candidate, actual);
};

const checkIsInRole =
  (...roles: Array<string>) =>
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.redirect("/login");
    }

    const user: IUser | null = await User.findById(req.user.dataId);

    if (!user) {
      const userError = new UserNotFoundException();
      return res.status(userError.status).json({ message: userError.message });
    }

    const hasRole = roles.find((role: string) => user.role === role);
    if (!hasRole) {
      return res.json({ message: "No right to access" });
    }

    return next();
  };

export {
  auth,
  signToken,
  hashPassword,
  verifyPassword,
  checkIsInRole,
  checkToken,
};
