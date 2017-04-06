'use strict';

var passport = require('passport');  
var Strategy = require('passport-local');

module.exports = function(passport) {
	passport.use(new Strategy(  
	  function(username, password, done) {
	    if(username === 'devils name' && password === '666'){
	    	user = {
	    		name:'devil'
	    	};
	      	done(null, user);
		}else {
	      	done(null, false);
	    }
	  }
	));
}


