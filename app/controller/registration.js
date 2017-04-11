var jwt    = require('jsonwebtoken'),
	mongoose = require('mongoose'), 
	User = mongoose.model('User'),
	config = require('./../../config/config.js');

var UserService = require('./../services/userService.js');
var userService = new UserService();

exports.register = function (req,res) {
	var userInfo = req.body;
	userService.save(userInfo).then(function(user){
		var token = generateTocken(user);
		res.json({message: "ok", token: token});
	}).catch(function(err){
		res.send(err);
	});
}

exports.login = function(req,res){
	var email = req.body.email;
	var password = req.body.password;
	userService.getUserByEmail(email).then(function(user){
		user.verifyPassword(password,function(err,isMatch){
			if(isMatch){
				var token = generateTocken(user);
				res.json({message: "ok", token: token});
			}else{
				res.send('Unauthorised');
			}
		});
	}).catch(function(){
		res.send('Unauthorised');
	});
}

exports.logout = function(req,res){

}


function generateTocken(user) {
	var payload = {id: user.id};
    var token = jwt.sign(payload, config.secret);
    return "JWT " +token;
}
