var mongoose = require('mongoose'), 
	User = mongoose.model('User'),
	Promise = require('bluebird');

var userService = function(){};

userService.prototype.save = function(user) {
	return new Promise(function(resolve, reject){
		saveUser(user,function(error, data){
			if (error) {
				reject(error);
			} else {
				resolve(data);
			}
		});
	});
};

userService.prototype.getAll = function() {
	return new Promise(function(resolve, reject){
		findAllUsers(function(error,data){
			if(error){
				reject(error);
			}else{
				resolve(data);
			}
		});
	});
};

userService.prototype.getById = function(id) {
	return new Promise(function(resolve,reject){
		getUserById(id,function(error,user){
			if(error){
				reject(error);
			}else{
				resolve(user);
			}
		});
	});
};

userService.prototype.update = function(id,data) {
	return new Promise(function(resolve,reject){
		updateUser(id, data, function(error,user){
			if(error){
				reject(error);
			}else{
				resolve(user);
			}
		}); 
	});
};

userService.prototype.getUserByEmail = function(email) {
	return new Promise(function(resolve,reject){
		getEmail(email, function(error,user){
			if(error){
				reject(error);
			}else{
				resolve(user);
			}
		}); 
	});
};

userService.prototype.remove = function(id) {
	return new Promise(function(resolve,reject){
		deleteUser(id,function(error,user){
			if(error){
				reject(error);
			}else{
				resolve(user);
			}
		})
	});
};


module.exports=userService;



function saveUser(data,callback) {
	var user = new User(data);
	user.save()
		.then(function(user){
			callback(null,user);
		}).catch(function(err){
			callback(err);
		});
}

function getUserById(id,callback){
	User.findOne({_id: id})
		.exec(function(err, user) {
			if (err) callback(err);
			else if (!err && !user) 
				callback('No User Found');
 			else
 				callback(null,user);
        });
}

function getEmail(email,callback) {
	User.findOne({email: email})
		.exec(function(err, user) {
			if (err) callback(err);
			else if (!err && !user) 
				callback('No User Found');
 			else
 				callback(null,user);
        });
}


function findAllUsers(callback) {
	var getUser = User.find({}).exec();
	getUser.then(function(users){
		callback(null,users);
	}).catch(function(err){
		callback(err,[]);   
	});
}

function updateUser(id, data, callback) {
	var query = {_id: id};
	var body = data;
	var updateUserQuery = User.findOneAndUpdate(query, body, {new: true});
	updateUserQuery.then(function(users){
		callback(null, users)
	}).catch(function(err){
		callback(err,[]);
	})
}

function deleteUser(id,callback) {
	console.log('pending...........');
}