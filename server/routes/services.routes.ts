import { Router } from "express";
import ServicesController from "../controllers/services.controller";

const router = Router();

router.get("/", ServicesController.getServices);

module.exports = router;
