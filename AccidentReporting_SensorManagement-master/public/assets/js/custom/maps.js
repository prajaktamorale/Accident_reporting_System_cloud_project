 // Note: This example requires that you consent to location sharing when
      // prompted by your browser. If you see the error "The Geolocation service
      // failed.", it means you probably did not give permission for the browser to
      // locate you.
var latitude, longitude;
var app = angular.module('app');

  function initMap() {
    var map = new google.maps.Map(document.getElementById('markmap'), {
  center: {lat: 37.4061929, lng: -121.9394458},
  zoom: 6
});
var infoWindow = new google.maps.InfoWindow({map: map});

// Try HTML5 geolocation.
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {

    var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };

    infoWindow.setPosition(pos);
    infoWindow.setContent('Location found.' + pos.lat + " " + pos.lng);
    map.setCenter(pos);
    latitude = pos.lat;
    longitude = pos.lng
  }, function() {
    handleLocationError(true, infoWindow, map.getCenter());
  });
} else {
  // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  }

  app.controller("mapController", function($scope, $timeout, $http, $location) {	
	  $scope.setLocation = function() {
		  
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
						method: 'POST',
						url: '/reportLocation',
						data: {latitude : latitude, longitude:longitude, group: groupname, create_date:now}
					}).success(function(data){
						if(data) {
							 alert("Accident Location Reported. lat: " + latitude + " lng:" + longitude );
							 
							$http({
						    	method : "POST",
						    	url : "/updateSensorUsage",
						    	data : {
									"type" : "location",
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
						else{
							 
						}
					}).error(function(err){
						console.log(err);
					});
	  			}
	  			
	  		     
	  			
	  		}
	  	}).error(function (data){
	  		console.log("error while adding a sensor");
	  	});
	      window.location.assign("http://54.214.195.176:3001/notification");
	  };
  });
  
  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                      'Error: Your browser doesn\'t support geolocation.');
  }