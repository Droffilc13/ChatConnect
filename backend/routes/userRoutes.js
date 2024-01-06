import express from "express";
import registerUser from "../controller/userControllers.js";
import asyncHandler from "express-async-handler";

const router = express.Router();

router.route('/').post(registerUser);

export default router;