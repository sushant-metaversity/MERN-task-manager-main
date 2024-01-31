// Task.mjs
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  priority: {
    type: mongoose.Schema.Types.Number,
    required: true,
  }
}, {
  timestamps: true
});

const Task = mongoose.model("Task", taskSchema);
export default Task;
