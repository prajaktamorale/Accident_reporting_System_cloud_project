var app = angular.module('app', ["ngRoute", "googlechart" ]);

app.config([ '$routeProvider', function($routeProvider) {
	console.log("trying to route");
	$routeProvider.when('/addSensor', {
		controller : 'addSensorCtrl',
		templateUrl : 'templates/addSensor.ejs'
	});
} ]);

app.controller("addSensorCtrl", function( $scope, $http)
{
	console.log("Inside Add sensor Controller");
	
	$scope.addSensor= function(){
	console.log("sensorName is: "+$scope.sensorName);
	console.log("describe the sensor: "+$scope.description);
	console.log("active / inactive status: "+$scope.activate);
	var now = new Date();
	now = now.toUTCString();
	$http({
    	method : "POST",
    	url : "/addNewSensor",
    	data : {
			"sensorName" : $scope.sensorName,
			"description" : $scope.description,
			"create_date" : now,
			"activate" : $scope.activate,
			"user" : $scope.user,
		}
    	}).success(function (res){
    		if(res)
    		{ 
    		
    			console.log("Success in adding the sensor " + $scope.sensorName);
    			$scope.data = "Sensor group added";
    			alert("Sensor group added");
    			
    			addBill( $scope.user, "camera", 1, 0.1);
    			addBill( $scope.user, "speed", 1, 0.1);
    			addBill( $scope.user, "location", 1, 0.1);
    			
    			//create hub
    			/*$http({
    				method : 'POST',			
    				url : '/assignHub',
    				data: {group: $scope.sensorName}
    			}).success(function(data) {
    				if(data){
    					$scope.speed = data.speed;
    					console.log("Success in retrieving the sensor metadata");
    					console.log("accident sensor is: "+JSON.stringify($scope.cameraStatus));
    				}
    			}).error(function (data){
    				console.log("error while adding a sensor");
    			});
    			 
    			console.log("successfully added the sensor into the sensor network");
    			 
    			 
    			var now = new Date();
    			now = now.toUTCString();
    			//Add dummy data
    			$http({
    				method : 'POST',			
    				url : '/reportSpeed',
    				data: {speed : "71", group: $scope.sensorName, create_date:now}
    			}).success(function(data) {
    				if(data){
    					$scope.speed = data.speed;
    					addBill("speed", 1, 0.1);
    					console.log("Success in retrieving the sensor metadata");
    					console.log("accident sensor is: "+JSON.stringify($scope.cameraStatus));
    				}
    			}).error(function (data){
    				console.log("error while adding a sensor");
    			});
    			
    			$http({
    				method : 'POST',			
    				url : '/reportLocation', 
    				data: {latitude : "37.4323", longitude: "-121.8996", group: $scope.sensorName, create_date:now}
    			}).success(function(data) {
    				if(data){
    					$scope.locationStatus = data.locationStatus;
    					addBill("location", 1, 0.1);
    					console.log("Success in retrieving the sensor metadata");
    					console.log("accident sensor is: "+JSON.stringify($scope.locationStatus));
    					
    				}
    			}).error(function (data){
    				console.log("error while adding a sensor");
    			});
    			
    			$http({
    				method : 'POST',			
    				url : '/uploadPhoto',
    				data: {photo:"", group: $scope.sensorName, create_date:now}
    			}).success(function(data) {
    				if(data){
    					$scope.cameraStatus = data.cameraStatus;
    					addBill("camera", 1, 0.1);
    					console.log("Success in retrieving the sensor metadata");
    					console.log("accident sensor is: "+JSON.stringify($scope.locationStatus));
    					
    				}
    			}).error(function (data){
    				console.log("error while adding a sensor");
    			});
    			
				$("#success-alert1").show();
            	$("#success-alert1").fadeTo(2000, 1000).slideUp(1000, function(){
            });*/
            }
    	}).error(function (res){
    		console.log("error while adding a sensor");$scope.data = "Sensor Group failed to add";
    		$("#failure-alert").show();
            $("#failure-alert").fadeTo(2000, 1000).slideUp(1000, function(){
            });
    	});
	
		
	};
	
	
	function addBill(user, type, usage, amount){
		$http({
	    	method : "POST",
	    	url : "/addSensorUsage",
	    	data : {
	    		"user" : user,
				"type" : type,
				"usage" : usage,
				"amount" : amount
			}
	    	}).success(function (res){
	    		if(res)
	    		{ 
	    			$scope.statusCode = res.statusCode;
			    }
	    	}).error(function (res){
	    		console.log("error while adding a sensor");
	    		$("#failure-alert").show();
	            $("#failure-alert").fadeTo(2000, 1000).slideUp(1000, function(){
	            });
	    	});
	}
});



app.controller("reportCtrl", function($scope, $timeout, $http) {
$scope.cameraHealth = {};
$scope.cameraHealth.type = "PieChart";

$scope.cameraHealth.options = {
  width: 600,
  height: 220,
  "fill": 20,
  "title": "Camera Sensor Health",
  "pieHole" : 0.4
};


$scope.cameraHealth.data = [
  ['Label', 'Value'],
  ['Active', 1],  ['Inactive', 0]
];



$scope.speedHealth = {};
$scope.speedHealth.type = "PieChart";

$scope.speedHealth.options = {
  width: 600,
  height: 220,
  "fill": 20,
  "title": "Speed Sensor Health",
  "pieHole" : 0.4
};


$scope.speedHealth.data = [
  ['Label', 'Value'],
  ['Active', 1],  ['Inactive', 0]
];




$scope.gpsHealth = {};
$scope.gpsHealth.type = "PieChart";

$scope.gpsHealth.options = {
  width: 600,
  height: 220,
  "fill": 20,
  "title": "GPS Sensor Health",
  "pieHole" : 0.4
};


$scope.gpsHealth.data = [
  ['Label', 'Value'],
  ['Active', 1],  ['Inactive', 0]
];

});
 