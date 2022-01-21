import express from "express";
import mongoose from "mongoose";
import cors from 'cors'
import router from "./User/UserRouter.js";
import cookieParser from "cookie-parser";
import { Server } from 'socket.io';
import { createServer } from 'http';

const DB_URL = 'mongodb+srv://Delonel:aruduqaha22032000@cluster0.gsodt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const PORT = 3001
const app = express()
const server = createServer(app); 
const socketio = new Server(server,{cors:{origin:"*"}});

app.use(cors({
    credentials:true,
    origin: "http://localhost:3000"
}))
app.use(express.json())
app.use(cookieParser())
app.use('/api', router)
const startAPP = async () => {
    try {
        await mongoose.connect(DB_URL, { useUnifiedTopology: true })
        server.listen(PORT, () => console.log('Server is worked on port'))
    } catch (e) {
        console.log(e)
    }
}
socketio.on('connection',(socket) =>{
    socket.on('message',(data) =>{
        socket.broadcast.emit("message",data)
    })
})
startAPP()


