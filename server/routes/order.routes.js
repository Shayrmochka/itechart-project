const { Router } = require("express");
const Order = require("../models/Order");
const User = require("../models/User");
const CleaningCompany = require("../models/CleaningCompany");
const { auth, checkToken } = require("../middleware/auth.middleware");
const router = Router();

router.post("/create-new-order", auth, async (req, res) => {
  try {
    // console.log("USER", req.user);
    // console.log("BODY", req.body);

    const {
      services,
      address,
      flatDescription,
      date,
      companyId,
      companyLogo,
      email,
      logo,
    } = req.body;

    const order = new Order({
      dateCleaning: date,
      owner: req.user.dataId,
      orderTo: companyId,
      companyLogo,
      address,
      services,
      flatDescription,
      ownerLogo: logo,
      ownerEmail: email,
    });

    await order.save();

    res.status(201).json({ order });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong, try again" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const decoded = checkToken(req.headers.authorization.split(" ")[1]);

    if (decoded.accountOwner === "user") {
      const orders = await Order.find({ owner: decoded.dataId });
      // const result = orders.map(async (order) => {
      //   order.company = await CleaningCompany.find({ _id: order.orderTo });
      // });
      //const companyInfo = await CleaningCompany.find({ _id: orders.orderTo });
      //console.log(result);
      res.json(orders);
    } else if (decoded.accountOwner === "company") {
      const orders = await Order.find({ orderTo: decoded.dataId });

      res.json(orders);
    }
  } catch (e) {
    res.status(500).json({ message: "Something went wrong, try again" });
  }
});

router.post("/update-set-answer", auth, async (req, res) => {
  try {
    const order = await Order.findById(req.body._id);

    order.checked = true;

    if (req.body.answer) {
      order.status = "accepted";
    } else {
      order.status = "declined";
    }

    await order.save();
    res.status(201).json({ order });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong, try again" });
  }
});

module.exports = router;
