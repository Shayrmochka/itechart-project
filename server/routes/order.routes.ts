import { Router } from "express";
import { auth } from "../middleware/auth.middleware";
import OrderController from "../controllers/order.controller";
const router = Router();

router.post("/create-new-order", auth, OrderController.createOrder);

router.get("/", auth, OrderController.getOrders);

router.get("/orders-chart", OrderController.getOrdersChart);

router.post("/update-set-answer", auth, OrderController.setAnswer);

router.post("/delete-order", auth, OrderController.deleteOrder);

module.exports = router;
