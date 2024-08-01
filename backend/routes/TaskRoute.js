const express = require("express");
const { getTasks, addTasks, updateTasks, deleteTasks } = require("../controller/TaskController");
const router = express.Router();

router.get("/getTasks", getTasks);
router.post("/addTask", addTasks);
router.put("/updateTask/:id", updateTasks);
router.delete("/deleteTask/:id", deleteTasks);

module.exports = router;
