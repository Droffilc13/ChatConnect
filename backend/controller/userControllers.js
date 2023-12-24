import asyncHandler from "express-async-handler";

const registerUser = asyncHandler( async() => {
    const { name, email, password, pic} = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please Enter all the Fields");
    }
});