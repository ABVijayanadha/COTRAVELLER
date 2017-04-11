 var jwtStartegy = require('passport-jwt').Strategy,
 	extractJwt = require('passport-jwt').ExtractJwt;
 
 var config = require('./config.js'),
 	UserService =require('./../app/services/userService.js'),
 	userService = new UserService();

module.exports = function(passport) {
	var opt ={};
	opt.jwtFromRequest = extractJwt.fromAuthHeader();
	opt.secretOrKey = config.secret;

	var strategy = new jwtStartegy(opt,function(jwt_payload,done){
		userService.getById(jwt_payload.id).then(function(user){
			if(user)
				done(null,user);
			else
				done(null,false);
		}).catch(function(error){
			done(error,false);
		});
	});

	passport.use(strategy);
}


