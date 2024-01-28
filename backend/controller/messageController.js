import asyncHandler from "express-async-handler";
import User from "../models/userModel";
import Chat from "../models/chatModel";
import Message from "../models/messageModel";

const sendMessage = () => {
    console.log("send message");
}

const getAllMessages = () => {
    console.log("Get all messages")
}

export { getAllMessages, sendMessage };