var app = angular.module('app',  ["ngRoute"]);

app.filter('total', function () {
	return function (input, property) {
		var i = input instanceof Array ? input.length : 0;
		if (typeof property === 'undefined' || i === 0) {
			return i;
		} else if (isNaN(input[0][property])) {
			throw 'filter total can count only numeric values';
		} else {
			var total = 0;
			while (i--)
				total += input[i][property];
			return total;
		}
	};
})

app.config([ '$routeProvider', function($routeProvider) {
	console.log("trying to route");
	$routeProvider.when('/manageSensor', {
		controller : 'manageSensorCtrl',
		templateUrl : 'templates/manageSensor.ejs'
	}).when('/userlist', {
		controller : 'userlistCtrl',
		templateUrl : 'templates/userList.ejs'
	}).when('/manageSensorHub', {
		controller : 'manageHubCtrl',
		templateUrl : 'templates/manageHub.ejs'
	}).when('/adminBilling', {
		controller : 'adminBillingCtrl',
		templateUrl : 'templates/adminBilling.ejs'
	});
	
	/*when('/addSensor', {
		controller : 'addSensorCtrl',
		templateUrl : 'templates/addSensor.ejs'
	}).*/
} ]);
/*
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
			
		}
    	}).success(function (res){
    		if(res)
    		{ 
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
    				data: {photo:"/Users/poojashah/Downloads/image.png", group: $scope.sensorName, create_date:now}
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
            });
            }
    	}).error(function (res){
    		console.log("error while adding a sensor");
    		$("#failure-alert").show();
            $("#failure-alert").fadeTo(2000, 1000).slideUp(1000, function(){
            });
    	});
	
		
	};
	
	
	function addBill(type, usage, amount){
		$http({
	    	method : "POST",
	    	url : "/addSensorUsage",
	    	data : {
				"type" : type,
				"usage" : usage,
				"amount" : amount
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
});
*/
 
   
   
app.controller("manageSensorCtrl", function($scope, $http, $routeParams) {
	console.log("inside Sensor manager controller");
	
	  $scope.update_success = true;
	  $scope.update_failure = true;
	  $scope.sensorsList = {};  
		$scope.getSensorDetails = function() {
			$http({
				method : 'POST',			
				url : '/getSensorDetails',
				data: {}
			}).success(function(data) {
				if(data){
					$scope.sensorsList = data.allSensorList;
					console.log("Success in retrieving the sensor metadata");
					console.log("sensor list is: " + JSON.stringify($scope.sensorsList));
				}
			}).error(function (data){
				console.log("error while adding a sensor");
			});
		};
		
		$scope.deleteSensor = function(sensor) {
			console.log("sensor to be deleted is: "+ sensor.sensorname);
			$http({
				method : 'POST',
				url : '/deleteSensor',
				data : {"sensorname" : sensor.sensorname
					   }
			}).success(function(data){
				//if(data.statusCode == 200){
					console.log("sensor delete success ");
					$("#delete-success").show();
		            $("#delete-success").fadeTo(2000, 1000).slideUp(1000, function(){
		            });
				//}
			}).error(function(error){
				console.log("error is: "+error);
				$("#delete-fail").show();
	            $("#delete-fail").fadeTo(2000, 1000).slideUp(1000, function(){
	            });
			});
		};
		
		
		$scope.deactivateSensor = function(sensor) {
			console.log("sensor to be deactivated is: "+ sensor.sensorname);
			$http({
				method : 'POST',
				url : '/deactivateSensor',
				data : {"sensorname" : sensor.sensorname
					   }
			}).success(function(data){
				if(data.statusCode == 200){
					console.log("sensor deactivation success ");
					$("#deactivate-success").show();
		            $("#deactivate-success").fadeTo(2000, 1000).slideUp(1000, function(){
		            });
				}
			}).error(function(error){
				console.log("error is: "+error);
				$("#deactivate-fail").show();
	            $("#deactivate-fail").fadeTo(2000, 1000).slideUp(1000, function(){
	            });
			});
		};
		
		
		$scope.activateSensor = function(sensor) {
			console.log("sensor to be activated is: "+ sensor.sensorname);	
			$http({
				method : 'POST',
				url : '/activateSensor',
				data : {"sensorname" : sensor.sensorname
					   }
			}).success(function(data){
				if(data.statusCode == 200){
					console.log("sensor activation success ");
					$("#activate-success").show();
		            $("#activate-success").fadeTo(2000, 1000).slideUp(1000, function(){
		            });
				}
			}).error(function(error){
				console.log("error is: "+error);
				$("#activate-fail").show();
	            $("#activate-fail").fadeTo(2000, 1000).slideUp(1000, function(){
	            });
			});
		};
	 
		$scope.go = function(sensors) {
			   
			  
	    var groupname= sensors.sensorName;
	    var speedData = [];
	    var locationData = [];
	    var photoData = [];
	    var accidentDate;
	    $http({
    		method : 'POST',			
    		url : '/getSpeedbySensor',
    		data: {sensor: groupname}
    	}).success(function(data) {
    		if(data){
    			 $('#showDetails').append('<h3>Accident Reported by ' + groupname + '</h3><br/>');
    			 $('#showDetails').append('' + 
    			'<h6>Service Dispatched : Yes </h6><br/>');
    			
    			var speed = data.speed;
    			for(var i in speed)
    			{
    				 var speedC = speed[i].speed;
    				 accidentDate = speed[i].create_date;
    			     
    			     speedData.push(speedC);
    			     $('#showDetails').append('<h6>Speed of the Vehicle : ' + speedC+ 'mph </h6><br/>');
    			    
    			} 
    			
    			$http({
    	    		method : 'POST',			
    	    		url : '/getLocationbySensor',
    	    		data: {sensor: groupname}
    	    	}).success(function(data) {
    	    		if(data){
    	    			var location = data.location;
    	    			for(var i in location)
    	    			{
    	    				var latitude = location[i].latitude;
    	 	    			var longitude = location[i].longitude;
    	 	    		    var locdate = location[i].create_date; 
    	 	    		    locationData.push(latitude,longitude);
    	 	    		  // $('#showDetails').append('<li>Accident Reported at :' + locdate + " lat:" + latitude + ', Lng : ' + longitude);
    	 	    		  $('#showDetails').append('<h6>Location of the vehicle:' + latitude + ', Lng : ' + longitude +"</h6><br/>");
    	 	    		  
    	    			} 
    	    			
    	    			 $http({
    	    		    		method : 'POST',			
    	    		    		url : '/getCamerabySensor',
    	    		    		data: {sensor: groupname}
    	    		    	}).success(function(data) {
    	    		    		if(data){
    	    		    			var photo = data.photo;
    	    		    			for(var i in photo)
    	    		    			{
    	    		    				var photoC = photo[i].photo;
    	    		 	    		    var camdate = photo[i].create_date; 
    	    		 	    		    photoData.push(photoC);
    	    		 	    		    var demophoto = "uploads/" +  groupname + ".png";
    	    		 	    		  // $('#showDetails').append('<li>Accident Reported at ' + camdate );
    	    		 	    		   //$('#showDetails').append('<br> Car hit by <img src="'+ photoC +'" /><br>');
    	    		 	    		   $('#showDetails').append('<h6>Captured Photo :</h6><br/> <img src=' +  demophoto + ">");
    	    		    			}  
    	    		    			
    	    		    		}
    	    		    	}).error(function (data){
    	    		    		console.log("error while adding a sensor");
    	    		    	});
    	    			  
    	    		}
    	    	}).error(function (data){
    	    		console.log("error while adding a sensor");
    	    	});
    		}
    	}).error(function (data){
    		console.log("error while adding a sensor");
    	});
	     
	   };
		  
	});

app.controller("manageHubCtrl", function($scope, $http, $routeParams) {
	console.log("inside Hub  manager controller");
	  $scope.isCollapsed = true;	
	  $scope.update_success = true;
	  $scope.update_failure = true;
	  $scope.hubList = {};  
		$scope.getHubDetails = function() {
			$http({
				method : 'POST',			
				url : '/getHubDetails',
				data: {}
			}).success(function(data) {
				if(data){
					$scope.hubList = data.allHubList;
					console.log("Success in retrieving the Hub metadata");
					console.log("Hub list is: "+JSON.stringify($scope.hubList));
				}
			}).error(function (data){
				console.log("error while adding a sensor");
			});
		};
		
		$scope.deleteHub = function(hub) {
			console.log("Hub to be deleted is: "+ hub.sensorname);	
			console.log("Hub is located in: "+ hub.location);
			$http({
				method : 'POST',
				url : '/deleteHub',
				data : {"hubName" : hub.hubName,
						"location" : hub.location
					   }
			}).success(function(data){
				if(data.statusCode == 200){
					console.log("sensor delete success ");
					$("#delete-success").show();
		            $("#delete-success").fadeTo(2000, 1000).slideUp(1000, function(){
		            });
				}
			}).error(function(error){
				console.log("error is: "+error);
				$("#delete-fail").show();
	            $("#delete-fail").fadeTo(2000, 1000).slideUp(1000, function(){
	            });
			});
		};
		
		
		$scope.deactivateHub = function(hub) {
			console.log("Hub to be deactivated is: "+ hub.hubName);	
			console.log("Hub is in the locattion: "+ hub.location);
			$http({
				method : 'POST',
				url : '/deactivateHub',
				data : {"hubName" : hub.hubName,
						"location" : hub.location
					   }
			}).success(function(data){
				if(data.statusCode == 200){
					console.log("Hub deactivation success ");
					$("#deactivate-success").show();
		            $("#deactivate-success").fadeTo(2000, 1000).slideUp(1000, function(){
		            });
				}
			}).error(function(error){
				console.log("error is: "+error);
				$("#deactivate-fail").show();
	            $("#deactivate-fail").fadeTo(2000, 1000).slideUp(1000, function(){
	            });
			});
		};
		
		
		$scope.activateHub = function(hub) {
			console.log("Hub to be activated is: "+ hub.hubName);	
			console.log("Hub is located in: "+ hub.location);
			$http({
				method : 'POST',
				url : '/activateHub',
				data : {"hubName" : hub.hubName,
						"location" : hub.location
					   }
			}).success(function(data){
				if(data.statusCode == 200){
					console.log("sensor activation success ");
					$("#activate-success").show();
		            $("#activate-success").fadeTo(2000, 1000).slideUp(1000, function(){
		            });
				}
			}).error(function(error){
				console.log("error is: "+error);
				$("#activate-fail").show();
	            $("#activate-fail").fadeTo(2000, 1000).slideUp(1000, function(){
	            });
			});
		};
		
	});


app.controller("userlistCtrl", function($scope, $http, $routeParams) {
	console.log("inside userlist controller");
	
	  $scope.userlist = {};  
		$scope.getUserlist = function() {
			$http({
				method : 'POST',			
				url : '/getUserlist',
				data: {}
			}).success(function(data) {
				if(data){
					console.log("users list is: "+JSON.stringify(data));
					$scope.userlist = data.allUserlist;
					console.log("Success in retrieving the sensor metadata");
					console.log("users list is: "+JSON.stringify($scope.userlist));
				}
			}).error(function (data){
				console.log("error while adding a sensor");
			});
		};
});



app.controller("adminBillingCtrl", function($scope, $http, $window) {

	console.log("Inside adminBillingCtrl Controller");
	
	$scope.getSensorUsage= function(){
		 
		$http({
    	method : "POST",
    	url : "/getSensorUsage",
    	
    	}).success(function (res){
    		if(res)
    		{ 
    			$scope.adminBillUsage = res.adminBillUsage;
            }
    	}).error(function (res){
    		console.log("error while adding a sensor");
    		$("#failure-alert").show();
            $("#failure-alert").fadeTo(2000, 1000).slideUp(1000, function(){
            });
    	});
	};
	

});
