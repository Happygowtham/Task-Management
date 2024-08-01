const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://root1:root1@cluster1.o8snmnv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Task', TaskSchema);
