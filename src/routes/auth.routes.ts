import express from "express";
import { handleLogin, handleRegister } from "../controllers/auth.controller";
import { validateRole } from '../middlewares/auth';

const router = express.Router();

router.post("/register", validateRole, handleRegister);
router.post("/login", validateRole, handleLogin);

export default router;
