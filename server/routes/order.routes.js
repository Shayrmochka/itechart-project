const { Router } = require("express");
const Order = require("../models/Order");
const User = require("../models/User");
const CleaningCompany = require("../models/CleaningCompany");
const { auth, checkToken } = require("../middleware/auth.middleware");
const router = Router();

router.post("/create-new-order", auth, async (req, res) => {
  try {
    // console.log("USER", req.user);
    console.log("BODY", req.body);

    const {
      address,
      flatDescription,
      typeOfService,
      serviceName,
      date,
      companyId,
      resultPrice,
      resultTime,
      bathRoomCounter,
      smallRoomCounter,
      bigRoomCounter,
    } = req.body;

    const order = new Order({
      dateCleaning: date,
      owner: req.user.dataId,
      company: companyId,
      address,
      typeOfService,
      serviceName,
      flatDescription,
      smallRooms: smallRoomCounter,
      bigRooms: bigRoomCounter,
      bathrooms: bathRoomCounter,
      price: resultPrice,
      time: resultTime,
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

      for (let i = 0; i < orders.length; i++) {
        orders[i].owner = await User.findById(orders[i].owner);

        orders[i].company = await CleaningCompany.findById(orders[i].company);
      }

      res.json(orders);
    } else if (decoded.accountOwner === "company") {
      const orders = await Order.find({ company: decoded.dataId });

      for (let i = 0; i < orders.length; i++) {
        orders[i].owner = await User.findById(orders[i].owner);

        orders[i].company = await CleaningCompany.findById(orders[i].company);
      }

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

router.post("/delete-order", auth, async (req, res) => {
  try {
    const order = await Order.findById(req.body._id);

    if (!order) {
      return res.status(400).json({ message: "Order not found" });
    }

    console.log(req.body);
    await Order.deleteOne({ _id: req.body._id });

    res.status(201).json({ status: "deleted" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong, try again" });
  }
});

module.exports = router;
