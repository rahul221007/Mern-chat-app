const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const userRoutes = require("./routes/userRoutes.js")
const messageRoutes = require("./routes/messagesRoute")
const app = express();
const socket = require("socket.io");
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes)
app.use("/api/messages", messageRoutes)


mongoose.promise = global.Promise;
mongoose.set("strictQuery", false);
mongoose.connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to database");
}).catch((err) => {
    console.log(err);
});

const server = app.listen(process.env.PORT || 5000, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});

const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    },
});
global.onlineUsers = new Map();
io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {   //adds the user  to online users list when connected
        onlineUsers.set(userId, socket.id);
    });


    socket.on("send-msg", (data) => {   //send the message 
        const sendUserSocket = onlineUsers.get(data.to);//retrives socket id of recipient
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.msg);
        }
    })
});