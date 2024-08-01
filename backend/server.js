const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();
const bodyParser = require("body-parser");
const ProjectRoutes = require("./routes/ProjectRoute");
const UserRoutes = require("./routes/UserRoute");
const TaskRoutes = require("./routes/TaskRoute");
const CommentRoutes = require("./routes/CommentRoute");


const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb " }));

// Connect to MongoDB
mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


app.use("/api/user", UserRoutes);
app.use("/api/project", ProjectRoutes);
app.use("/api/task", TaskRoutes);
app.use("/api/comment", CommentRoutes);