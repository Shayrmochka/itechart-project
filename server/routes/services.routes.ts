import { Request, Response } from "express";
import { Router } from "express";

import { CleaningService, ICleaningService } from "../models/CleaningService";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const services: Array<ICleaningService> = await CleaningService.find();

    res.json(services);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong, try again" });
  }
});

module.exports = router;
