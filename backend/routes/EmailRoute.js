const express = require("express");
const { authenticate } = require("../middleware/user");
const { sendEmail } = require("../controller/EmailController");
const router = express.Router();

router.post("/sendmail", authenticate, sendEmail);

module.exports = router;
