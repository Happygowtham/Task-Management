const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require("body-parser");
const TaskRoutes = require("./routes/TaskRoute");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb " }));

// Connect to MongoDB
mongoose.connect('mongodb+srv://root1:root1@cluster1.o8snmnv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


app.use("/task", TaskRoutes);