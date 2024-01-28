import express from 'express';
import authorized from '../middleware/authorized.js';
import { sendMessage, getAllMessages } from '../controller/messageController.js';

const router = express.Router();

router.route('/').post(authorized, sendMessage)
router.route('/:chatId').get(authorized, getAllMessages);

export default router;

