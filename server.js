var express = require('express'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	jwt    = require('jsonwebtoken');


var app = express();

var config = require('./config/config');
var User   = require('./app/models/user');


var port = process.env.PORT || 8080;

mongoose.connect(config.database);
app.set('superSecret',config.secret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


require('./config/routes')(app);

app.get('/', function(req, res) {
    res.send('Whole apis running in this localhost' + port + '/api');
});


app.listen(port);
console.log('Magic happens at http://localhost:' + port);

