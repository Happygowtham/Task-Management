const express = require("express");
const { addTasks, updateTasks, deleteTasks, getMyTasks, getAssignedTasks } = require("../controller/TaskController");
const { authenticate } = require("../middleware/user");
const router = express.Router();

router.get("/getMyTasks/:userId", authenticate, getMyTasks);
router.get("/getAssignedTasks/:userId", authenticate, getAssignedTasks);
router.post("/addTask", authenticate, addTasks);
router.put("/updateTask/:id", authenticate, updateTasks);
router.delete("/deleteTask/:id", authenticate, deleteTasks);

module.exports = router;
