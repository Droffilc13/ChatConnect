import express from "express";
import { registerUser, authenticateUser, getAllUsers } from "../controller/userControllers.js";
import authenticate from "../middleware/authenticate.js";

const router = express.Router();

router.route('/').post(registerUser).get(authenticate, getAllUsers);
router.route('/login').post(authenticateUser);

export default router;