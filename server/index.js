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
const socketio = new Server(server, { cors: { origin: "*" } });

app.use(cors({
    credentials: true,
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
socketio.on('connection', (socket) => {
    socket.on('message', (data) => {
        socketio.sockets.emit("message", data)
    })
    socket.on('typing',(data) =>{
        socket.broadcast.emit("typing",data)
    })
    socket.on('readMessage',(data) =>{
        socket.broadcast.emit('readMessage',data)
    })
    socket.on('Calling', (data) =>{
        socket.broadcast.emit('Calling',data)
    })
    socket.on('AcceptCalling', (data) =>{
        console.log(data)
        socket.broadcast.emit('AcceptCalling',data)
    })
    socket.on('backVideo', (data) =>{
        socket.broadcast.emit('backVideo',data)
    })
    socket.on("sendVideo", (data) => {
        socket.broadcast.emit('sendVideo', data);
    })
    socket.on("answerCall",data =>{
        socket.broadcast.emit('answerCall', data);
    })
    socket.on("answerCaller",data =>{
        socket.broadcast.emit('answerCaller', data);
    })
    socket.on("closeVideoSession",data =>{
        socket.broadcast.emit('closeVideoSession', data)
    })
})
startAPP()


