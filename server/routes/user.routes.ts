import { Router } from "express";
import { auth, checkIsInRole } from "../middleware/auth.middleware";
import { check } from "express-validator";
import ROLES from "../roles/roles";
import UserController from "../controllers/user.controller";

const router = Router();

router.get("/", auth, checkIsInRole(ROLES.Admin), UserController.getUsers);

router.get("/:id", auth, UserController.getUserById);

router.put(
  "/update",
  auth,
  checkIsInRole(ROLES.Admin),
  UserController.updateUser
);

router.put(
  "/edit-profile",
  auth,
  [
    check("password", "Password min length must be 6 symbols").isLength({
      min: 6,
    }),
  ],
  UserController.editProfile
);

router.delete("/delete-profile", auth, UserController.deleteProfile);

export default router;
