const express = require("express");
const { authenticate } = require("../middleware/user");
const { getComments, addComment, updateComment, deleteComment } = require("../controller/CommentController");
const router = express.Router();

router.get("/getComments", authenticate, getComments);
router.post("/addComment", authenticate, addComment);
router.put("/updateComment/:id", authenticate, updateComment);
router.delete("/deleteComment/:id", authenticate, deleteComment);

module.exports = router;
