import { Router } from "express";
import SocialController from "../controllers/social.controller";

const router = Router();

router.post("/google", SocialController.googleAuth);

export default router;
