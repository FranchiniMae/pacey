var app = angular.module('paceyApp', ['ui.router']);

app.config([
	'$stateProvider',
	'$urlRouterProvider',
	'$locationProvider',
	function ($stateProvider, $urlRouterProvider, $locationProvider){

		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: '/home.html',
				controller: 'MainCtrl',
				resolve: { 
					goalPromise: ['goals', function(goals) {
						return goals.getAll();
					}]
				}
			})
			.state('goals', {
				url: '/goals/:id',
				templateUrl: '/goals.html',
				controller: 'GoalsCtrl',
				resolve: {
					goal: ['$stateParams', 'goals', function($stateParams, goals) {
						return goals.get($stateParams.id);
					}]
				}
			});

		$urlRouterProvider.otherwise('home');

	  $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
}]);

app.factory('goals', ['$http', function($http) {
	var o = {
		goals: []
	};

	o.getAll = function() {
		return $http.get('/goals').success(function(data) {
			angular.copy(data, o.goals);
		});
	};

	o.create = function(goal) {
		return $http.post('/goals', goal).success(function (data){
			o.goals.push(data);
		});
	};

	o.get = function(id) {
		return $http.get('/goals/' + id).then(function(res){
			return res.data;
		});
	};

	o.addTask = function(id, task) {
		return $http.post('/goals/' + id + '/tasks', task);
	};

	return o;
}]);


app.controller('MainCtrl', [
'$scope',
'goals',
function($scope, goals){
	$scope.goals = goals.goals;
	
  $scope.addGoal = function() {
  	if(!$scope.title || $scope.title === '') { return; }
  	goals.create({
  		title: $scope.title,
  		goalDate: $scope.goalDate,
  	});

  		// title: $scope.title,
  		// goalDate: $scope.goalDate,
  		// tasks: [
  		// 	{description: "first task"},
  		// 	{description: "second task"}
  		// ]
  	// });
  	$scope.title = '';
  	$scope.goalDate = '';
  };
}]);

app.controller('GoalsCtrl', [
	'$scope',
	'goals',
	'goal',
	function($scope, goals, goal){
		$scope.goal = goal;

		$scope.addTask = function() {
			if ($scope.description === '') { return; }
			goals.addTask(goal._id, {
				description: $scope.description,
			}).success(function (task) {
				$scope.goal.tasks.push(task);
			});
			// $scope.goal.tasks.push({
			// 	description: $scope.description
			// });
			$scope.description = '';
		};
	}
]);


