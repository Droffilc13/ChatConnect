import express from "express";
import chats from "./data/data.js";
import dotenv from 'dotenv';
import path from 'path';
import cors from "cors";
import connectDB from "./config/db.js";
import colors from 'colors';
import userRoutes from './routes/userRoutes.js';
import chatRoutes from './routes/chatRoutes.js';

const app = express()

app.use(cors());

const __dirname = path.resolve()
const envPath = {path : path.join(__dirname, '/.env')}
dotenv.config(envPath)
connectDB();

app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/chats", chatRoutes);

app.use((req, res, next) => {
    res.status(404).send('Sorry, the page you are looking for does not exist');
})

// TODO: The error function handling
app.use((err, req, res, next) => {
    console.log("Hello")
    console.log(err);
    throw err;
})



const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server Started on PORT ${PORT}`.yellow.bold));

