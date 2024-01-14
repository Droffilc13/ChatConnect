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
    try {
        // TODO: probably need to sort the chats chronologically
        // TODO2: what is the use of User.populate(....)
        const relevantChats = await Chat.find({users: {$elemMatch: {$eq: req.user._id}}})
            .populate("users", "-password")
            .populate("latestMessage")
            .populate("groupAdmin", "-password")
        res.send(relevantChats);
    } catch (e) {
        res.status(400);
        throw new Error(e.message);
    }
})

const createGroupChat = asyncHandler( async (req, res) => {
    if (!req.body.users || !req.body.name) {
        return res.status(400).send({ message: "Please Fill out all the fields"});
    }

    const users = JSON.parse(req.body.users);

    if(users.length < 2) {
        return res.status(400).send("More than 2 users are require dto form a group chat");
    }

    users.push(req.user);

    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user,
        })

        const fullGroupChat = await Chat.findOne({
            _id: groupChat._id
        }).populate("users", "-password")
        .populate("latestMessage")
        .populate("users", "groupAdmin");

        res.status(200).send(fullGroupChat);
    } catch(e) {
        throw new Error(e.message);
    }
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
