const { Router } = require("express");
const Order = require("../models/Order");
const User = require("../models/User");
const { auth } = require("../middleware/auth.middleware");
const router = Router();

router.post("/create-new-order", auth, async (req, res) => {
  try {
    console.log("USER", req.user);
    console.log("BODY", req.body);

    const {
      services,
      address,
      flatDescription,
      date,
      companyId,
      email,
      logo,
    } = req.body;

    const order = new Order({
      dateCleaning: date,
      owner: req.user.dataId,
      orderTo: companyId,
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
    const orders = await Order.find({ orderTo: req.user.dataId });

    console.log(orders);
    res.json(orders);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong, try again" });
  }
});

// router.get('/:id', auth, async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id)
//     res.json(order)
//   } catch (e) {
//     res.status(500).json({ message: 'Something went wrong, try again' })
//   }
// })

module.exports = router;
