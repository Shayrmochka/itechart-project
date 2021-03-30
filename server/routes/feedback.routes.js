const { Router } = require("express");
const Feedback = require("../models/Feedback");
const User = require("../models/User");
const { auth, checkToken } = require("../middleware/auth.middleware");
const router = Router();

router.post("/create-new-feedback", auth, async (req, res) => {
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

    const oldFeedback = await Feedback.find({ owner: _id, company: companyId });

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

      res.status(201).json({ feedback });
    } else {
      oldFeedback[0].rating = rating;
      oldFeedback[0].text = feedbackText;
      oldFeedback[0].date = new Date();

      await oldFeedback[0].save();
      res.status(201);
    }

    res.status(201);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong, try again" });
  }
});

router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ company: req.headers.company });

    res.json(feedbacks);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong, try again" });
  }
});

module.exports = router;