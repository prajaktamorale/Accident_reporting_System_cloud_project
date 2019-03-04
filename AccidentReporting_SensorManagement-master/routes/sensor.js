var mongoURL = "mongodb://localhost:27017/ampere_db";
var mongo = require("./mongo");
var fs = require('fs');

function addNewSensor(req, res){
	var json_responses = {};
	console.log("Inside sensor.js addSensor");
	var sensorName = req.param("sensorName"); 
	var description = req.param("description"); 
	var create_date = req.param("create_date");
	var activate = req.param("activate");
	var user = req.param("user");
	
	console.log("sensor.js sensor is : "+sensorName);
	
	mongo.connect(mongoURL, function() {
		console.log('connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('sensor_group');		
		coll.insert({sensorName : sensorName, description : description, user:user,  create_date:create_date, activate : activate, flag:0}, function(err,sensor){
			if(sensor){
				
				console.log("The data retrieved is: "+ JSON.stringify(sensor));
				console.log("Success adding the sensor!!");
				json_responses.statusCode= 200;				
				json_responses.sensorStatus= sensor;
				res.send(json_responses);	
			}
		else{
			console.log("error while adding sensor \n");
			json_responses.statusCode= 404;
			res.send(json_responses);	
		}
		});
	})
}

function getSensorDetails(req,res){
	var json_responses={};
	mongo.connect(mongoURL, function() {
		console.log('connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('sensor_group');
		//coll.find({"flag":0}).toArray(function(err, user) {
		coll.find({flag:{$eq:0}}).toArray(function(err, sensors){

			if (sensors) {
				console.log("The data retrieved is: "+ JSON.stringify(sensors));
				console.log("Success retrieving the data!!");
				json_responses.statusCode= 200;				
				json_responses.allSensorList= sensors;
				res.send(json_responses);
			} else {
				console.log("Error while fetching the data");
				json_responses.statusCode= 401;
				res.send(json_responses);
				
			}
		});
	});
}

function getSensorGroupByUser(req,res){
	var json_responses={};
	 console.log(req.session.email);
	mongo.connect(mongoURL, function() {
		console.log('connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('sensor_group');
		//coll.find({"flag":0}).toArray(function(err, user) {
		coll.find({flag:{$eq:0}, user:{$eq:req.session.email}}).toArray(function(err, group){
			
			if (group) {
				console.log("The data retrieved is: "+ JSON.stringify(group));
				console.log("Success retrieving the data!!");
				json_responses.statusCode= 200;				
				json_responses.group= group;
				res.send(json_responses);
			} else {
				console.log("Error while fetching the data");
				json_responses.statusCode= 401;
				res.send(json_responses);
			}
		});
	});
}


function getSpeedbySensor(req,res){
	var json_responses={};
	var sensorName = req.param("sensor");  
	
	mongo.connect(mongoURL, function() {
		console.log('connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('speed_sensor');
		coll.find({group:{$eq:sensorName}}).toArray(function(err, group){
			if (group) {
				console.log("The data retrieved is: "+ JSON.stringify(group));
				console.log("Success retrieving the data!!");
				json_responses.statusCode= 200;				
				json_responses.speed= group;
				res.send(json_responses);
			} else {
				console.log("Error while fetching the data");
				json_responses.statusCode= 401;
				res.send(json_responses);
			}
		});
	});
}

function getLocationbySensor(req,res){
	var json_responses={};
	var sensorName = req.param("sensor");  
	
	mongo.connect(mongoURL, function() {
		console.log('connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('location_sensor');
		coll.find({group:{$eq:sensorName}}).toArray(function(err, group){
			if (group) {
				console.log("The data retrieved is: "+ JSON.stringify(group));
				console.log("Success retrieving the data!!");
				json_responses.statusCode= 200;				
				json_responses.location= group;
				res.send(json_responses);
			} else {
				console.log("Error while fetching the data");
				json_responses.statusCode= 401;
				res.send(json_responses);
			}
		});
	});
}
function getCamerabySensor(req,res){
	var json_responses={};
	var sensorName = req.param("sensor");  
	
	mongo.connect(mongoURL, function() {
		console.log('connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('camera_sensor');
		coll.find({group:{$eq:sensorName}}).toArray(function(err, group){
			if (group) {
				console.log("The data retrieved is: "+ JSON.stringify(group));
				console.log("Success retrieving the data!!");
				json_responses.statusCode= 200;				
				json_responses.photo= group;
				res.send(json_responses);
			} else {
				console.log("Error while fetching the data");
				json_responses.statusCode= 401;
				res.send(json_responses);
			}
		});
	});
}


function deleteSensor(req,res){
	var json_responses={};
	mongo.connect(mongoURL, function() {
		console.log("sensor name is : "+req.param("sensorname"));
		console.log('connected to mongo at: '+ mongoURL);
		var coll = mongo.collection('sensor_group');
		coll.update({"sensorname":req.param("sensorname")} , { $set : {"deleted":1}},function(err, user) {
			if (user) {
				console.log("Success in deleting the sensor");
				res.statusCode = 200;
				res.send(json_responses);
			} else {
				res.statusCode = 401;				
				console.log("couldn't delete the sensor.. Sorry");
				res.send(json_responses);
			}
		});
	});
}


function deactivateSensor(req,res){
	var json_responses={};
	mongo.connect(mongoURL, function() {
		console.log("sensor name is : "+req.param("sensorname"));
		console.log('connected to mongo at: '+ mongoURL);
		var coll = mongo.collection('sensor_group');
		coll.update({"sensorname":req.param("sensorname")} , { $set : {"activate":"inactive"}},function(err, user) {
			if (user) {
				console.log("Success in deleting the sensor");
				json_responses.statusCode = 200;
				res.send(json_responses);
			} else {
				json_responses.statusCode = 401;				
				console.log("couldn't delete the sensor.. Sorry");
				res.send(json_responses);
			}
		});
	});	
}

function activateSensor(req,res){
	var json_responses = {};
	mongo.connect(mongoURL, function() {
		console.log("sensor name is : "+req.param("sensorname"));
		console.log('connected to mongo at: '+ mongoURL);
		var coll = mongo.collection('sensor_group');
		coll.update({"sensorname":req.param("sensorname")} , { $set : {"activate":"active"}},function(err, user) {
			if (user) {
				console.log("Success in deleting the sensor");
				json_responses.statusCode = 200;
				res.send(json_responses);
			} else {
				json_responses.statusCode = 401;				
				console.log("couldn't delete the sensor.. Sorry");
				res.send(json_responses);
			}
		});
	});
}

function reportSpeed(req, res){
	var json_responses = {};
	console.log("Inside sensor.js reportSpeed");
	var speed = req.param("speed"); 
	var group = req.param("group");
	var create_date = req.param("create_date");
	console.log("sensor.js report Speed is : " + speed);
	
	mongo.connect(mongoURL, function() {
		console.log('connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('speed_sensor');		
		coll.insert({speed : speed,  create_date: create_date, group: group}, function(err,sensor){
			if(sensor){
				console.log("Success adding the sensor!!");
				json_responses.statusCode= 200;				
				json_responses.speedStatus= sensor;
				res.send(json_responses);	
			}
		else{
			console.log("error while adding speed \n");
			json_responses.statusCode= 404;
			res.send(json_responses);	
		}
		});
	})
}

//Report the first location of the sensor
function reportLocation(req, res){
	var json_responses = {};
	console.log("Inside sensor.js reportLocation");
	var lat = req.param("latitude"); 
	var lon = req.param("longitude");
	var group = req.param("group");
	var create_date = req.param("create_date");
	console.log("sensor.js report Location is : " + lat + " " + lon);
	
	mongo.connect(mongoURL, function() {
		console.log('connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('location_sensor');		
		coll.insert({latitude : lat, longitude: lon, group: group, create_date: create_date}, function(err,sensor){
			if(sensor){
				console.log("Success adding the location sensor!!");
				json_responses.statusCode= 200;				
				json_responses.lcaotionStatus= sensor;
				res.send(json_responses);	
			}
		else{
			console.log("error while adding location sensor \n");
			json_responses.statusCode= 404;
			res.send(json_responses);	
		}
		});
	})
}

//update the sensor whenever client access the page
function updateLocation(req, res) { 
	 
	var json_responses={};
	mongo.connect(mongoURL, function() {
		console.log("sensor name is : "+req.param("latitude"));
		console.log("sensor name is : "+req.param("longitude")  );
		
		console.log('connected to mongo at: '+ mongoURL);
		var coll = mongo.collection('location_sensor');
		coll.update({"group":req.param("group")} , { $set : {"create_date": req.param("create_date"), "latitude":req.param("latitude"), "longitude":req.param("longitude")}},function(err, user) {
			if (user) {
				console.log("Success in updating location of the sensor");
				res.statusCode = 200;
				res.send(json_responses);
			} else {
				res.statusCode = 401;				
				console.log("couldn't update the sensor location.. Sorry");
				res.send(json_responses);
			}
		});
	});
}

function uploadPhoto(req, res) { 
	//var canvas = req.param("canvas");
	/* var newPath = __dirname + "/uploads/canvas.png";
	 
	 fs.readFile("/Users/poojashah/Downloads/image.png", function (err, data) {
		fs.writeFile(newPath, data, function (err) {
	  	  if (err) {
	  		  throw err;
	  	  }
	
	  	  console.log('created at ' + newPath);
	  	});
	 }); */
	
	var group = req.param("group");
	var create_date = req.param("create_date");
	 var json_responses = {};
		console.log("Inside sensor.js uploadPhoto");
		var photodate = req.param("photo"); 
		var photo =  "/Users/poojashah/Downloads/" + photodate;
		var group = req.param("group");
		console.log("sensor.js uploadPhoto is : " );
		
		mongo.connect(mongoURL, function() {
			console.log('connected to mongo at: ' + mongoURL);
			var coll = mongo.collection('camera_sensor');		
			coll.insert({photo : photo, create_date:create_date, group: group}, function(err,sensor){
				if(sensor){
					console.log("Success adding the sensor!!");
					json_responses.statusCode= 200;				
					json_responses.cameraStatus= sensor;
					res.send(json_responses);	
				}
			else{
				console.log("error while adding speed \n");
				json_responses.statusCode= 404;
				res.send(json_responses);	
			}
			});
		})
}



function getSensorUsage(req,res){
	  console.log("inside sensorUsage");
	  var json_responses={};
		mongo.connect(mongoURL, function() {
			console.log('connected to mongo at: ' + mongoURL);
			var coll = mongo.collection('sensorUsage');
			coll.find().toArray(function(err, usage) {
				if (usage) {
					console.log("The data retrieved is: "+ JSON.stringify(usage));
					console.log("Success retrieving the data!!");
					json_responses.statusCode= 200;				
					json_responses.adminBillUsage= usage;
					res.send(json_responses);
				} else {
					console.log("Error while fetching the data");
					json_responses.statusCode= 401;
					res.send(json_responses);
					
				}
			});
		});
	}


function addSensorUsage(req, res){
	var json_responses = {};
	console.log("Inside sensor.js addSensorUsage");
	var user = req.param("user");
	var type = req.param("type");
	var usage = req.param("usage");
	var amount = req.param("amount");
	
	mongo.connect(mongoURL, function() {
		console.log('connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('sensorUsage');		
		coll.insert({ user:user, type: type, usage: usage, amount:amount}, function(err,sensor){
			if(sensor){
				console.log("Success adding the sensor usage!!");
				json_responses.statusCode= 200;				
				res.send(json_responses);	
			}
		else{
			console.log("error while adding speed usage \n");
			json_responses.statusCode= 404;
			res.send(json_responses);	
		}
		});
	})
}


function updateSensorUsage(req, res){
	var json_responses = {};
	console.log("Inside sensor.js updateSensorUsage");
	var type = req.param("type");
	var usage = req.param("usage");
	var amount = req.param("amount");
	
	mongo.connect(mongoURL, function() {
		console.log('connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('sensorUsage');		//, user:{$eq:req.session.email}
		coll.update({"type":req.param("type")} ,  {$inc: {"usage": 1, "amount" : 0.1}},function(err, sensor) {
		 
			if(sensor){
				console.log("Success adding the sensor usage!!");
				json_responses.statusCode= 200;				
				res.send(json_responses);	
			}
		else{
			console.log("error while updating speed usage\n");
			json_responses.statusCode= 404;
			res.send(json_responses);	
		}
		});
	})
}

exports.activateSensor = activateSensor;
exports.deactivateSensor = deactivateSensor;
exports.deleteSensor = deleteSensor;
exports.getSensorDetails = getSensorDetails;
exports.addNewSensor = addNewSensor;

exports.addSensorUsage = addSensorUsage;
exports.getSensorUsage = getSensorUsage;
exports.updateSensorUsage = updateSensorUsage;
exports.reportSpeed = reportSpeed;
exports.reportLocation = reportLocation;
exports.getSensorGroupByUser = getSensorGroupByUser;
exports.updateLocation = updateLocation;
exports.uploadPhoto= uploadPhoto;
exports.getSpeedbySensor = getSpeedbySensor;
exports.getLocationbySensor = getLocationbySensor;
exports.getCamerabySensor = getCamerabySensor;
