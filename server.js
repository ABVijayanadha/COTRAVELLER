var express = require('express'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	jwt    = require('jsonwebtoken'),
	promises =require('bluebird');


var app = express();

var config = require('./config/config');
var User   = require('./app/models/user');


var port = process.env.PORT || 8080;

mongoose.Promise = promises;
mongoose.connect(config.database);
app.set('superSecret',config.secret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./config/routes')(app);

app.get('/', function(req, res) {
    res.send('Whole apis running in this localhost' + port + '/api');
});


app.listen(port,function(err){	
	if(err){
		console.log(err);
	}else{
		console.log('Let go to http://localhost:' + port);
	}
});

