var express = require('express'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	jwt    = require('jsonwebtoken'),
	promises =require('bluebird'),
	passport = require('passport'),
	morgan = require('morgan'),
	path = require('path');


var app = express();
var config = require('./config/config');
var User   = require('./app/models/user');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
var port = process.env.PORT || 3030;

mongoose.Promise = promises;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

mongoose.connect(config.database);

require('./config/passport')(passport);

require('./config/routes')(app,passport);


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
