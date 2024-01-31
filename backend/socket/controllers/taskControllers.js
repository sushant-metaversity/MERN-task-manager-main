// taskControllers.mjs
import {  ServerEvents } from "../../utils/events.js";
import Task from "../../models/Task.js";
import { validateObjectId } from "../../utils/validation.js";

export const getTasks = async (socket) => {
  try {
    const tasks = await Task.find({ user: socket.user._id }).sort([['priority', 1]]);
    socket.emit(ServerEvents.TASKS,{ tasks, status: true, message: "Tasks found successfully.." });
  } catch (err) {
    console.error(err);
    socket.emit(ServerEvents.ERROR,{ status: false, message: "Internal Server Error" });
  }
};

export const getTask = async (req, res) => {
  try {
    if (!validateObjectId(req.params.taskId)) {
      return res.status(400).json({ status: false, message: "Task id not valid" });
    }

    const task = await Task.findOne({ user: req.user.id, _id: req.params.taskId });
    if (!task) {
      return res.status(400).json({ status: false, message: "No task found.." });
    }
    res.status(200).json({ task, status: true, message: "Task found successfully.." });
  } catch (err) {
    console.error(err);
    socket.emit(ServerEvents.ERROR,{ status: false, message: "Internal Server Error" });
  }
};

export const createTask = async (socket,body) => {
  try {
    const { description,priority } = body;
    if (!description) {
      return socket.emit(ServerEvents.ERROR,{ status: false, message: "Description of task not found" });
    }
    if (!priority) {
      return socket.emit(ServerEvents.ERROR,{ status: false, message: "Priority of task not found" });
    }
    const task = await Task.create({ user: socket.user._id, description,priority });
    socket.emit(ServerEvents.TASK_ADDED,task)
  } catch (err) {
    console.error(err);
    return socket.emit(ServerEvents.ERROR,{ status: false, message: "Internal Server Error" });
  }
};

export const putTask = async (socket, body) => {
  try {
    const { description,priority,taskId } = body;
    if (!description) {
      socket.emit(ServerEvents.ERROR,{ status: false, message: "Description of task not found" });
    }

    if (!validateObjectId(taskId)) {
      socket.emit(ServerEvents.ERROR,{ status: false, message: "Task id not valid" });
    }

    let task = await Task.findById(taskId);
    if (!task) {
      socket.emit(ServerEvents.ERROR,{ status: false, message: "Task with given id not found" });
    }

    if (task.user != socket.user.id) {
      socket.emit(ServerEvents.ERROR,{ status: false, message: "You can't update task of another user" });
    }

    task = await Task.findByIdAndUpdate(taskId, { description,priority }, { new: true });
    socket.emit(ServerEvents.TASK_UPDATED,{ task, status: true, message: "Task updated successfully.." });
  } catch (err) {
    console.error(err);
    // socket.emit(ServerEvents.ERROR,{ status: false, message: "Internal Server Error" });
  }
};

export const deleteTask = async (socket, taskId) => {
  try {
    if (!validateObjectId(taskId)) {
      socket.emit(ServerEvents.ERROR,{ status: false, message: "Task id not valid" });
    }

    let task = await Task.findById(taskId);
    if (!task) {
      socket.emit(ServerEvents.ERROR,{ status: false, message: "Task with given id not found" });
    }

    if (task.user != socket.user.id) {
      socket.emit(ServerEvents.ERROR,{ status: false, message: "You can't delete task of another user" });
    }

    await Task.findByIdAndDelete(taskId);
    socket.emit(ServerEvents.TASK_REMOVED,taskId);
  } catch (err) {
    console.error(err);
    // socket.emit(ServerEvents.ERROR,{ status: false, message: "Internal Server Error" });
  }
};
