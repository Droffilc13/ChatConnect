import express from "express";
import { registerUser, authenticateUser, getAllUsers } from "../controller/userControllers.js";
import authorized from "../middleware/authorized.js";

const router = express.Router();

router.route('/').post(registerUser).get(authorized, getAllUsers);
router.route('/login').post(authenticateUser);

export default router;