 var jwtStartegy = require('passport-jwt').Strategy;
 var extractJwt = require('passport-jwt').ExtractJwt;
 var config = require('./config.js');

module.exports = function(passport) {
	var opt ={};
	opt.jwtFromRequest = extractJwt.fromAuthHeader();
	opt.secretOrKey = config.secret;

	passport.use(jwtStartegy(opt,function(jwt_payload,done){
		
	}))
}


