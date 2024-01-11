import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "./generateToken.js";

const registerUser = asyncHandler( async(req, res) => {
    const { username, email, password, pic} = req.body;
    if (!username || !email || !password) {
        console.log("Hello")
        res.status(400);
        throw new Error("Please Enter all the Fields");
    }
    
    const userExists = await User.findOne({email: email});

    if (userExists) {
        res.status(400)
        throw new Error('User with this email already exists!');
    }
    const user = await User.create({
        name: username, 
        email,
        password,
        pic
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error("User failed to create!");
    }
});

const authenticateUser = asyncHandler( async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name, 
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        });
    } else {
        throw new Error("User credentials are not correct!");
    }
})

const getAllUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search 
        ? {
            $or: [
                { username: { $regex: req.query.search, $options: "i" }},
                { email: { $regex: req.query.search, $options: "i" }},
            ]
        }
        : {};
    const users = await User.find(keyword).find({ _id: { $ne: req.user_id }});
    res.send(users);
})

export { registerUser, authenticateUser, getAllUsers };

