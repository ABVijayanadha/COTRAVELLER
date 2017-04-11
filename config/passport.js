 var jwtStartegy = require('passport-jwt').Strategy,
 	extractJwt = require('passport-jwt').ExtractJwt;
 
 var config = require('./config.js'),
 	user =require('./../aap/services/userService.js');

module.exports = function(passport) {
	var opt ={};
	opt.jwtFromRequest = extractJwt.fromAuthHeader();
	opt.secretOrKey = config.secret;

	passport.use(jwtStartegy(opt,function(jwt_payload,done){
		user.getById(jwt_payload.id).then(function(user){
			if(user)
				done(null,user);
			else
				done(null,false);
		}).catch(function(error){
			done(error,false);
		});
	}));
}


