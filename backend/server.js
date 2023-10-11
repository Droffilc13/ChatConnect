import express from "express";
import { chats } from "./data/data.js";

const app = express()

// Creation of API
app.get("/", (req, res) => {
    res.send("Hello")
})

// app.get("/master/chats", (req,res) => {
//     res.send(chats)
// })

app.listen(5000, console.log("Server Started on PORT 5000"))

