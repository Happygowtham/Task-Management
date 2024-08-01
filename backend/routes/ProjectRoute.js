const express = require("express");
const { authenticate } = require("../middleware/user");
const { getProjects, addProject, updateProject, deleteProject } = require("../controller/ProjectController");
const router = express.Router();

router.get("/getProjects", authenticate, getProjects);
router.post("/addProject", authenticate, addProject);
router.put("/updateProject/:id", authenticate, updateProject);
router.delete("/deleteProject/:id", authenticate, deleteProject);

module.exports = router;
