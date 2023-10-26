import express from "express";
import chats from "./data/data.js";
import dotenv from 'dotenv';
import path from 'path';
import cors from "cors";

const app = express()

app.use(cors());

const __dirname = path.resolve()
const envPath = {path : path.join(__dirname, '/.env')}
dotenv.config(envPath)

// Creation of API
app.get("/", (req, res) => {
    res.send("Hello")
})

app.get("/api/chats", (req, res) => {
    res.send(chats)
})

app.get("/api/chats/:identifier", (req, res) => {
    chat = chats.find(c => c._id == req.params.identifier)
    res.send(chat)
})

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server Started on PORT ${PORT}`))

