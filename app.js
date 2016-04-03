var app = angular.module('paceyApp', []);

app.controller('MainCtrl', [
'$scope',
function($scope){
  $scope.test = 'Hello world!';
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