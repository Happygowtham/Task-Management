const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const ProjectSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
