// authRoutes.mjs
import express from "express";
const router = express.Router();
import { signup, login } from "../controllers/authControllers.js";

// Routes beginning with /api/auth
router.post("/signup", signup);
router.post("/login", login);

export default router;
