var mongoose = require('mongoose');

var taskSchema = new mongoose.Schema({
	description: { type: String },
	completed: { type: Boolean },
	goal: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Goal'}]
});

var Task = mongoose.model('Task', taskSchema);
module.exports = Task;