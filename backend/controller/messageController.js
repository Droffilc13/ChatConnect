import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Chat from "../models/chatModel.js";
import Message from "../models/messageModel.js";

const sendMessage = asyncHandler(async (req, res) => {
    const { chatId, messageContent } = req.body

    if (!messageContent || !chatId) {
        console.log('Invalid data passed into request')
        res.status(400).sendStatus();
    }

    const newMessage = {
        sender: req.user._id,
        content: messageContent,
        chat: chatId
    }

    try {
        console.log("This is good");
        const message = await Message.create(newMessage);
        console.log(message);
        var messagePopulated = await message.populate("sender", "-password");
        messagePopulated = await messagePopulated.populate("chat");
        console.log(messagePopulated);
        messagePopulated = await User.populate(messagePopulated, {
            path: "chat.users",
            select: "-password"
        });
        console.log(messagePopulated);

        await Chat.findByIdAndUpdate(chatId, {latestMessage: messagePopulated});
        res.json(messagePopulated);
    } catch (error) {
        throw new Error(error.message);
    }

    console.log("send message");
});

const getAllMessages = asyncHandler(async (req, res) => {
    try {
        const messages = await Message.find({ chat: req.params.chatId }).populate("sender", "-password")
            .populate("chat");
        
        res.json(messages);
    } catch (error) {
        throw new Error(error.message);
    }
});

export { getAllMessages, sendMessage };