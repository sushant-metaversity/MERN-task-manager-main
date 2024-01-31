import http from 'http';
import { Server } from "socket.io";
import express from 'express';
import { authSocketMiddleware } from '../middlewares/index.js';
import { ClientEvents, ServerEvents } from '../utils/events.js';
import { createTask, deleteTask, getTasks, putTask } from './controllers/taskControllers.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server,{cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }});

io.use((socket, next) => {
    authSocketMiddleware(socket, next);
  });
io.on('connection', (socket) => {
  getTasks(socket)
  socket.on(ClientEvents.TASKS,()=>getTasks(socket))
  socket.on(ClientEvents.TASK_CREATE,(args)=>createTask(socket,args))
  socket.on(ClientEvents.TASK_DELETE,(args)=>deleteTask(socket,args))
  socket.on(ClientEvents.TASK_UPDATE,(args)=>putTask(socket,args))
  socket.on("disconnect", (socket) => {
    console.log("disconnect");
  })
});
const PORT = process.env.PORT || 4001;

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});

