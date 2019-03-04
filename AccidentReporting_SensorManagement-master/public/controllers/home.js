/**
 * Datacrunchers
 */
var appVar = angular.module('app', [ "ngRoute" ]); //, "highcharts-ng"

appVar.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/stats', {
		controller : 'ctrl1',
		templateUrl : 'templates/stats.ejs'
	}).when('/prediction', {
		controller : 'baysianCtrl',
		templateUrl : '/templates/baysian.ejs'
	}).when('/yearly', {
		controller : 'yearlyctrl',
		templateUrl : '/templates/yearlyanalysis.ejs'
	}).when('/maps#/yearly', {
		controller : 'yearlyctrl',
		templateUrl : '/home.ejs'
	})

} ]);

appVar.controller("ctrl1", function($scope, $http) {

	$http({
		method : "POST",
		url : '/getData',
		data : {}
	}).success(function(data) {
		if (data.statusCode == 401) {
			console.log("error");
		} else {
			$scope.tuitionjson = data.schools[0].array;
			console.log("Output is" + JSON.stringify($scope.tuitionjson));
			console.log("Success");
		}
	}).error(function(error) {
		console.log("error");
	});
});