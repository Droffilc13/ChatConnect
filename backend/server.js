import express from "express";
import chats from "./data/data.js";
import dotenv from 'dotenv';
import path from 'path';

const app = express()

const __dirname = path.resolve()
const envPath = {path : path.join(__dirname, '/.env')}
dotenv.config(envPath)

// Creation of API
app.get("/", (req, res) => {
    res.send("Hello")
})

app.get("/chats", (req, res) => {
    res.send(chats)
})

app.get("/chats/:identifier", (req, res) => {
    chat = chats.find(c => c._id == req.params.identifier)
    res.send(chat)
})

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server Started on PORT ${PORT}`))

