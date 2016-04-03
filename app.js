var app = angular.module('paceyApp', ['ui.router']);

app.factory('posts', [function() {
	var o = {
		goals: []
	};
	return o;
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

app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function ($stateProvider, $urlRouterProvider){
		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: '/home.html',
				controller: 'MainCtrl'
			});
		$urlRouterProvider.otherwise('home');
}]);

