
 //---------------------
      // TAKE A SNAPSHOT CODE
      //---------------------
      var canvas, ctx;
      var filename;
      function init() 
      {
        // Get the canvas and obtain a context for
        // drawing in it
        canvas = document.getElementById("myCanvas");
        ctx = canvas.getContext('2d');
      }
      
		//--------------------
      // GET USER MEDIA CODE
      //--------------------
      navigator.getUserMedia = (navigator.getUserMedia ||
                             navigator.webkitGetUserMedia ||
                             navigator.mozGetUserMedia ||
                             navigator.msGetUserMedia);

      var video;
      var webcamStream;

      function startWebcam()
      {
    	init();
        if (navigator.getUserMedia) 
        {
           navigator.getUserMedia (

              // constraints
              {
                 video: true,
                 audio: false
              },

              // successCallback
              function(localMediaStream) 
              {
                  video = document.querySelector('video');
                 video.src = window.URL.createObjectURL(localMediaStream);
                 webcamStream = localMediaStream;
              },

              // errorCallback
              function(err)
              {
                 console.log("The following error occured: " + err);
              }
           );
        } 
        else 
        {
           console.log("getUserMedia not supported");
        }  
      }

      function stopWebcam() 
      {
          webcamStream.stop();
      }
     

      /*function snapshot()
      {
         // Draws current image from the video element into the canvas
        ctx.drawImage(video, 0,0, canvas.width, canvas.height);
        ReImg.fromCanvas(myCanvas).downloadPng();
        //var dataURL = canvas.toDataURL();
      }
      */ 
      var loguser = "";
      function snapshot()
      {
    	  
    	  $.ajax({
    		    url: '/getLoggedinUser',
    		    type: "get",
    		    dataType: "json",
    		   
    		    success: function(data, textStatus, jqXHR) {
    		    	loguser = data.email;
    		    }
    		});
         // Draws current image from the video element into the canvas
        ctx.drawImage(video, 0,0, canvas.width, canvas.height);
        //ReImg.fromCanvas(myCanvas).downloadPng();
        var dataURL = canvas.toDataURL();
         filename = new Date().getTime() +".png";
        download(dataURL,  filename);
          
      }

      function download(data, filename) {
        var a = document.createElement('a');
        a.download = filename;
        a.href = data
        document.body.appendChild(a);
        a.click();
        a.remove();
      } 
  

  var app = angular.module('app');
  
  app.controller("uploadController", function($scope, $timeout, $http) {
		  
	  $scope.uploadPhoto = function() {
		 
		 
		  if(loguser === ""){
			 
		  } else {
			
		  
    		  
    	        $http({
    	    		method : 'POST',			
    	    		url : '/getSensorGroupByUser',
    	    		data: {}
    	    	}).success(function(data) {
    	    		if(data){
    	    			var groups = data.group;
    	    			var groupname = groups[0].sensorName;
    	    		     
    	    			console.log("Success in retrieving the sensor group name");
    	    			console.log("groupname is: "+ groupname);
    	    			
    	    			 var now = new Date();
    	     	        now = now.toUTCString();
    	     	        
    	     		  $http({
    	     	    		method : 'POST',			
    	     	    		url : '/uploadPhoto',
    	     	    		data: {photo:filename, group: groupname, create_date:now}
    	     	    	}).success(function(data) {
    	     	    		if(data){
    	     	    			 alert("Accident is captured and Reported.");
    	 			 		 	console.log("Success in uploading");
    	 			 			$http({
    	 					    	method : "POST",
    	 					    	url : "/updateSensorUsage",
    	 					    	data : {
    	 								"type" : "camera",
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
    	    	}).error(function (data){
    	    		console.log("error while adding a sensor");
    	    	});
    	        
    	       
		  }
    	  };
      });

    
      
    