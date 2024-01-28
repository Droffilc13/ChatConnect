import express from 'express';
import authorized from '../middleware/authorized';
import { sendMessage, getAllMessages } from '../controller/messageController';

const router = express.Router();

router.route('/').post(authorized, sendMessage)
router.route('/:chatId').get(authorized, getAllMessages);

export default router;

