import express from "express";
import { registerUser, authenticateUser, getAllUsers } from "../controller/userControllers.js";


const router = express.Router();

router.route('/').post(registerUser).get(getAllUsers);
router.route('/login').post(authenticateUser);

export default router;