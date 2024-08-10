import { Router } from "express";
import {
  addToCart,
  viewCart,
  checkoutCart,
} from "../controllers/cart.controller";
import { authenticateToken } from "../middlewares/auth.middleware";
import { isUser } from "../middlewares/role.middleware";

const router = Router();

router.post("/add", authenticateToken, isUser, addToCart);

router.get("/", authenticateToken, isUser, viewCart);

router.post("/checkout", authenticateToken, isUser, checkoutCart);

export default router;
