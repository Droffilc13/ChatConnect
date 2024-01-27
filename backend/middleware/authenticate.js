import jwt, { decode } from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const authenticate = asyncHandler(async (req, res, next) => {
    console.log("HEYEYEYEYEYE")
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        try {
            const token = req.headers.authorization.split(' ')[1];
            console.log("Token: ", token)
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded);
            const user = await User.findOne({ _id : { $eq:decoded.id } });
            req.user = user;
            console.log(user);
            next();
        } catch (error) {
            res.status(401);
            throw new Error('Unauthorized!');
        }
    } else {
        throw new Error('No Bearer token detected');
    }
});

export default authenticate;