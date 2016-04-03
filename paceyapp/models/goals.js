var mongoose = require('mongoose');

var goalSchema = new mongoose.Schema({
	title: { type: String },
	startDate: { type: Date },
	endDate: { type: Date },
	goalDate: { type: Date },
	tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task'}]
});

var Goal = mongoose.model('Goal', goalSchema);
module.exports = Goal;