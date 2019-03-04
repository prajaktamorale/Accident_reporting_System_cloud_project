var app = angular.module('app', [ "ngRoute", "googlechart" ]); //, "googlechart"

app.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/reportAccident', {
		controller : 'reportAccident',
		templateUrl : 'templates/reportAccident.ejs'
	})
	.when('/billing', {
		controller : 'billingCtrl',
		templateUrl : 'templates/billing.ejs'
	}).when('/map', {
		controller : 'locateSensorCtrl',
		templateUrl : 'templates/map.ejs'
	})
} ]);


app.controller("locateSensorCtrl", function($scope, $http) {
	console.log("Inside locateSensor Controller");

/*	$scope.generateBill = function(req, res) {
		window.location.assign("/billing");
	}
	$scope.locateSensor = function(req, res) {
		window.location.assign("/map");
	}

	$scope.requestData = function(req, res) {
		window.location.assign("/requestData");
	}*/

});

app.controller("billingCtrl", function($scope, $http, $window) {
	console.log("Inside billing Controller");
	
	$scope.billDetails = {};
	
	$scope.billData = function(){
		$scope.getSensorUsage= function(){
			 
			$http({
	    	method : "POST",
	    	url : "/getSensorUsage",
	    	
	    	}).success(function (res){
	    		if(res)
	    		{ 
	    			$scope.billUsage = res.adminBillUsage;
	            }
	    	}).error(function (res){
	    		console.log("error while adding a sensor");
	    		$("#failure-alert").show();
	            $("#failure-alert").fadeTo(2000, 1000).slideUp(1000, function(){
	            });
	    	});
		};
		
	}
	
	$scope.paymentInvoice = function(){
		$http({
			method: 'POST',
			url: '/resetBill',
			data: {}
		}).success(function(data){
			if(data)
				{
					console.log("Bill is reset"+JSON.stringify(data));
					console.log("Bill payment successful");
	    			$("#success-alert1").show();
		            $("#success-alert1").fadeTo("slow", 2000).slideUp("slow", function(){
		            });
					//$window.alert("Successfully paid the bill.Thanks for using our application");
					window.location.assign("/billing");
				}
			else{
				console.log("error while paying the bill");
	    		$("#failure-alert").show();
	            $("#failure-alert").fadeTo("slow", 2000).slideUp("slow", function(){
	            });
			}
		}).error(function(err){
			console.log(err);
		});
		
	}

	$scope.generateBill = function(req, res) {
	
		window.location.assign("/billing");
	} 
});

app.controller("reportAccident", function($scope, $timeout, $http) {	
	
	$scope.clock = "loading clock..."; // initialise the time variable
    $scope.tickInterval = 1000 //ms

    var tick = function () {
        $scope.clock = Date.now() // get the current time
        $timeout(tick, $scope.tickInterval); // reset the timer
    }
    $timeout(tick, $scope.tickInterval);
    
 
	console.log("Inside Speedometer Controller");
	
	$scope.speedometer = {};
    $scope.speedometer.type = "Gauge";

    $scope.speedometer.options = {
      width: 600,
      height: 220,
      redFrom: 90,
      redTo: 100,
      yellowFrom: 75,
      yellowTo: 90,
      minorTicks: 5
    };
    
    var speed = 80;
    
    $scope.speedometer.data = [
      ['Label', 'Value'],
      ['Speedometer', speed]
    ];
     
    $scope.reportAccident = function() {
    	 
        $http({
    		method : 'POST',			
    		url : '/getSensorGroupByUser',
    		data: {}
    	}).success(function(data) {
    		if(data){
    			var groups = data.group;
    			var i = 0;
	  			while( i< groups.length) {
	  				var groupname = groups[i].sensorName;
	  				i++;
    		     
	    			console.log("Success in retrieving the sensor group name");
	    			console.log("groupname is: "+ groupname);
	    			var now = new Date();
	    	        now = now.toUTCString();
	    			$http({
	    				method : 'POST',			
	    				url : '/reportSpeed',
	    				data: {speed : speed, group: groupname, create_date:now}
	    			}).success(function(data) {
	    				if(data){
	    					$scope.speedStatus = data.speedStatus;
	    					console.log("Success in retrieving the sensor metadata");
	    					console.log("accident sensor is: "+JSON.stringify($scope.speedStatus));
	    					alert("Speedometer data added :" +  speed + "mph");
	    					$http({
	    				    	method : "POST",
	    				    	url : "/updateSensorUsage",
	    				    	data : {
	    							"type" : "speed",
	    							"usage" : 1,
	    							"amount" : 0.1
	    						}
	    				    	}).success(function (res){
	    				    		if(res)
	    				    		{ 
	    				    			$scope.statusCode = data.statusCode;
	    						    }
	    				    	}).error(function (res){
	    				    		console.log("error while adding a sensor");
	    				    		$("#failure-alert").show();
	    				            $("#failure-alert").fadeTo(2000, 1000).slideUp(1000, function(){
	    				            });
	    				    	});
	    				}
	    			}).error(function (data){
	    				console.log("error while adding a sensor");
	    			});
	  			}
    		}
    	}).error(function (data){
    		console.log("error while adding a sensor");
    	});
        
	};
    
});

app.controller("getDataFromURlCtrl", function($scope, $http) {
	$scope.submit=function()
	{
		var location = $scope.location;
		var sensorName = $scope.sensorName;
	
	$http({
	 	method : "POST",
	    url : "/getDropDownDetails",
	    data : {
		"location" : $scope.location
			    }
	    	}).success(function (res){
	    		if(res)
	    		{ 
	    			console.log("success!!! :D");
	    			console.log("Data retrieved is: "+ JSON.stringify(res.schools));
	    			$scope.formDetails = res.schools;
	            }
	    	}).error(function (res){
	    		console.log("error :'( ");
	    		
	    	});
	}
});



 