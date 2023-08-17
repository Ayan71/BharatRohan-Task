const express = require("express");
const router = express.Router();
//import all requires contollers

const {
  getAllTasks,
  createTask,
  setDueDate,
  assignTask,
} = require("../controllers/Task");

// ********************************************************************************************************
//                                  Task Route
// ********************************************************************************************************

//Route for get all task
router.get("/allTask", getAllTasks);

//Route for create task
router.post("/createTask", createTask);

//Route for setDueDate
router.post("/setDue", setDueDate);

//Route for assignTask
router.post("/assignTask", assignTask);

module.exports = router;
