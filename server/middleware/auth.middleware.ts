import { Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const bcrypt = require("bcryptjs");
import { User, IUser } from "../models/User";
import RequestWithUser from "../interfaces/requestWithUser.interface";
import DataStoredInToken from "../interfaces/dataStoredInToken";
import RequestWithHeader from "../interfaces/requestWithHeader.interface";

const auth = (req: RequestWithHeader, res: Response, next: NextFunction) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token: string = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "You are not logged in" });
    }

    const decoded: object = jwt.verify(token, config.jwtSecret);

    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ message: "You are not logged in" });
  }
};

const checkToken = (token: string) => {
  const decoded: object = jwt.verify(token, config.jwtSecret);
  return decoded;
};

const signToken = (user: string, accountOwner: string): void => {
  const dataStoredInToken: DataStoredInToken = {
    dataId: user,
  };

  return jwt.sign({ ...dataStoredInToken, accountOwner }, config.jwtSecret, {
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

const checkIsInRole = (...roles: Array<string>) => async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res.redirect("/login");
  }

  const user: IUser | null = await User.findById(req.user.dataId);

  if (!user) {
    return res.status(400).json({ message: "User not found" });
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
