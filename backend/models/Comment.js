const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const CommentSchema = new Schema({
    comment: { type: String, required: true },
    commentBy: { type: Schema.Types.ObjectId, ref: 'User' },
    commentTo: { type: Schema.Types.ObjectId, ref: 'Task' },
}, { timestamps: true });

module.exports = mongoose.model('Comment', CommentSchema);
