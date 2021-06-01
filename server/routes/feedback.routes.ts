import { Router } from "express";
import { auth } from "../middleware/auth.middleware";
import FeedbackController from "../controllers/feedback.controller";
const router = Router();

router.post("/create-new-feedback", auth, FeedbackController.createFeedback);

router.get("/", FeedbackController.getFeebbacks);

export default router;
