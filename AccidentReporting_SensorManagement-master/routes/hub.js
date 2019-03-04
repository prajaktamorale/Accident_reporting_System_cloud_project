var mongoURL = "mongodb://localhost:27017/ampere_db";
var mongo = require("./mongo");


function assignHub(req, res){
	var json_responses = {};
	console.log("Inside sensor.js addSensor");
	var group = req.param("group"); 
	var hubName = req.param("garoup") + "_hub";
	var location = req.param("location"); 
	var billing = "1$"; 
	var status = "active";
	
	mongo.connect(mongoURL, function() {
		console.log('connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('hubManager');	
		
		
		
		
		coll.insert({hubName : hubName, location : location, status:status, billing:billing, deleted:0}, function(err,sensor){
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

function getHubDetails(req,res){
	var json_responses;
	mongo.connect(mongoURL, function() {
		console.log('connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('hubManager');
		coll.find({"deleted":0}).toArray(function(err, user) {
			
			if (user) {
				console.log("The data retrieved is: "+ JSON.stringify(user));
				console.log("Success retrieving the data!!");
				json_responses = {statusCode : "200"};				
				json_responses = {allHubList : user};
				res.send(json_responses);
			} else {
				console.log("Error while fetching the data");
				json_responses = {statusCode : "401"};
				res.send(json_responses);
			}
		});
	});
}


function deleteHub(req,res){
	var json_responses;
	mongo.connect(mongoURL, function() {
		console.log("Hub name is : "+req.param("hubName"));
		console.log("sensor location is : "+req.param("location"));
		console.log('connected to mongo at: '+ mongoURL);
		var coll = mongo.collection('hubManager');
		coll.update({"hubName":req.param("hubName") , "location":req.param("location")} , { $set : {"deleted":1}},function(err, user) {
			if (user) {
				console.log("Success in deleting the hub");
				res.statusCode = "200";
				res.send(json_responses);
			} else {
				res.statusCode = "401";				
				console.log("couldn't delete the Hub.. Sorry");
				res.send(json_responses);
			}
		});
	});
}

function deactivateHub(req,res){
	var json_responses;
	mongo.connect(mongoURL, function() {
		console.log("Hub name is : "+req.param("hubName"));
		console.log("Hub location is : "+req.param("location"));
		console.log('connected to mongo at: '+ mongoURL);
		var coll = mongo.collection('hubManager');
		coll.update({"hubName":req.param("hubName") , "location":req.param("location")} , { $set : {"status":0}},function(err, user) {
			if (user) {
				console.log("Success in deleting the Hub");
				res.statusCode = "200";
				res.send(json_responses);
			} else {
				res.statusCode = "401";				
				console.log("couldn't delete the sensor.. Sorry");
				res.send(json_responses);
			}
		});
	});	
}

function activateHub(req,res){
	var json_responses;
	mongo.connect(mongoURL, function() {
		console.log("Hub name is : "+req.param("hubName"));
		console.log("Hub location is : "+req.param("location"));
		console.log('connected to mongo at: '+ mongoURL);
		var coll = mongo.collection('hubManager');
		coll.update({"hubName":req.param("hubName") , "location":req.param("location")} , { $set : {"status":1}},function(err, user) {
			if (user) {
				console.log("Success in deleting the sensor");
				res.statusCode = "200";
				res.send(json_responses);
			} else {
				res.statusCode = "401";				
				console.log("couldn't delete the sensor.. Sorry");
				res.send(json_responses);
			}
		});
	});
}

exports.getHubDetails = getHubDetails;
exports.deleteHub= deleteHub;
exports.deactivateHub = deactivateHub;
exports.activateHub = activateHub;
exports.assignHub = assignHub;

