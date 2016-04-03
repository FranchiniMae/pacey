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

module.exports = router;


