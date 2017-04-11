var userController = require('./../app/controller/users.js');

module.exports = function(app, passport, auth) {
	app.use('/api/user',userController);
	// app.use('/api/user',passport.authenticate('jwt', { session: false }),userController);
}

