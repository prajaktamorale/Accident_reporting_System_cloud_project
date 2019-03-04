/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , home = require('./routes/home')
  , sensor= require('./routes/sensor')
  , hub = require('./routes/hub')
  , http = require('http')
  , path = require('path')
  , fs = require('fs');

var mongoSessionConnectURL = "mongodb://localhost:27017/ampere_db";
var expressSession = require("express-session");
var mongoStore = require("connect-mongo")(expressSession);  //passing parameter to expressSession module


var app = express();

app.use(expressSession({
        secret: 'ampere',
        resave: true,  //don't save session if unmodified
        saveUninitialized: false,       // don't create session until something stored
        duration: 30 * 60 * 1000,
        activeDuration: 5 * 60 * 1000,
        store: new mongoStore({
                url: mongoSessionConnectURL
        })
}));

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/signup', home.signup);
app.get('/login', home.login);
app.get('/home', home.index);
app.get('/adminDashboard',home.adminDashboard);
app.get('/providerDashboard',home.providerDashboard);
app.get('/logout', home.logout);
app.get('/requestData',home.requestData);

app.post('/getData', user.getData);
app.post('/addUser',home.addUser);
app.post('/userLogin',home.userLogin);
app.get('/userDashboard',home.userDashboard);
app.get('/billing',home.billing);
app.get('/map',home.map);
app.get('/getLoggedinUser',home.getLoggedinUser);
app.post('/resetBill', home.resetBill);

app.post('/addNewSensor',sensor.addNewSensor);
app.post('/getSensorDetails',sensor.getSensorDetails);
app.post('/deleteSensor',sensor.deleteSensor);
app.post('/deactivateSensor',sensor.deactivateSensor);
app.post('/reportSpeed',sensor.reportSpeed);
app.post('/reportLocation',sensor.reportLocation);
app.post('/getSensorGroupByUser',sensor.getSensorGroupByUser);
app.post('/updateLocation',sensor.updateLocation);
app.post('/uploadPhoto', sensor.uploadPhoto);
app.post('/getSpeedbySensor', sensor.getSpeedbySensor);
app.post('/getLocationbySensor', sensor.getLocationbySensor);
app.post('/getCamerabySensor', sensor.getCamerabySensor);
app.post('/addSensorUsage', sensor.addSensorUsage);
app.post('/getSensorUsage', sensor.getSensorUsage);
app.post('/updateSensorUsage', sensor.updateSensorUsage);

app.post('/assignHub', hub.assignHub);
app.post('/getHubDetails', hub.getHubDetails);
app.post('/deleteHub', hub.deleteHub);
app.post('/deactivateHub', hub.deactivateHub);
app.post('/activateHub', hub.activateHub);

app.post('/activateSensor',sensor.activateSensor);
app.post('/getUserlist',user.getUserlist);

app.post('/getDropDownDetails', home.getData);
app.post('/getBillList', home.getBillList);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

