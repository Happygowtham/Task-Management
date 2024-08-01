const express = require("express");
const { getTasks, addTasks, updateTasks, deleteTasks } = require("../controller/TaskController");
const { authenticate } = require("../middleware/user");
const router = express.Router();

router.get("/getTasks", authenticate, getTasks);
router.post("/addTask", authenticate, addTasks);
router.put("/updateTask/:id", authenticate, updateTasks);
router.delete("/deleteTask/:id", authenticate, deleteTasks);

module.exports = router;
