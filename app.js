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
				templateUrl: 'templates/home.html',
				controller: 'MainCtrl'
			});

		$urlRouterProvider.otherwise('home');

	  $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
}]);

app.controller('MainCtrl', [
'$scope',
'goals',
function($scope, goals){
	$scope.goals = goals.goals;
  $scope.goals = [
  	{title: 'goal 1'},
  	{title: 'goal 2'},
  	{title: 'goal 3'},
  	{title: 'goal 4'},
  	{title: 'goal 5'}
  ];
  $scope.addGoal = function() {
  	if(!$scope.title || $scope.title === '') { return; }
  	$scope.goals.push({
  		title: $scope.title,
  		goalDate: $scope.goalDate,
  	});
  	$scope.title = '';
  	$scope.goalDate = '';
  };
}]);


