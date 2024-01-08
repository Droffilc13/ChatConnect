import express from "express";
import { registerUser, authenticateUser } from "../controller/userControllers.js";
import asyncHandler from "express-async-handler";

const router = express.Router();

router.route('/').post(registerUser);
router.route('/login').post(authenticateUser);

export default router;