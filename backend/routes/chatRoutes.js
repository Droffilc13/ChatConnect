import express from 'express';
import authorized from '../middleware/authorized.js';
import { accessChat, fetchChats, createGroupChat, renameGroup, removeFromGroup, addToGroup } from '../controller/chatController.js';

const router = express.Router();

router.route('/').get(authorized, fetchChats).post(authorized, accessChat);
router.route('/group').post(authorized, createGroupChat);
router.route('/rename').patch(authorized, renameGroup);
router.route('/removefromgroup').put(authorized, removeFromGroup);
router.route('/addtogroup').put(authorized, addToGroup);

export default router;