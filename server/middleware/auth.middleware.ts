const jwt = require("jsonwebtoken");
const config = require("../config/config");
const bcrypt = require("bcryptjs");
const ROLES = require("../roles/roles");
const User = require("../models/User");

const auth = (req: any, res: any, next: any) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token: string = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "You are not logged in" });
    }

    const decoded: object = jwt.verify(token, config.jwtSecret);
    // console.log("DECODED", decoded);
    // console.log("REQ USER", req.user);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ message: "You are not logged in" });
  }
};

const checkToken = (token: string) => {
  // const userToken: string = token;

  // if (!userToken) {
  //   return res.status(401).json({ message: "You are not logged in" });
  // }

  const decoded: object = jwt.verify(token, config.jwtSecret);
  return decoded;
};

const signToken = (user: string, accountOwner: string): void => {
  return jwt.sign({ dataId: user, accountOwner }, config.jwtSecret, {
    expiresIn: 604800,
  });
};

const hashPassword = async (password: string): Promise<any> => {
  if (!password) {
    throw new Error("Password was not provided");
  }

  const salt = await bcrypt.genSalt(12);
  return await bcrypt.hash(password, salt);
};

const verifyPassword = async (
  candidate: string,
  actual: string
): Promise<any> => {
  return await bcrypt.compare(candidate, actual);
};

const checkIsInRole = (...roles: any) => async (
  req: any,
  res: any,
  next: any
): Promise<any> => {
  console.log("UT:", req.user);
  if (!req.user) {
    return res.redirect("/login");
  }

  const user = await User.findById(req.user.dataId);

  const hasRole = roles.find((role: string) => user.role === role);
  if (!hasRole) {
    //return res.redirect("http://localhost:4000");
    return res.json({ message: "No right to access" });
  }

  return next();
};

const getRedirectUrl = (role: string): string => {
  switch (role) {
    case ROLES.Admin:
      return "/test";
    case ROLES.User:
      return "/test";
    default:
      return "/";
  }
};

module.exports = {
  auth,
  signToken,
  hashPassword,
  verifyPassword,
  checkIsInRole,
  getRedirectUrl,
  checkToken,
};
