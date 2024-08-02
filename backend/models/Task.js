const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const TaskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date },
  priority: { type: String, enum: ['1', '2', '3'], default: '1' },
  status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
  projectId: { type: Schema.Types.ObjectId, ref: 'Project' },
  files: [{ type: [Schema.Types.ObjectId] }],
  comments: [{ type: [Schema.Types.ObjectId], ref: 'Comment' }],
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
