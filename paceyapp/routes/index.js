var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goal = mongoose.model('Goal');
var Task = mongoose.model('Task');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html', { title: 'Express' });
});

router.get('/goals', function (req, res, next){
	Goal.find(function (err, goals) {
		if (err) { return next(err); }
		res.json(goals);
	});
});

router.post('/goals', function (req, res, next) {
	var goal = new Goal(req.body);

	goal.save(function(err, goal) {
		if (err) { return next (err); }

		res.json(goal);
	});
});

router.param('goal', function(req, res, next, id) {
	var query = Goal.findById(id);

	query.exec(function (err, goal) {
		if (err) { return next(err); }
		if (!goal) { return next(new Error('can\t find goal'));}

		req.goal = goal;
		return next();
	});
});

router.get('/goals/:goal', function (req, res, next) {
	req.goal.populate('tasks', function(err, goal) {
		if (err) { return next (err); }
	
		res.json(goal);
	});
});

router.post('/goals/:goal/tasks', function (req, res, next) {
	var task = new Task(req.body);
	task.goal = req.goal;

	task.save(function (err, task) {
		if (err) { return next (err); }

		req.goal.tasks.push(task);
		req.goal.save(function(err, goal) {
			if (err) { return next (err); }

			res.json(task);
		});
	});
});

module.exports = router;


