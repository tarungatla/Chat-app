const express = require('express');
const app = express();
const http = require("http");
const cors = require("cors");        //middlewareWrapper
const {Server} = require("socket.io"); //Server is a class 
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {           //Server for socket
    cors: {
        origin: "http://localhost:3000",          //the url from which socket server will communicate
        methods: ["GET","POST"],
    },
});

io.on("connection", (socket)=>{         //event driven; it receives an event("connection" here) and a callback function as arguments, the events will be emitted from the
   
    console.log(`User connected: ${socket.id}`);

    socket.on("join_room", (data)=> {                              //event and a callback function
        socket.join(data);
        console.log(`User with id ${socket.id} joined the room ${data}`);
    })

    socket.on("send_message", (data)=> {                            
        socket.to(data.room).emit("receive_message",data);       //on data.room room we are emmitting the receive message event
        console.log(data);
    })

    socket.on("disconnect", ()=> {
        console.log("User disconnected", socket.id);   
    })

});

server.listen(3001, ()=>{
    console.log("Server running");
})