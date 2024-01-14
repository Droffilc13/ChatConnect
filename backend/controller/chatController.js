import asyncHandler from "express-async-handler";
import User from '../models/userModel.js';
import Chat from '../models/chatModel.js';

const accessChat = asyncHandler( async (req, res) => {
    const { userId } = req.body;
    console.log(userId);
    if (!userId) {
        res.status(400);
        throw new Error('UserId param was not sent with request');
    }
    // single chat
    const singleChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: {$eq:req.user._id} }}, // the user himself/herself
            { users: { $elemMatch: {$eq: userId} }}, // the user that is interacting
        ]
    })
    .populate("users", "-password")
    .populate("latestMessage")

    console.log("Single chat:", singleChat)

    const relevantChats = await User.populate(singleChat, {
        path: "latestMessage.sender",
        select: "name pic email"
    })

    if (relevantChats.length > 0) {
        res.send(relevantChats[0]);
    } else {
        console.log("Creating new Chat")
        try {
            const newChat = await Chat.create({
                chatName: "Chatting2",
                isGroupChat: false,
                users: [
                    req.user._id,
                    userId
                ],
            })

            const chatToSend = await Chat.findOne({
                _id: newChat._id
            }).populate("users", "-password");

            res.status(200).send(chatToSend);
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    }
})

const fetchChats = asyncHandler( async (req, res) => {
    console.log(fetchChats);    
})

const createGroupChat = asyncHandler( async (req, res) => {
    console.log("createGroupChat")
})

const renameGroup = asyncHandler( async (req, res) => {
    console.log("renameGroup")
})

const removeFromGroup = asyncHandler( async (req, res) => {
    console.log("removeFromGroup")
})

const addToGroup = asyncHandler( async (req, res) => {
    console.log("addToGroup")
})

export { accessChat, fetchChats, createGroupChat, renameGroup, removeFromGroup, addToGroup };
