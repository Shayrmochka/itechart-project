import { Request, Response } from "express";
import { CleaningService, ICleaningService } from "../models/CleaningService";

export default class ServicesController {
  public static async getServices(req: Request, res: Response) {
    try {
      const services: Array<ICleaningService> = await CleaningService.find();

      res.json(services);
    } catch (e) {
      res.status(500).json({ message: "Something went wrong, try again" });
    }
  }
}
