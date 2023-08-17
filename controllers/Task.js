const Task = require("../models/Task");

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    return res.status(200).json({
      success: true,
      message: tasks,
    });
  } catch (err) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate, assignedTo, board } = req.body;
    const newTask = new Task({
      title,
      description,
      dueDate,
      assignedTo,
      board,
    });
    await newTask.save();
    return res.status(200).json({
      success: true,
      message: "Task create SuccessFully ",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Error to create the TODO",
    });
  }
};

exports.setDueDate = async (req, res) => {
  try {
    const { taskId } = req.body;
    const { dueDate } = req.body;

    const task = await Task.findByIdAndUpdate(
      taskId,
      { dueDate: dueDate },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: task,
    });
  } catch (errr) {
    console.log(errr);
    return res.status(400).json({
      success: false,
      message: "Not setDueDate",
    });
  }
};

exports.assignTask = async (req, res) => {
  try {
    const { taskId, assignedTo } = req.body;
    const task = await Task.findByIdAndUpdate(
      taskId,
      { assignTo: assignedTo },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Tssk not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: task,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Problem in assign the Task",
    });
  }
};
