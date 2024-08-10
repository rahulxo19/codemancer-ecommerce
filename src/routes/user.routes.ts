import { Router } from "express";
import { register, getUserProfile } from "../controllers/user.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

// @route   POST /api/users/register
// @desc    Register a new user
// @access  Public
router.post("/register", register);

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get("/profile", authenticateToken, getUserProfile);

export default router;
