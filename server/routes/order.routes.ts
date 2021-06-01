import { Router } from "express";
import { auth } from "../middleware/auth.middleware";
import OrderController from "../controllers/order.controller";
const router = Router();

router.post("/create-new-order", auth, OrderController.createOrder);

router.get("/", auth, OrderController.getOrders);

router.get("/orders-chart", OrderController.getOrdersChart);

router.put("/update-set-answer", auth, OrderController.setAnswer);

router.delete("/delete-order", auth, OrderController.deleteOrder);

export default router;
