import express from 'express';
import authenticate from '../middleware/authenticate.js';
import { accessChat, fetchChats, createGroupChat, renameGroup, removeFromGroup, addToGroup } from '../controller/chatController.js';

const router = express.Router();

router.route('/').post(authenticate, accessChat);
router.route('/').get(authenticate, fetchChats);
router.route('/group').post(authenticate, createGroupChat);
router.route('/rename').put(authenticate, renameGroup);
router.route('/removegroup').put(authenticate, removeFromGroup);
router.route('/addgroup').put(authenticate, addToGroup);

export default router;