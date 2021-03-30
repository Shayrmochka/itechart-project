const { Router } = require("express");

const CleaningService = require("../models/CleaningService");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const services = await CleaningService.find();

    res.json(services);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong, try again" });
  }
});

module.exports = router;
