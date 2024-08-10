import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller";
import { authenticateToken } from "../middlewares/auth.middleware";
import { isSuperAdmin } from "../middlewares/role.middleware";

const router = Router();

router.post("/", authenticateToken, isSuperAdmin, createProduct);

router.get("/", getAllProducts);

router.put("/:id", authenticateToken, isSuperAdmin, updateProduct);

router.delete("/:id", authenticateToken, isSuperAdmin, deleteProduct);

export default router;
