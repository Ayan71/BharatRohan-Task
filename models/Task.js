const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    requires: true,
  },
  description: {
    type: String,
  },
  dueDate: {
    type: Date,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  board: {
    type: String,
    enum: ["To-Do", "In Progress", "Complete"],
    require: true,
  },
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
