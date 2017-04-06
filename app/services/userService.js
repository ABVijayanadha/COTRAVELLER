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


module.exports=userService;



function saveUser(data,callback) {
	var user = new User(data);
	user.save()
		.then(function(){
			callback();
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
 				callback(null,err);
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