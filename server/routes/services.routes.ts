import { Request, Response } from "express";
const { Router } = require("express");

const CleaningService = require("../models/CleaningService");

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const services: Array<object> = await CleaningService.find();

    res.json(services);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong, try again" });
  }
});

module.exports = router;
