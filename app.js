var app = angular.module('paceyApp', ['ui.router']);

app.factory('goals', [function() {
	var o = {
		goals: []
	};
	return o;
}]);

app.config([
	'$stateProvider',
	'$urlRouterProvider',
	'$locationProvider',
	function ($stateProvider, $urlRouterProvider, $locationProvider){

		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: '/home.html',
				controller: 'MainCtrl'
			})
			.state('goals', {
				url: '/goals/{id}',
				templateUrl: '/goals.html',
				controller: 'GoalsCtrl'
			});

		$urlRouterProvider.otherwise('home');

	  // $locationProvider.html5Mode({
   //    enabled: true,
   //    requireBase: false
   //  });
}]);

app.controller('MainCtrl', [
'$scope',
'goals',
function($scope, goals){
	$scope.goals = goals.goals;
  $scope.addGoal = function() {
  	if(!$scope.title || $scope.title === '') { return; }
  	$scope.goals.push({
  		title: $scope.title,
  		goalDate: $scope.goalDate,
  		tasks: [
  			{description: "first task"},
  			{description: "second task"}
  		]
  	});
  	$scope.title = '';
  	$scope.goalDate = '';
  };
}]);

app.controller('GoalsCtrl', [
	'$scope',
	'$stateParams',
	'goals',
	function($scope, $stateParams, goals){
		$scope.goal = goals.goals[$stateParams.id];
	}
]);


