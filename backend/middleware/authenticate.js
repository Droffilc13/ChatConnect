import jwt, { decode } from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const authenticate = asyncHandler(async (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // const user = await User.findById(decoded.id);
            const user = await User.find({ _id : { $eq:decoded.id } });
            req.user = user
            next();
        } catch (error) {
            console.log("Hello2")
            res.status(401);
            throw new Error('Unauthorized!');
        }
    } else {
        throw new Error('No Bearer token detected');
    }
});

export default authenticate;