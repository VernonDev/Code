import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  task: { type: String, required: true },
  assignedTo: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

export default mongoose.model("Task", TaskSchema);
