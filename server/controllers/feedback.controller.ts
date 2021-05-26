import { Request, Response } from "express";
const { Feedback } = require("../models/Feedback");
import { CleaningCompany } from "../models/CleaningCompany";

export default class FeedbackController {
  public static async createFeedback(req: Request, res: Response) {
    try {
      const {
        rating,
        feedbackText,
        companyId,
        _id,
        logo,
        email,
        firstName,
        lastName,
      } = req.body;

      const oldFeedback = await Feedback.find({
        owner: _id,
        company: companyId,
      });

      if (!oldFeedback.length) {
        const feedback = new Feedback({
          owner: _id,
          rating,
          text: feedbackText,
          company: companyId,
          ownerLogo: logo,
          ownerEmail: email,
          ownerFirstName: firstName,
          ownerLastName: lastName,
        });

        await feedback.save();

        const company = await CleaningCompany.findById(companyId);
        const companyFeedbacks = await Feedback.find({ company: companyId });

        let ratingSum = 0;

        if (companyFeedbacks.length) {
          companyFeedbacks.forEach((e: any) => {
            ratingSum += +e.rating;
          });

          company.rating = ratingSum / companyFeedbacks.length;
        }

        await company.save();

        res.status(201).json({ feedback });
      } else {
        oldFeedback[0].rating = rating;
        oldFeedback[0].text = feedbackText;
        oldFeedback[0].date = new Date();

        await oldFeedback[0].save();

        const company = await CleaningCompany.findById(companyId);
        const companyFeedbacks = await Feedback.find({ company: companyId });

        let ratingSum = 0;

        if (companyFeedbacks.length) {
          companyFeedbacks.forEach((e: any) => {
            ratingSum += +e.rating;
          });

          company.rating = ratingSum / companyFeedbacks.length;
        }

        await company.save();

        res.status(201);
      }

      res.status(201);
    } catch (e) {
      res.status(500).json({ message: "Something went wrong, try again" });
    }
  }

  public static async getFeebbacks(req: Request, res: Response) {
    try {
      const feedbacks = await Feedback.find({ company: req.headers.company });

      res.json(feedbacks);
    } catch (e) {
      res.status(500).json({ message: "Something went wrong, try again" });
    }
  }
}
