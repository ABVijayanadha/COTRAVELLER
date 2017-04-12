var userController = require('./../app/controller/users.js');
var registration = require('./../app/controller/registration.js');

module.exports = function(app, passport, auth) {
	app.post('/registration',registration.register);
	app.post('/login',registration.login);
	app.get('/logout',registration.logout);
	// app.use('/api/user',userController);
	app.use('/api/user',passport.authenticate('jwt', { session: false }),userController);
}
